import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const SimpleDropdownComponent = ({
  list = [],
  id = "dropdownid",
  label = "",
  size = "medium",
  fullWidth = true,
  value = null,
  onDropdownSelect = () => {},
  placeholder = "",
  fontSize = "",
  inputlabelshrink = false,
  className = "",
  helperText = null,
  required = false,
  removeRadius = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red", fontWeight: 700, fontSize: 22 },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        value={value}
        onChange={(_event, newValue) => {
          onDropdownSelect(newValue);
        }}
        clearOnBlur={false}
        id={id}
        options={list}
        size={size}
        fullWidth={fullWidth}
        getOptionLabel={(option) => option.label || ""}
        sx={
          !removeRadius
            ? {
                "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                  fontSize,
                },
              }
            : {
                "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                  fontSize,
                },
                "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }
        }
        onInputChange={(e) => setInputValue(e?.target?.value)}
        className={className}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            error={Boolean(helperText)}
            helperText={helperText}
            InputLabelProps={{
              shrink: value?.id || inputValue ? true : inputlabelshrink,
              fontSize: fontSize && "0.8rem",
            }}
            required={required}
            placeholder={placeholder}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default SimpleDropdownComponent;
