/*
This is your Nav component. It contain a responsive navbar 
*/

import { LogOut, Menu } from 'react-feather';

import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/logo.svg';

type NavProps = {
	user: Record<string, unknown>;
	signOut: () => void;
};

const Nav = ({ user, signOut }: NavProps): JSX.Element => {
	// Modify you menu directly here
	const NavMenu = (
		<>
			{user && (
				<Link href="/dashboard">
					<a className="nav-btn">Dashboard</a>
				</Link>
			)}

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
				<button className="btn btn-xs text-xs" onClick={() => signOut()}>
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
						<a id="signup" className="btn btn-sm btn-primary font-body normal-case font-normal">
							Sign Up
						</a>
					</Link>
				</>
			)}
		</>
	);

	return (
		<nav className="navbar mb-2 w-full">
			<Link href="/">
				<a>
					<Image src={Logo} alt="SupaNexTail Logo" />
				</a>
			</Link>

			<div className="hidden lg:flex text-center flex-col lg:flex-row lg:space-x-10 font-body text-sm ml-auto">
				{NavMenu}
			</div>
			<div className="ml-auto lg:hidden">
				<div className="dropdown dropdown-end" data-cy="dropdown">
					<div tabIndex={0} className="m-1 cursor-pointer">
						<Menu />
					</div>
					<div className="menu dropdown-content mt-3 text-center space-y-3 w-24">{NavMenu}</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
