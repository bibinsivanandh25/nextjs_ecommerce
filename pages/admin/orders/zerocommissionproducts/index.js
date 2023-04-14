import TableComponent from "@/atoms/TableComponent";
import { Box, Grid, Paper } from "@mui/material";
import TabsCard from "components/molecule/TabsCard";
import React, { useState } from "react";

const myQueriescolumns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "VendorId/Name",
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
    label: "Order Status",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4", //  id value in column should be presented in row as key
    label: "Order ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5", //  id value in column should be presented in row as key
    label: "Order Type",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6", //  id value in column should be presented in row as key
    label: "Reseller Details",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7", //  id value in column should be presented in row as key
    label: "Gross Sell Amount",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8", //  id value in column should be presented in row as key
    label: "Billing Address",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9", //  id value in column should be presented in row as key
    label: "Vendor Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10", //  id value in column should be presented in row as key
    label: "Reseller Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11", //  id value in column should be presented in row as key
    label: "Multestore Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12", //  id value in column should be presented in row as key
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const Zerocommissionproducts = () => {
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
        <Paper className="py-3">
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

export default Zerocommissionproducts;
