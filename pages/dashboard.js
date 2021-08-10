import { useEffect, useState } from 'react';

import Head from 'next/head';
import Layout from 'components/Layout';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Dashboard from '../components/Dashboard';

const DashboardPage = ({ user, plan, profile }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // If a user is not logged in, return to the homepage
    if (!user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
      </Head>

      <Layout>
        {!session ? (
          <div className="text-center">You are not logged in</div>
        ) : (
          <>
            <Dashboard
              key={user.id}
              session={session}
              plan={plan}
              profile={profile}
            />
          </>
        )}
      </Layout>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ADMIN_KEY
  );
  const { user } = await supabaseAdmin.auth.api.getUserByCookie(req);
  const stripe = require('stripe')(process.env.STRIPE_SECRET);

  // If the user exist, you will retrieve the user profile and if he/she's a paid user
  if (user) {
    const { data: plan, error } = await supabaseAdmin
      .from('subscriptions')
      .select('plan')
      .eq('id', user.id)
      .single();

    // Check the subscription plan. If it doesnt exist, return null
    const subscription = plan?.plan
      ? await stripe.subscriptions.retrieve(plan.plan)
      : null;

    const { data: profile, errorProfile } = await supabaseAdmin
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();

    return {
      props: {
        user,
        plan: subscription?.plan?.id ? subscription.plan.id : null,
        profile,
      },
    };
  }

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, return it.
}
export default DashboardPage;
