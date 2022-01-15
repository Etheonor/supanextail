// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

import type { NextApiRequest, NextApiResponse } from 'next';

export default function initMiddleware(middleware: any) {
  return (request: NextApiRequest, response: NextApiResponse) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      middleware(request, response, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
