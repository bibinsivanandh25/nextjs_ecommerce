/* eslint-disable no-param-reassign */
import { Box } from "@mui/material";
import TabModalComponent from "components/molecule/TabModalComponent";
import React, { useState } from "react";
import BrowsingHistory from "../browsinghistory";
import CartItems from "../cartitems";
import CustomerAddress from "../customeraddress";
import Details from "../details";
import OrderHistory from "../orderhistory";
import ProductReview from "../productreview";
import Recentlyviewedproducts from "../recentlyviewedproducts";
import StoreDetails from "../storedetails";
import Wishlists from "../wishlists";

const list = [
  {
    isSelected: true,
    label: "Details",
    tabWidth: "60px",
  },
  {
    isSelected: false,
    label: "Address",
    tabWidth: "70px",
  },
  {
    isSelected: false,
    label: "Browsing History",
    tabWidth: "100px",
  },
  {
    isSelected: false,
    label: "Recently viewed products",
    tabWidth: "200px",
  },
  {
    isSelected: false,
    label: "Stores",
    tabWidth: "60px",
  },
  {
    isSelected: false,
    label: "Order history",
    tabWidth: "100px",
  },
  {
    isSelected: false,
    label: "Comments",
    tabWidth: "65px",
  },
  {
    isSelected: false,
    label: "Product reviews",
    tabWidth: "100px",
  },
  {
    isSelected: false,
    label: "Wishlists",
    tabWidth: "70px",
  },
  {
    isSelected: false,
    label: "Cart items",
    tabWidth: "100px",
  },
];
const ActiveCustomerViewModal = ({
  viewModalOpen,
  setViewModalOpen = () => {},
  selectedData = {},
}) => {
  const [tabListData, setTabListData] = useState(
    JSON.parse(JSON.stringify(list))
  );
  const [selectedTab, setSelectedTab] = useState("Details");

  const renderPage = (value) => {
    switch (value) {
      case "Details":
        return <Details selectedData={selectedData} />;
      case "Address":
        return <CustomerAddress selectedData={selectedData} />;
      case "Browsing History":
        return <BrowsingHistory selectedData={selectedData} />;
      case "Recently viewed products":
        return <Recentlyviewedproducts selectedData={selectedData} />;
      case "Stores":
        return <StoreDetails selectedData={selectedData} />;
      case "Order history":
        return <OrderHistory selectedData={selectedData} />;
      case "Product reviews":
        return <ProductReview selectedData={selectedData} />;
      case "Wishlists":
        return <Wishlists selectedData={selectedData} />;
      case "Cart items":
        return <CartItems selectedData={selectedData} />;
      default:
        return null;
    }
  };
  const handleTabChange = (id, value) => {
    const data = [...JSON.parse(JSON.stringify(tabListData))];
    data.forEach((item, index) => {
      if (index === id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setTabListData(data);
    setSelectedTab(value.label);
  };
  return (
    <Box>
      <TabModalComponent
        tabList={tabListData}
        onSelect={(id, item) => {
          handleTabChange(id, item);
        }}
        open={viewModalOpen}
        close={() => {
          setViewModalOpen(false);
        }}
      >
        <Box className="mnh-500 mxh-500 overflow-auto hide-scrollbar mt-1">
          {renderPage(selectedTab)}
        </Box>
      </TabModalComponent>
    </Box>
  );
};

export default ActiveCustomerViewModal;
