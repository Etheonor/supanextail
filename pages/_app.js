import "tailwindcss/tailwind.css";
import { Auth } from "@supabase/ui";
import { DefaultSeo } from "next-seo";
import { supabase } from "utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "",
            site_name: "supanextail",
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
