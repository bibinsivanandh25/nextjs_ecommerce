/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import { motion, AnimatePresence } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { Fade, Grid, Paper, Popper, Tooltip } from "@mui/material";
import Footer from "components/customer/Footer";
import { useRouter } from "next/router";
import {
  getAllMainCategories,
  getAllSetandSubCategoriesByMainCategory,
} from "services/customer/sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { BsFillPinAngleFill, BsPinFill } from "react-icons/bs";

const CustomerSideBarComponent = ({ children }) => {
  // const [showBreadCrumb, setShowBreadCrumb] = useState(true);
  const [customerMenu, setCustomerMenu] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [setsandSubCategoryData, setSetsandSubCategoryData] = useState([]);
  // const updatedChildren = { ...children };
  // updatedChildren.props = {
  //   ...children.props,
  //   showBreadCrumb: (val = true) => {
  //     setShowBreadCrumb(val);
  //   },
  // };
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [pin, setPin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setHover(true);
    setAnchorEl(event.target);
  };

  const getCategoriesForSideMenu = async () => {
    const { data } = await getAllMainCategories();
    let temp = [
      {
        id: 0,
        title: "Home",
        route: true,
      },
    ];
    if (data) {
      data?.forEach((ele) => {
        temp.push({
          id: ele.mainCategoryId,
          title: ele.mainCategoryName,
          route: false,
        });
      });
    }
    temp = [...temp.splice(0, 10)];
    temp.push({
      id: 0,
      title: "See All",
      route: true,
    });
    setCustomerMenu(temp);
  };

  const getSetandSubCategory = async () => {
    const { data } = await getAllSetandSubCategoriesByMainCategory(categoryId);
    if (data) {
      setSetsandSubCategoryData([...data]);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getSetandSubCategory();
    }
  }, [categoryId]);

  useEffect(() => {
    getCategoriesForSideMenu();
  }, []);

  const getPoperContent = () => {
    return (
      <Grid container columnSpacing={1}>
        {setsandSubCategoryData?.map((ele) => {
          return (
            <Grid item sm={3}>
              <Typography className="color-orange h-5 fw-bold my-1">
                {ele.setName}
              </Typography>
              <Box className="ps-2 h-5 d-flex flex-column">
                {ele.subCategoryList.map((subCat) => {
                  return (
                    <Typography className="h-5" key={subCat.subCategoryId}>
                      {subCat.subCategoryName}
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        minWidth: `calc(100vw - 5px)`,
        maxWidth: "100vw",
        position: "relative",
        top: "88px",
        display: "flex",
        height: `calc(100vh - 88px)`,
      }}
    >
      <CssBaseline />

      {!open && (
        <Paper
          sx={{
            marginTop: "5px",
            padding: "8px",
            borderRadius: "0% 50% 50% 0%",
            zIndex: "100",
          }}
          className="position-absolute cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FaAngleDoubleRight className="fs-20" />
        </Paper>
      )}
      <Box className="shadow position-fixed overflow-auto">
        <Box
          className="hide-scrollbar"
          sx={{
            maxHeight: `calc(100vh - 88px)`,
            minHeight: `calc(100vh - 88px)`,
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
          {/* <Box
            className={`d-flex ${
              open ? "justify-content-end" : "justify-content-center"
            }`}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: "none" }),
              }}
              className="mx-auto "
            >
              <MenuOpenOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                paddingBottom: 0,
                ...(!open && { display: "none" }),
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box> */}

          <Box className="overflow-y-scroll  hide-scrollbar mt-4 ">
            <List className="pb-1">
              {customerMenu.map((item, index) => {
                return (
                  <Box
                    onMouseEnter={() => {
                      setCustomerMenu((pre) => {
                        const setSelectedToFalse = (data) => {
                          data.forEach((element) => {
                            element.selected = false;
                          });
                          return data;
                        };
                        const temp = setSelectedToFalse(
                          JSON.parse(JSON.stringify([...pre]))
                        );
                        temp[index].selected = true;
                        return [...temp];
                      });
                    }}
                    key={item?.id}
                    disablePadding
                    sx={{
                      display: "block",
                    }}
                    className="cursor-pointer"
                    onMouseOver={(e) => {
                      if (e.target.role === "button")
                        handleClick(e, item.title);
                    }}
                    onMouseLeave={() => setHover(false)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: open ? 1.5 : 2.5,
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        // console.log(item.path_name);
                        // route.push(`${item.path_name}`);
                        setCustomerMenu((pre) => {
                          const setSelectedToFalse = (data) => {
                            data.forEach((element) => {
                              element.selected = false;
                            });
                            return data;
                          };
                          const temp = setSelectedToFalse(
                            JSON.parse(JSON.stringify([...pre]))
                          );
                          temp[index].selected = true;
                          return [...temp];
                        });
                      }}
                    >
                      {open ? (
                        <Tooltip title={item.title}>
                          <Typography
                            onMouseOver={() => {
                              if (item.id && item.id !== categoryId) {
                                setSetsandSubCategoryData([]);
                                setCategoryId(item.id);
                              }
                            }}
                            className="cursor-pointer text-truncate"
                            variant="text"
                            fontWeight={600}
                            fontSize={13}
                            color={item.selected && "#e56700"}
                          >
                            {item.title}
                          </Typography>
                        </Tooltip>
                      ) : null}
                    </ListItemButton>
                  </Box>
                );
              })}
            </List>
          </Box>
          <Box
            className="position-absolute bottom-0 w-100 d-flex justify-content-center p-2 border-top"
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
          maxWidth: ` ${open ? "calc(100vw - 226px)" : "calc(100vw - 20px)"}`,
          marginLeft: ` ${open ? "235px" : "10px"}`,
          transition: "all 0.2s ease-out",
          WebkitTransition: "all 0.2s ease-out",
        }}
        className=" overflow-auto  py-3 pb-0 hide-scrollbar w-100"
      >
        {/* {showBreadCrumb && (
          <Box className="mb-2">
            <BreadCrumb />
          </Box>
        )} */}
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.div
            sx={{
              maxHeight: "calc(100vh - 136px)",
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
                  maxHeight: 400,
                  overflow: "auto",
                  width: 800,
                }}
                className="hide-scrollbar"
              >
                {getPoperContent()}
              </Paper>
            </Fade>
          )}
        </Popper>
      ) : null}
    </Box>
  );
};
export default CustomerSideBarComponent;
