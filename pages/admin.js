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
        <SupabaseGrid
          table='countries'
          clientProps={{
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey: adminKey,
          }}
        />
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

  // If the user exist, you will retrieve the user profile and if he/she's an admin
  if (user) {
    let { data: admincheck, error } = await supabaseAdmin
      .from("admin_list")
      .select("isadmin")
      .eq("id", user.id)
      .single();

    if (admincheck.isadmin) {
      return {
        props: {
          admincheck: admincheck.isadmin,
          adminKey: process.env.SUPABASE_ADMIN_KEY,
        },
      };
    } else
      return { props: {}, redirect: { destination: "/", permanent: false } };
  }
  // If no user, redirect to index.
  if (!user) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }
}
export default AdminPage;
