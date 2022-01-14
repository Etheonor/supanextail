/*
This is the Auth component. It will allow your user to login. 
By default, it is available with the auth.js page, but you can use it everywhere you want!

CONFIGURE THE AUTH COMPONENT LINE 30
You can select your auth providers, or just keep the email/password. You can
check the providers available here: https://supabase.io/docs/guides/auth
*/

import SignUpPanel from './UI/SignUpPanel';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from 'utils/supabaseClient';
import { useAuth } from 'utils/AuthContext';

type ContainerProperties = {
  children: JSX.Element;
  supabaseClient: SupabaseClient;
};

const Container = ({ children }: ContainerProperties): JSX.Element => {
  const { user, signOut } = useAuth();
  if (user)
    return (
      <div className="order-first w-80 md:w-96 lg:order-last">
        <p>Hello {user.email}! 👋 You are already logged in</p>
        <button className="btn btn-primary" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  return children;
};

const AuthComponent = (): JSX.Element => {
  const { signUp, signIn } = useAuth();
  return (
    <Container supabaseClient={supabase}>
      <SignUpPanel signUp={signUp} signIn={signIn} />
    </Container>
  );
};

export default AuthComponent;
