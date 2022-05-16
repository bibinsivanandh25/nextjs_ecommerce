import React from "react";
import Head from "next/head";
import HeaderComponent from "../HeaderComponent";
import SupplierSidebar from "../SupplierSidebar";
import BreadCrumb from "components/atoms/BreadCrumb";
import ResellerSidebar from "../ResellerSidebar";

const Layout = ({ Component, pageProps }) => {
  const moduleType = JSON.parse(window.localStorage.getItem("moduleType"));

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
        {moduleType?.moduleId === 0 && (
          <SupplierSidebar>
            <BreadCrumb />
            <div className="mx-1 mt-2 p-3 mnh-80vh">
              <Component {...pageProps} />
            </div>
          </SupplierSidebar>
        )}
        {moduleType?.moduleId === 1 && (
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
