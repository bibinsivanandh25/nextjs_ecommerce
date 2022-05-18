import React from "react";
import Head from "next/head";
import HeaderComponent from "../HeaderComponent";
import SupplierSidebar from "../SupplierSidebar";
import BreadCrumb from "components/atoms/BreadCrumb";
import ResellerSidebar from "../ResellerSidebar";
import { useSession } from "next-auth/react";

const Layout = ({ Component, pageProps }) => {
  const { data: session } = useSession();
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
        <div className="stickyHeader">
          <HeaderComponent />
        </div>
        {session?.user.roleId == 0 && (
          <SupplierSidebar>
            <BreadCrumb />
            <div className="mx-1 mt-2 p-3 mnh-80vh">
              <Component {...pageProps} />
            </div>
          </SupplierSidebar>
        )}
        {session?.user.roleId == 1 && (
          <ResellerSidebar>
            <BreadCrumb />
            <div className="mx-1 mt-2 p-3 mnh-80vh">
              <Component {...pageProps} />
            </div>
          </ResellerSidebar>
        )}
      </div>
    </>
  );
};

export default Layout;
