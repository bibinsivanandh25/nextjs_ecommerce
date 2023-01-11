/* eslint-disable no-param-reassign */
import InputBox from "@/atoms/InputBoxComponent";
// import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getActiveMarketingToolNames } from "services/customer/couponapplicableproducts";
import TODAYSDEAL from "./todaysDeal";
import ScratchCard from "./scratchCard";

const CouponApplicableProducts = () => {
  const intialTabs = [
    {
      id: null,
      name: "Today's Deal",
      enum: "TODAYS_DEAL",
    },
    {
      id: null,
      name: "Scratch Card",
      enum: "SCRATCH_CARD",
    },
    {
      id: null,
      name: "Spin Wheel",
      enum: "SPIN_WHEEL",
    },
    {
      id: null,
      name: "Quiz",
      enum: "QUIZ",
    },
    {
      id: null,
      name: "Discount Coupon",
      enum: "DISCOUNT_COUPON",
    },
  ];
  const [tabNames, setTabNames] = useState([]);
  const [selectedTab, setSelectedTab] = useState({
    ind: 0,
    id: null,
    name: "",
  });
  const [searchText, setSearchText] = useState("");
  const childRef = useRef();
  const mainRef = useRef(null);
  const [Component, setComponent] = useState(null);

  const getTabComponent = (name) => {
    switch (name) {
      case "Today's Deal": {
        // return <TODAYSDEAL purchaseId={selectedTab.id} ref={childRef} />;
        setComponent(TODAYSDEAL);
        break;
      }
      case "Scratch Card": {
        // return <ScratchCard purchaseId={selectedTab.id} ref={childRef} />;
        setComponent(ScratchCard);
        break;
      }
      default: {
        setComponent(null);
        break;
      }
    }
  };

  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView(0, 0);
    }
  }, []);

  const { supplierId } = useSelector((state) => state.customer);

  const getAllTabNames = async () => {
    const { data } = await getActiveMarketingToolNames(supplierId);
    if (data) {
      const temp = JSON.parse(JSON.stringify(intialTabs));
      data?.forEach((ele) => {
        temp.forEach((item) => {
          if (item.enum === ele.marketingTools) {
            item.id = ele.purchaseId;
          }
        });
      });
      setTabNames(temp);
      setSelectedTab({
        ind: 0,
        id: data[0]?.purchaseId ?? null,
        name: "Today's Deal",
      });
    }
  };

  useEffect(() => {
    getAllTabNames();
  }, []);
  useEffect(() => {
    if (selectedTab) {
      getTabComponent(selectedTab.name);
    }
    console.log(selectedTab);
  }, [selectedTab]);

  const getTabs = () => {
    return tabNames.map((ele, ind) => {
      return (
        <Box
          onClick={() => {
            setSelectedTab(() => ({
              id: ele.id,
              ind,
              name: ele.name,
            }));
          }}
          key={ele.name}
          className={`px-3 cursor-pointer text-capitalize h-5 py-1 border rounded-pill me-3  ${
            selectedTab.ind === ind ? "border-orange color-orange shadow" : ""
          }`}
        >
          {ele.name}
        </Box>
      );
    });
  };

  return (
    <>
      <Box
        className="mx-4 d-flex justify-content-between align-items-center"
        ref={mainRef}
      >
        <Typography className="fw-bold ms-4">
          Coupons Applicable Products
        </Typography>
        <Box className="d-flex w-30p">
          <InputBox
            label="Search Coupon Applicable Products"
            placeholder="Search Coupon Applicable Products"
            value={searchText}
            className="w-100 mx-2"
            onInputChange={(e) => {
              setSearchText(e.target.value);
              if (e.target.value === "") {
                childRef.current("");
              }
            }}
          />
          <Box
            style={{ width: "40px", height: "38px" }}
            className={`bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ${
              searchText === "" ? "bg-gray" : ""
            }`}
          >
            <SearchOutlinedIcon
              style={{ color: "white" }}
              onClick={() => {
                childRef.current(searchText);
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box className="mx-5">
        <Box className="d-flex flex-row align-items-center mt-1 mb-2">
          {getTabs()}
        </Box>
        {Component !== null && (
          <Component purchaseId={selectedTab.id} ref={childRef} />
        )}
      </Box>
    </>
  );
};
export default CouponApplicableProducts;
