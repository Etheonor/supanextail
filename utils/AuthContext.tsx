import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Session, UserCredentials } from '@supabase/gotrue-js';

import { supabase } from 'utils/supabaseClient';

type authContextType = {
  user: UserCredentials | undefined;
  session: Session | undefined;
  login: () => void;
  logout: () => void;
  signOut: () => void;
};

type Properties = {
  children: ReactNode;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  session: undefined,
  login: () => {},
  logout: () => {},
  signOut: () => {},
};

// create a context for authentication
const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthProvider = ({ children }: Properties): JSX.Element => {
  const [user, setUser] = useState(supabase.auth.session()?.user);
  const [session, setSession] = useState(supabase.auth.session());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user);
    setSession(session);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session): void => {
        if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') {
          void fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
          }).then((response) => response.json());
        }
        setUser(session?.user);
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data: UserCredentials) => supabase.auth.signUp(data),
    signIn: (data: UserCredentials) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    resetPassword: (data: string) =>
      supabase.auth.api.resetPasswordForEmail(data),
    user,
    session,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = (): authContextType => useContext(AuthContext);
