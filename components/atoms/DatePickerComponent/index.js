import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";

const DatePickerComponent = ({
  label = "",
  fullWidth = true,
  size = "medium",
  disableFuture = false,
  value = null,
  onDateChange = () => {},
  error = false,
  helperText = null,
  inputlabelshrink = false,
  required = false,
  className = "",
  disabled = false,
}) => {
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DesktopDatePicker
          label={label}
          value={value}
          disableFuture={disableFuture}
          fullWidth={fullWidth}
          onChange={(newData) => onDateChange(newData)}
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth={fullWidth}
              size={size}
              InputLabelProps={{
                shrink: inputlabelshrink || value,
              }}
              error={error}
              helperText={helperText}
              required={required}
              className={className}
            />
          )}
          errorText={error}
          disabled={disabled}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
