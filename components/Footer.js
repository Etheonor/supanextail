import Link from 'next/link';
import dynamic from 'next/dynamic';

const Footer = () => {
	const ThemeToggle = dynamic(() => import('components/UI/ThemeToggle.js'), {
		ssr: false,
	});
	return (
		<footer className="w-full flex">
			<nav className=" mr-auto">
				<div className="flex flex-col sm:flex-row justify-evenly w-full sm:space-x-10">
					<div className="">© {process.env.NEXT_PUBLIC_TITLE}</div>
					<Link href="/privacy">
						<a>Privacy Policy</a>
					</Link>
					<Link href="/terms">
						<a>Terms of service</a>
					</Link>
				</div>
			</nav>
			<div className="mr-5 my-auto">
				<ThemeToggle />
			</div>
		</footer>
	);
};

export default Footer;
