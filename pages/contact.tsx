import Contact from 'components/Contact';
import Layout from 'components/Layout';
import { NextSeo } from 'next-seo';

const ContactPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      } | Contact`}
      description={`This is the contact page for ${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      }`}
    />

    <Layout>
      <Contact />
    </Layout>
  </>
);
export default ContactPage;
