import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import CheckBoxComponent from "../CheckboxComponent";

const DropDownWithAddNewOptions = ({
  label = "",
  createAttribute = "",
  options = [],
  onAddClick = () => {},
  showCheckBox = false,
  onCheckBoxClick = () => {},
  isChecked = false,
  padding = "",
  margin = "",
  width = "",
  inputLabelShrink = false,
}) => {
  const [showOptions, setshowOptions] = useState(false);

  const returnOptions = () => {
    return options.map((val) => {
      return (
        <Box className="ps-3 py-2 d-flex align-items-center  border-bottom border-1">
          {showCheckBox && (
            <CheckBoxComponent
              checkBoxClick={onCheckBoxClick}
              isChecked={isChecked}
            />
          )}
          <Typography className="h-5 color-gray">{val}</Typography>
        </Box>
      );
    });
  };

  return (
    <>
      <Box className={`position-relative ${padding} ${margin} ${width}`}>
        <Box
          sx={{ height: "40px" }}
          className="border w-100 rounded bg-white position-relative cursor-pointer"
          onClick={() => {
            setshowOptions(!showOptions);
          }}
        >
          {inputLabelShrink && (
            <Typography
              sx={{ bottom: 29, left: "1rem" }}
              className="position-absolute bg-white h-5 color-gray border-gray"
            >
              {label}
            </Typography>
          )}
          <Typography
            sx={{ top: 8, left: "50%", transform: "translateX(-50%)" }}
            className="position-absolute bg-white color-gray border-gray"
          >
            {label}
          </Typography>
          <Box className="d-flex w-100 h-100 justify-content-end align-items-cente cursor-pointer">
            <CustomIcon showColorOnHover={false} type="expandMore" />
          </Box>
        </Box>
        {showOptions && (
          <Box className="position-absolute bg-white w-100 zIndex-1101">
            <Box className="border rounded mt-1">
              <Typography
                onClick={() => {
                  onAddClick();
                }}
                className="h-5 text-end color-orange border-bottom w-100 py-1 pe-1 cursor-pointer"
              >
                + {createAttribute}{" "}
              </Typography>
              {returnOptions()}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DropDownWithAddNewOptions;
