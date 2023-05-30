/* eslint-disable no-unused-vars */
import { Box, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import { useState, useEffect } from "react";
import TableComponent from "@/atoms/TableWithSpan";
import { getDeliveryStatus } from "services/admin/deliverymanagement/dashboard";
import toastify from "services/utils/toastUtils";

const DeliveryStatus = () => {
  const [navData, setNavData] = useState([
    { id: 1, title: "Today", value: "TODAY" },
    { id: 2, title: "Yesterday", value: "YESTERDAY" },
    { id: 3, title: "Last 7 days", value: "LAST_SEVEN_DAYS" },
    { id: 4, title: "Last month", value: "LAST_MONTH" },
    { id: 5, title: "Last year", value: "LAST_YEAR" },
  ]);
  const [tabFilter, settabFilter] = useState("TODAY");
  const [tablerowData, settablerowData] = useState([]);
  const [pagenumber, setpagenumber] = useState(0);
  const column1 = [
    {
      id: "col1",
      label: "logistics partners",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      rowSpan: 2,
      // position: "sticky",
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
      id: "col23",
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
      id: "col2",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col3",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "COD",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col12",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col13",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col14",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col15",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col16",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col17",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col18",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col19",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col20",
      label: "A",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col21",
      label: "S",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col22",
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
  const getTableData = (data) => {
    const temp = [];
    data.forEach((ele, ind) => {
      temp.push({
        key: ind,
        col1: ele.logisticPartners,
        col2: ele.totalOrdersBySurface,
        col3: ele.totalOrdersByAir,
        col4: ele.totalOrderCashOnDelivery,
        col5: ele.orderApprovalPendingSurface,
        col6: ele.orderApprovalPendingAir,
        col7: ele.ordersPickedUpSurface,
        col8: ele.ordersPickedUpAir,
        col9: ele.ordersInCommuteSurface,
        col10: ele.ordersInCommuteAir,
        col11: ele.ordersDeliveredSurface,
        col12: ele.ordersDeliveredAir,
        col13: ele.returnOrderApprovalPendingSurface,
        col14: ele.returnOrderApprovalPendingAir,
        col15: ele.returnPickedUpSurface,
        col16: ele.returnPickedUpAir,
        col17: ele.returnOrderInCommuteSurface,
        col18: ele.returnOrderInCommuteAir,
        col19: ele.returnDeliveredSurface,
        col20: ele.returnDeliveredAir,
        col21: ele.rtoSurface,
        col22: ele.rtoAir,
        col23: ele.orderDate,
      });
    });
    return temp;
  };
  const getDeliveryStatusData = async (page = pagenumber) => {
    const payload = {
      filterType: tabFilter,
      fromDate: "",
      toDate: "",
      pageNumber: page,
      pageSize: 20,
    };
    const { data, err } = await getDeliveryStatus(payload);
    if (data) {
      if (page == 0) {
        setpagenumber(1);
        settablerowData(getTableData(data.data));
      } else {
        setpagenumber((pre) => pre + 1);
        settablerowData((pre) => [...pre, ...getTableData(data.data)]);
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getDeliveryStatusData(0);
  }, [tabFilter]);
  return (
    <div>
      <NavTabComponent
        listData={[...navData]}
        onTabCilck={(val, item) => {
          settabFilter(item.value);
        }}
      />
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
          showCheckbox={false}
          tableRows={tablerowData}
          columns={[...column2]}
          column2={[...column1]}
          stickyCheckBox
          tHeadBgColor="bg-gray-1"
          handlePageEnd={(page) => {
            getDeliveryStatusData(page);
          }}
        />
      </Paper>
    </div>
  );
};
export default DeliveryStatus;
