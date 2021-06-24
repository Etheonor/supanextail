import Cors from "cors";
import initMiddleware from "utils/init-middleware";
const rateLimit = require("express-rate-limit");

const cors = initMiddleware(
  Cors({
    methods: ["POST", "PUT"],
  })
);

const limiter = initMiddleware(
  rateLimit({
    windowMs: 30000, // 30sec
    max: 150, // Max 4 request per 30 sec
  })
);
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  await cors(req, res);
  await limiter(req, res);
  if (req.method === "POST") {
    const returnUrl = `${req.headers.origin}/dashboard`;

    const portalsession = await stripe.billingPortal.sessions.create({
      customer: req.query.customerId,
      return_url: returnUrl,
    });
    res.status(200).send({ url: portalsession.url });
  }
}
