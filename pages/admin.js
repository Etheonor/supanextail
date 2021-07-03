import Head from "next/head";
import Layout from "components/Layout";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const AdminPage = ({ adminKey }) => {
  const SupabaseGrid = dynamic(() => import("@supabase/grid"));

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
      </Head>

      <Layout>
        <>
          <h1 className='text-4xl font-bold md:text-5xl font-title'>
            Admin Dashboard
          </h1>
          <p>Hello admin !</p>
        </>
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

  // If the user exist, you will retrieve the user profile and if he/she's a paid user
  if (user) {
    let { data: admincheck, error } = await supabaseAdmin
      .from("admin_list")
      .select("isadmin")
      .eq("id", user.id)
      .single();

    if (!admincheck.isadmin) {
      // If no user, redirect to index.
      return { props: {}, redirect: { destination: "/", permanent: false } };
    } else
      return {
        props: {
          admincheck: admincheck.isadmin,
          adminKey: process.env.SUPABASE_ADMIN_KEY,
        },
      };
  }

  if (!user) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }
}
export default AdminPage;
