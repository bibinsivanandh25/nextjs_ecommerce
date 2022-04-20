import React, { useEffect, useState } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeaderComponent from "../HeaderComponent";
import SupplierSidebar from "../SupplierSidebar";

const Layout = ({ Component, pageProps }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const noLayout = status !== "authenticated";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoginTrue, setisLoginTrue] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      //   router.push("/auth/login");
    }
  }, [session]);

  //   if (noLayout) return <Component {...pageProps} className="mxh-80vh" />;

  return (
    <>
      <div id="loader" style={{ display: "none" }}>
        <div className="spinner"></div>
      </div>
      <div id="toastContainer" style={{ display: "none" }}></div>
      <Head>
        <title> Panda </title>
        <meta name="description" content="Panda project" />
        <link rel="icon" href="/logo1.ico" />
      </Head>
      <div>
        {/* {!isLoginTrue && <HeaderComponent />} */}
        <HeaderComponent />
        <SupplierSidebar>
          <Component {...pageProps} className="mxh-80vh" />
        </SupplierSidebar>
      </div>
    </>
  );
};

export default Layout;
