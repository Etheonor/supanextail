// To modify the terms & conditions, check the Terms.js component

import Layout from 'components/layout'
import { NextSeo } from 'next-seo'
import Terms from 'components/terms'

const TermsPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${process.env.NEXT_PUBLIC_TITLE} | Terms and conditions`}
      description="Real Estate Buddy is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS"
    />
    <Layout>
      <Terms />
    </Layout>
  </>
)
export default TermsPage
