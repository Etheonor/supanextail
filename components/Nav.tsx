/*
This is your Nav component. It contain a responsive navbar 
*/

import { LogOut, Menu } from 'react-feather';

import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/logo.svg';
import { User } from '@supabase/gotrue-js';

type NavProperties = {
  user: User | null | undefined;
  signOut: () => void;
};

const Nav = ({ user, signOut }: NavProperties): JSX.Element => {
  // Modify you menu directly here
  const NavMenu = (
    <>
      {user && (
        <>
          <Link href="/dashboard">
            <a className="nav-btn">Dashboard</a>
          </Link>
          <Link href="/members-only">
            <a className="nav-btn">Premium user </a>
          </Link>
        </>
      )}

      <Link href="/blog">
        <a id="blog" className="nav-btn">
          Blog
        </a>
      </Link>

      <Link href="/pricing">
        <a id="pricing" className="nav-btn">
          Pricing
        </a>
      </Link>

      <Link href="/contact">
        <a id="contact" className="nav-btn">
          Contact Us
        </a>
      </Link>

      {user ? (
        <button
          id="logOutBtn"
          className="text-xs btn btn-xs"
          onClick={() => signOut()}>
          <LogOut size={12} className="mr-2" />
          Logout
        </button>
      ) : (
        <>
          <Link href="/login">
            <a id="login" className="nav-btn">
              Login
            </a>
          </Link>
          <Link href="/signup">
            <a
              id="signup"
              className="font-normal normal-case btn btn-sm btn-primary font-body">
              Sign Up
            </a>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full mb-2 navbar">
      <Link href="/">
        <a>
          <Image src={Logo as string} alt="SupaNexTail Logo" />
        </a>
      </Link>

      <div className="flex-col hidden ml-auto text-sm text-center lg:flex lg:flex-row lg:space-x-10 font-body">
        {NavMenu}
      </div>
      <div className="ml-auto lg:hidden">
        <div className="dropdown dropdown-end" data-cy="dropdown">
          <div tabIndex={0} className="m-1 cursor-pointer">
            <Menu />
          </div>
          <div className="w-24 mt-3 space-y-3 text-center menu dropdown-content">
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
