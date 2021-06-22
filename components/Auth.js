/*
This is the Auth component. It will allow your user to login. 
By default, it is available with the auth.js page, but you can use it everywhere you want!

CONFIGURE THE AUTH COMPONENT LINE 30
You can select your auth providers, or just keep the email/password. You can
check the providers available here: https://supabase.io/docs/guides/auth
*/
import { Auth } from "@supabase/ui";
import { supabase } from "utils/supabaseClient";

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <div className='w-80 md:w-96 order-first lg:order-last'>
        <p>Hello {user.email}! 👋 You are already logged in</p>
        <button
          className='btn btn-primary'
          onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </button>
      </div>
    );
  return props.children;
};

const AuthComponent = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          socialLayout='horizontal'
          socialButtonSize='xlarge'
          socialColors={true}
          className='p-5 bg-neutral-content rounded-md'
        />
      </Container>
    </Auth.UserContextProvider>
  );
};

export default AuthComponent;
