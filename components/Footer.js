import Link from "next/link";
import dynamic from "next/dynamic";

const Footer = () => {
  const ThemeToggle = dynamic(() => import("components/UI/ThemeToggle.js"), {
    ssr: false,
  });
  return (
    <footer className='w-full flex'>
      <nav className='navbar mb-2 px-5 mr-auto'>
        <div className='flex justify-evenly w-full space-x-10'>
          <div className=''>© {process.env.NEXT_PUBLIC_TITLE}</div>
          <Link href='/privacy'>
            <a>Privacy Policy</a>
          </Link>
          <Link href=''>
            <a>Terms of service</a>
          </Link>
        </div>
      </nav>
      <div className='mr-5 my-auto'>
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
