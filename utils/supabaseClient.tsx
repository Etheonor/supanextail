import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Check if a user has a paid plan
export const getSub = async () => {
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('paid_user, plan')
    .single();
  if (subscriptions) {
    return subscriptions;
  }
};
