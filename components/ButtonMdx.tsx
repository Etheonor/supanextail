// This button is used as an example of how to use the MDX button component

export default function Button({ children }: any): JSX.Element {
  return <button className="btn-primary btn">{children}</button>;
}
