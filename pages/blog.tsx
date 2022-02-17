import Container from 'components/blog/container';
import { GetStaticPropsResult } from 'next/types';
import Head from 'next/head';
import HeroPost from 'components/blog/hero-post';
import Layout from 'components/Layout';
import MoreStories from 'components/blog/more-stories';
import Post from '../types/post';
import SectionSeparator from 'components/blog/section-separator';
import { getAllPosts } from '../lib/blogApi';

type Properties = {
  allPosts: Post[];
};
type Items = {
  [key: string]: string;
};

const Blog = ({ allPosts }: Properties): JSX.Element => {
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
          <SectionSeparator />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </>
    </Layout>
  );
};

export default Blog;

type Parameters_ = {
  allPosts: Items[];
};

export const getStaticProps = (): GetStaticPropsResult<Parameters_> => {
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
