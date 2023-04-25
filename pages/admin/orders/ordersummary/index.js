import { Grid, Typography } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import { getOrderSummary, viewOrderSummery } from "services/orders";
import { useEffect, useState } from "react";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";

const OrderSummary = () => {
  const [tableRowData, settableRowData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [viewData, setviewData] = useState({});
  const [showView, setshowView] = useState(false);
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
  const viewSummery = async (orderId, variationId) => {
    const { data, err } = await viewOrderSummery(orderId, variationId);
    if (data) {
      setviewData(data.data);
      setshowView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
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
            <RemoveRedEye
              onClick={() => {
                viewSummery(ele.orderId, ele.productIds);
              }}
              className="fs-5 cursor-pointer"
            />
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
  const formatViewScreen = (key, val) => {
    return (
      <Grid container className="p-1">
        <Grid item md={5} sx={5}>
          <Typography className="fw-500 fs-14">{key}</Typography>
        </Grid>
        <Grid item md={1} sx={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item md={6} sx={6}>
          <Typography className=" fs-14">{val}</Typography>
        </Grid>
      </Grid>
    );
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
      {showView && (
        <ModalComponent
          ModalTitle="View Order Summary"
          open={showView}
          onCloseIconClick={() => {
            setshowView(false);
          }}
          showFooter={false}
        >
          <Grid className="p-2">
            {formatViewScreen("Customer Id", viewData.customerId)}
            {formatViewScreen("Customer Name", viewData.customerName)}
            {formatViewScreen("Delivery Type", viewData.deliveryType)}
            {formatViewScreen("Order Id", viewData.orderId)}
            {formatViewScreen("Product Variation Id", viewData.productIds)}
            {formatViewScreen("Order Status", viewData.orderStatus)}
            {formatViewScreen("Ordered Date", viewData.orderedDateTime)}
            {formatViewScreen("Payment Type", viewData.paymentType)}
            {formatViewScreen("Supplier Id", viewData.supplierId)}
            {formatViewScreen(
              "Product Cost After Discount",
              viewData.productCostAfterDiscount
            )}
            {formatViewScreen(
              "Total Payment After Discount",
              viewData.totalPaymentAfterDiscount
            )}
          </Grid>
        </ModalComponent>
      )}
    </div>
  );
};
export default OrderSummary;
