import { Typography } from "@mui/material";
import TableComponent from "@/atoms/TableComponent";

const OrderSummary = () => {
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Reseller ID/customer ID with Name",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Order ID",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Supplier ID/Name",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Product ID's",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Individual Product Cost after Discount",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Payment Type",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Delivery Type",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Order Status",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Approve/Reject",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col10",
      label: "Ordered Date & time",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col11",
      label: "Action",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "12,400",
    },
  ];
  return (
    <div className="mxh-75vh overflow-auto hide-scrollbar">
      <Typography className="color-orange fw-bold ms-3 mt-2">
        Order summary Table
      </Typography>
      <TableComponent
        columns={[...columns]}
        tableRows={[...rows]}
        showSearchbar={false}
      />
    </div>
  );
};
export default OrderSummary;
