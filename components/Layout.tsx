/* This is your Layout. It will wrap your content on every page of the website.
You'll have:
* The NavBar
* The Content, generally a component
* The Footer

You can change it as you want with new components. 

You also have the head component containing all the favicon for different platforms. 
The images are in the public folder.
*/

import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';
import Head from 'next/head';
import Nav from './Nav';
import { ToastContainer } from 'react-toastify';
import { useAuth } from 'utils/AuthContext';

type LayoutProperties = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProperties): JSX.Element => {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full min-h-screen m-auto bg-base-100 text-base-content font-body">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="flex flex-col min-h-screen p-5 mx-auto max-w-7xl">
        <Nav user={user} signOut={signOut} />
        <main className="flex-1">{children}</main>
        <ToastContainer position="bottom-center" />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
