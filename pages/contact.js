import Head from "next/head";
import Layout from "components/Layout";
import Contact from "components/Contact";

export default function ContactPage() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Contact</title>
      </Head>

      <Layout>
        <Contact />
      </Layout>
    </div>
  );
}
