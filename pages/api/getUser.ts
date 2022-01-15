import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

// Example of how to verify and get user data server-side.
const getUser = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const token = request.headers.token;

  if (typeof token !== 'string') {
    return response.status(401).json({ error: 'Missing auth token.' });
  }

  if (token) {
    const { data: user, error } = await supabase.auth.api.getUser(token);

    if (error) return response.status(401).json({ error: error.message });
    return response.status(200).json(user);
  }
};

export default getUser;
