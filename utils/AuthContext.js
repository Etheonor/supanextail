import React, { createContext, useContext, useState } from "react";

import { supabase } from "utils/supabaseClient";

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // create state values for user data and loading
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // create signUp, signIn, signOut functions
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    resetPassword: (data) => supabase.auth.api.resetPasswordForEmail(data),
    user,
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
