/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import * as React from "react";
import { Tooltip } from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

export default function BasicMenu({
  menuList = [],
  getSelectedValue = () => {},
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [MenuItems, setMenuItems] = React.useState([]);

  React.useEffect(() => {
    if (menuList.length) {
      setMenuItems(() => {
        return menuList.map((item) => {
          return { label: item, sort: "ascending", showarrow: false };
        });
      });
    } else {
      setMenuItems([]);
    }
  }, [menuList]);

  const getArrow = (item) => {
    let arr = [...MenuItems];
    // eslint-disable-next-line consistent-return
    arr = arr.map((ele) => {
      if (ele.label === item.label) {
        if (item.sort === "ascending") {
          return {
            ...ele,
            sort: "descending",
          };
        }
        if (item.sort === "descending") {
          return {
            ...ele,
            sort: "ascending",
          };
        }
      } else return ele;
    });

    setMenuItems([...arr]);
  };
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  return (
    <div>
      <Tooltip title="Details" placement="top">
        <MoreVert
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </Tooltip>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {MenuItems.map((item, index) => {
          return (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => {
                handleClose();
                getSelectedValue(item);
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                onClick={() => getArrow(item)}
                className="d-flex w-100 justify-content-between"
                id="menuitem"
              >
                <p>{item.label}</p>

                <span>
                  {item.label !== "Download" ? (
                    item.sort === "ascending" ? (
                      <ArrowUpward />
                    ) : (
                      <ArrowDownward />
                    )
                  ) : null}
                </span>
              </div>
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
