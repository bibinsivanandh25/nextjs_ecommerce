import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const DatePickerComponent = (props) => {
  const {
    label = "",
    fullWidth = true,
    size = "medium",
    disableFuture = false,
    value = null,
    onDateChange = () => {},
    error = "",
    inputlabelshrink = false,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        disableFuture={disableFuture}
        fullWidth={fullWidth}
        onChange={(newData) => onDateChange(newData)}
        inputFormat="dd/mm/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={fullWidth}
            size={size}
            InputLabelProps={{
              shrink: inputlabelshrink || value,
            }}
          />
        )}
      />
      <div className="errorContainer">{error}</div>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
