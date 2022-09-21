/* eslint-disable @next/next/no-page-custom-font */
import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/width.scss";
import "../styles/global.scss";
import "../styles/colors.scss";
import "../styles/font.scss";
import { motion } from "framer-motion";
import Head from "next/head";
import { store, persistor } from "store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from "components/auth";
import { useEffect } from "react";
import ToastComponent from "components/molecule/toastcomponent";
import Layout from "../components/organism/Layout";
import Loading from "../components/organism/Loading";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    document.addEventListener("wheel", () => {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });

    // activate loader while routing
    router.events.on("routeChangeStart", () => {
      if (document.getElementById("loader"))
        document.getElementById("loader").classList.add("loadContainer");
    });
    router.events.on("routeChangeComplete", () => {
      if (document.getElementById("loader"))
        document.getElementById("loader").classList.remove("loadContainer");
    });
    router.events.on("routeChangeError", () => {
      if (document.getElementById("loader"))
        document.getElementById("loader").classList.remove("loadContainer");
    });
    return () => {
      router.events.off("routeChangeComplete", () => {
        document.getElementById("loader").classList.remove("loadContainer");
      });
      router.events.off("routeChangeError", () => {
        document.getElementById("loader").classList.remove("loadContainer");
      });
      router.events.off("routeChangeStart", () => {
        document.getElementById("loader").classList.add("loadContainer");
      });
    };
  }, []);

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
      fontFamily: `'Roboto', sans-serif`,
    },
  });
  return (
    <>
      <Head>
        <title> MrMrsCart </title>
      </Head>
      <Provider store={store}>
        <div id="loader" style={{ display: "none" }}>
          <div className="spinner" />
        </div>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });
