import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./customerqanda.module.css";

const CustomerQAndA = () => {
  const [activeTab, setActiveTab] = useState(0);
  const titles = ["Unanswered", "Answered"];

  // const [tabSelected, setTabSelected] = useState("Products to approve");

  const returnTabs = () => {
    return titles.map((val, index) => {
      return (
        <Box
          onClick={() => {
            setActiveTab(index);
            // setTabSelected(val);
          }}
          className={`px-4 py-1 border fs-14 cursor-pointer 
          ${activeTab === index ? styles.activeTab : styles.inActivetab}
          `}
          key={val}
        >
          <Typography className="cursor-pointer fs-14">{val}</Typography>
        </Box>
      );
    });
  };

  return (
    <>
      <Box>
        <Box className="d-flex mt-3">{returnTabs()}</Box>
      </Box>
    </>
  );
};

export default CustomerQAndA;
