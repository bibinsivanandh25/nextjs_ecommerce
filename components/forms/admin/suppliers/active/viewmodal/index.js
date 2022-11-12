import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import NavTabComponent from "components/molecule/NavTabComponent";
// import { LineChart } from "@/atoms/Linechart/Linechart";
// import { Doughnutchart } from "@/atoms/Doughnut/Doughnut";
// import TableComponent from "@/atoms/TableComponent";
import { getAllActiveViewData } from "services/admin/supplier/active";
import toastify from "services/utils/toastUtils";
import AddressModal from "../addressmodal";
import PolicyModal from "../policymodal";
import StaffInfo from "../staffinfo";

// const activeSupplierdata = {
//   supplierId: "--",
//   email: "balu12623@gmail.com",
//   mobileno: "987654432",
//   nextpayment: "200000 /-, 06 Jun 2022",
//   registerDate: "--",
//   adminapproval: "12",
//   firstname: "balu",
//   lastName: "Murugesan",
//   address: "",
//   staffdetails: "",
//   polices: "",
//   days: "12",
//   categories: "--",
//   orderhistory: "",
//   businessname: "xyz",
//   totalOrders: "2142",
//   lastpayment: "200000 /-, 06 May 2022",
//   penality: "656",
//   website: "http://",
//   totalgrosssale: "123",
//   count: "1234",
//   mrmrscommision: "12,65,546",
//   paymentHistory: "",
//   reactivateDate: "--",
// };
// const firstNavTab = [
//   {
//     id: 1,
//     title: "Successfull",
//   },
//   {
//     id: 2,
//     title: "Un-Successfull",
//   },
//   {
//     id: 3,
//     title: "Returned",
//   },
// ];
// const secondNavTab = [
//   {
//     id: 1,
//     title: "Total gross sales",
//   },
//   {
//     id: 2,
//     title: "Total net profit after deduction",
//   },
// ];
// const thirdNavTab = [
//   {
//     id: 1,
//     title: "Total panalties paid",
//   },
//   {
//     id: 2,
//     title: "panalties Pending to paid",
//   },
// ];
// const lineChartData = [20000, 3000, 1000, 40000, 10000, 400, 2000];
// const LineChartLable = [
//   "Monday",
//   "Tuseday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
// const doughnutLables = ["Total panalties paid", "panalties Pending to paid"];
// const doughnutData = ["234", "356"];
// const paymentDatas = [
//   {
//     id: 1,
//     title: "Last Payment Paid",
//     ammount: "12,89,456",
//     date: "5 Jan 2022, 12:22",
//   },
//   {
//     id: 1,
//     title: "Pending Payment (Next Release)",
//     ammount: "12,89,456",
//     date: "5 Jan 2022, 12:22",
//   },
// ];
// const categoryColumn = [
//   {
//     id: "col1",
//     label: "SI NO.",
//     minWidth: 30,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
//   {
//     id: "col2",
//     label: "Categories",
//     minWidth: 300,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
// ];
// const subCategoryColumn = [
//   {
//     id: "col1",
//     label: "SI NO.",
//     minWidth: 30,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
//   {
//     id: "col2",
//     label: "Sub-Categories",
//     minWidth: 300,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
// ];
// const categoryRows = [
//   {
//     id: "col1",
//     col1: 1,
//     col2: "Leather",
//   },
//   {
//     id: "col1",
//     col1: 2,
//     col2: "Leather",
//   },
//   {
//     id: "col1",
//     col1: 3,
//     col2: "Leather",
//   },
//   {
//     id: "col1",
//     col1: 4,
//     col2: "Leather",
//   },
//   {
//     id: "col1",
//     col1: 5,
//     col2: "Leather",
//   },
//   {
//     id: "col1",
//     col1: 6,
//     col2: "Leather",
//   },
// ];
const ViewModal = ({ setViewModaOpen = () => {}, selectedData = {} }) => {
  const [viewData, setViewData] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const getAllViewData = async () => {
    const { data, err } = await getAllActiveViewData(selectedData.supplierId);
    if (data) {
      setViewData(data?.data);
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getAllViewData();
  }, [selectedData]);

  const handlePolicyClick = (item) => {
    setPolicyData(item);
    setShowPolicyModal(false);
  };
  const handleAddressClcik = (item) => {
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
      <Box onClick={() => setViewModaOpen(false)} className="d-flex ">
        <Typography className="h-5 d-flex align-items-center cursor-pointer me-3">
          <ArrowBackIosIcon className="fs-14" />
          Back
        </Typography>
        <Typography className="h-4 color-orange fw-bold">
          View Active Suppliers
        </Typography>
      </Box>
      {viewData ? (
        <Box className="border-top mt-2 pt-2">
          <Grid container spacing={3}>
            <Grid item lg={3} md={4} sm={12}>
              <Grid container>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <Typography className=" text-end h-5">Supplier ID</Typography>
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
                      handleAddressClcik(viewData?.userAddressDetails);
                    }}
                    className={`text-break fw-bold h-5 ${
                      viewData?.userAddressDetails?.length !== 0 &&
                      `color-light-blue text-decoration-underline cursor-pointer`
                    }`}
                  >
                    {viewData?.userAddressDetails?.length ? "Click Here" : "--"}
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
                      ? "Clcik Here"
                      : "--"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={12}>
              <Grid container>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <Typography className=" text-end h-5">
                    Product policies
                  </Typography>
                </Grid>
                <Grid item xs={1} display="flex" justifyContent="center">
                  :
                </Grid>
                <Grid item xs={5} display="flex">
                  <Typography
                    onClick={() =>
                      handlePolicyClick(viewData?.productPolicyPojos)
                    }
                    className={`text-break fw-bold h-5 ${
                      viewData?.productPolicyPojos?.length !== 0 &&
                      `color-light-blue text-decoration-underline cursor-pointer`
                    }`}
                  >
                    {viewData?.productPolicyPojos ? "Click Here" : " --"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={12}>
              <Grid container>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <Typography className=" text-end h-5">
                    Business Processing days
                  </Typography>
                </Grid>
                <Grid item xs={1} display="flex" justifyContent="center">
                  :
                </Grid>
                <Grid item xs={5} display="flex">
                  <Typography className="text-break fw-bold h-5">
                    need
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={12}>
              <Grid container>
                <Grid item xs={6} display="flex" justifyContent="end">
                  <Typography className=" text-end h-5">Categories</Typography>
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
                  need
                  {/* <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.orderhistory == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.orderhistory
                    ? activeSupplierdata.orderhistory
                    : "Click here"}
                </Typography> */}
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
                  <Typography className="text-break fw-bold h-5 color-light-blue text-decoration-underline cursor-pointer">
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
                  {/* <Typography
                  className={`text-break fw-bold h-5 ${
                    activeSupplierdata.paymentHistory == "" &&
                    `color-light-blue text-decoration-underline cursor-pointer`
                  }`}
                >
                  {activeSupplierdata.paymentHistory
                    ? activeSupplierdata.paymentHistory
                    : "Click here"}
                </Typography> */}
                  need
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
      ) : null}
      {/* <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={firstNavTab} />
        </Box>
        <Paper className="mt-3 p-3" elevation={3}>
          <LineChart
            labels={LineChartLable}
            data={lineChartData}
            showYAxis={false}
            lineColor="#0782ff"
            height="300px"
          />
        </Paper>
      </Box>{" "}
      <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={secondNavTab} onTabCilck={() => {}} />
        </Box>
        <Paper className="mt-3 p-3" elevation={3}>
          <LineChart
            labels={LineChartLable}
            data={lineChartData}
            showYAxis={false}
            lineColor="#0782ff"
            height="300px"
          />
        </Paper>
      </Box>
      <Box className="mt-4">
        <Box className="px-3">
          <NavTabComponent listData={thirdNavTab} />
        </Box>
        <Grid container xs={12} className="mt-3" spacing={3}>
          <Grid item lg={7} md={6} sm={12}>
            <Paper elevation={3} className="py-5 ps-2">
              <Doughnutchart
                className="mnh-200"
                cutout="80"
                labels={doughnutLables}
                data={doughnutData}
              />
            </Paper>
          </Grid>
          <Grid item lg={5} md={6} sm={12}>
            <Grid conatiner>
              {paymentDatas.map((item) => (
                <Grid item md={8} sm={12} key={item.id} className="mt-2">
                  <Box
                    className="rounded py-3"
                    sx={{
                      border: "1px solid #cee6fe !important",
                      backgroundColor: "#fcfcfc",
                    }}
                  >
                    <Typography className="ps-2 color-dark-gray h-5">
                      {item.title}
                    </Typography>
                    <Typography className="h-1 fw-bold ps-4">
                      &#8377; {item.ammount}
                    </Typography>
                    <Typography className="text-end pe-4 fw-500 h-5">
                      {item.date}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container xs={12} className="mt-2" spacing={3}>
        <Grid item md={6} sm={12}>
          <Paper className="p-2" elevation={3}>
            <Box>
              <Typography className="fw-bold">
                Top 10 Product Categories
              </Typography>
            </Box>
            <TableComponent
              showSearchbar={false}
              showCheckbox={false}
              showPagination={false}
              columns={[...categoryColumn]}
              tableRows={[...categoryRows]}
              // table_heading="Top 10 Product Categories"
            />
          </Paper>
        </Grid>
        <Grid item md={6} sm={12}>
          <Paper className="p-2" elevation={3}>
            <Box>
              <Typography className="fw-bold">
                Top 10 Product Sub-Categories
              </Typography>
            </Box>
            <TableComponent
              showSearchbar={false}
              showCheckbox={false}
              showPagination={false}
              columns={[...subCategoryColumn]}
              tableRows={[...categoryRows]}
              // table_heading="Top 10 Product Categories"
            />
          </Paper>
        </Grid>
      </Grid> */}
      {showAddressModal ? (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          showAddressModal={showAddressModal}
          addressData={addressData}
        />
      ) : null}
      {showPolicyModal ? (
        <PolicyModal
          showPolicyModal={showPolicyModal}
          setShowPolicyModal={setShowPolicyModal}
          policyData={policyData}
        />
      ) : null}
      {showStaffModal ? (
        <StaffInfo
          showStaffModal={showStaffModal}
          setShowStaffModal={setShowStaffModal}
          staffInfo={staffInfo}
        />
      ) : null}
    </Box>
  );
};

export default ViewModal;
