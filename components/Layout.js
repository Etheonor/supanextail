/* This is your Layout. It will wrap your content on every page of the website.
You'll have:
* The NavBar
* The Content, generally a component
* The Footer

You can change it as you want with new components. 

You also have the head component containing all the favicon for different platforms. 
The images are in the public folder.
*/

import "react-toastify/dist/ReactToastify.css";

import { Auth } from "@supabase/ui";
import Footer from "./Footer";
import Head from "next/head";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";

const Layout = (props) => {
  const { user } = Auth.useUser();

  const toastStyle = {
    //Style your toast elements here
    success: "bg-secondary",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-primary",
    dark: "bg-white-600 font-gray-300",
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full bg-base-100 text-base-content'>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <Nav user={user} />
      <main className='flex flex-col items-center justify-center w-full flex-1 p-2 text-center font-body'>
        {props.children}
      </main>
      <ToastContainer
        position='bottom-center'
        toastClassName={({ type }) =>
          toastStyle[type || "default"] +
          " flex p-5 my-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer "
        }
      />
      <Footer />
    </div>
  );
};

export default Layout;
