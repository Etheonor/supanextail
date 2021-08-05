/*
This is your Nav component. It contain a responsive navbar 
*/

import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.svg";
import { Menu } from "react-feather";

const Nav = (props) => {
  //Modify you menu directly here
  const NavMenu = (
    <div className='flex flex-col lg:flex-row lg:space-x-10 lg:m-auto font-body text-sm'>
      {props.user && (
        <Link href='/dashboard'>
          <a className='nav-btn'>Dashboard</a>
        </Link>
      )}

      <Link href='/pricing'>
        <a className='nav-btn'>Pricing</a>
      </Link>

      <Link href='/contact'>
        <a className='nav-btn'>Contact Us</a>
      </Link>

      {props.user ? (
        <button
          className='btn btn-ghost btn-sm'
          onClick={() => props.signOut()}>
          Logout
        </button>
      ) : (
        <Link href='/auth'>
          <a className='btn btn-primary btn-sm rounded-3xl font-body normal-case font-normal'>
            Login
          </a>
        </Link>
      )}
    </div>
  );

  return (
    <nav className='navbar mb-2 w-full'>
      <Link href='/'>
        <a>
          <Image src={Logo} />
        </a>
      </Link>
      <div className='flex-1 px-2 mx-2'>
        <div className='hidden lg:flex text-center ml-auto'>{NavMenu}</div>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end' data-cy='dropdown'>
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
