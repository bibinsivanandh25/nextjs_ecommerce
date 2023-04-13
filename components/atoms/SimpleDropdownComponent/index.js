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
  disabled = false,
  removeRadius = false,
  freeSolo = false,
  readOnly = false,
  disableClearable = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "#dd5e5e", fontWeight: 700, fontSize: 22 },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disabled={disabled}
        freeSolo={freeSolo}
        value={value}
        disableClearable={disableClearable}
        onChange={(_event, newValue) => {
          onDropdownSelect(newValue);
        }}
        clearOnBlur={false}
        id={id}
        options={list}
        size={size}
        fullWidth={fullWidth}
        getOptionLabel={(option) => {
          return typeof option.label === "object"
            ? option.id
            : option.label || "";
        }}
        isOptionEqualToValue={(option, val) =>
          option?.id === val?.id || option.value === val.value
        }
        InputProps={{
          readOnly,
        }}
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
        renderOption={(props, option) => {
          const { title } = option;
          return (
            <span {...props} style={{ backgroundColor: "#fff" }}>
              {title || option.label}
            </span>
          );
        }}
      />
    </ThemeProvider>
  );
};

export default SimpleDropdownComponent;
