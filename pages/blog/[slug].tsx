import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { getAllPosts, getPostData } from 'lib/blogApi';

import Container from 'components/blog/container';
import Head from 'next/head';
import Header from 'components/blog/header';
import Layout from 'components/Layout';
import PostBody from 'components/blog/post-body';
import PostHeader from 'components/blog/post-header';
import PostType from 'types/post';

type Properties = {
  preview?: boolean;
  code: string;
  frontmatter: PostType;
};

const Post = ({ code, frontmatter }: Properties): JSX.Element => {
  return (
    <Layout>
      <Container>
        <>
          <article className="mb-32">
            <Head>
              <title>
                {frontmatter.title} | {process.env.NEXT_PUBLIC_TITLE}
              </title>
              <meta property="og:image" content={frontmatter.ogImage.url} />
            </Head>
            <Header />
            <PostHeader
              title={frontmatter.title}
              coverImage={frontmatter.coverImage}
              date={frontmatter.date}
              author={frontmatter.author}
            />
            <PostBody code={code} />
          </article>
        </>
      </Container>
    </Layout>
  );
};

export default Post;

type Parameters_ = {
  params: {
    slug: string;
  };
};

type StaticResult = {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  code: string;
};

export async function getStaticProps({
  params,
}: Parameters_): Promise<GetStaticPropsResult<StaticResult>> {
  const postData = await getPostData(params.slug);
  return {
    props: {
      ...postData,
    },
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
