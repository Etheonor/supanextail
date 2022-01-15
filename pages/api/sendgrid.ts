/*
This is a simple contact form for SupaNexTail
Using Sendgrid. 
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

interface Request extends NextApiRequest {
  body: {
    name: string;
    email: string;
    message: string;
  };
}

const sendGrid = (request: Request, response: NextApiResponse): void => {
  if (request.method === 'POST') {
    sgMail.setApiKey(process.env.SENDGRID_SECRET || '');

    const message = {
      to: process.env.SENDGRID_MAILTO || '', // Change to your recipient
      from: process.env.SENDGRID_MAILFROM || '', // Change to your verified sender
      subject: `[${process.env.NEXT_PUBLIC_TITLE || ''}] New message from ${
        request.body.name
      }`,
      text: request.body.message,
      reply_to: request.body.email,
    };

    sgMail
      .send(message)
      .then(() => {
        response
          .status(200)
          .send({ message: 'Your email has been sent', success: true });
      })
      .catch((error: string) => {
        console.error(error);
        response.status(500).send({
          message: 'There was an issue with your email... please retry',
          error,
        });
      });
  }
};
export default sendGrid;
