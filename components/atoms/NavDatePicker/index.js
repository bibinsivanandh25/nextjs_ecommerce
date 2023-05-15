import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { AiOutlineCalendar } from "react-icons/ai";
import { format } from "date-fns";

const NavDatePicker = ({ value = null, onDateChange = () => {} }) => {
  const dateFromRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  return (
    <Box
      className="d-flex align-items-center justify-content-center cursor-pointer"
      onClick={() => {
        dateFromRef.current.showPicker();
      }}
    >
      <span className=" bg-orange mx-1 rounded">
        <AiOutlineCalendar className="m-1 color-white" />
      </span>
      <span className="cursor-pointer">
        {selectedDate !== ""
          ? format(new Date(selectedDate), "MM-dd-yyyy")
          : "mm-dd-yyyy"}
      </span>
      <input
        ref={dateFromRef}
        type="date"
        className="position-absolute invisible"
        onChange={(e) => {
          setSelectedDate(e.target.value);
          onDateChange(e.target.value);
        }}
      />
    </Box>
  );
};

export default NavDatePicker;
