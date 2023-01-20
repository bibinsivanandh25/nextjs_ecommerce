/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Fade, Paper, Popper } from "@mui/material";
import Footer from "components/customer/Footer";
import { useRouter } from "next/router";
import {
  getAllMainCategories,
  // getAllSetandSubCategoriesByMainCategory,
} from "services/customer/sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { BsFillPinAngleFill, BsPinFill } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";

const CustomerSideBarComponent = ({ children }) => {
  const [customerMenu, setCustomerMenu] = useState([]);
  const [category, setCategory] = useState(null);
  const [setsandSubCategoryData, setSetsandSubCategoryData] = useState([]);
  const [open, setOpen] = useState(false);

  const updatedChildren = { ...children };
  updatedChildren.props = {
    ...children.props,
    isSideBarOpen: open,
  };
  const router = useRouter();

  const { supplierId } = useSelector((state) => state?.customer);
  const [hover, setHover] = useState(false);
  const [pin, setPin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current.scrollIntoView();
  }, [mainRef]);

  const handleClick = (event) => {
    setHover(true);
    setAnchorEl(event.target);
  };

  const getCategoriesForSideMenu = async () => {
    const { data } = await getAllMainCategories(supplierId);
    const temp = [
      {
        id: 0,
        title: "Home",
        route: true,
      },
    ];
    if (data) {
      const dataCopy = JSON.parse(JSON.stringify(data.splice(0, 20)));
      dataCopy?.forEach((ele) => {
        temp.push({
          id: ele.id,
          title: ele.name,
          route: false,
        });
      });
    }
    // temp = [...temp.splice(0, 10)];
    temp.push({
      id: 0,
      title: "See All",
      route: true,
    });
    setCustomerMenu(temp);
  };

  const getSetandSubCategory = async (e, item) => {
    handleClick(e, item.title);
    const { data } = await axios.get(
      `${process.env.DOMAIN}products/main-category/set/sub-category/${item.id}`
    );
    if (data) {
      setCategory(item);
      // setSetsandSubCategoryData([...data.data]);
      const temp = [];
      data.data.forEach((ele) => {
        temp.push({
          label: ele.setName,
          id: ele.categorySetId,
          isSet: true,
        });
        ele.subCategoryList.forEach((el) => {
          temp.push({
            label: el.subCategoryName,
            id: el.subCategoryId,
            isSet: false,
          });
        });
      });
      setSetsandSubCategoryData([...temp]);
    }
  };
  const createlist = () => {
    const colCount = Math.ceil(setsandSubCategoryData.length / 10);
    return (
      <ul
        style={{
          columns: colCount,
          height: "200px",
          maxWidth: "450px",
          overflowX: "auto",
          columnWidth: "100px",
        }}
      >
        {setsandSubCategoryData?.map((ele) => {
          return (
            <li
              // style={{
              //   columnSpan: "all",
              // }}
              style={{ width: "125px" }}
              className={`d-block p-1 fs-14 text-truncate ${
                ele.isSet ? "color-orange" : ""
              }`}
              key={ele.label}
              onClick={() => {
                if (!ele.isSet) {
                  router.push({
                    pathname: "/customer/productvariation",
                    query: {
                      subCategoryId: ele?.id,
                    },
                  });
                  setHover(false);
                }
              }}
            >
              {ele.label}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    getCategoriesForSideMenu();
  }, []);

  return (
    <Box
      sx={{
        minWidth: `calc(100vw - 5px)`,
        maxWidth: "100vw",
        position: "relative",
        top: "88px",
        display: "flex",
        height: `calc(100vh - 90px)`,
      }}
      ref={mainRef}
    >
      <CssBaseline />

      {!open && (
        <Paper
          sx={{
            marginTop: "5px",
            padding: "8px",
            borderRadius: "0% 50% 50% 0%",
            zIndex: "100",
            background: "transparent",
          }}
          className="position-absolute cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FaAngleDoubleRight className="fs-15 bg-transparent" />
        </Paper>
      )}
      <Box className="shadow position-fixed overflow-auto">
        <Box
          className="hide-scrollbar"
          sx={{
            maxHeight: `calc(100vh - 90px)`,
            minHeight: `calc(100vh - 90px)`,
            maxWidth: open ? "225px" : "0px",
            minWidth: open ? "195px" : "0px",
            overflow: "auto",
          }}
        >
          <Box className=" position-relative d-flex justify-content-end bg-info">
            <Box className={` position-absolute rounded-circle cursor-pointer`}>
              <FaAngleDoubleLeft
                className="fs-20 m-2"
                onClick={() => {
                  if (pin) return;
                  setOpen(false);
                }}
              />
            </Box>
          </Box>
          <Box
            className="overflow-y-scroll  hide-scrollbar mt-4 "
            sx={{ height: "calc(100vh - 155px)" }}
          >
            {customerMenu.map((item) => {
              return (
                <Box className="p-2 pe-0" key={item.title}>
                  <Box
                    className="w-100 ps-3 text-truncate pe-2"
                    sx={{
                      width: "200px",
                    }}
                    onMouseEnter={(e) => {
                      if (e.target.id === category?.id) {
                        setSetsandSubCategoryData([]);
                      }
                      if (e.target.id === item.id) {
                        getSetandSubCategory(e, item);
                      }
                    }}
                    id={item.id}
                  >
                    {/* <Tooltip title={item.title}> */}
                    <Typography
                      className="cursor-pointer"
                      variant="text"
                      fontWeight={600}
                      fontSize={13}
                      color={item.selected && "#e56700"}
                    >
                      {item.title}
                    </Typography>
                    {/* </Tooltip> */}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            className="position-absolute bottom-0 w-100 d-flex justify-content-center p-2 border-top bg-light"
            onClick={() => {
              setPin(!pin);
            }}
          >
            <Typography className={`${pin ? "color-light-blue" : ""} fs-14`}>
              {pin ? <BsPinFill /> : <BsFillPinAngleFill />}
              Pin Menu
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          maxWidth: ` ${open ? "calc(100vw - 216px)" : "calc(100vw - 5px)"}`,
          marginLeft: ` ${open ? "225px" : "0px"}`,
          transition: "all 0.2s ease-out",
          WebkitTransition: "all 0.2s ease-out",
        }}
        className=" overflow-auto  py-3 pb-0 hide-scrollbar w-100"
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.div
            sx={{
              maxHeight: "calc(100vh - 90px)",
              overflowY: "scroll",
              background: "red",
            }}
            className="hide-scrollbar "
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{
              damping: 30,
            }}
            key={router.route}
          >
            {/* {children} */}
            {updatedChildren}
            <Footer />
          </motion.div>
        </AnimatePresence>
      </Box>
      {setsandSubCategoryData?.length ? (
        <Popper
          open={hover}
          anchorEl={anchorEl}
          placement="right-start"
          transition
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            zIndex: 1000,
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  p: 2,
                  maxHeight: "380px",
                  overflow: "auto",
                  maxWidth: "800px",
                  minWidth: "800px",
                }}
                className="hide-scrollbar"
              >
                <Typography className="color-orange fs-16">
                  {category?.title}
                </Typography>
                {/* {getPoperContent()} */}
                {createlist()}
              </Paper>
            </Fade>
          )}
        </Popper>
      ) : null}
    </Box>
  );
};
export default CustomerSideBarComponent;
