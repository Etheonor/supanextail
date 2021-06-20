import Layout from "components/Layout";
import Contact from "components/Contact";
import { NextSeo } from "next-seo";

const ContactPage = () => {
  return (
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_TITLE} | Contact`}
        description={`This is the contact page for ${process.env.NEXT_PUBLIC_TITLE}`}
      />

      <Layout>
        <Contact />
      </Layout>
    </>
  );
};
export default ContactPage;