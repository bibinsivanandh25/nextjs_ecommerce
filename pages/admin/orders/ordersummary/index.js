import { Typography } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import { getOrderSummary } from "services/orders";
import { useEffect, useState } from "react";
import toastify from "services/utils/toastUtils";

const OrderSummary = () => {
  const [tableRowData, settableRowData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Reseller ID/customer ID with Name",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      position: "sticky",
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

  const dataFormatToTable = (data) => {
    const temp = [];
    data.forEach((ele, ind) => {
      temp.push({
        id: ind,
        col1: `${ele.customerId} ${ele.customerName}`,
        col2: ele.orderId,
        col3: ele.supplierId,
        col4: ele.productIds,
        col5: ele.productCostAfterDiscount,
        col6: ele.paymentType,
        col7: ele.deliveryType.replace("_", " "),
        col8: ele.orderStatus,
        col9: ele.isApprovedOrReject,
        col10: ele.orderedDateTime,
        col11: (
          <div className="d-flex justify-content-around align-items-center text-secondary">
            {/* <Reply className="fs-5" /> */}
            <RemoveRedEye onClick={() => {}} className="fs-5 cursor-pointer" />
            <MenuOption
              options={["Notify", "Add Comment"]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={() => {}}
            />
          </div>
        ),
      });
    });
    return temp;
  };
  const getOrderSummaryFunction = async (page = pageNumber) => {
    const { data, err } = await getOrderSummary(page, 50);
    if (data) {
      if (page === 0) {
        settableRowData(dataFormatToTable(data.data));
        setpageNumber((pre) => pre + 1);
      } else {
        settableRowData((pre) => [...pre, ...dataFormatToTable(data.data)]);
        setpageNumber((pre) => pre + 1);
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getOrderSummaryFunction(0);
  }, []);
  return (
    <div className=" hide-scrollbar">
      <Typography className="color-orange fw-bold ms-3 mt-2">
        Order summary Table
      </Typography>
      <TableComponent
        showSearchFilter={false}
        columns={[...columns]}
        tableRows={[...tableRowData]}
        showSearchbar={false}
        tHeadBgColor="bg-white"
        stickyCheckBox
        handlePageEnd={(a, b, c, d, page = pageNumber) => {
          getOrderSummaryFunction(page);
        }}
      />
    </div>
  );
};
export default OrderSummary;
