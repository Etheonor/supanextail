import Contact from 'components/contact'
import Layout from 'components/layout'
import { NextSeo } from 'next-seo'

const ContactPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${process.env.NEXT_PUBLIC_TITLE} | Contact`}
      description={`This is the contact page for ${process.env.NEXT_PUBLIC_TITLE}`}
    />

    <Layout>
      <Contact />
    </Layout>
  </>
)
export default ContactPage
