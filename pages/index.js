/*Don't forget to modify the NextSeo component with your website informations */

import Landing from "components/Landing";
import Layout from "components/Layout";
import { NextSeo } from "next-seo";

const Home = () => {
  return (
    <>
      <NextSeo
        title={`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}
        description={`SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS`}
        openGraph={{
          type: "website",
          url: "https://www.supanextail.com/",
          title: `Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`,
          description:
            "SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS",
          images: [
            {
              url: "https://www.supanextail.com/ogimage.png",
              width: 1200,
              height: 630,
              alt: "SupaNexTail",
            },
            {
              url: "https://www.supanextail.com/ogimage.png",
              width: 1200,
              height: 630,
              alt: "SupaNexTail",
            },
          ],
        }}
      />
      <Layout>
        <Landing />
      </Layout>
    </>
  );
};
export default Home;
