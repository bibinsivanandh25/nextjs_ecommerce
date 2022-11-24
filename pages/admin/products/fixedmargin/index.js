/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
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
import { getAllProductsCount } from "services/admin/products";

const ZeroCommission = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Products to approve", isSelected: true },
    { label: "Queries", isSelected: false },
    { label: "Active", isSelected: false },
    { label: "Updated", isSelected: false },
    { label: "Rejected", isSelected: false },
  ]);

  const getCount = async () => {
    const { data } = await getAllProductsCount("FIXED_COMMISSION");
    if (data) {
      const tab = JSON.parse(JSON.stringify(tabList));
      tab.map((element) => {
        if (element.id === "Products to approve")
          return (element.label = `${element.id}( ${
            data?.data?.INITIATED ?? 0
          } )`);
        if (element.id === "Queries")
          return (element.label = `${element.id}( ${
            data?.data?.IN_QUERY ?? 0
          } )`);
        if (element.id === "Active")
          return (element.label = `${element.id}( ${
            data?.data?.APPROVED ?? 0
          } )`);
        if (element.id === "Updated")
          return (element.label = `${element.id}( ${
            data?.data?.UPDATED ?? 0
          } )`);
        if (element.id === "Rejected")
          return (element.label = `${element.id}( ${
            data?.data?.REJECTED ?? 0
          } )`);
        return element;
      });
      setTabList(tab);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

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
            getCount();
          }}
        >
          <Box className="px-1 pt-2">
            {activeTab === 0 && (
              <ProductsToApprove
                getCount={getCount}
                commissionType="FIXED_COMMISSION"
              />
            )}
            {activeTab === 1 && (
              <Queries getCount={getCount} commissionType="FIXED_COMMISSION" />
            )}
            {activeTab === 2 && (
              <Active getCount={getCount} commissionType="FIXED_COMMISSION" />
            )}
            {activeTab === 3 && (
              <Updated getCount={getCount} commissionType="FIXED_COMMISSION" />
            )}
            {activeTab === 4 && (
              <Rejected getCount={getCount} commissionType="FIXED_COMMISSION" />
            )}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default ZeroCommission;
