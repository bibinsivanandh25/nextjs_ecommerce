/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import TodaysDealToolsToApprove from "@/forms/admin/marketingtools&subscriptions/approval/todaysdeal/toolstoapprove";
import TodaysDealRejected from "@/forms/admin/marketingtools&subscriptions/approval/todaysdeal/rejected";
import TodaysDealApprove from "@/forms/admin/marketingtools&subscriptions/approval/todaysdeal/approve";

const PriceTargeted = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Tools To Approve", isSelected: true },
    { label: "Rejected", isSelected: false },
    { label: "Approved", isSelected: false },
  ]);

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
      <Box>
        <TabsCard
          tabList={tabList}
          onSelect={(index) => {
            handleSelect(index);
          }}
        >
          <Box className="px-1 pt-2">
            {/* {activeTab === 0 && <Approved getCount={getCount} />} */}
            {activeTab === 0 && <TodaysDealToolsToApprove />}
            {activeTab === 1 && <TodaysDealRejected />}
            {activeTab === 2 && <TodaysDealApprove />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default PriceTargeted;
