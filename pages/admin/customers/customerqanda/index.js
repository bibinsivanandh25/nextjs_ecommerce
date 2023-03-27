/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import Unanswered from "@/forms/admin/products/customerqanda/Unanswered";
import Answered from "@/forms/admin/products/customerqanda/Answered";
import { getAnsAndUnAnsData } from "services/admin/customers";

const tab = [
  { label: "Unanswered (0)", isSelected: true, id: "Unanswered" },
  { label: "Answered (0)", isSelected: false, id: "Answered" },
];
const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState([...tab]);

  const [pageNumber, setPageNumber] = useState(0);
  const [masterData, setMasterData] = useState(0);

  const getUnAnsweredData = async (
    page,
    search = "",
    fromdate = "",
    todate = ""
  ) => {
    const payload = {
      status: false,
      keyword: search,
      fromDate: fromdate,
      toDate: todate,
      pageNo: page,
      pageSize: 50,
    };

    const { data, err } = await getAnsAndUnAnsData(payload);
    if (data) {
      const temp = [...tabList];
      temp.forEach((item) => {
        if (item.id === "Unanswered") {
          item.label = `Unanswered (${data.count})`;
        }
      });
      setTabList([...temp]);
    }
    if (activeTab == 0) {
      if (data?.data?.length && page == 0) {
        setMasterData(data.data);
        setPageNumber(1);
      } else if (data?.data?.length && page !== 0) {
        setMasterData((pre) => [...pre, ...data.data]);
        setPageNumber((pre) => pre + 1);
      }
    }
    if (err) {
      setMasterData([]);
    }
  };
  const getAnsweredData = async (
    page,
    search = "",
    fromdate = "",
    todate = ""
  ) => {
    const payload = {
      status: true,
      keyword: search,
      fromDate: fromdate,
      toDate: todate,
      pageNo: page,
      pageSize: 50,
    };
    const { data, err } = await getAnsAndUnAnsData(payload);
    if (data) {
      const temp = [...tabList];
      temp.forEach((item) => {
        if (item.id === "Answered") {
          item.label = `Answered (${data.count})`;
        }
      });
      setTabList(temp);
    }
    if (activeTab == 1) {
      if (data?.data?.length && page == 0) {
        setMasterData(data?.data);
        setPageNumber(1);
      } else if (data?.data?.length && page !== 0) {
        setMasterData((pre) => [...pre, ...data.data]);
        setPageNumber((pre) => pre + 1);
      }
    }
    if (err) {
      setMasterData([]);
    }
  };

  const getBothCountCall = () => {
    getUnAnsweredData(0);
    getAnsweredData(0);
  };
  useEffect(() => {
    setPageNumber(0);
    getBothCountCall();
  }, [activeTab]);

  const handleSelect = (index) => {
    setActiveTab(index);
    const temp = [...JSON.parse(JSON.stringify(tabList))];
    temp.forEach((item, ind) => {
      if (ind === index) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setTabList([...temp]);
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
            {activeTab === 0 && (
              <Unanswered
                getUnAnsweredData={getUnAnsweredData}
                masterData={masterData}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                getBothCountCall={getBothCountCall}
              />
            )}
            {activeTab === 1 && (
              <Answered
                getAnsweredData={getAnsweredData}
                masterData={masterData}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                getBothCountCall={getBothCountCall}
              />
            )}
          </Box>
        </TabsCard>
      </Box>
    </>
  );
};

export default FixedMargin;
