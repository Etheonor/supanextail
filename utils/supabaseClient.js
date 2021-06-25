import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if a user has a paid plan
export const getSub = async () => {
  let { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("paid_user, plan");
  if (subscriptions) {
    return subscriptions;
  }
};
