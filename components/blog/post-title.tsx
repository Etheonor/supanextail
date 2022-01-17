import { ReactNode } from 'react';

type Properties = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Properties): JSX.Element => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
