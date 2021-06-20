import Layout from "components/Layout";
import { NextSeo } from "next-seo";

const Home = () => {
  return (
    <>
      <NextSeo
        title={`Welcome to ${process.env.NEXT_PUBLIC_TITLE} 👋`}
        description={`SupaNexTail is a boilerplate for your website, based on Next.js, Supabase, and TailwindCSS`}
      />
      <Layout>
        <h2 className='text-5xl md:text-6xl font-bold'>
          SupaNexTail <span className='text-blue-600'>Boilerplate</span>
        </h2>
      </Layout>
    </>
  );
};
export default Home;
