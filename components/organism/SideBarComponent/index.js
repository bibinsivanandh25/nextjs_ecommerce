/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { motion, AnimatePresence } from "framer-motion";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { resellerMenu } from "constants/navConstants";
import { MenuItem, MenuList, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import BreadCrumb from "components/atoms/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getNavBarItems, getmarketingToolStatus } from "services/supplier";
import CustomIcon from "services/iconUtils";
import { updateUnlockedTools } from "features/userSlice";

const drawerWidth = 245;

const SideBarComponent = ({ children }) => {
  const route = useRouter();
  const [supplierMenu, setSupplierMenu] = useState([]);
  const dispatch = useDispatch();

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    position: "fixed",
    top:
      route.pathname.startsWith("/reseller") ||
      route.pathname.startsWith("/supplier") ||
      route.pathname.startsWith("/admin") ||
      route.pathname[route.pathname.length - 1] === "/"
        ? "60px"
        : "80px",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    position: "fixed",
    top:
      route.pathname.startsWith("/reseller") ||
      route.pathname.startsWith("/supplier") ||
      route.pathname.startsWith("/admin") ||
      route.pathname[route.pathname.length - 1] === "/"
        ? "60px"
        : "80px",
  });
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  const getBasePath = (role) => {
    switch (role) {
      case "SUPPLIER":
        return "supplier";
      case "STAFF":
        return "supplier";
      case "RESELLER":
        return "reseller";
      default:
        return "customer";
    }
  };
  const getInitialSelection = (list) => {
    const paths = route.pathname.split("/");
    paths.shift();
    paths.shift();
    const temp = JSON.parse(JSON.stringify(list));
    const selectPath = (data, ind) => {
      return JSON.parse(JSON.stringify(data)).map((ele) => {
        if (ele.pathName.split("/").includes(paths[ind])) {
          ele.selected = true;
          if (ele?.child?.length && paths.length - 1 > ind) {
            ele.child = [...selectPath(ele.child, ind + 1)];
          }
        } else {
          ele.selected = false;
        }
        return ele;
      });
    };
    const tempList = selectPath(temp, 0);
    return JSON.parse(JSON.stringify(tempList));
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const itemRef = React.useRef(null);
  const user = useSelector((state) => state.user);
  // const [marketingToolsList, setmarketingToolsList] = useState([]);
  const marketingToolsList = user.unlockedTools;
  const [staffCapabilityList, setstaffCapabilityList] = useState([]);
  const getCapability = (data) => {
    const temp = [];
    data.forEach((item) => {
      if (item?.childCapabilityNameList?.length) {
        temp.push(...getCapability(item.childCapabilityNameList));
      } else if (item.isEnable) {
        temp.push(item.capabilityType);
      }
    });
    return temp;
  };
  useEffect(() => {
    if (user.role === "STAFF") {
      setstaffCapabilityList(
        getCapability([...user.staffDetails.staffCapabilityList])
      );
    }
  }, [user]);

  const mapList = (role) => {
    const addId = (id, item, path) => {
      if (!item?.child?.length) {
        return {
          ...item,
          id,
          selected: false,
          pathName: `${path}/${item.pathName}`,
          disabled:
            user.role === "STAFF"
              ? !staffCapabilityList.includes(item.title)
              : false,
          locked: path.includes("/supplier/marketingtools")
            ? !marketingToolsList.includes(item.pathName)
            : false,
        };
      }
      return {
        ...item,
        id,
        selected: false,
        pathName: `${path}/${item.pathName}`,
        disabled:
          user.role === "STAFF"
            ? !staffCapabilityList.includes(item.title)
            : false,
        locked: path.includes("/supplier/marketingtools")
          ? !marketingToolsList.includes(item.pathName)
          : false,
        child: [
          ...item.child.map((ele, index) => {
            return addId(`${id}_${index}`, ele, `${path}/${item.pathName}`);
          }),
        ],
      };
    };
    const tempList =
      role === "SUPPLIER" || role === "STAFF" ? supplierMenu : resellerMenu;
    const list = [...tempList].map((item, index) => {
      return addId(index, item, `/${getBasePath(role)}`);
    });
    getInitialSelection([...list]);
    return JSON.parse(JSON.stringify(getInitialSelection([...list])));
  };

  const getSupplierNavitem = async () => {
    const promiseArr = [
      getNavBarItems().then((res) => {
        return res.error ? null : { nav: res.data };
      }),
      getmarketingToolStatus(user.supplierId).then((res) => {
        return res.error ? null : { marketingTools: res.data };
      }),
    ];
    Promise.all(promiseArr)
      .then((res) => {
        setSupplierMenu(res[0].nav);
        dispatch(updateUnlockedTools(res[1].marketingTools.unlockedTools));
      })
      .catch(() => {});
  };

  useEffect(() => {
    getSupplierNavitem();
  }, []);

  useEffect(() => {
    if (supplierMenu?.length && marketingToolsList?.length) {
      setMenuList(mapList(user.role));
    }
  }, [supplierMenu, marketingToolsList]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getMenuStyles = (item) => {
    return {
      opacity: open ? 1 : 0,
      color: item?.selected ? "#e56700" : "gray",
      fontSize: item?.child?.length ? 14 : 11,
      fontWeight: item?.selected ? "bold" : "",
      pl: 0,
    };
  };

  const getSubMenuList = (data = []) => {
    return data.map((item, index) => {
      // if (!item.selected) {
      return (
        <MenuItem
          disabled={item.locked}
          onClick={(e) => {
            if (item.navigate) {
              route.push(`${item.pathName}`);
            }
            e.stopPropagation();
            setMenuList((pre) => {
              const temp = JSON.parse(JSON.stringify(pre));
              temp.forEach((ele) => {
                if (ele.selected && ele?.child?.length) {
                  if (e.target.id.split("_").length === 2) {
                    ele.child.forEach((element) => {
                      element.selected = false;
                    });
                    ele.child[index].selected = !ele.child[index].selected;
                  } else if (e.target.id.split("_").length === 3) {
                    ele.child[`${e.target.id.split("_")[1]}`].child.forEach(
                      (element) => {
                        element.selected = false;
                      }
                    );
                    ele.child[`${e.target.id.split("_")[1]}`].child[
                      index
                    ].selected =
                      !ele.child[`${e.target.id.split("_")[1]}`].child[index]
                        .selected;
                  }
                }
              });
              return temp;
            });
          }}
          sx={getMenuStyles(item)}
          key={index}
          className="d-block"
        >
          <div className="d-flex justify-content-between">
            <Box id={item.id} className="fs-13 cursor-pointer">
              {item.title}
            </Box>
            {item.locked && <CustomIcon type="lock" className="fs-16" />}
          </div>

          {item.selected && item?.child?.length ? (
            <MenuList>
              {getSubMenuList(JSON.parse(JSON.stringify([...item.child])))}
            </MenuList>
          ) : null}
        </MenuItem>
      );
    });
  };
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

      <Drawer variant="permanent" open={open} className="shadow position-fixed">
        <Box
          className="hide-scrollbar "
          sx={{
            maxHeight: `calc(100vh - 60px)`,
            // overflowX: "hidden",
          }}
        >
          <Box
            className={`d-flex ${
              open ? "justify-content-end" : "justify-content-center"
            }`}
            // style={{
            //   position: "fixed",
            // }}
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
          </Box>
          <Box className="overflow-y-scroll h-100 hide-scrollbar">
            <List className="" style={{ paddingBottom: "50px" }}>
              {menuList.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                    className="cursor-pointer"
                    ref={item.selected ? itemRef : null}
                    disabled={item?.disabled ?? false}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: open ? 1.5 : 2.5,
                      }}
                      className="cursor-pointer"
                      onClick={() => {
                        if (item?.disabled) return;
                        if (item.navigate) {
                          route.push(`${item.pathName}`);
                        }
                        setMenuList((pre) => {
                          const setSelectedToFalse = (data) => {
                            data.forEach((element) => {
                              if (element?.child?.length) {
                                element.child = setSelectedToFalse(
                                  JSON.parse(JSON.stringify([...element.child]))
                                );
                              }
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
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.selected && "#e56700",
                        }}
                        className="cursor-pointer"
                      >
                        <Tooltip
                          title={!open ? item.title : ""}
                          placement="right"
                        >
                          <InboxIcon />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        className="cursor-pointer"
                        primary={
                          <Typography
                            className="cursor-pointer"
                            variant="text"
                            fontWeight={600}
                            fontSize={13}
                            color={item.selected && "#e56700"}
                          >
                            {item.title}
                          </Typography>
                        }
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                    {item.selected && item?.child?.length ? (
                      <div
                        className={open ? "d-block" : "d-none"}
                        // style={{
                        //   display: open ? "block" : "none",
                        // }}
                      >
                        <MenuList
                          key={index}
                          sx={{
                            minHeight: 40,
                            px: 2.5,
                            marginLeft: "40px",
                            padding: "0px",
                          }}
                        >
                          {getSubMenuList(
                            JSON.parse(JSON.stringify([...item.child]))
                          )}
                        </MenuList>
                      </div>
                    ) : null}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          maxWidth: ` ${open ? "calc(100vw - 245px)" : "calc(100vw - 60px)"}`,
          marginLeft: ` ${open ? "245px" : "60px"}`,
          transition: "margin 0.2s ease-out",
          WebkitTransition: "margin 0.2s ease-out",
          minHeight: "calc(100vh - 60px)",
        }}
        className=" p-3 pt-2 w-100 body-bg"
      >
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
      </Box>
    </Box>
  );
};
export default SideBarComponent;
