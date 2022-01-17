import { FunctionComponent, ReactNode } from 'react';

type Properties = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Properties) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;
