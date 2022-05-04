import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectComponent = (props) => {
  const {
    value = null,
    label = "",
    onSelectionChange = () => {},
    id = "demo-simple-select",
    size = "medium",
    list = [],
  } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={id}
        value={value}
        label={label}
        onChange={onSelectionChange}
        size={size}
        displayEmpty
        renderValue={value !== "" ? undefined : () => "placeholder text"}
      >
        {list.map((item) => (
          <MenuItem value={item.id} name={item.label} key={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
