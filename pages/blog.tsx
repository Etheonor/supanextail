import Container from 'components/blog/container';
import { GetStaticProps } from 'next/types';
import Head from 'next/head';
import HeroPost from 'components/blog/hero-post';
import Layout from 'components/Layout';
import MoreStories from 'components/blog/more-stories';
import Post from '../types/post';
import { getAllPosts } from '../lib/api';

type Properties = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Properties) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <Layout>
      <>
        <Head>
          <title>{`${
            process.env.NEXT_PUBLIC_TITLE ? process.env.NEXT_PUBLIC_TITLE : ''
          } | Blog`}</title>
        </Head>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </>
    </Layout>
  );
};

export default Index;

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getStaticProps = (): GetStaticProps => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
