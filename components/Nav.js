import { Menu } from "react-feather";
import Link from "next/link";
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
  const NavMenu = (
    <>
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>Home</a>
      </Link>
      {props.user && (
        <Link href='/dashboard'>
          <a className='btn btn-ghost btn-sm'>Dashboard</a>
        </Link>
      )}
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>About</a>
      </Link>
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>Contact</a>
      </Link>
      {props.user ? (
        <button
          className='btn btn-primary btn-sm ml-auto'
          onClick={() => supabase.auth.signOut()}>
          Log out
        </button>
      ) : (
        <Link href='/auth'>
          <a className='btn btn-ghost btn-sm ml-auto'>Login</a>
        </Link>
      )}
    </>
  );

  return (
    <nav className='navbar mb-2 shadow-lg bg-neutral text-neutral-content w-full'>
      <div className='flex-1 px-2 mx-2'>
        <div className='items-stretch hidden lg:flex w-full'>{NavMenu}</div>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div tabindex='0' className='m-1 block cursor-pointer lg:hidden'>
            <Menu />
          </div>
          <div className='shadow menu dropdown-content text-black w-52 btn-group mt-3'>
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
