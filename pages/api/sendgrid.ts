/*
This is a simple contact form for SupaNexTail
Using Sendgrid. 
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

const sendGrid = async (
  request: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (request.method === 'POST') {
    sgMail.setApiKey(process.env.SENDGRID_SECRET || '');

    const message = {
      to: process.env.SENDGRID_MAILTO || '', // Change to your recipient
      from: process.env.SENDGRID_MAILFROM || '', // Change to your verified sender
      subject: `[${process.env.NEXT_PUBLIC_TITLE}] New message from ${request.body.name}`,
      text: request.body.message,
      reply_to: request.body.email,
    };

    sgMail
      .send(message)
      .then(() => {
        res
          .status(200)
          .send({ message: 'Your email has been sent', success: true });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: 'There was an issue with your email... please retry',
          error,
        });
      });
  }
};
export default sendGrid;
