import Nav from "./Nav";
import Footer from "./Footer";
import { Auth } from "@supabase/ui";
import Head from "next/head";

const Layout = (props) => {
  const { user } = Auth.useUser();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-6xl m-auto'>
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
      <main className='flex flex-col items-center justify-center w-full flex-1 p-2 text-center'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
