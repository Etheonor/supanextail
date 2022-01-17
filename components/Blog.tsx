/* eslint-disable unicorn/prevent-abbreviations */

import { format, parseISO } from 'date-fns';

import Link from 'next/link';
import PostType from 'types/post';
import React from 'react';

type Properties = {
  posts: PostType[];
};

const Blog = (props: Properties): JSX.Element => {
  const { posts } = props;

  return (
    <div className="max-w-xl px-5 py-10 m-auto">
      <h1>Welcome on the SupaNexTail blog</h1>

      {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {post.date && format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
          <h1 className="mb-2 text-xl">
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
          <p>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a>Read More</a>
            </Link>
          </p>
        </article>
      ))}
    </div>
  );
};

export default Blog;
