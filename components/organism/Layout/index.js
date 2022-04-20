import React, { useEffect, useState } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderComponent from "../HeaderComponent";
import SupplierSidebar from "../SupplierSidebar";
import BreadCrumb from "components/atoms/BreadCrumb";
import { Paper } from "@mui/material";

const Layout = ({ Component, pageProps }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const noLayout = status !== "authenticated";

  useEffect(() => {
    if (status !== "authenticated") {
      //   router.push("/auth/login");
    }
  }, [session]);

  //   if (noLayout) return <Component {...pageProps} className="mxh-80vh" />;

  return (
    <>
      <Head>
        <title> MrMrsCart </title>
        <meta name="description" content="MrMrsCart project" />
        <link rel="icon" href="/assets/logo.jpeg" />
      </Head>
      <div>
        {/* {!isLoginTrue && <HeaderComponent />} */}
        <HeaderComponent />
        <SupplierSidebar>
          <BreadCrumb />
          <Paper sx={{ maxHeight: "80vh", height: "100%", p: 3, mx: 1, mt: 2 }}>
            <Component {...pageProps} />
          </Paper>
        </SupplierSidebar>
      </div>
    </>
  );
};

export default Layout;
