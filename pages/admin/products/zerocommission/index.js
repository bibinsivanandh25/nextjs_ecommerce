/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import toastify from "services/utils/toastUtils";
import ProductsToApprove from "@/forms/admin/products/zerocomission/ProductsToApprove";
import Rejected from "@/forms/admin/products/zerocomission/Rejected";
import Queries from "@/forms/admin/products/zerocomission/Queries";
import Active from "@/forms/admin/products/zerocomission/ActiveProducts";
import Updated from "@/forms/admin/products/zerocomission/Updated";

const ZeroCommission = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([
    { label: "Products to approve", isSelected: true },
    { label: "Queries", isSelected: false },
    { label: "Active", isSelected: false },
    { label: "Updated", isSelected: false },
    { label: "Rejected", isSelected: false },
  ]);

  const callApi = (type, payload) => {
    // eslint-disable-next-line consistent-return
    const { data } = getAdminProductsByFilter(payload);
    if (data) {
      return { [`${type}`]: data };
    }
    return null;
  };

  const getCount = async () => {
    const status = ["INITIATED", "APPROVED", "REJECTED"];
    const promiseArr = [];
    status.forEach((ele) => {
      if (ele === "INITIATED") {
        promiseArr.push(
          callApi("INITIATED", {
            categoryIds: [],
            subCategoryIds: [],
            brandNames: [],
            productVariationIds: [],
            dateFrom: "",
            dateTo: "",
            commissionType: "ZERO_COMMISSION",
            status: ele,
          })
        );
      }
      if (ele === "APPROVED") {
        promiseArr.push(
          callApi("APPROVED", {
            categoryIds: [],
            subCategoryIds: [],
            brandNames: [],
            productVariationIds: [],
            dateFrom: "",
            dateTo: "",
            commissionType: "ZERO_COMMISSION",
            status: ele,
          })
        );
      }
      if (ele === "REJECTED") {
        promiseArr.push(
          callApi("REJECTED", {
            categoryIds: [],
            subCategoryIds: [],
            brandNames: [],
            productVariationIds: [],
            dateFrom: "",
            dateTo: "",
            commissionType: "ZERO_COMMISSION",
            status: ele,
          })
        );
      }
    });

    const temp = await Promise.all(promiseArr);
    const tabs = JSON.parse(JSON.stringify(tabList));
    temp.forEach((item) => {
      if (!item) return;
      if (Object.keys(item)[0] === "INITIATED") {
        tabs.map((element) => {
          if (element.label === "Products to approve")
            return (element.label += `( ${
              item[Object.keys(item)[0]]?.count
                ? item[Object.keys(item)[0]]?.count
                : 0
            } )`);
          return element;
        });
      }
      if (Object.keys(item)[0] === "REJECTED") {
        tabs.map((element) => {
          if (element.label === "Rejected")
            return (element.label += `( ${
              item[Object.keys(item)[0]]?.count
                ? item[Object.keys(item)[0]]?.count
                : 0
            } )`);
          return element;
        });
      }
      if (Object.keys(item)[0] === "APPROVED") {
        tabs.map((element) => {
          if (element.label === "Active")
            return (element.label += `( ${
              item[Object.keys(item)[0]]?.count
                ? item[Object.keys(item)[0]]?.count
                : 0
            } )`);
          return element;
        });
      }
    });
    setTabList([...tabs]);
  };

  useEffect(() => {
    getCount();
    // setTabList([...temp]);
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
      {" "}
      <Box>
        <TabsCard
          tabList={tabList}
          onSelect={(index) => {
            handleSelect(index);
          }}
        >
          <Box className="px-1 pt-2">
            {activeTab === 0 && <ProductsToApprove getCount={getCount} />}

            {activeTab === 4 && <Rejected getCount={getCount} />}

            {activeTab === 1 && <Queries getCount={getCount} />}

            {activeTab === 2 && <Active getCount={getCount} />}

            {activeTab === 3 && <Updated getCount={getCount} />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default ZeroCommission;
