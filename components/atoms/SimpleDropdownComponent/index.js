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
        sx={{
          "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
            fontSize,
          },
        }}
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
