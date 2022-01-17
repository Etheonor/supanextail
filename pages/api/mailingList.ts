import type { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';
import axios from 'axios';
import initMiddleware from 'utils/initMiddleware';
import rateLimit from 'express-rate-limit';

interface Request extends NextApiRequest {
  body: {
    mail: string;
  };
}

export const config = {
  api: {
    externalResolver: true,
  },
};

const cors = initMiddleware(
  Cors({
    methods: ['PUT'],
  })
);

const limiter = initMiddleware(
  rateLimit({
    windowMs: 30_000, // 30sec
    max: 2, // Max 2 request per 30 sec
  })
);

export default async function handler(
  request: Request,
  response: NextApiResponse
): Promise<void> {
  await cors(request, response);
  await limiter(request, response);
  if (request.method === 'PUT') {
    const result = await axios.put(
      'https://api.sendgrid.com/v3/marketing/contacts',
      {
        contacts: [{ email: `${request.body.mail}` }],
        list_ids: [process.env.SENDGRID_MAILING_ID],
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.SENDGRID_SECRET || ''}`,
        },
      }
    );

    if (result.status === 200) {
      response.status(200).json({
        message:
          'Your email has been succesfully added to the mailing list. Welcome 👋',
      });
    } else {
      response.status(500).json({
        error:
          'Oups, there was a problem with your subscription, please try again or contact us',
      });
    }
  }
}
