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

  // const callApi = (type, payload) => {
  //   // eslint-disable-next-line consistent-return
  //   return getAdminProductsByFilter(payload)
  //     .then((res) => {
  //       return { [`${type}`]: res.data };
  //     })
  //     .catch(() => {
  //       return null;
  //     });
  // };

  // const getCount = async () => {
  //   const status = ["INITIATED", "APPROVED", "REJECTED"];
  //   const promiseArr = [];
  //   status.forEach((ele) => {
  //     if (ele === "INITIATED") {
  //       promiseArr.push(
  //         callApi("INITIATED", {
  //           categoryIds: [],
  //           subCategoryIds: [],
  //           brandNames: [],
  //           productVariationIds: [],
  //           dateFrom: "",
  //           dateTo: "",
  //           commissionType: "ZERO_COMMISSION",
  //           status: ele,
  //         })
  //       );
  //     }
  //     if (ele === "APPROVED") {
  //       promiseArr.push(
  //         callApi("APPROVED", {
  //           categoryIds: [],
  //           subCategoryIds: [],
  //           brandNames: [],
  //           productVariationIds: [],
  //           dateFrom: "",
  //           dateTo: "",
  //           commissionType: "ZERO_COMMISSION",
  //           status: ele,
  //         })
  //       );
  //     }
  //     if (ele === "REJECTED") {
  //       promiseArr.push(
  //         callApi("REJECTED", {
  //           categoryIds: [],
  //           subCategoryIds: [],
  //           brandNames: [],
  //           productVariationIds: [],
  //           dateFrom: "",
  //           dateTo: "",
  //           commissionType: "ZERO_COMMISSION",
  //           status: ele,
  //         })
  //       );
  //     }
  //   });

  //   await Promise.all(promiseArr).then((res) => {
  //     const tabs = JSON.parse(JSON.stringify(tabList));
  //     res?.forEach((item) => {
  //       if (!item) return;
  //       if (Object.keys(item)[0] === "INITIATED") {
  //         tabs.map((element) => {
  //           if (element.label === "Products to approve")
  //             return (element.label += `( ${
  //               item[Object.keys(item)[0]]?.count
  //                 ? item[Object.keys(item)[0]]?.count
  //                 : 0
  //             } )`);
  //           return element;
  //         });
  //       }
  //       if (Object.keys(item)[0] === "REJECTED") {
  //         tabs.map((element) => {
  //           if (element.label === "Rejected")
  //             return (element.label += `( ${
  //               item[Object.keys(item)[0]]?.count
  //                 ? item[Object.keys(item)[0]]?.count
  //                 : 0
  //             } )`);
  //           return element;
  //         });
  //       }
  //       if (Object.keys(item)[0] === "APPROVED") {
  //         tabs.map((element) => {
  //           if (element.label === "Active")
  //             return (element.label += `( ${
  //               item[Object.keys(item)[0]]?.count
  //                 ? item[Object.keys(item)[0]]?.count
  //                 : 0
  //             } )`);
  //           return element;
  //         });
  //       }
  //     });
  //     setTabList([...tabs]);
  //   });
  // };

  const getCount = async () => {
    const { data } = await getAllProductsCount("ZERO_COMMISSION");
    if (data) {
      const tab = JSON.parse(JSON.stringify(tabList));
      tab.map((element) => {
        if (element.label === "Products to approve")
          return (element.label += `( ${data?.data?.INITIATED ?? 0} )`);
        if (element.label === "Queries")
          return (element.label += `( ${data?.data?.IN_QUERY ?? 0} )`);
        if (element.label === "Active")
          return (element.label += `( ${data?.data?.APPROVED ?? 0} )`);
        if (element.label === "Updated")
          return (element.label += `( ${data?.data?.UPDATED ?? 0} )`);
        if (element.label === "Rejected")
          return (element.label += `( ${data?.data?.REJECTED ?? 0} )`);
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
          }}
        >
          <Box className="px-1 pt-2">
            {activeTab === 0 && <ProductsToApprove />}
            {activeTab === 1 && <Queries />}
            {activeTab === 2 && <Active />}
            {activeTab === 3 && <Updated />}
            {activeTab === 4 && <Rejected />}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default ZeroCommission;
