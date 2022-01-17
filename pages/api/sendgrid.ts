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

const sendGrid = async (
  request: Request,
  response: NextApiResponse
): Promise<void> => {
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

    try {
      const result = await sgMail.send(message);
      console.log(result);
      if (result) {
        response.status(200).json({
          message:
            'Your message has been succesfully sent. Thank you for your feedback.',
          success: true,
        });
      }
    } catch (error: unknown) {
      if (error) {
        response.status(500).json({
          error:
            'Oups, there was a problem with your email, please try again or contact us',
          success: false,
        });
      }
    }
  }
};
export default sendGrid;
