import { getAllPosts, getPostBySlug } from 'lib/api';

import Container from 'components/blog/container';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Header from 'components/blog/header';
import Layout from 'components/Layout';
import PostBody from 'components/blog/post-body';
import PostHeader from 'components/blog/post-header';
import PostTitle from 'components/blog/post-title';
import PostType from 'types/post';
import markdownToHtml from 'lib/markdownToHtml';
import { useRouter } from 'next/router';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with{' '}
                  {process.env.NEXT_PUBLIC_TITLE}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <Header />
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
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
