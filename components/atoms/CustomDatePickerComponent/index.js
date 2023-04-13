import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
// import DatePicker from "@mui/lab/DatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePickerComponent = ({
  value = null,
  onDateChange = () => {},
  showToolbar = false,
  disablePast = false,
  disableFuture = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDate = () => {
    if (value) {
      const selectedDate = new Date(value);
      return `${selectedDate.getDate()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getFullYear()}`;
    }
    return "dd-mm-yyyy";
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        componentsProps={{
          actionBar: {
            actions: ["clear"],
          },
        }}
        showToolbar={showToolbar}
        disableFuture={disableFuture}
        disablePast={disablePast}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={onDateChange}
        // eslint-disable-next-line no-unused-vars
        renderInput={({ inputRef, _inputProps, InputProps }) => (
          <Box
            ref={inputRef}
            sx={{
              svg: {
                color: "#fff",
                bgcolor: "#e56700",
                borderRadius: 1,
                p: 0.4,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="me-2">{InputProps?.endAdornment}</span>
            <span className="text-secondary fw-600">{getDate()}</span>
          </Box>
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePickerComponent;
