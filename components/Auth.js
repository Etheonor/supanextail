import { Auth } from "@supabase/ui";
import { supabase } from "utils/supabaseClient";

// Create a single supabase client for interacting with your database

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
      <p>Hello {user.email}! 👋 You are already logged in</p>
        <button className="btn btn-primary" onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </button>
      </>
    );
  return props.children;
};

export default function AuthComponent() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
}
