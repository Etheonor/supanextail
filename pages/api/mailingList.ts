import type { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';
import axios from 'axios';
import initMiddleware from 'utils/init-middleware';
import rateLimit from 'express-rate-limit';

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
  request: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await cors(request, res);
  await limiter(request, res);
  if (request.method === 'PUT') {
    axios
      .put(
        'https://api.sendgrid.com/v3/marketing/contacts',
        {
          contacts: [{ email: `${request.body.mail}` }],
          list_ids: [process.env.SENDGRID_MAILING_ID],
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SENDGRID_SECRET}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.status(200).send({
          message:
            'Your email has been succesfully added to the mailing list. Welcome 👋',
        });
      })
      .catch((error) => {
        res.status(500).send({
          message:
            'Oups, there was a problem with your subscription, please try again or contact us',
          error: error,
        });
      });
  }
}
