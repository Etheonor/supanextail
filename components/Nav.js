import { Menu } from "react-feather";
import Link from "next/link";
const Nav = () => {
  const NavMenu = (
    <>
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>Home</a>
      </Link>
      <Link href='/dashboard'>
        <a className='btn btn-ghost btn-sm'>Dashboard</a>
      </Link>
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>About</a>
      </Link>
      <Link href='/'>
        <a className='btn btn-ghost btn-sm'>Contact</a>
      </Link>
    </>
  );

  return (
    <nav className='navbar mb-2 shadow-lg bg-neutral text-neutral-content w-full'>
      <div className='flex-1 px-2 mx-2'>
        <div className='items-stretch hidden lg:flex'>{NavMenu}</div>
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
