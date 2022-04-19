import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/width.scss";
import "../styles/global.scss";
import "../styles/colors.scss";
import "../styles/font.scss";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

// export default MyApp;
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
