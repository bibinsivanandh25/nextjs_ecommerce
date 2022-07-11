/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
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
import { customerMenu } from "constants/navConstants";
// import { useSession } from "next-auth/react";
// import { MenuItem, MenuList } from "@mui/material";
// import { useRouter } from "next/router";
import BreadCrumb from "components/atoms/BreadCrumb";
import { Fade, Paper, Popper } from "@mui/material";

const drawerWidth = 245;

const CustomerSideBarComponent = ({ children }) => {
  //   const route = useRouter();

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    position: "fixed",
    top: "80px",
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
    top: "80px",
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

  const mapList = () => {
    const addId = (id, item, path) => {
      //   if (!item?.child?.length) {
      //     return {
      //       ...item,
      //       id,
      //       selected: false,
      //       path_name: `${path}/${item.path_name}`,
      //     };
      //   }
      return {
        ...item,
        id,
        selected: false,
        path_name: `${path}/${item.path_name}`,
        // child: [
        //   ...item.child.map((ele, index) => {
        //     return addId(`${id}_${index}`, ele, `${path}/${item.path_name}`);
        //   }),
        // ],
      };
    };
    const tempList = customerMenu;
    const list = [...tempList].map((item, index) => {
      return addId(index, item, "customer");
    });
    return [...list];
  };

  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([...mapList("customer")]);
  const [hover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  const handleClick = (event, title) => {
    console.log(event);
    setHover(true);
    setAnchorEl(event.target);
    setSelectedItem(title);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //   const getMenuStyles = (item) => {
  //     return {
  //       opacity: open ? 1 : 0,
  //       color: item?.selected ? "#e56700" : "gray",
  //       fontSize: item?.child?.length ? 14 : 11,
  //       fontWeight: item?.selected ? "bold" : "",
  //       pl: 0,
  //     };
  //   };

  //   const getSubMenuList = (data = []) => {
  //     return (
  //       <>
  //         {data.map((item, index) => {
  //           // if (!item.selected) {
  //           return (
  //             <MenuItem
  //               onClick={(e) => {
  //                 if (item.navigate) {
  //                   route.push(`${item.path_name}`);
  //                 }
  //                 e.stopPropagation();
  //                 // if (item?.child?.length) {
  //                 setMenuList((pre) => {
  //                   const temp = JSON.parse(JSON.stringify(pre));
  //                   temp.forEach((ele) => {
  //                     if (ele.selected && ele?.child?.length) {
  //                       if (e.target.id.split("_").length === 2) {
  //                         ele.child[index].selected = !ele.child[index].selected;
  //                       } else if (e.target.id.split("_").length === 3) {
  //                         ele.child[`${e.target.id.split("_")[1]}`].child.forEach(
  //                           (element) => {
  //                             element.selected = false;
  //                           }
  //                         );
  //                         ele.child[`${e.target.id.split("_")[1]}`].child[
  //                           index
  //                         ].selected =
  //                           !ele.child[`${e.target.id.split("_")[1]}`].child[
  //                             index
  //                           ].selected;
  //                       }
  //                     }
  //                   });
  //                   return temp;
  //                 });
  //                 // }
  //               }}
  //               sx={getMenuStyles(item)}
  //               key={index}
  //               className="d-block"
  //             >
  //               <Box id={item.id} className="fs-13 cursor-pointer">
  //                 {item.title}
  //               </Box>
  //               {/* {item.selected && item?.child?.length ? (
  //                 <MenuList>
  //                   {getSubMenuList(JSON.parse(JSON.stringify([...item.child])))}
  //                 </MenuList>
  //               ) : null} */}
  //             </MenuItem>
  //           );
  //         })}
  //       </>
  //     );
  //   };
  return (
    <Box
      sx={{
        minWidth: `calc(100vw - 5px)`,
        maxWidth: "100vw",
        position: "relative",
        top: "80px",
        display: "flex",
      }}
    >
      <CssBaseline />

      <Box className="shadow position-fixed">
        <Box
          className="hide-scrollbar"
          sx={{
            maxHeight: `calc(100vh - 60px)`,
            minHeight: `calc(100vh - 60px)`,
            maxWidth: open ? "225px" : "75px",
            overflow: "hidden",
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
                  <Box
                    key={index}
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
                        console.log(item.path_name);
                        // route.push(`${item.path_name}`);
                        setMenuList((pre) => {
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
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.selected && "#e56700",
                        }}
                        className="cursor-pointer"
                      >
                        <InboxIcon />
                      </ListItemIcon>
                      {open ? (
                        <ListItemText
                          className="cursor-pointer"
                          primary={
                            <Typography
                              className="cursor-pointer"
                              variant="text"
                              fontWeight={600}
                              fontSize={13}
                              color={item.selected && "#e56700"}

                              // onMouseLeave={() => setHover(false)}
                              // onMouseEnter={(e) => {
                              //   setHover(true);
                              //   setPagePosition({
                              //     x: e.pageX,
                              //     y: e.pageY - 88 + "px",
                              //   });
                              // }}
                            >
                              {item.title}
                            </Typography>
                          }
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      ) : null}
                    </ListItemButton>
                    {/* {item.selected && item?.child?.length ? (
                      <div
                        style={{
                          display: open ? "block" : "none",
                        }}
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
                    ) : null} */}
                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          maxWidth: ` ${open ? "calc(100vw - 210px)" : "calc(100vw - 60px)"}`,
          marginLeft: ` ${open ? "210px" : "60px"}`,
          transition: "all 0.2s ease-out",
          WebkitTransition: "all 0.2s ease-out",
        }}
        className=" overflow-auto p-4 py-3 hide-scrollbar w-100"
      >
        <Box className="mb-2">
          <BreadCrumb />
        </Box>
        {children}
      </Box>

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
            <Paper className="overflow-auto">
              <Typography
                sx={{ p: 2, maxWidth: 800, overFlow: "auto", maxHeight: 300 }}
              >
                The content of the Popper.The content of the Popper.The content
                of the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content o,f the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
                the Popper.The content of the Popper.The content of the
                Popper.The content of the Popper.The content of the Popper.The
                content of the Popper.The content of the Popper.The content of
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};
export default CustomerSideBarComponent;
