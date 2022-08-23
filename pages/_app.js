/* eslint-disable @next/next/no-page-custom-font */
import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/width.scss";
import "../styles/global.scss";
import "../styles/colors.scss";
import "../styles/font.scss";
import { motion } from "framer-motion";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from "components/auth";
import ToastComponent from "components/molecule/toastcomponent";
import Layout from "../components/organism/Layout";
import Loading from "../components/organism/Loading";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, router }) {
  const renderPages = () => {
    if (router.pathname.startsWith("/auth/")) {
      return (
        <>
          <ToastComponent />
          <Component pageProps={pageProps} />
        </>
      );
    }
    if (router.pathname === "/" || router.pathname.startsWith("/customer")) {
      return (
        <SessionProvider session={pageProps.session}>
          <ToastComponent />
          <Loading />
          <Layout Component={Component} pageProps={pageProps} />
        </SessionProvider>
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
  };
  const theme = createTheme({
    typography: {
      fontFamily: ["Open Sans"].join(","),
    },
  });
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          damping: 20,
        }}
        exit={{ opacity: 0 }}
      >
        <ThemeProvider theme={theme}>{renderPages()}</ThemeProvider>
      </motion.div>
    </>
  );
}

export default MyApp;
// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });
