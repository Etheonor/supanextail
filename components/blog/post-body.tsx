import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

type Properties = {
  code: string;
};

const PostBody = ({ code }: Properties): JSX.Element => {
  const BlogPost = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="max-w-2xl mx-auto prose lg:prose-xl">
      <BlogPost />
    </div>
  );
};

export default PostBody;
