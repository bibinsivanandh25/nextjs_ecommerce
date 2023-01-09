/* eslint-disable no-param-reassign */
import InputBox from "@/atoms/InputBoxComponent";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getActiveMarketingToolNames,
  getProductsByMarketingTool,
} from "services/customer/couponapplicableproducts";

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
  });
  const [productdetails, setProductDetails] = useState([]);
  const [searchText, setSearchText] = useState("");

  const mainRef = useRef(null);
  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, []);

  const { supplierId, profileId } = useSelector((state) => state.customer);
  const getAllTabNames = async () => {
    const { data } = await getActiveMarketingToolNames(supplierId);
    if (data) {
      setSelectedTab({
        ind: 0,
        id: data[0]?.purchaseId,
      });
      const temp = JSON.parse(JSON.stringify(intialTabs));
      data?.forEach((ele) => {
        temp.forEach((item) => {
          if (item.enum === ele.marketingTools) {
            item.id = ele.purchaseId;
          }
        });
      });
      setTabNames(temp);
    }
  };

  useEffect(() => {
    getAllTabNames();
  }, []);

  const getProducts = async (keyword) => {
    const payload = {
      purchaseId: selectedTab.id,
      profileId,
      keyword: keyword ?? searchText ?? "",
    };
    const { data } = await getProductsByMarketingTool(payload);
    if (data) {
      const temp = [];
      data.forEach((ele) => {
        temp.push({
          campaignName: ele.campaignTitle,
          products: ele.productResponse.map((item) => ({
            id: item.productId,
            title: item.productTitle,
            price: item.salePrice,
            salePriceWithLogistics: item.salePriceWithLogistics,
            image: item.variationMedia,
            rating: {
              rate: item.averageRatings,
              count: item.totalRatings,
            },
            isWishlisted: item.wishlisted,
            skuId: item.skuId,
            wishlistId: item.wishlistId,
            userCartId: item.userCartId,
            isCarted: item.presentInCart,
          })),
        });
      });
      setProductDetails([...temp]);
    }
  };

  useEffect(() => {
    if (selectedTab.id) {
      getProducts();
    }
  }, [selectedTab.id]);

  const getTabs = () => {
    return tabNames.map((ele, ind) => {
      return (
        <Box
          onClick={() => {
            setSelectedTab({
              id: ele.id,
              ind,
            });
          }}
          key={ele.id}
          className={`px-3 text-capitalize h-5 py-1 border rounded-pill me-3 ${
            ind === 0 ? "ms-5" : ""
          } ${selectedTab.ind === ind ? "border-orange color-orange" : ""}`}
        >
          {ele.name}
        </Box>
      );
    });
  };

  const renderProducts = () => {
    return productdetails?.map((ele) => {
      return (
        <Box className="ms-5">
          <Typography className="fw-bold ms-2">
            <span className="fw-500 h-5 color-orange"> Campaign Title</span> :{" "}
            {ele.campaignName}
          </Typography>
          <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar">
            {ele?.products?.map((product) => {
              return <ProductCard item={product} />;
            })}
          </Box>
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
        <Typography className="fw-bold">Coupons Applicable Products</Typography>
        <Box className="d-flex w-25">
          <InputBox
            label="Search Coupon Applicable Products"
            placeholder="Search Coupon Applicable Products"
            value={searchText}
            className="w-100 mx-2"
            onInputChange={(e) => {
              setSearchText(e.target.value);
              if (e.target.value === "") {
                getProducts("");
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
                getProducts();
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box className="d-flex align-items-center mt-1 mb-2">{getTabs()}</Box>
      <Box className="mnh-79vh oveflow-auto hide-scrollbar">
        {renderProducts()}
      </Box>
    </>
  );
};
export default CouponApplicableProducts;
