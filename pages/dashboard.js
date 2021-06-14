import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function Dashboard({ user }) {
  const [session, setSession] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push("/");
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
        <title>Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div>
          <h1 className='text-6xl font-bold'>Dashboard</h1>
          <div className='container'>
            {!session ? (
              <div className='max-w-md'>
                <Auth />
              </div>
            ) : (
              <Account key={user.id} session={session} />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: { user } };
  }

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  // If there is a user, return it.
}
