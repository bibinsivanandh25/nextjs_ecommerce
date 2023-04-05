import TableComponent from "@/atoms/TableComponent";
import { Box, Grid, Paper } from "@mui/material";
import TabsCard from "components/molecule/TabsCard";
import React, { useState } from "react";
// import  from "react";

const myQueriescolumns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Order Status",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2", //  id value in column should be presented in row as key
    label: "Quantity",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3", //  id value in column should be presented in row as key
    label: "Order Id",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4", //  id value in column should be presented in row as key
    label: "Order Type",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5", //  id value in column should be presented in row as key
    label: "Reseller Detail",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6", //  id value in column should be presented in row as key
    label: "Gross Sells Amount",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7", //  id value in column should be presented in row as key
    label: "Billing Address",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8", //  id value in column should be presented in row as key
    label: "Vendor Earning",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9", //  id value in column should be presented in row as key
    label: "Reseller Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10", //  id value in column should be presented in row as key
    label: "Multestore Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11", //  id value in column should be presented in row as key
    label: "Delivery Partner",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12", //  id value in column should be presented in row as key
    label: "Delivery Status",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col13", //  id value in column should be presented in row as key
    label: "Charges",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col14", //  id value in column should be presented in row as key
    label: "Order Created Date",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col15", //  id value in column should be presented in row as key
    label: "Weight/Volume",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col16", //  id value in column should be presented in row as key
    label: "Comments",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col17", //  id value in column should be presented in row as key
    label: "Supplier Id",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col18", //  id value in column should be presented in row as key
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const Fixedcommissionproducts = () => {
  const [mianTabs, setMainTabs] = useState([
    {
      label: "All",
      isSelected: true,
    },
    { label: "Pending Payments", isSelected: false },
    { label: "Processing", isSelected: false },
    { label: "On Hold", isSelected: false },
    { label: "Payment Completed", isSelected: false },
    { label: "Cancelled", isSelected: false },
    { label: "Refunded", isSelected: false },
    { label: "Returned", isSelected: false },
    { label: "Falied", isSelected: false },
    { label: "Payment Settled", isSelected: false },
  ]);
  const [ActiveTab, setActiveTab] = useState(0);
  const handleSelect = (index) => {
    setMainTabs((list) => {
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
    <Box>
      <Grid>
        <TabsCard
          tabList={mianTabs}
          onSelect={(index) => {
            handleSelect(index);
          }}
        />
        <Paper className="">
          {ActiveTab == 0 ? (
            <TableComponent
              table_heading="Products Table"
              columns={myQueriescolumns}
              showDateFilter
              showDateFilterDropDown
              // handlePageEnd={(searchText, _, page = pageNumber, dates) => {
              //   getMyQueriesTableData(page, searchText, dates);
              // }}
              // tableRows={myQueriesRows}
              // tabChange={value}
              // tableRows={mapRowsToTable}
            />
          ) : (
            <></>
          )}
        </Paper>
      </Grid>
    </Box>
  );
};

export default Fixedcommissionproducts;
