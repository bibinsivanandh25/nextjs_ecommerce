/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import PriceTargetedToApproved from "@/forms/admin/marketingtools&subscriptions/approval/priceTargeted/toolstoapprove";
import PriceTargetedRejected from "@/forms/admin/marketingtools&subscriptions/approval/priceTargeted/rejected";
import PriceTargetedApproved from "../../../../../components/forms/admin/marketingtools&subscriptions/approval/priceTargeted/approve";

const PriceTargeted = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Tools To Approve", isSelected: true },
    { label: "Approved", isSelected: false },
    { label: "Rejected", isSelected: false },
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
            {activeTab === 0 && <PriceTargetedToApproved />}
            {activeTab === 1 && <PriceTargetedApproved />}
            {activeTab === 2 && <PriceTargetedRejected />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default PriceTargeted;
