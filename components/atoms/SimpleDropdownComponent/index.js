import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";

const SimpleDropdownComponent = (props) => {
  const {
    list = [],
    id = "dropdownid",
    label = "",
    size = "medium",
    fullWidth = true,
    value = "",
    onDropdownSelect = () => {},
    error = "",
    placeholder = "",
  } = props;
  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onDropdownSelect(newValue);
        }}
        clearOnBlur={false}
        id={id}
        options={list}
        size={size}
        fullWidth={fullWidth}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            error={error}
            helperText={error}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default SimpleDropdownComponent;
