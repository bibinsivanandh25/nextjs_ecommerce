import { Box, Chip, FormHelperText, Paper, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import CustomIcon from "services/iconUtils";
import CheckBoxComponent from "../CheckboxComponent";

const DropDownWithAddNewOptions = ({
  label = "",
  createAttribute = "",
  options = [],
  onAddClick = () => {},
  className = "",
  value = {},
  multiSelectValue = [],
  onSelectionChange = () => {},
  multiSelect = false,
  helperText = "",
  error = false,
  handlelabelClose = () => {},
}) => {
  const [showOptions, setshowOptions] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(JSON.parse(JSON.stringify(options)));
  }, [options]);
  const returnOptions = () => {
    return list.map((val, ind) => {
      return (
        <Box
          onClick={() => {
            if (!multiSelect) {
              onSelectionChange(val);
              setshowOptions(false);
            }
          }}
          className="ps-3 py-2 d-flex align-items-center cursor-pointer  border-top border-1 w-100 text-truncate"
        >
          {multiSelect ? (
            <CheckBoxComponent
              label={val.label}
              className="color-orange"
              lableFontSize="12px"
              isChecked={val.isChecked}
              checkBoxClick={(_, checked) => {
                const temp = JSON.parse(JSON.stringify(list));
                temp[ind].isChecked = checked;
                onSelectionChange(temp.filter((item) => item.isChecked));
                setList(temp);
              }}
            />
          ) : (
            <Typography className="h-5 color-gray">{val.label}</Typography>
          )}
        </Box>
      );
    });
  };

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setshowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <Box className={`position-relative ${className}`} ref={ref}>
        <Box
          sx={{ minHeight: "40px" }}
          className={`border w-100 rounded bg-white position-relative ${
            error ? "border-danger" : ""
          }`}
          onClick={() => {
            setshowOptions(!showOptions);
          }}
        >
          <Typography
            sx={{ top: "-10px", left: "1rem" }}
            className={`position-absolute bg-white h-5  ${
              error ? " text-danger" : "color-gray"
            }`}
          >
            {label}
          </Typography>
          {!multiSelect ? (
            <Typography className="mt-2 bg-white color-gray border-gray w-75 text-truncate ms-3">
              {value.label}
            </Typography>
          ) : (
            <div className="py-2">
              {multiSelectValue.map((item, index) => {
                return (
                  <Chip
                    key={item.id}
                    variant="outlined"
                    className="m-1"
                    label={
                      <div className="d-flex justify-content-between">
                        <Typography className="">{item.label}</Typography>
                        <CustomIcon
                          type="close"
                          className="fs-18 rounded-circle ms-2 bg-gray color-white"
                          showColorOnHover={false}
                          onIconClick={(e) => {
                            e.stopPropagation();
                            const temp = JSON.parse(
                              JSON.stringify(multiSelectValue)
                            );
                            temp.splice(index, 1);
                            onSelectionChange(temp);
                          }}
                        />
                      </div>
                    }
                  />
                );
              })}
            </div>
          )}
          {Object.keys(value).length ? (
            <Box
              sx={{ left: "83%", top: "3px" }}
              className="position-absolute cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelectionChange({});
              }}
            >
              <CustomIcon
                type="close"
                className="fs-20 mt-1 me-3"
                showColorOnHover={false}
                onIconClick={() => handlelabelClose()}
              />
            </Box>
          ) : null}
          <Box
            sx={{ left: "90%", top: "3px" }}
            className="position-absolute cursor-pointer"
          >
            <CustomIcon
              type="expandMore"
              className="fs-20 mt-1 me-3"
              showColorOnHover={false}
            />
          </Box>
        </Box>
        <FormHelperText error={error} className="ps-3">
          {helperText}
        </FormHelperText>
        {showOptions && (
          <Paper
            className={`position-absolute border rounded overflow-auto bg-white w-100 zIndex-1101 ${
              multiSelect ? "  mxh-200" : "  mxh-150"
            }`}
          >
            <Box className="mt-1">
              <Typography
                onClick={() => {
                  onAddClick();
                }}
                className="h-5 text-end position-sticky top-0 bg-white zIndex-1101 color-orange w-100 py-1 pe-1 cursor-pointer"
              >
                + {createAttribute}
              </Typography>
              {returnOptions()}
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default DropDownWithAddNewOptions;
