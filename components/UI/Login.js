import { IoLogoGoogle } from "react-icons/io";
import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);

  return (
    <div className='p-10 bg-base-100 md:flex-1 rounded-md text-base-content shadow-md'>
      {!forgot && (
        <>
          <h3 className='my-4 text-2xl font-semibold'>Account Login</h3>
          <form action='#' className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-gray-500'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                autoFocus
                className='input input-primary input-bordered input-sm'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='text-sm font-semibold text-gray-500'>
                  Password
                </label>
                <button
                  onClick={() => {
                    setForgot(true);
                  }}
                  className='text-sm text-blue-600 hover:underline focus:text-blue-800'>
                  Forgot Password?
                </button>
              </div>
              <input
                type='password'
                id='password'
                className='input input-primary input-bordered input-sm'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div>
              <button
                className='btn btn-primary w-full'
                onClick={(event) => {
                  event.preventDefault();
                  props.signIn({ email: email, password: password });
                }}>
                Log in
              </button>
            </div>
            <div className='flex flex-col space-y-5'>
              <span className='flex items-center justify-center space-x-2'>
                <span className='h-px bg-gray-400 w-14'></span>
                <span className='font-normal text-gray-500'>or login with</span>
                <span className='h-px bg-gray-400 w-14'></span>
              </span>
              <div className='flex flex-col space-y-4'>
                <button
                  href='#'
                  className='flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none '
                  onClick={(event) => {
                    event.preventDefault();
                    props.signIn({ provider: "google" });
                  }}>
                  <div className='text-base-content group-hover:text-white'>
                    <IoLogoGoogle />
                  </div>
                  <span className='text-sm font-medium text-gray-800 group-hover:text-white'>
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
          <h3 className='my-4 text-2xl font-semibold'>Password recovery</h3>
          <form action='#' className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-gray-500'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                autoFocus
                className='input input-primary input-bordered input-sm'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div>
              <button
                className='btn btn-primary w-full'
                onClick={(event) => {
                  event.preventDefault();
                  props.resetPassword(email);
                }}>
                Recover my password
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
