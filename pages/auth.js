import { Auth } from "@supabase/ui";
import AuthComponent from "../components/Auth";
import AuthText from "components/AuthText";
import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const { user, session } = Auth.useUser();
  const router = useRouter();

  useEffect(() => {
    // If a user is already logged in, return to the homepage
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_TITLE} | Auth`}
        description={`This is the auth page for ${process.env.NEXT_PUBLIC_TITLE}`}
      />

      <Layout>
        <div className='flex flex-wrap justify-evenly w-full'>
          <AuthText />
          <div>{!session && <AuthComponent />}</div>
        </div>
      </Layout>
    </>
  );
};

export default AuthPage;
