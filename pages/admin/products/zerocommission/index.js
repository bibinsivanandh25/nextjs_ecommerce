/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import ProductsToApprove from "@/forms/admin/products/zerocomission/ProductsToApprove";
import Rejected from "@/forms/admin/products/zerocomission/Rejected";
import Queries from "@/forms/admin/products/zerocomission/Queries";
import Active from "@/forms/admin/products/zerocomission/ActiveProducts";
import Updated from "@/forms/admin/products/zerocomission/Updated";

const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Products to approve", isSelected: true },
    { label: "Queries", isSelected: false },
    { label: "Active", isSelected: false },
    { label: "Update", isSelected: false },
    { label: "Rejected", isSelected: false },
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
            {activeTab === 0 && <ProductsToApprove />}

            {activeTab === 4 && <Rejected />}

            {activeTab === 1 && <Queries />}

            {activeTab === 2 && <Active />}

            {activeTab === 3 && <Updated />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default FixedMargin;
