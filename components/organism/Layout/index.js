import React from "react";
// import { useSession } from "next-auth/react";
// import { useUserInfo } from "services/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
// import { signOut } from "next-auth/react";
import HeaderComponent from "../HeaderComponent";
import SideBarComponent from "../SideBarComponent";
import CustomerSideBarComponent from "../CustomerSideBarComponent";
import Header from "../CustomerHeaderComponent";

const Layout = ({ Component, pageProps }) => {
  // const { data: session } = useSession();
  const route = useRouter();
  // const userInfo = useUserInfo();
  // useEffect(() => {
  //   if (userInfo && !route.pathname.includes(userInfo?.role.toLowerCase())) {
  //     signOut();
  //   }
  // }, [userInfo]);
  return (
    <>
      <div className="mnh-100vh">
        <div id="loader" style={{ display: "none" }}>
          <div className="spinner" />
        </div>
        <div className="h-100">
          {route.pathname.startsWith("/supplier") ||
          route.pathname.startsWith("/reseller") ||
          route.pathname.startsWith("/admin") ||
          route.pathname[route.pathname.length - 1] === "/" ? (
            <HeaderComponent />
          ) : (
            <Header />
          )}
        </div>
        <Box className="mnw-100vw">
          {route.pathname.startsWith("/supplier") ||
          route.pathname.startsWith("/reseller") ||
          route.pathname.startsWith("/admin") ||
          route.pathname[route.pathname.length - 1] === "/" ? (
            <SideBarComponent>
              <Component {...pageProps} />
            </SideBarComponent>
          ) : (
            <CustomerSideBarComponent>
              <Component {...pageProps} />
            </CustomerSideBarComponent>
          )}
        </Box>
      </div>
    </>
  );
};

export default Layout;
