/* eslint-disable no-nested-ternary */
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableComponent";
import { Box, Grid, Paper, Typography } from "@mui/material";
import TabsCard from "components/molecule/TabsCard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import {
  adminDeleteOrder,
  adminViewOrder,
  getAllOrderPaymentDetails,
} from "services/orders";
import toastify from "services/utils/toastUtils";
// import  from "react";

const myQueriescolumns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Order Status",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col2", //  id value in column should be presented in row as key
    label: "Quantity",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col3", //  id value in column should be presented in row as key
    label: "Order Id",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col4", //  id value in column should be presented in row as key
    label: "Order Type",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col5", //  id value in column should be presented in row as key
    label: "Reseller Detail",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col6", //  id value in column should be presented in row as key
    label: "Gross Sells Amount",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col7", //  id value in column should be presented in row as key
    label: "Billing Address",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col8", //  id value in column should be presented in row as key
    label: "Vendor Earning",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col9", //  id value in column should be presented in row as key
    label: "Reseller Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col10", //  id value in column should be presented in row as key
    label: "Multestore Earning",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col11", //  id value in column should be presented in row as key
    label: "Delivery Partner",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col12", //  id value in column should be presented in row as key
    label: "Delivery Status",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col13", //  id value in column should be presented in row as key
    label: "Charges",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col14", //  id value in column should be presented in row as key
    label: "Order Created Date",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col15", //  id value in column should be presented in row as key
    label: "Weight/Volume",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col16", //  id value in column should be presented in row as key
    label: "Comments",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col17", //  id value in column should be presented in row as key
    label: "Supplier Id",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
  {
    id: "col18", //  id value in column should be presented in row as key
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    showPin: true,
  },
];
const Zerocommissionproducts = () => {
  const [mianTabs, setMainTabs] = useState([
    {
      label: "All",
      isSelected: true,
      value: null,
    },
    { label: "Pending Payments", isSelected: false, value: "PENDING_PAYMENT" },
    { label: "Processing", isSelected: false, value: "PROCESSING" },
    { label: "On Hold", isSelected: false, value: "ON_HOLD" },
    {
      label: "Payment Completed",
      isSelected: false,
      value: "PAYMENT_COMPLETED",
    },
    { label: "Cancelled", isSelected: false, value: "CANCELLED" },
    { label: "Refunded", isSelected: false, value: "REFUNDED" },
    { label: "Returned", isSelected: false, value: "RETURN" },
    { label: "Falied", isSelected: false, value: "FAILED" },
    { label: "Payment Settled", isSelected: false, value: "PAYMENT_SETTLED" },
  ]);
  const [columns, setColumns] = useState([...myQueriescolumns]);
  const [ActiveTab, setActiveTab] = useState(0);
  const [orderDetails, setorderDetails] = useState([]);
  const [viewDetails, setviewDetails] = useState({});
  const [showView, setshowView] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
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
  const viewOrderDetails = async (ordId, vId) => {
    const payload = { orderId: ordId, variationId: vId };
    const { data, err } = await adminViewOrder(payload);
    if (data) {
      setviewDetails(data.data);
      setshowView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const deleteOrder = async (oId, vId) => {
    const payload = { orderId: oId, variationId: vId };
    const { data, err } = await adminDeleteOrder(payload);
    if (data) {
      toastify(data.message, "success");
      // eslint-disable-next-line no-use-before-define
      getAllPaymentDetails(0);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const dataMapToTable = (data) => {
    const temp = [];
    data.forEach((ele) => {
      temp.push({
        col1: ele.orderPaymentStatus,
        col2: ele.orderQuantity,
        col3: ele.orderId,
        col4: ele.orderType,
        col5: ele.resellerdetails,
        col6: ele.grossSalesAmount,
        col7: "",
        col8: ele.vendorEarning,
        col9: ele.resellerEarning,
        col10: ele.mrMrsCartEarning,
        col11: ele.deliveryPartner,
        col12: ele.deliveryStatus,
        col13: ele.deliveryCharges,
        col14: ele.orderCreatedDate,
        col15: ele.weightInclusivePackage,
        col16: ele.comments,
        col17: ele.supplierId,
        col18: (
          <Grid>
            <CustomIcon
              type="view"
              className="fs-16"
              onIconClick={() => {
                viewOrderDetails(ele.orderId, ele.productVariationId);
              }}
            />
            <MenuOption
              getSelectedItem={(opt) => {
                if (opt == "Delete") {
                  deleteOrder(ele.orderId, ele.productVariationId);
                }
              }}
              options={[
                "Delete",
                "Add a note",
                "Invoice",
                "Refund",
                "View Menifest ",
              ]}
              IconclassName="color-gray"
            />
          </Grid>
        ),
      });
    });
    return temp;
  };

  const getAllPaymentDetails = async (page = pageNumber, search, date) => {
    const payload = {
      // category: "FIXED_COMMISSION",
      category: "ZERO_COMMISSION",
      keyword: search || null,
      paymentStatus:
        ActiveTab == 1
          ? "PENDING_PAYMENT"
          : ActiveTab == 2
          ? "PROCESSING"
          : ActiveTab == 3
          ? "ON_HOLD"
          : ActiveTab == 4
          ? "PAYMENT_COMPLETED"
          : ActiveTab == 5
          ? "CANCELLED"
          : ActiveTab == 6
          ? "REFUNDED"
          : ActiveTab == 7
          ? "RETURN"
          : ActiveTab == 8
          ? "FAILED"
          : ActiveTab == 9
          ? "PAYMENT_SETTLED"
          : null,
      fromDate: date?.fromDate || null,
      toDate: date?.toDate || null,
      pageSize: 50,
      pageNumber: page,
    };
    const { data, err } = await getAllOrderPaymentDetails(payload);
    if (data) {
      if (page == 0) {
        setorderDetails(dataMapToTable(data.data));
        setpageNumber(1);
      } else {
        setorderDetails([...orderDetails, ...dataMapToTable(data.data)]);
        setpageNumber((pre) => pre + 1);
      }
      // console.log(data);
    } else if (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    getAllPaymentDetails(0);
  }, [ActiveTab]);
  const viewFormat = (key1, val1, key2, val2) => {
    return (
      <Grid container className="py-1">
        <Grid item lg={2} md={3}>
          <Typography className="fs-14 fw-500">{key1}</Typography>
        </Grid>
        <Grid item lg={0.5} md={2}>
          <Typography>:</Typography>
        </Grid>
        <Grid item lg={3} md={7}>
          <Typography className="fs-14 ">{val1}</Typography>
        </Grid>
        <Grid item lg={1} md={0} />
        <Grid item lg={2} md={3}>
          <Typography className="fs-14 fw-500">{key2}</Typography>
        </Grid>
        <Grid item lg={0.5} md={2}>
          <Typography>:</Typography>
        </Grid>
        <Grid item lg={3} md={7}>
          <Typography className="fs-14 ">{val2}</Typography>
        </Grid>
      </Grid>
    );
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
          {/* {ActiveTab == 0 ? ( */}
          <TableComponent
            tabChange={ActiveTab}
            draggableHeader
            table_heading="Zero Commission"
            columns={columns}
            setColumns={setColumns}
            showDateFilter
            // showDateFilterDropDown
            // showPagination
            handlePageEnd={(searchTexT, Filter, page, date) => {
              getAllPaymentDetails(page, searchTexT, date);
            }}
            tableRows={orderDetails}
            // tabChange={value}
            // tableRows={mapRowsToTable}
          />
          {/* ) : ( */}
          {/* <></> */}
          {/* )} */}
        </Paper>
      </Grid>
      {showView && (
        <ModalComponent
          minWidth={1200}
          open={showView}
          showFooter={false}
          ModalTitle="View Product"
          onCloseIconClick={() => {
            setshowView(false);
          }}
        >
          <Grid className="mxh-500 overflow-y-scroll ">
            <Grid className="d-flex justify-content-center">
              <Image
                src={viewDetails?.productImage}
                // layout="fill"
                // style={{
                //   height: "100vh",
                //   width: "100vh",
                // }}
                height={100}
                width={100}
              />
            </Grid>
            {/* <Grid className="d-flex justify-content-center"> */}
            <Typography className="fw-500 text-center">
              {viewDetails.productTitle}
            </Typography>
            {/* </Grid> */}

            {viewFormat(
              "Order created by",
              viewDetails.orderById,
              "Delivery pickup date & time",
              viewDetails.deliveryPickUpDate
            )}
            {viewFormat(
              "Order status",
              viewDetails.orderStatus,
              "Estimate delivery time",
              viewDetails.estimateDeliveryDate
            )}
            {viewFormat(
              "Quantity",
              viewDetails.orderQuantity,
              "Delivered date & time",
              viewDetails.deliveredDate
            )}
            {viewFormat(
              "Order type",
              viewDetails.orderType,
              "Current location of parcel",
              viewDetails.currentLocationOfParcel
            )}
            {viewFormat(
              "Gross sales",
              viewDetails.grossSales,
              "Supplier Id & name",
              viewDetails.supplierId
            )}
            {viewFormat(
              "Reseller Name & Id",
              "__",
              "Return period date & time counter",
              viewDetails.returnDate
            )}
            {viewFormat(
              "Order created date & time",
              viewDetails.orderDate,
              "Amount of refund (if any)",
              viewDetails.returnAmount
            )}
            {viewFormat(
              "payment mode",
              viewDetails.paymentMethod,
              "Deduction charges",
              viewDetails.deductionCharges
            )}
            {viewFormat(
              "Admin earning",
              viewDetails.adminEarning,
              "Multestore payment settled",
              "__"
            )}
            {viewFormat(
              "Reseller earnings",
              viewDetails.resellerEarning,
              "Supplier payment settled",
              "__"
            )}
            {viewFormat(
              "Vendor earnings",
              viewDetails.vendorEarning,
              "Reseller  payment settled",
              "__"
            )}
            {viewFormat(
              "Weight/volume",
              viewDetails.weightInclusivePackage,
              "Supplier penalty(if any)",
              viewDetails.supplierPenalty
            )}
            {viewFormat(
              "Tracking ID",
              viewDetails.trackingId,
              "Product title",
              viewDetails.productTitle
            )}

            {viewFormat(
              "Logistic partner",
              viewDetails.logisticPartnerName,
              "Weight/Volume during pickup",
              viewDetails.weightDuringPickUp
            )}
            {viewFormat(
              "Delivery charge",
              viewDetails.logisticCharges,
              "Pickup address",
              `${viewDetails?.pickUpAddress.address}, ${viewDetails?.pickUpAddress.cityDistrictTown}, ${viewDetails?.pickUpAddress.state}, ${viewDetails?.pickUpAddress.cityDistrictTown}, ${viewDetails?.pickUpAddress.pinCode}`
            )}
            {viewFormat(
              "Delivery mode",
              "__",
              "Delivery address",
              `${viewDetails?.deliveryAddress.address}, ${viewDetails?.deliveryAddress.cityDistrictTown}, ${viewDetails?.deliveryAddress.state}, ${viewDetails?.deliveryAddress.cityDistrictTown}, ${viewDetails?.deliveryAddress.pinCode}`
            )}
            {viewFormat(
              "Delivery zone",
              "__",
              "Delivery partner",
              viewDetails.logisticPartnerName
            )}
            {viewFormat(
              "Warranty card",
              viewDetails.warrantyCard,
              "Tex invoice",
              viewDetails.taxInvoice
            )}
            {viewFormat("Payslip", viewDetails.payslip, "", "")}
          </Grid>
        </ModalComponent>
      )}
    </Box>
  );
};

export default Zerocommissionproducts;
