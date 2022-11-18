import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getAllActiveViewData } from "services/admin/supplier/active";
import toastify from "services/utils/toastUtils";
import AddressModal from "../addressmodal";
import StaffInfo from "../staffinfo";
import SupplierProduct from "./SupplierProduct";

const ViewModal = ({
  setViewModalOpen = () => {},
  selectedData = {},
  type = "",
}) => {
  const [viewData, setViewData] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [supplierProductView, setSupplierProductView] = useState({
    show: false,
    supplierId: null,
  });
  // const [showPolicyModal, setShowPolicyModal] = useState(false);
  const getAllViewData = async () => {
    const { data, err } = await getAllActiveViewData(
      selectedData.supplierId,
      type
    );
    if (data) {
      setViewData(data?.data);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getAllViewData();
  }, [selectedData]);

  const handleAddressClick = (item) => {
    setAddressData(item);
    setShowAddressModal(true);
  };
  const [staffInfo, setStaffInfo] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const handleStaffClick = (item) => {
    setStaffInfo(item);
    setShowStaffModal(true);
  };
  return (
    <Box className="p-2">
      {!supplierProductView.show && (
        <>
          <Box
            onClick={() => {
              setViewModalOpen(false);
            }}
            className="d-flex "
          >
            <Typography className="h-5 d-flex align-items-center cursor-pointer me-3 color-orange">
              <ArrowBackIosIcon className="fs-14" />
              Back
            </Typography>
            <Typography className="h-4 color-orange fw-bold">
              {type === "DISABLED"
                ? "View Disabled Suppliers"
                : "View Active Suppliers"}
            </Typography>
          </Box>
          <Box className="border-top mt-2 pt-2">
            <Grid container spacing={3}>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Supplier ID
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.supplierId}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">Email</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.emailId}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">Mobile no</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.mobileNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Next Payment release
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.nextPaymentRelease
                        ? viewData.nextPaymentRelease
                        : "--"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Supplier Register date & time
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.registeredAt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Admin approval date & time
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.approvedAt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Supplier first Name
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.firstName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Supplier last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.lastName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">Address</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography
                      onClick={() => {
                        handleAddressClick(viewData?.userAddressDetails);
                      }}
                      className={`text-break fw-bold h-5 ${
                        viewData?.userAddressDetails?.length !== 0 &&
                        `color-light-blue text-decoration-underline cursor-pointer`
                      }`}
                    >
                      {viewData?.userAddressDetails?.length
                        ? "Click Here"
                        : "--"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Staff details
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography
                      onClick={() =>
                        handleStaffClick(viewData?.staffManagementInfos)
                      }
                      className={`text-break fw-bold h-5 ${
                        viewData?.staffManagementInfos?.length !== 0 &&
                        `color-light-blue text-decoration-underline cursor-pointer`
                      }`}
                    >
                      {viewData?.staffManagementInfos?.length
                        ? "Click Here"
                        : "--"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Categories
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Tooltip
                      title={viewData?.mainCategoryWrappers?.map((item) => {
                        return `${item?.mainCategoryName},`;
                      })}
                    >
                      <Typography className="text-break fw-bold h-5 w-100 text-truncate">
                        {viewData?.mainCategoryWrappers?.map((item) => {
                          return `${item?.mainCategoryName},`;
                        })}
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Order History
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography
                      className={`text-break fw-bold h-5 ${
                        viewData.orderHistory == "" &&
                        `color-light-blue text-decoration-underline cursor-pointer`
                      }`}
                    >
                      {viewData.orderHistory
                        ? viewData.orderHistory
                        : "Click here"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Business Name
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.businessName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Total Orders
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                      {viewData.totalOrders}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Last Payment settled
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.lastPaymentSettled}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Penality Pending
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                      {viewData.penaltyPending}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">Website</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                      {viewData?.websiteLink}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Total gross sales
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
                      {viewData.totalGrossSale}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Product count
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography
                      className={`text-break fw-bold h-5 ${
                        viewData.productCount > 0 &&
                        `color-light-blue text-decoration-underline cursor-pointer`
                      } `}
                    >
                      {viewData.productCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      mrmrs cart Commission
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.mrmrsCartCommission}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Payment history
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography
                      className={`text-break fw-bold h-5 ${
                        viewData.paymentHistory !== null &&
                        `color-light-blue text-decoration-underline cursor-pointer`
                      }`}
                    >
                      {viewData.paymentHistory ? "Click Here" : "--"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3} md={4} sm={12}>
                <Grid container>
                  <Grid item xs={6} display="flex" justifyContent="end">
                    <Typography className=" text-end h-5">
                      Reactivated date & time
                    </Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent="center">
                    :
                  </Grid>
                  <Grid item xs={5} display="flex">
                    <Typography className="text-break fw-bold h-5">
                      {viewData.reActivatedDateAndTime}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {showAddressModal ? (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          showAddressModal={showAddressModal}
          addressData={addressData}
        />
      ) : null}
      {showStaffModal ? (
        <StaffInfo
          showStaffModal={showStaffModal}
          setShowStaffModal={setShowStaffModal}
          selectedData={staffInfo}
        />
      ) : null}
      {supplierProductView.show && (
        <SupplierProduct
          supplierId={supplierProductView.supplierId}
          backClick={() => {
            setSupplierProductView({
              show: false,
              supplierId: null,
            });
          }}
        />
      )}
    </Box>
  );
};

export default ViewModal;
