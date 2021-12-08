/*
Don't forget to modify the Head component with your website informations
You can also update the content on the Landing.js component
*/

import Head from 'next/head'
import Landing from 'components/landing'
import Layout from 'components/layout'

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>{`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}</title>
      <meta
        name="description"
        content="Real Estate Buddy is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />

      <meta property="og:url" content="https://Real Estate Buddy.dev/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}
      />
      <meta
        property="og:description"
        content="Real Estate Buddy is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />
      <meta
        property="og:image"
        content="https://Real Estate Buddy.dev/ogimage.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="Real Estate Buddy.dev" />
      <meta
        property="twitter:url"
        content="https://Real Estate Buddy.dev/ogimage.png"
      />
      <meta
        name="twitter:title"
        content={`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}
      />
      <meta
        name="twitter:description"
        content="Real Estate Buddy is a boilerplate for your SaaS, based on Next.js, Supabase, and TailwindCSS"
      />
      <meta
        name="twitter:image"
        content="https://Real Estate Buddy.dev/ogimage.png"
      />
      <meta charSet="UTF-8" />
    </Head>

    <Layout>
      <Landing />
    </Layout>
  </>
)
export default Home
