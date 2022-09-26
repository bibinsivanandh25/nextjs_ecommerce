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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomIcon from "services/iconUtils";

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

const CollapseList = ({ list = {}, open = false }) => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();

  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: open ? 1.5 : 2.5,
        }}
        className="cursor-pointer"
        onClick={() => {
          setExpand(!expand);
          if (list.navigate) {
            router.push(`${list.pathName}`);
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 1 : "auto",
            justifyContent: "center",
          }}
          className="cursor-pointer"
        >
          <Tooltip title={!open ? list.title : ""} placement="right">
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
              color={list.selected && "#e56700"}
            >
              {list.title}
            </Typography>
          }
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
      <Collapse in={expand} timeout="auto" unmountOnExit className="ms-4">
        <List component="div" disablePadding>
          {list.child.map((item) => {
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
                      {item.title}
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
