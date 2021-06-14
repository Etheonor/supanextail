import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";

import Layout from "components/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SupaNextTail</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <h1 className='text-5xl md:text-6xl font-bold'>
          SupaNextTail <span className='text-blue-600'>Boilerplate</span>
        </h1>
      </Layout>
    </div>
  );
}
