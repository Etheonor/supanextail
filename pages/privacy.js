import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import PrivacyPolicy from "components/PrivacyPolicy";

const Privacy = () => {
  return (
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_TITLE} | Privacy Policy`}
        description={`SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS`}
      />
      <Layout>
        <PrivacyPolicy />
      </Layout>
    </>
  );
};
export default Privacy;
