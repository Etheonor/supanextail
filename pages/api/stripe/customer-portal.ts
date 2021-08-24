/* Dont forget to create your customer portal on Stripe 
https://dashboard.stripe.com/test/settings/billing/portal */
import type { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';
import Stripe from 'stripe';
import initMiddleware from 'utils/init-middleware';
import rateLimit from 'express-rate-limit';

const cors = initMiddleware(
	Cors({
		methods: ['POST', 'PUT'],
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
const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
	apiVersion: '2020-08-27',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	await cors(req, res);
	await limiter(req, res);
	if (req.method === 'POST') {
		const returnUrl = `${req.headers.origin}/dashboard`; // Stripe will return to the dashboard, you can change it

		const portalsession = await stripe.billingPortal.sessions.create({
			customer: req.body.customerId,
			return_url: returnUrl,
		});
		res.status(200).send({ url: portalsession.url });
	}
}
