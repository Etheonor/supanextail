// To modify the privacy policy, check the PrivacyPolicy.js component

import Layout from 'components/layout'
import { NextSeo } from 'next-seo'
import PrivacyPolicy from 'components/privacy-policy'

const PrivacyPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${process.env.NEXT_PUBLIC_TITLE} | Privacy Policy`}
      description="Real Estate Buddy is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS"
    />
    <Layout>
      <PrivacyPolicy />
    </Layout>
  </>
)
export default PrivacyPage
