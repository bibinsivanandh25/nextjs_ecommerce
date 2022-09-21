/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import Unanswered from "@/forms/admin/products/customerqanda/Unanswered";
import Answered from "@/forms/admin/products/customerqanda/Answered";

const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Unanswered", isSelected: true },
    { label: "Answered", isSelected: false },
  ]);

  useEffect(() => {}, [activeTab]);

  const handleSelect = (index) => {
    setTabList((list) => {
      const theList = list;
      theList.forEach((val, forEachIndex) => {
        if (forEachIndex === index) {
          const theVal = val;
          theVal.isSelected = true;
        } else {
          const theVal = val;
          theVal.isSelected = false;
        }
      });
      return theList;
    });
    setActiveTab(index);
  };

  return (
    <>
      {" "}
      <Box>
        <TabsCard
          tabList={tabList}
          onSelect={(index) => {
            handleSelect(index);
          }}
        >
          <Box className="px-1 pt-2">
            {activeTab === 0 && <Unanswered />}

            {activeTab === 1 && <Answered />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default FixedMargin;
