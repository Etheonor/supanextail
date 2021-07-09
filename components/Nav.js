/*
This is your Nav component. It contain a responsive navbar 
*/

import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.svg";
import { Menu } from "react-feather";
import { supabase } from "utils/supabaseClient";
import { useEffect } from "react";

const Nav = (props) => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if ((event === "SIGNED_OUT") | (event === "SIGNED_IN")) {
          fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          }).then((res) => res.json());
        }
        if (event === "USER_UPDATED") {
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  //Modify you menu directly here
  const NavMenu = (
    <div className='flex space-x-2 flex-col lg:flex-row lg:space-y-0 space-y-2'>
      {props.user && (
        <Link href='/dashboard'>
          <a className='btn btn-ghost btn-sm'>Dashboard</a>
        </Link>
      )}

      <Link href='/pricing'>
        <a className='btn btn-ghost btn-sm'>Pricing</a>
      </Link>

      <Link href='/contact'>
        <a className='btn btn-ghost btn-sm'>Contact</a>
      </Link>

      {props.user ? (
        <button
          className='btn btn-ghost btn-sm'
          onClick={() => supabase.auth.signOut()}>
          Logout
        </button>
      ) : (
        <Link href='/auth'>
          <a className='btn btn-primary btn-sm'>Login</a>
        </Link>
      )}
    </div>
  );

  return (
    <nav className='navbar mb-2 w-full px-5'>
      <Link href='/'>
        <a>
          <Image src={Logo} />
        </a>
      </Link>
      <div className='flex-1 px-2 mx-2'>
        <div className='hidden lg:flex text-center ml-auto'>{NavMenu}</div>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div tabIndex='0' className='m-1 cursor-pointer lg:hidden'>
            <Menu />
          </div>
          <div className='menu dropdown-content mt-3 text-center flex-1'>
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
