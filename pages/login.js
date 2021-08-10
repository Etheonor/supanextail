/*
This is the login/register page. 
You have 2 components, the "AuthComponent" that handle the logic, 
and the "AuthText" that will show the description on the left of the screen
*/

import Layout from 'components/Layout';
import Login from 'components/UI/Login';
import { NextSeo } from 'next-seo';
import { useAuth } from 'utils/AuthContext';

const LoginPage = () => {
	const { signUp, signIn, signOut, resetPassword } = useAuth();
	return (
		<>
			<NextSeo
				title={`${process.env.NEXT_PUBLIC_TITLE} | Auth`}
				description={`This is the auth page for ${process.env.NEXT_PUBLIC_TITLE}`}
			/>

			<Layout>
				<div className="flex flex-wrap justify-evenly w-full mt-20">
					<Login signUp={signUp} signIn={signIn} signOut={signOut} resetPassword={resetPassword} />
				</div>
			</Layout>
		</>
	);
};

export default LoginPage;
