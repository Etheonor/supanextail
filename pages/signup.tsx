/*
This is the login/register page. 
You have 2 components, the "AuthComponent" that handle the logic, 
and the "AuthText" that will show the description on the left of the screen
*/

import AuthComponent from 'components/sign-up'
import AuthText from 'components/auth-text'
import Layout from 'components/layout'
import { NextSeo } from 'next-seo'

const SignUpPage = (): JSX.Element => (
  <>
    <NextSeo
      title={`${process.env.NEXT_PUBLIC_TITLE} | Auth`}
      description={`This is the auth page for ${process.env.NEXT_PUBLIC_TITLE}`}
    />

    <Layout>
      <div className="flex flex-wrap w-full mt-20 justify-evenly">
        <AuthText />
        <AuthComponent />
      </div>
    </Layout>
  </>
)

export default SignUpPage
