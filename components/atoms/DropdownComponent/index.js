import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Grid } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DropdownComponent = (props) => {
  const {
    list = [],
    id = "dropdownid",
    label = "",
    size = "medium",
    fullWidth = true,
    value = [],
    onDropdownSelect = () => {},
    error = false,
    placeholder = "",
  } = props;

  const [values, setValues] = useState([]);

  const handleClick = (option, selected) => {
    const filter = values.findIndex((i) => i.id === option.id);
    if (filter === -1) {
      setValues([...values, option]);
    } else {
      setValues(values.filter((i) => i.id !== option.id));
    }
  };

  useEffect(() => {
    onDropdownSelect(values);
  }, [values]);

  const handleCheck = (option) => {
    return value.findIndex((o) => o.id === option.id) !== -1;
  };

  return (
    <>
      <Autocomplete
        multiple
        id={id}
        options={list}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <Grid {...props} justifyContent="space-between">
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={handleCheck(option)}
              onClick={() => handleClick(option, selected)}
            />
            {option.label}
          </Grid>
        )}
        // value={value}
        // onChange={(event, newValue) => onDropdownSelect(newValue)}
        size={size}
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={error}
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default DropdownComponent;
