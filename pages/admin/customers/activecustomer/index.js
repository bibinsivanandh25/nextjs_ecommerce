import { Box } from "@mui/material";
import React from "react";
import TableComponent from "@/atoms/TableComponent";

const activeCustomer = [
  {
    id: "col1",
    label: "S.NO",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Customer ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col4",
    label: "Email & Mobile",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "DOB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Linked also as Vendor",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Total Orders",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Amount Spend",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Recent Order",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Login Status",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Browsing History",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Action",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const ActiveCustomer = () => {
  return (
    <Box>
      <Box className="mt-1">
        <TableComponent
          showDateFilter
          showDateFilterBtn
          //   table_heading="Active Customers"
          dateFilterBtnName="Create Customer"
          stickyCheckBox
          columns={activeCustomer}
          tHeadBgColor="bg-white"
          showCheckbox
        />
      </Box>
    </Box>
  );
};

export default ActiveCustomer;
