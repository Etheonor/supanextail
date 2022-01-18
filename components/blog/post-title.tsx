import { ReactNode } from 'react';

type Properties = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Properties): JSX.Element => {
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-tight md:leading-none mb-5 text-center md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
