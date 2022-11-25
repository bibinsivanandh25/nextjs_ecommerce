/* eslint-disable no-param-reassign */
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomIcon from "services/iconUtils";
import Image from "next/image";

const ChildCollapes = ({ list = {}, open = false }) => {
  const [expandChild, setExpandchild] = useState(false);
  const router = useRouter();

  return (
    <>
      <ListItemButton
        onClick={() => {
          setExpandchild(!expandChild);
          if (list.navigate) router.push(list.pathName);
        }}
        sx={{
          opacity: open ? 1 : 0,
          fontSize: 11,
          mr: open ? 1 : "auto",
          py: 0.4,
        }}
        className="cursor-pointer"
        disabled={list.disabled || list.locked}
      >
        <ListItemText
          primary={
            <Typography
              variant="text"
              fontWeight={600}
              fontSize={13}
              className={`cursor-pointer ${
                router.pathname.includes(list.pathName) ? "color-orange" : ""
              }`}
            >
              <div className="d-flex justify-content-between">
                <Box id={list.id} className="fs-13 cursor-pointer">
                  {list.title}
                </Box>
                {list.locked && <CustomIcon type="lock" className="fs-16" />}
              </div>
            </Typography>
          }
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
      {list?.child?.length && (
        <Collapse
          in={expandChild}
          timeout="auto"
          unmountOnExit
          className="ms-4"
        >
          <List component="div" disablePadding>
            {list.child.map((ele) => {
              return (
                <ListItemButton
                  onClick={() => {
                    if (ele.navigate) router.push(ele.pathName);
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontSize: 11,
                    mr: open ? 1 : "auto",
                    py: 0.4,
                    px: 0,
                  }}
                  className="cursor-pointer"
                  disabled={ele.disabled || ele.locked}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="text"
                        fontWeight={600}
                        fontSize={13}
                        className={`cursor-pointer ${
                          router.pathname === ele.pathName ? "color-orange" : ""
                        }`}
                      >
                        <div className="d-flex justify-content-between">
                          <Box id={ele.id} className="fs-13 cursor-pointer">
                            {ele.title}
                          </Box>
                          {ele.locked && (
                            <CustomIcon type="lock" className="fs-16" />
                          )}
                        </div>
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CollapseList = ({
  list = {},
  open = false,
  setToFalse = () => {},
  // id = null,
}) => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  const [menuList, setMenuList] = useState({ ...list });

  useEffect(() => {
    setMenuList(list);
  }, [list]);

  // const setSelectedToFalse = (data) => {
  //   data.forEach((element) => {
  //     if (element?.child?.length) {
  //       element.child = setSelectedToFalse(
  //         JSON.parse(JSON.stringify([...element.child]))
  //       );
  //     }
  //     element.selected = false;
  //   });
  //   return data;
  // };

  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: open ? 1.5 : 2.5,
        }}
        className={`${
          router.pathname.includes(menuList.pathName) ? "color-orange" : ""
        } cursor-pointer`}
        onClick={() => {
          if (menuList.navigate) {
            router.push(`${menuList.pathName}`);
          }
          setToFalse();
          setExpand(!expand);
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 1 : "auto",
            justifyContent: "center",
            margin: open ? "" : "0px",
          }}
          className={`${
            router.pathname.includes(menuList.pathName) ? "color-orange" : ""
          } cursor-pointer`}
        >
          <Tooltip title={!open ? menuList.title : ""} placement="right">
            <Image height={18} width={18} src={menuList.logo} />
          </Tooltip>
        </ListItemIcon>
        <ListItemText
          className="cursor-pointer"
          primary={
            <Typography
              className={`${
                router.pathname.includes(menuList.pathName)
                  ? "color-orange"
                  : ""
              } cursor-pointer`}
              variant="text"
              fontWeight={600}
              fontSize={13}
              // color={menuList.selected && "#e56700"}
            >
              <div className="d-flex justify-content-between">
                <Box id={menuList.id} className="fs-13 cursor-pointer">
                  {menuList.title}
                </Box>
                {menuList.locked && (
                  <CustomIcon type="lock" className="fs-16" />
                )}
              </div>
            </Typography>
          }
          sx={{ opacity: open ? 1 : 0, display: open ? "block" : "none" }}
        />
      </ListItemButton>
      <Collapse in={expand} timeout="auto" unmountOnExit className="ms-4">
        <List component="div" disablePadding>
          {menuList.child.map((item) => {
            return item?.child?.length ? (
              <ChildCollapes list={item} open={open} />
            ) : (
              <ListItemButton
                onClick={() => {
                  if (item.navigate) router.push(item.pathName);
                }}
                sx={{
                  opacity: open ? 1 : 0,
                  fontSize: 11,
                  mr: open ? 1 : "auto",
                  py: 0.4,
                }}
                className={`${
                  router.pathname.includes(item.pathName) ? "color-orange" : ""
                } cursor-pointer`}
                disabled={item.disabled}
              >
                <ListItemText
                  primary={
                    <Typography
                      className="cursor-pointer"
                      variant="text"
                      fontWeight={600}
                      fontSize={13}
                    >
                      <div className="d-flex justify-content-between">
                        <Box id={item.id} className="fs-13 cursor-pointer">
                          {item.title}
                        </Box>
                        {item.locked && (
                          <CustomIcon type="lock" className="fs-16" />
                        )}
                      </div>
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default CollapseList;
