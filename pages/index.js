import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Layout from "components/Layout";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <h1 className='text-6xl font-bold'>
          Supanextail <span className='text-blue-600'>Boilerplate</span>
        </h1>
      </Layout>
    </div>
  );
}
