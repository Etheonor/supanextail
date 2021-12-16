/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 * With SupaNexTail, we use SSR with the Dashboard page (pages/dashboard.js)
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  supabase.auth.api.setAuthCookie(req, res);
}
