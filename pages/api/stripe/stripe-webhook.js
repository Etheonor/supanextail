import Cors from "cors";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";
import initMiddleware from "utils/init-middleware";
const rateLimit = require("express-rate-limit");

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize the cors middleware -> Allow the browser extension to create lists
const cors = initMiddleware(
  Cors({
    methods: ["POST", "HEAD"],
  })
);

// Init Supabase Admin

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ADMIN_KEY
);

// Rate limiter : The user can only create one list every 20 seconds (avoid spam)

const limiter = initMiddleware(
  rateLimit({
    windowMs: 30000, // 30sec
    max: 150, // Max 150 request per 30 sec
  })
);
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  await cors(req, res);
  await limiter(req, res);
  stripe.setMaxNetworkRetries(2);

  if (req.method === "POST") {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const buf = await buffer(req);

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.send(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case "checkout.session.completed":
        let { data: subscriptions, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("id", dataObject.client_reference_id);
          console.log(dataObject)

        if (subscriptions.length == 0) {
          const { data, error } = await supabase
            .from("profiles")
            .update({ customerId: dataObject.customer })
            .eq("id", dataObject.client_reference_id);
          if (error) console.log(error);

          await supabase
            .from("subscriptions")
            .insert([
              {
                id: dataObject.client_reference_id,
                customer_id: dataObject.customer,
                paid_user: true,
                plan: dataObject.metadata.priceId,
                subscription: dataObject.subscription
              },
            ])
            .then()
            .catch((err) => console.log(err));
        } else if (subscriptions.length > 0) {
          await supabase
            .from("subscriptions")
            .update({
              customer_id: dataObject.customer,
              paid_user: true,
              plan: dataObject.metadata.priceId,
              subscription: dataObject.subscription
            })
            .eq("id", dataObject.client_reference_id)
            .then()
            .catch((err) => console.log(err));
        }
        break;
      case "customer.subscription.deleted":
        await supabase
          .from("subscriptions")
          .update({ paid_user: false })
          .eq("customer_id", dataObject.customer)
          .then()
          .catch((err) => console.log(err));
        break;
      case "invoice.payment_failed":
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;

      case "invoice.paid":
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;

      default:
      // Unexpected event type
    }
    res.send(200);
  }
}
