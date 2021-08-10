/*
This is the login/register page. 
You have 2 components, the "AuthComponent" that handle the logic, 
and the "AuthText" that will show the description on the left of the screen
*/

import AuthComponent from 'components/SignUp';
import AuthText from 'components/AuthText';
import Layout from 'components/Layout';
import { NextSeo } from 'next-seo';

const SignUpPage = () => (
	<>
		<NextSeo
			title={`${process.env.NEXT_PUBLIC_TITLE} | Auth`}
			description={`This is the auth page for ${process.env.NEXT_PUBLIC_TITLE}`}
		/>

		<Layout>
			<div className="flex flex-wrap justify-evenly w-full mt-20">
				<AuthText />
				<AuthComponent />
			</div>
		</Layout>
	</>
);

export default SignUpPage;
