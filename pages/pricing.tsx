// To modify the content of the pricing page, check the Pricing.js component

import Layout from 'components/layout'
import { NextSeo } from 'next-seo'
import Pricing from 'components/pricing'

const PricingPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${process.env.NEXT_PUBLIC_TITLE} | Pricing`}
      description="Real Estate Buddy is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS"
    />
    <Layout>
      <Pricing />
    </Layout>
  </>
)
export default PricingPage
