import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/width.scss";
import "../styles/global.scss";
import "../styles/colors.scss";
import "../styles/font.scss";
import Auth from "components/auth";
import ToastComponent from "components/molecule/toastcomponent";
import Layout from "../components/organism/Layout";
import Loading from "../components/organism/Loading";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith("/auth/")) {
    return (
      <>
        <ToastComponent />
        <Component pageProps={pageProps} />
      </>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ToastComponent />
      <Loading />
      <Auth>
        <Layout Component={Component} pageProps={pageProps} />
      </Auth>
    </SessionProvider>
  );
}

export default MyApp;
// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });
