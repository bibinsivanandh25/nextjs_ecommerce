/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box } from "@mui/material";
import React, { useState } from "react";
import NavDatePicker from "@/atoms/NavDatePicker";

const NavTabComponent = ({
  listData = [],
  getFromDate = () => {},
  getToDate = () => {},
  onTabCilck = () => {},
}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  return (
    <Box className="d-flex">
      <Box className="border rounded py-2 d-flex justify-content-between">
        {listData.map((item) => (
          <p
            className={`cursor-pointer h-5 ps-3 pe-3 ${
              selectedId === item.id && `color-orange`
            }`}
            onClick={() => {
              setSelectedId(item.id);
              onTabCilck(item.title);
            }}
            style={{
              borderRight: listData?.length > item.id ? "1px solid gray" : "",
            }}
          >
            {item.title}
          </p>
        ))}
      </Box>
      <Box className="d-flex ms-4">
        <Box className="d-flex align-items-center h-5">
          <span>From Date :</span>
        </Box>
        <NavDatePicker
          value={fromDate}
          onDateChange={(val) => {
            setFromDate(val);
            getFromDate(val);
          }}
        />
      </Box>
      <Box className="d-flex ms-4">
        <Box className="d-flex align-items-center h-5">
          <span>To Date :</span>
        </Box>
        <NavDatePicker
          value={toDate}
          onDateChange={(val) => {
            setToDate(val);
            getToDate(val);
          }}
        />
      </Box>
    </Box>
  );
};

export default NavTabComponent;
