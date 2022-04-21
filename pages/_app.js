import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/width.scss";
import "../styles/global.scss";
import "../styles/colors.scss";
import "../styles/font.scss";
import dynamic from "next/dynamic";
import Layout from "../components/organism/Layout";
import Loading from "../components/organism/Loading";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith("/auth/")) {
    return <Component pageProps={pageProps} />;
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Loading />
      <Layout Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });
