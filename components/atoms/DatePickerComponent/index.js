import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

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
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
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
          />
        )}
        errorText={error}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
