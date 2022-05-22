import React from "react";
import Head from "next/head";
import HeaderComponent from "../HeaderComponent";
import BreadCrumb from "components/atoms/BreadCrumb";
import ResellerSidebar from "../ResellerSidebar";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import SideBarComponent from "../SideBarComponent";

const Layout = ({ Component, pageProps }) => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title> MrMrsCart </title>
        <meta name="description" content="MrMrsCart project" />
        <link rel="icon" href="/assets/logo.jpeg" />
      </Head>
      <div className="mnh-100vh">
        <div id="loader" style={{ display: "none" }}>
          <div className="spinner"></div>
        </div>
        <div className="h-100">
          <HeaderComponent />
        </div>
        <Box className="mnw-100hw">
          <SideBarComponent>
            <Box className="w-100 h-100 p-2 pb-1">
              <Component {...pageProps} />
            </Box>
          </SideBarComponent>
        </Box>
      </div>
    </>
  );
};

export default Layout;
