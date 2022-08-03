/* eslint-disable no-param-reassign */
import { Box, Typography } from "@mui/material";
import TabModalComponent from "components/molecule/TabModalComponent";
import React, { useState } from "react";

const list = [
  {
    isSelected: false,
    label: "one",
  },
  {
    isSelected: false,
    label: "two",
  },
  {
    isSelected: false,
    label: "three",
  },
];
const ActiveCustomerViewModal = () => {
  const [tabListData, setTabListData] = useState(list);
  const handleTabChange = (id) => {
    const data = [...tabListData];
    data.forEach((item, index) => {
      if (index === id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    console.log(data, "data");
    setTabListData(data);
  };
  return (
    <TabModalComponent
      tabList={tabListData}
      onSelect={(id) => {
        handleTabChange(id);
      }}
      ModalWidth={800}
    >
      <Box className="overflow-auto hide-scrollbar">
        <Typography>sdgsdg</Typography>
      </Box>
    </TabModalComponent>
  );
};

export default ActiveCustomerViewModal;
