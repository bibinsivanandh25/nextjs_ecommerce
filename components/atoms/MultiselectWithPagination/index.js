import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";
import InputBox from "../InputBoxComponent";
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
  getSupplierDropdownFun = () => {},
  disable = true,
  setselectedSupplier = () => {},
  label = "",
  setsupplierDropdownVal = () => {},
  supplierDropdownVal,
  setallSelect = () => {},
  allSelect,
  pageNumberState,
  setpageNumberState = () => {},
  dowpdownLength,
  setPersonName = () => {},
  personName,
  searchDropdown,
  setsearchDropdown = () => {},
  // personName,
  // setPersonName = () => {},
}) {
  const [selectAllValue, setselectAllValue] = useState([]);
  // const [allSelect, setallSelect] = useState(false);
  const allSelectFunction = () => {
    const temp = allSelect;
    setallSelect(!temp);
    if (temp) {
      setselectAllValue([]);
    } else {
      setselectAllValue(["All Users Has Been Selected To Dropdown"]);
    }
  };

  const handleCheckboxClick = (value) => {
    const temp = [...supplierDropdownVal];
    const showtemp = [];
    temp.forEach((item) => {
      if (item?.userId == value?.userId) {
        // eslint-disable-next-line no-param-reassign
        item.isSelected = !item.isSelected;
      }
    });
    setsupplierDropdownVal([...temp]);
    const selected = temp.filter((x) => x.isSelected === true);
    selected.forEach((ele) => {
      showtemp.push(ele.userName);
    });
    setselectedSupplier(selected);
    if (allSelect) {
      setallSelect(false);
      setselectAllValue([]);
      setPersonName([]);
    } else {
      setPersonName(showtemp);
    }
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
          disableAutoFocus
          readOnly={disable}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectAllValue.length ? [] : personName}
          onChange={handleCheckboxClick}
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

          {supplierDropdownVal?.map((name) => {
            return (
              <MenuItem
                // disableAutoFocus={false}
                autoFocus={false}
                // focusVisible={false}
                key={name.userId}
                // value={name.userId}
                disabled={selectAllValue.length}
              >
                <CheckBoxComponent
                  checkBoxClick={() => {
                    handleCheckboxClick(name);
                  }}
                  isChecked={name.isSelected}
                />
                {/* <ListItemText primary={`${name.userName} ${name.userId}`} /> */}
                <Grid container className="d-flex justify-content-between">
                  <Typography>{name.userName}</Typography>
                  <Typography
                    style={{ color: "gray", fontSize: "15px", opacity: 0.7 }}
                  >
                    {name.userId}
                  </Typography>
                </Grid>
              </MenuItem>
            );
          })}

          <Grid
            className={
              dowpdownLength?.length < 10
                ? "d-none"
                : "d-flex justify-content-end px-2 cursor-pointer color-orange fw-500"
            }
            // style={{dowpdownLength.length<10?display:"none":display:"block"}}
            onClick={() => {
              const temp = pageNumberState;
              const finalTemp = temp + 1;
              getSupplierDropdownFun(finalTemp);
              setpageNumberState(finalTemp);
            }}
          >
            See more
          </Grid>
          {/* </Grid> */}
        </Select>
      </FormControl>
    </div>
  );
}
