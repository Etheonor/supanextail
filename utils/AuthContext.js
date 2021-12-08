import React, { createContext, useContext, useEffect, useState } from 'react'

import { supabase } from 'utils/supabase-client'

// create a context for authentication
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [session, setSession] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    setSession(session ?? null)
    setLoading(false)

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === 'SIGNED_OUT') | (event === 'SIGNED_IN')) {
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
          }).then((res) => res.json())
        }
        if (event === 'USER_UPDATED') {
        }
        setUser(session?.user ?? null)
        setSession(session ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    resetPassword: (data) => supabase.auth.api.resetPasswordForEmail(data),
    user,
    session,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// export the useAuth hook
export const useAuth = () => useContext(AuthContext)
