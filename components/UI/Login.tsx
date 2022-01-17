import { ApiError, Session, UserCredentials } from '@supabase/gotrue-js';

import { IoLogoGoogle } from 'react-icons/io';
import router from 'next/router';
import { toast } from 'react-toastify';
import { useState } from 'react';

type LoginProperties = {
  resetPassword: (data: string) => Promise<{
    data: {} | null;
    error: ApiError | null;
  }>;

  signIn: (data: UserCredentials) => Promise<{
    user: Session['user'] | null;
    session: Session | null;
    error: ApiError | null;
  }>;
};

const Login = ({ resetPassword, signIn }: LoginProperties): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);

  const resetPasswordLogin = async (): Promise<void> => {
    const result = await resetPassword(email);

    if (result.error) {
      toast.error(result.error.message);
    } else if (result.data) {
      toast.success(
        'A password reset email has been sent to you, watch your mailbox!'
      );
    }
  };

  const login = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    // Handle the login. Go to the homepage if success or display an error.
    const result = await signIn({
      email,
      password,
    });

    if (result.error) {
      toast.error(result.error.message);
    } else if (result.user) {
      void router.push('/');
    }
  };

  return (
    <div className="max-w-sm p-10 rounded-md shadow-md md:flex-1 bg-base-100 text-base-content font-body">
      {!forgot && (
        <>
          <h3 className="my-4 text-2xl font-semibold font-title">
            Account Login
          </h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                className="input input-primary input-bordered input-sm"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <button
                  onClick={() => {
                    setForgot(true);
                  }}
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800">
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                className="input input-primary input-bordered input-sm"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div>
              <button
                className="w-full btn btn-primary"
                onClick={(event) => {
                  void login(event);
                }}>
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14" />
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14" />
              </span>
              <div className="flex flex-col space-y-4">
                <button
                  className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border rounded-md focus:outline-none border-base-200 group hover:bg-base-300"
                  onClick={(event) => {
                    event.preventDefault();
                    void signIn({ provider: 'google' });
                  }}>
                  <div className="text-base-content">
                    <IoLogoGoogle />
                  </div>
                  <span className="text-sm font-medium text-base-content">
                    Gmail
                  </span>
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {forgot && (
        <>
          <h3 className="my-4 text-2xl font-semibold">Password recovery</h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                className="input input-primary input-bordered input-sm"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div>
              <button
                className="w-full btn btn-primary btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  void resetPasswordLogin();
                }}>
                Recover my password
              </button>
            </div>
            <hr />
            <button
              onClick={() => {
                setForgot(false);
              }}
              className="text-sm text-blue-600 hover:underline focus:text-blue-800">
              Go back to sign in
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
