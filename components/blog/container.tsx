import { FunctionComponent, ReactNode } from 'react';

type Properties = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Properties) => {
  return <div className="container mx-auto p-10">{children}</div>;
};

export default Container;
