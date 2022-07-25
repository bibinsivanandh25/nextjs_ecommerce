/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import { useState } from "react";
import TableComponent from "@/atoms/TableWithSpan";

const DeliveryStatus = () => {
  const [navData, setNavData] = useState([
    { id: 1, title: "Today" },
    { id: 2, title: "Yesterday" },
    { id: 3, title: "Last 7 days" },
    { id: 4, title: "Last month" },
    { id: 5, title: "Last year" },
  ]);
  const column1 = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl.No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      id: "col2",
      label: "logistics partners",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      position: "sticky",
    },
    {
      label: "Total Orders",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 3,
    },
    {
      label: "Order Apporoval pending",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Order Picked up",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Orders in commute",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Orders Delivered",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Return Order approval pending",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Return Pickedup",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Return orders in commute",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "Return delivered",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      label: "RTO",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      colSpan: 2,
    },
    {
      id: "col24",
      label: "Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
    },
  ];

  const column2 = [
    {
      id: "col3",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "COD",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col12",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col13",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col14",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col15",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col16",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col17",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col18",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col19",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col20",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col21",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col22",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col23",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: "28 may 2021",
      col3: "1",
      col4: "sasdd",
      col5: "sda",
      col6: "asda",
      col7: "sdasd",
      col8: "sadsa",
      col9: "asld",
      col10: "popiio",
      col11: "opopopo",
      col12: "opoppoo",
      col13: "Rohan",
      col14: "Asdad",
      col15: "lorem",
      col16: "ipsum",
      col17: "sasfdf",
      col18: "adfasfas",
      col19: "ksdjh",
      col20: "sa;lmd",
      col21: "asdasf",
      col22: "sdasdsa",
      col23: "awddf",
      col24: "current day",
    },
    {
      id: "1",
      col1: "1",
      col2: "28 may 2021",
      col3: "1",
      col4: "sasdd",
      col5: "sda",
      col6: "asda",
      col7: "sdasd",
      col8: "sadsa",
      col9: "asld",
      col10: "popiio",
      col11: "opopopo",
      col12: "Rakesh",
      col13: "yuyuy",
      col14: "Asdad",
      col15: "lorem",
      col16: "ipsum",
      col17: "sasfdf",
      col18: "adfasfas",
      col19: "ksdjh",
      col20: "sa;lmd",
      col21: "asdasf",
      col22: "sdasdsa",
      col23: "awddf",
      col24: "current day",
    },
  ];
  return (
    <div>
      <NavTabComponent listData={[...navData]} />
      <Paper elevation={3} className="p-2">
        <Box className="d-flex mt-3 px-3">
          <Typography className="color-blue h-5 fw-bold">
            S - Surface
          </Typography>
          <Typography className="color-blue h-5 fw-bold mx-5">
            A - Air
          </Typography>
          <Typography className="color-blue h-5 fw-bold">
            COD - Cash On Delivery
          </Typography>
        </Box>
        <TableComponent
          tableRows={[...rows]}
          columns={[...column2]}
          column2={[...column1]}
          stickyCheckBox
          tHeadBgColor="bg-gray-1"
        />
      </Paper>
    </div>
  );
};
export default DeliveryStatus;
