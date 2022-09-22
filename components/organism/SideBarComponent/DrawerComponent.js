/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDispatch, useSelector } from "react-redux";

import { getmarketingToolStatus, getNavBarItems } from "services/supplier";
import { setAllowedPaths, updateUnlockedTools } from "features/userSlice";
import CollapseList from "./CollapseList";

const drawerWidth = 245;
const DrawerComponent = ({ open = false, setOpen = () => {} }) => {
  const route = useRouter();

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
  const CustomDrawer = styled(MuiDrawer, {
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

  //   const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  //   const itemRef = useRef(null);
  const user = useSelector((state) => state.user);
  //   const marketingToolsList = user.unlockedTools;
  const dispatch = useDispatch();
  const [navOptionsList, setNavOptionsList] = useState([]);
  const [staffCapabilityList, setstaffCapabilityList] = useState([]);

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

  const getNavOptions = async () => {
    if (["SUPPLIER", "STAFF"].includes(user.role)) {
      const promiseArr = [
        getNavBarItems().then((res) => {
          return res.error ? null : { nav: res.data };
        }),
        getmarketingToolStatus(user.supplierId).then((res) => {
          return res.error ? null : { marketingTools: res.data };
        }),
      ];
      if (user.role === "STAFF") {
        setstaffCapabilityList(
          getCapability([...user.staffDetails.staffCapabilityList])
        );
      }
      await Promise.all(promiseArr)
        .then((res) => {
          dispatch(updateUnlockedTools(res[1].marketingTools.unlockedTools));
          setNavOptionsList(res[0].nav);
        })
        .catch(() => {});
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

  const mapList = (role) => {
    const marketingToolsList = user.unlockedTools;
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
    const list = [...navOptionsList].map((item, index) => {
      return addId(index, item, `/${getBasePath(role)}`);
    });
    return JSON.parse(JSON.stringify(getInitialSelection([...list])));
  };
  const getCapabilityPathList = (data) => {
    const temp = [];
    data.forEach((item) => {
      if (item.navigate && !item.disabled && !item.locked) {
        temp.push(item.pathName);
      }
      if (item?.child?.length) {
        temp.push(...getCapabilityPathList(item.child));
      }
    });
    return temp;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getNavOptions();
    // else if(user.role === "STAFF")
  }, []);

  useEffect(() => {
    if (navOptionsList && navOptionsList.length)
      setMenuList(mapList(user.role));
  }, [navOptionsList]);

  useEffect(() => {
    if (menuList.length) {
      dispatch(setAllowedPaths(getCapabilityPathList(menuList)));
    }
  }, [menuList]);

  return (
    <CustomDrawer
      variant="permanent"
      open={open}
      className="shadow position-fixed"
    >
      <Box
        className="hide-scrollbar "
        sx={{
          maxHeight: `calc(100vh - 60px)`,
        }}
      >
        <Box
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
                  //   ref={item.selected ? itemRef : null}
                  disabled={item?.disabled ?? false}
                >
                  {!item?.child?.length ? (
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
                  ) : (
                    <CollapseList list={item} open={open} />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </CustomDrawer>
  );
};

export default DrawerComponent;
