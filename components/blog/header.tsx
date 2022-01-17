import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
    <h2 className="text-sm md:text-xl font-semibold tracking-tight md:tracking-tighter leading-tight mb-16 mt-8">
      <Link href="/blog">
        <a className="hover:underline">Return to the blog</a>
      </Link>
    </h2>
  );
};

export default Header;
