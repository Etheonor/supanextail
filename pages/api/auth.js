/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 * With SupaNexTail, we use SSR with the Dashboard page (pages/dashboard.js)
 */

import { supabase } from "utils/supabaseClient";

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
