import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Typography } from "@mui/material";
import CustomIcon from "services/iconUtils";
import InputBox from "../InputBoxComponent";
import toastify from "services/utils/toastUtils";
import { getSupplierDropdown } from "services/admin/notification";
import CheckBoxComponent from "../CheckboxComponent";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [{ id: "", type: "", name: "", phone: "", email: "" }];

export default function MultiselectWithPagination({
  disable = true,
  setselectedSupplier = () => {},
  selectedSupplier,
  label = "",
  setsupplierDropdownVal = () => {},
  supplierDropdownVal,
  setallSelect = () => {},
  allSelect,
  // personName,
  // setPersonName = () => {},
}) {
  const [personName, setPersonName] = useState([]);
  const [selectAllValue, setselectAllValue] = useState([]);
  // const [allSelect, setallSelect] = useState(false);
  const [deopdownLength, setdeopdownLength] = useState(10);
  const [dropdownStart, setdropdownStart] = useState(0);
  const [searchDropdown, setsearchDropdown] = useState("");
  // const [supplierDropdownVal, setsupplierDropdownVal] = useState([]);
  // const [selectedSupplier, setselectedSupplier] = useState([]);
  const allSelectFunction = () => {
    const temp = allSelect;
    setallSelect(!temp);
    if (temp) {
      setselectAllValue([]);
    } else {
      setselectAllValue(["All Users Has Been Selected To Dropdown"]);
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const result = [...personName];
    value.forEach((id) => {
      supplierDropdownVal.forEach((ele) => {
        if (ele.userId === id) {
          result.push(`${ele.userName} ( ${ele.userId} )`);
        }
      });
    });
    if (allSelect) {
      setallSelect(false);
      setselectAllValue([]);
      setPersonName([]);
      // setPersonName(value);
      // setPersonName(value);
    } else {
      setPersonName(result);
    }
  };
  const handleCheckboxClick = (value) => {
    const temp = [...supplierDropdownVal];

    temp.forEach((item) => {
      if (item?.userId == value?.userId) {
        item.isSelected = !item.isSelected;
      }
    });
    setsupplierDropdownVal([...temp]);
    const selected = temp.filter((x) => x.isSelected === true);
    setselectedSupplier(selected);
  };
  return (
    <div>
      <FormControl sx={{ width: "100%", height: "10%" }}>
        <InputLabel id="demo-multiple-checkbox-label">
          {selectAllValue.length ? "" : label}
        </InputLabel>
        <Grid style={{ position: "absolute", marginTop: 20, marginLeft: 20 }}>
          {selectAllValue.length ? (
            <Typography style={{ color: "black" }}>{selectAllValue}</Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Select
          readOnly={disable}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectAllValue.length ? [] : personName}
          onChange={handleChange}
          input={<OutlinedInput label="Supplier" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{}}
        >
          <Grid container className="px-3">
            {selectAllValue.length ? (
              <InputBox
                value={searchDropdown}
                disabled
                className=" "
                onInputChange={(e) => {
                  setsearchDropdown(e.target.value);
                }}
              />
            ) : (
              <InputBox
                value={searchDropdown}
                className=" "
                onInputChange={(e) => {
                  setsearchDropdown(e.target.value);
                }}
              />
            )}
            <Grid container>
              <CheckBoxComponent
                isChecked={allSelect}
                checkBoxClick={allSelectFunction}
              />
              <span className="mt-1">
                <ListItemText primary="Select All" />
              </span>
            </Grid>
          </Grid>

          {supplierDropdownVal
            // .slice(dropdownStart, deopdownLength)
            ?.map((name) => {
              return (
                <MenuItem
                  key={name.userId}
                  value={name.userId}
                  disabled={selectAllValue.length}
                >
                  {/* <Checkbox checked={personName.indexOf(name.id) > -1} /> */}

                  <CheckBoxComponent
                    checkBoxClick={() => {
                      handleCheckboxClick(name);
                    }}
                    isChecked={name.isSelected}
                  />
                  <ListItemText primary={name.userName} />
                </MenuItem>
              );
            })}
          <Grid className="d-flex  justify-content-between px-2 ">
            {dropdownStart >= 10 && (
              <CustomIcon
                type="arrowBackIosNewIcon"
                onIconClick={() => {
                  setdeopdownLength(deopdownLength - 10);
                  setdropdownStart(dropdownStart - 10);
                }}
              />
            )}

            {supplierDropdownVal?.length >= deopdownLength && (
              <CustomIcon
                type="arrowforward"
                onIconClick={() => {
                  setdeopdownLength(deopdownLength + 10);
                  setdropdownStart(dropdownStart + 10);
                }}
              />
            )}
          </Grid>
        </Select>
      </FormControl>
    </div>
  );
}
