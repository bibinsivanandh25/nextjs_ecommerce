import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

const CustomDatePickerComponent = ({
  value = null,
  onDateChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDate = () => {
    if (value) {
      const selectedDate = new Date(value);
      return `${selectedDate.getDate()} ${
        selectedDate.getMonth() + 1
      } ${selectedDate.getFullYear()}`;
    }
    return "dd mm yyyy";
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={onDateChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
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
