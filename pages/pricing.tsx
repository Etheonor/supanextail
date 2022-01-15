// To modify the content of the pricing page, check the Pricing.js component

import Layout from 'components/Layout';
import { NextSeo } from 'next-seo';
import Pricing from 'components/Pricing';

const PricingPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      } | Pricing`}
      description="SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS"
    />
    <Layout>
      <Pricing />
    </Layout>
  </>
);
export default PricingPage;
