import Nav from "./Nav";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-6xl m-auto'>
      <Nav />
      <main className='flex flex-col items-center justify-center w-full flex-1 px-2 text-center'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
