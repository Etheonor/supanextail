// SSR Example to handle premium users only

import Layout from 'components/Layout';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import { createClient } from '@supabase/supabase-js';
import { definitions } from 'types/database/index';

const MembersOnly = (): JSX.Element => (
  <>
    <NextSeo
      title={`${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      } | Premium`}
      description={`This is the premium page for ${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      }`}
    />

    <Layout>
      <>
        <h2 className="text-center mb-10"> Welcome premium user 🎉</h2>
        <p className="max-w-md m-auto">
          This page check server side if a user is premium. You can use this
          example to store your premium app/logic here!
        </p>
      </>
    </Layout>
  </>
);
export default MembersOnly;

export async function getServerSideProps(context: NextPageContext) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || ''
  );
  const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);
  console.log(user);
  const { data: subscriptions } = await supabaseAdmin
    .from<definitions['subscriptions']>('subscriptions')
    .select('paid_user, plan')
    .eq('id', user?.id)
    .single();

  console.log(subscriptions);
  if (!subscriptions?.paid_user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sub: subscriptions?.paid_user,
    },
  };
}
