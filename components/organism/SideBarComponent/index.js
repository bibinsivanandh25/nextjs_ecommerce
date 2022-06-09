/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { useMemo, useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { resellerMenu, supplierMenu } from "constants/navConstants";
import { useSession } from "next-auth/react";
import { MenuItem, MenuList } from "@mui/material";
import { useRouter } from "next/router";
import BreadCrumb from "components/atoms/BreadCrumb";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
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
    case "Supplier":
      return "supplier";
    case "Reseller":
      return "reseller";
    default:
      return "customer";
  }
};
const mapList = (role) => {
  const addId = (id, item, path) => {
    if (!item?.child?.length) {
      return {
        ...item,
        id,
        selected: false,
        path_name: `${path}/${item.path_name}`,
      };
    }
    return {
      ...item,
      id,
      selected: false,
      path_name: `${path}/${item.path_name}`,
      child: [
        ...item.child.map((ele, index) => {
          return addId(`${id}_${index}`, ele, `${path}/${item.path_name}`);
        }),
      ],
    };
  };
  const tempList = role === "Supplier" ? supplierMenu : resellerMenu;
  const list = [...tempList].map((item, index) => {
    return addId(index, item, `/${getBasePath(role)}`);
  });
  return [...list];
};

const SideBarComponent = ({ children }) => {
  const { data: session } = useSession();
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([...mapList(session.user.role)]);
  // const [selected, setSelected] = useState({});
  // const [pathName, setPathName] = useState(getBasePath(session.user.role));
  const route = useRouter();

  useMemo(() => {
    setMenuList([...mapList(session.user.role)]);
  }, [session.user.role]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getMenuStyles = (item) => {
    return {
      opacity: open ? 1 : 0,
      color: item?.child?.length ? "#e56700" : "gray",
      fontSize: item?.child?.length ? 14 : 11,
      fontWeight: item?.child?.length ? 500 : 600,
      pl: 0,
    };
  };

  const getSubMenuList = (data = []) => {
    return (
      <div>
        {data.map((item, index) => {
          // if (!item.selected) {
          return (
            <MenuItem sx={getMenuStyles(item)} key={index} className="d-block">
              <Box
                id={item.id}
                onClick={(e) => {
                  if (item.navigate) {
                    route.push(`${item.path_name}`);
                  }
                  e.stopPropagation();
                  // if (item?.child?.length) {
                  setMenuList((pre) => {
                    const temp = JSON.parse(JSON.stringify(pre));
                    temp.forEach((ele) => {
                      if (ele.selected && ele?.child?.length) {
                        if (e.target.id.split("_").length === 2) {
                          ele.child[index].selected =
                            !ele.child[index].selected;
                        }
                      }
                    });
                    return temp;
                  });
                  // }
                }}
              >
                {item.title}
              </Box>
              {item.selected && item?.child?.length ? (
                <MenuList>
                  {getSubMenuList(JSON.parse(JSON.stringify([...item.child])))}
                </MenuList>
              ) : null}
            </MenuItem>
          );
          // }
          // return (
          //   <MenuItem sx={getMenuStyles(item)} className="d-block">
          //     {item.title}
          //     <MenuList
          //       key={index}
          //       sx={{
          //         minHeight: 40,
          //         px: 2.5,
          //       }}
          //     >
          //       {getSubMenuList(JSON.parse(JSON.stringify([...item.child])))}
          //     </MenuList>
          //   </MenuItem>
          // );
        })}
      </div>
    );
  };
  return (
    <Box
      sx={{
        minWidth: `calc(100vw - 5px)`,
        maxWidth: "100vw",
        position: "relative",
        top: "60px",
      }}
    >
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <Box
          className="overflow-y-scroll hide-scrollbar"
          sx={{
            maxHeight: `calc(100vh - 60px)`,
            overflowX: "hidden",
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
          <List>
            {menuList.map((item, index) => {
              return (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => {
                      if (item.navigate) {
                        route.push(`${item.path_name}`);
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
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: item.selected && "#e56700",
                      }}
                    >
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="text"
                          fontWeight={600}
                          fontSize={14}
                          color={item.selected && "#e56700"}
                        >
                          {item.title}
                        </Typography>
                      }
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  {item.selected && item?.child?.length ? (
                    <div>
                      <MenuList
                        key={index}
                        sx={{
                          minHeight: 40,
                          px: 2.5,
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
      </Drawer>
      <Box
        component="main"
        sx={{
          maxWidth: ` ${open ? "calc(100vw - 240px)" : "calc(100vw - 60px)"}`,
          marginLeft: ` ${open ? "240px" : "60px"}`,
          transition: "margin 0.2s ease-out",
          WebkitTransition: "margin 0.2s ease-out",
        }}
        className=" overflow-auto p-4 py-3 hide-scrollbar"
      >
        <Box className="mb-2">
          <BreadCrumb />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
export default SideBarComponent;
