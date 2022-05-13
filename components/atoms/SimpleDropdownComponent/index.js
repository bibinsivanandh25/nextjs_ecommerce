import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";

const SimpleDropdownComponent = ({
  list = [],
  id = "dropdownid",
  label = "",
  size = "medium",
  fullWidth = true,
  value = null,
  onDropdownSelect = () => {},
  error = false,
  placeholder = "",
  fontSize = "",
  inputlabelshrink = false,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
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
        getOptionLabel={(option) => option.label || ""}
        sx={{
          "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
            fontSize,
          },
        }}
        onInputChange={(e) => setInputValue(e.target.value)}
        className={className}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            error={error}
            helperText={error}
            InputLabelProps={{
              shrink: value?.id || inputValue ? true : inputlabelshrink,
              fontSize: fontSize && "0.8rem",
            }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default SimpleDropdownComponent;
