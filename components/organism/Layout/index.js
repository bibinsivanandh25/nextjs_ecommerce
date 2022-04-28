import React from "react";
import Head from "next/head";
import HeaderComponent from "../HeaderComponent";
import SupplierSidebar from "../SupplierSidebar";
import BreadCrumb from "components/atoms/BreadCrumb";
import { Paper } from "@mui/material";

const Layout = ({ Component, pageProps }) => {
  //   if (noLayout) return <Component {...pageProps} className="mxh-80vh" />;

  return (
    <>
      <Head>
        <title> MrMrsCart </title>
        <meta name="description" content="MrMrsCart project" />
        <link rel="icon" href="/assets/logo.jpeg" />
      </Head>
      <div>
        <div id="loader" style={{ display: "none" }}>
          <div className="spinner"></div>
        </div>
        <HeaderComponent />
        <SupplierSidebar>
          <BreadCrumb />
          <Paper
            sx={{
              maxHeight: "80vh",
              height: "100%",
              p: 3,
              mx: 1,
              mt: 2,
              overflowY: "auto",
            }}
          >
            <Component {...pageProps} />
          </Paper>
        </SupplierSidebar>
      </div>
    </>
  );
};

export default Layout;