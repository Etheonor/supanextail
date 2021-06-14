import Nav from "./Nav";
import Footer from "./Footer";
import { Auth } from "@supabase/ui";

const Layout = (props) => {
  const { user } = Auth.useUser();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-6xl m-auto'>
      <Nav user={user}/>
      <main className='flex flex-col items-center justify-center w-full flex-1 p-2 text-center'>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
