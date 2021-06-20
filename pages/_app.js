import "tailwindcss/tailwind.css";
import { Auth } from "@supabase/ui";
import { DefaultSeo } from "next-seo";
import { supabase } from "utils/supabaseClient";

/* 
Next-seo is integrated by default, if you want more information and how to
setup more elements, visit their Github page https://github.com/garmeeh/next-seo
*/

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "",
            site_name: "Supanextail",
          }}
          twitter={{
            handle: "@michael_webdev",
            site: "@michael_webdev",
          }}
        />
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </>
  );
}

export default MyApp;
