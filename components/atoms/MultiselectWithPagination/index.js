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

// const names = [
//   { name: "balu", id: "balu", selected: false },
//   { name: "suhil", id: "suhil", selected: false },
//   { name: "tanmoy", id: "tanmoy", selected: false },
//   { name: "rakesh", id: "rakesh", selected: false },
//   { name: "shrinivas", id: "shrinivas", selected: false },
//   { name: "sujith", id: "sujith", selected: false },
//   { name: "veenal", id: "veenal", selected: false },
//   { name: "soumyajit", id: "soumyajit", selected: false },
//   { name: "akram", id: "akram", selected: false },
//   { name: "ajay", id: "ajay", selected: false },
//   { name: "pratish", id: "pratish", selected: false },
//   { name: "tukaram", id: "tukaram", selected: false },
//   { name: "ravaan", id: "ravaan", selected: false },
// ];
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
const names = [
  "Oliver Hansen1",
  "Van Henry2",
  "April Tucker3",
  "Ralph Hubbard4",
  "Omar Alexander5",
  "Carlos Abbott6",
  "Miriam Wagner7",
  "Bradley Wilkerson8",
  "Virginia Andrews9",
  "Kelly Snyder10",
  "Oliver Hansen11",
  "Van Henry12",
  "April Tucker13",
  "Ralph Hubbard14",
  "Omar Alexander15",
  "Carlos Abbott16",
  "Miriam Wagner17",
  "Bradley Wilkerson18",
  "Virginia Andrews19",
  "Kelly Snyder20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
];

export default function MultiselectWithPagination() {
  const [personName, setPersonName] = useState([]);
  const [allSelect, setallSelect] = useState(false);
  const [deopdownLength, setdeopdownLength] = useState(10);
  const [dropdownStart, setdropdownStart] = useState(0);
  const [searchDropdown, setsearchDropdown] = useState("");
  const [supplierDropdownVal, setsupplierDropdownVal] = useState([]);
  const allSelectFunction = () => {
    setallSelect(!allSelect);
    if (allSelect) {
      setPersonName([]);
    } else {
      setPersonName(["All Customer Has Been Selected To Dropdown"]);
    }
  };
  const handleChange = (event) => {
    const {
      target: { value, selectedval },
    } = event;

    if (allSelect) {
      setallSelect(false);
      setPersonName(value);
      // setPersonName(value);
    } else {
      setPersonName(value);
    }
  };
  const getSupplierDropdownFunction = async () => {
    const payload = {
      userType: "Supplier",
      searchKey: "",
      pageNumber: 0,
      pageSize: 10,
    };
    const { data, err } = await getSupplierDropdown(payload);
    if (data) {
      // console.log(data, "datadata");
      const temp = [];
      data.data.forEach((val) => {
        temp.push({
          id: val?.userId,
          type: val?.userType,
          name: val?.userName,
          phone: val?.userMobileNumber,
          email: val?.userEmail,
          isSelected: false,
        });
      });

      // console.log(temp, "temp");
      setsupplierDropdownVal([...temp]);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getSupplierDropdownFunction();
  }, []);

  return (
    <div>
      <FormControl sx={{ width: "100%", height: "10%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Supplier</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Supplier" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <Grid container className="px-3">
            <InputBox
              value={searchDropdown}
              className=" "
              onInputChange={(e) => {
                setsearchDropdown(e.target.value);
              }}
            />

            <Checkbox checked={allSelect} onChange={allSelectFunction} />
            <span className="mt-1">
              <ListItemText primary="Select All" />
            </span>
          </Grid>

          {supplierDropdownVal
            // .slice(dropdownStart, deopdownLength)
            ?.map((name) => {
              return (
                <MenuItem
                  key={name.id}
                  value={name.name}
                  selectedval={name.isSelected}
                >
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name.name} />
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

            {names.length >= deopdownLength && (
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
