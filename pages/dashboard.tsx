import { useEffect, useState } from 'react';

import Dashboard from '../components/Dashboard';
import Head from 'next/head';
import Layout from 'components/Layout';
import type { NextPageContext } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { definitions } from 'types/database/index';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

const DashboardPage = ({
  user,
  profile,
  planName,
}: {
  user: {
    id: string;
  };
  profile: {
    username: string;
    website: string;
    avatar_url: string;
  };
  planName: string;
}): JSX.Element => {
  const [session, setSession] = useState(supabase.auth.session());
  const router = useRouter();
  useEffect(() => {
    // If a user is not logged in, return to the homepage
    if (!user) {
      void router.push('/');
    }
  }, [router, user]);

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
            {session && (
              <Dashboard
                key={user.id || undefined}
                session={session}
                profile={profile}
                planName={planName}
              />
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export async function getServerSideProps(
  context: NextPageContext
): Promise<any> {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || ''
  );
  const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

  const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
    apiVersion: '2020-08-27',
    maxNetworkRetries: 2,
  });

  // If the user exist, you will retrieve the user profile and if he/she's a paid user
  if (user) {
    const { data: plan } = await supabaseAdmin
      .from<definitions['subscriptions']>('subscriptions')
      .select('subscription, paid_user')
      .eq('id', user.id)
      .single();

    // Check the subscription plan. If it doesnt exist, return null
    const subscription = plan?.subscription
      ? await stripe.subscriptions.retrieve(plan.subscription)
      : null;

    const { data: profile } = await supabaseAdmin
      .from<definitions['profiles']>('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();

    return {
      props: {
        user,
        plan: subscription?.items.data[0].price.id
          ? subscription?.items.data[0].price.id
          : null,
        profile,
        // Retrieve the name of the subscription plan (Don't forget to add nickname to your prices)
        planName: plan?.paid_user
          ? subscription?.items.data[0].plan.nickname
            ? subscription?.items.data[0].plan.nickname
            : '[DEV] Please add a description for your prices (Edit your pricing in the Stripe dashboard)'
          : 'Free Tier',
      },
    };
  }

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, return it.
  return null;
}
export default DashboardPage;
