import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useUserInfo } from "services/hooks";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
// import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import AddAddressModal from "@/forms/supplier/myaccount/addaddressmodal";
import HeaderComponent from "../HeaderComponent";
import SideBarComponent from "../SideBarComponent";
import CustomerSideBarComponent from "../CustomerSideBarComponent";
import Header from "../CustomerHeaderComponent";

const Layout = ({ Component, pageProps }) => {
  // const { data: session } = useSession();
  const route = useRouter();
  const user = useSelector((state) => state.user);
  const [showAddressModal, setShowAddressModal] = useState(false);
  // const userInfo = useUserInfo();
  // useEffect(() => {
  //   if (userInfo && !route.pathname.includes(userInfo?.role.toLowerCase())) {
  //     signOut();
  //   }
  // }, [userInfo]);
  useEffect(() => {
    if (user.isAddressSaved === 0) {
      setShowAddressModal(true);
    }
  }, []);
  return (
    <>
      <div className="mnh-100vh">
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
              {showAddressModal ? (
                <AddAddressModal
                  showAddressModal={showAddressModal}
                  type="add"
                  setShowAddAddressModal={setShowAddressModal}
                  showCloseIcon={false}
                  disableCancel
                  supplierId={user.supplierId}
                />
              ) : null}
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
