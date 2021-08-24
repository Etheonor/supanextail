/*
SupaNexTail use only 2 webhooks. Stripe have a lot more, 
you can check it here https://stripe.com/docs/webhooks
BE SURE TO SETUP YOUR WEBHOOKS IN YOUR DASHBOARD!
If you want to test it locally, you'll need the stripe CLI and use this command line:
stripe listen --forward-to localhost:3000/api/stripe/stripe-webhook
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';
import initMiddleware from 'utils/init-middleware';
import rateLimit from 'express-rate-limit';

export const config = {
	api: {
		bodyParser: false,
	},
};

// Initialize the cors middleware -> Allow the browser extension to create lists
const cors = initMiddleware(
	Cors({
		methods: ['POST', 'HEAD'],
	})
);

// Init Supabase Admin

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.SUPABASE_ADMIN_KEY || ''
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

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
	apiVersion: '2020-08-27',
	maxNetworkRetries: 2,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	await cors(req, res);
	await limiter(req, res);

	if (req.method === 'POST') {
		// Retrieve the event by verifying the signature using the raw body and secret.
		let event: Stripe.Event;
		const buf = await buffer(req);

		const sig = req.headers['stripe-signature'] as string;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK || '');
		} catch (err) {
			console.log(err);
			console.log(`⚠️  Webhook signature verification failed.`);
			console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
			return res.send(400);
		}
		// Extract the object from the event.
		const dataObject = event.data.object as {
			client_reference_id: string;
			customer: string;
			metadata: {
				priceId: string;
			};
			subscription: string;
		};

		// Handle the event
		// Review important events for Billing webhooks
		// https://stripe.com/docs/billing/webhooks
		// Remove comment to see the various objects sent for this sample
		switch (event.type) {
			case 'checkout.session.completed':
				const { data: subscriptions } = await supabase
					.from('subscriptions')
					.select('*')
					.eq('id', dataObject.client_reference_id);

				if (subscriptions?.length == 0) {
					await supabase
						.from('profiles')
						.update({ customerId: dataObject.customer })
						.eq('id', dataObject.client_reference_id);

					await supabase
						.from('subscriptions')
						.insert([
							{
								id: dataObject.client_reference_id,
								customer_id: dataObject.customer,
								paid_user: true,
								plan: dataObject.metadata.priceId,
								subscription: dataObject.subscription,
							},
						])
						.then()
						.then(null, (err) => console.log('err: ', err)); // catch
				} else if (subscriptions?.length && subscriptions?.length > 0) {
					await supabase
						.from('subscriptions')
						.update({
							customer_id: dataObject.customer,
							paid_user: true,
							plan: dataObject.metadata.priceId,
							subscription: dataObject.subscription,
						})
						.eq('id', dataObject.client_reference_id)
						.then()
						.then(null, (err) => console.log('err: ', err)); // catch
				}
				break;
			case 'customer.subscription.deleted':
				await supabase
					.from('subscriptions')
					.update({ paid_user: false })
					.eq('customer_id', dataObject.customer)
					.then()
					.then(null, (err) => console.log('err: ', err)); // catch
				break;
			case 'invoice.payment_failed':
				// If the payment fails or the customer does not have a valid payment method,
				//  an invoice.payment_failed event is sent, the subscription becomes past_due.
				// Use this webhook to notify your user that their payment has
				// failed and to retrieve new card details.
				break;

			case 'invoice.paid':
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