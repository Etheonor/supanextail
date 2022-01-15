import { createClient } from '@supabase/supabase-js';
import { definitions } from 'types/database/index';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Check if a user has a paid plan
export const getSub = async (): Promise<
  undefined | definitions['subscriptions']
> => {
  const { data: subscriptions } = await supabase
    .from<definitions['subscriptions']>('subscriptions')
    .select('paid_user, plan')
    .single();
  return subscriptions ? subscriptions : undefined;
};
