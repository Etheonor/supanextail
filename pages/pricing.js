import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import Pricing from "components/Pricing";

const PricingPage = () => {
  return (
    <>
      <NextSeo
        title={`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}
        description={`SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS`}
      />
      <Layout>
        <Pricing />
      </Layout>
    </>
  );
};
export default PricingPage;
