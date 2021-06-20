/*
This is the Auth component. It will allow your user to login. 
By default, it is available with the auth.js page, but you can use it everywhere you want!
*/
import { Auth } from "@supabase/ui";
import { supabase } from "utils/supabaseClient";

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <p>Hello {user.email}! 👋 You are already logged in</p>
        <button
          className='btn btn-primary'
          onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </button>
      </>
    );
  return props.children;
};

const AuthComponent = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
};

export default AuthComponent;
