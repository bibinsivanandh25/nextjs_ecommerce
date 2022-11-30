/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import BreadCrumb from "components/atoms/BreadCrumb";
import { useSelector } from "react-redux";
import FallbackComponent from "@/atoms/FallbackComponent";
import SideDrawer from "@/atoms/SideDrawer";
import DrawerComponent from "./DrawerComponent";

const SideBarComponent = ({ children }) => {
  const route = useRouter();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { allowedPath, role } = useSelector((state) => state.user);
  const [showFallBack, setShowFallBack] = useState(false);
  const constraintsRef = useRef(null);
  useEffect(() => {
    if (allowedPath) {
      setShowFallBack(!allowedPath.includes(route.asPath.split("?")[0]));
    }
  }, [route.pathname, allowedPath]);

  return (
    <Box
      sx={{
        minWidth: `calc(100vw - 5px)`,
        maxWidth: "100vw",
        position: "relative",
        top:
          route.pathname.startsWith("/reseller") ||
          route.pathname.startsWith("/supplier") ||
          route.pathname.startsWith("/admin") ||
          route.pathname[route.pathname.length - 1] === "/"
            ? "60px"
            : "80px",
        display: "flex",
      }}
    >
      <CssBaseline />
      <DrawerComponent open={open} setOpen={setOpen} />
      <Box
        id="main-layout"
        tabIndex={0}
        ref={constraintsRef}
        // component="main"
        sx={{
          maxWidth: ` ${open ? "calc(100vw - 245px)" : "calc(100vw - 60px)"}`,
          marginLeft: ` ${open ? "245px" : "60px"}`,
          transition: "all 0.2s ease-out",
          WebkitTransition: "all 0.2s ease-out",
          minHeight: "calc(100vh - 60px)",
          outline: "none",
        }}
        className={`${showFallBack ? "" : "p-3 pt-2"} w-100 body-bg`}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.keyCode === 39) {
            e.preventDefault();
            setOpen(true);
          } else if (e.ctrlKey && e.keyCode === 37) {
            e.preventDefault();
            setOpen(false);
          }
        }}
      >
        {["SUPPLIER", "STAFF"].includes(role) && (
          <SideDrawer ref={constraintsRef} />
        )}
        {showFallBack ? (
          <div
            style={{
              maxHeight: route.pathname.startsWith("/admin")
                ? "calc(100vh - 60px)"
                : "calc(100vh - 130px)",
              overflowY: "scroll",
            }}
            className="hide-scrollbar "
          >
            <FallbackComponent />
          </div>
        ) : (
          <>
            <Box
              className={`mb-2 ${
                route.pathname.startsWith("/admin") ? "d-none" : ""
              }`}
            >
              <BreadCrumb />
            </Box>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                sx={{
                  maxHeight: route.pathname.startsWith("/admin")
                    ? "calc(100vh - 95px)"
                    : "calc(100vh - 130px)",
                  overflowY: "scroll",
                }}
                className="hide-scrollbar "
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{
                  damping: 30,
                }}
                key={router.route}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </Box>
    </Box>
  );
};
export default SideBarComponent;
