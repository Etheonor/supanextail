import Head from "next/head";
import AuthComponent from "../components/Auth";
import Account from "../components/Dashboard";
import Layout from "components/Layout";
import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthPage() {
  const { user, session } = Auth.useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Auth</title>
      </Head>

      <Layout>
        <div>
          <h1 className='text-4xl font-bold md:text-5xl'>Auth</h1>
          <div className='container'>
            {!session && (
              <div className='max-w-md'>
                <AuthComponent />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
