/*
Don't forget to modify the Head component with your website informations
You can also update the content on the Landing.js component
*/

import Head from 'next/head';
import Landing from 'components/Landing';
import Layout from 'components/Layout';

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>{`Welcome to ${
        process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
      } 👋`}</title>
      <meta
        name="description"
        content="SupaNexTail is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />

      <meta property="og:url" content="https://supanextail.dev/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`Welcome to ${
          process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
        } 👋`}
      />
      <meta
        property="og:description"
        content="SupaNexTail is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />
      <meta property="og:image" content="https://supanextail.dev/ogimage.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="supanextail.dev" />
      <meta
        property="twitter:url"
        content="https://supanextail.dev/ogimage.png"
      />
      <meta
        name="twitter:title"
        content={`Welcome to ${
          process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
        } 👋`}
      />
      <meta
        name="twitter:description"
        content="SupaNexTail is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />
      <meta
        name="twitter:image"
        content="https://supanextail.dev/ogimage.png"
      />
      <meta charSet="UTF-8" />
    </Head>

    <Layout>
      <Landing />
    </Layout>
  </>
);
export default Home;
