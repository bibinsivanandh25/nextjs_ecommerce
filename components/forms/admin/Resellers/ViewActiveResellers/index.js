/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Card, Grid, Paper, Tooltip, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import CustomIcon from "services/iconUtils";
import { LineChart } from "@/atoms/Linechart/Linechart";
import TableComponent from "@/atoms/TableComponent";

/* eslint-disable jsx-a11y/click-events-have-key-events */
const ViewActiveResellers = ({ setShowActiveResellerView = () => {} }) => {
  const ActiveResellerDetails = {
    ResellerID: "1234",
    Email: "xyz@gmail.com",
    MobileNO: "787878786",
    NextPayment: "2000000",
    NextPaymentRelease: "06 Jan 2022",
    SupplierRegisterDnt: "09 Feb 2020 10:00",
    AdminApprovalDnt: "10 Feb 2020 10:00",
    FName: "Rakesh",
    LName: "Kumar",
    address: [
      {
        name: "rakesh",
        address:
          "Cecilia Chapman711-2880 Nulla St.Mankato Mississippi 96522(257) 563-7401",
      },
      {
        name: "rakesh",
        address:
          "Cecilia Chapman711-2880 Nulla St.Mankato Mississippi 96522(257) 563-7401",
      },
      {
        name: "rakesh",
        address:
          "Cecilia Chapman711-2880 Nulla St.Mankato Mississippi 96522(257) 563-7401",
      },
      {
        name: "rakesh",
        address:
          "Cecilia Chapman711-2880 Nulla St.Mankato Mississippi 96522(257) 563-7401",
      },
    ],
    bankDetails: [
      {
        "Bank Name": "ICICI Bank",
        "Account Holder Name": "Madhusudhan Agrahar1",
        "Account Number": 1234567890,
        "IFSC code": "ICIC0000001",
      },
      {
        "Bank Name": "ICICI Bank",
        "Account Holder Name": "Madhusudhan Agrahar2",
        "Account Number": 1234567890,
        "IFSC code": "ICIC0000001",
      },
      {
        "Bank Name": "ICICI Bank",
        "Account Holder Name": "Madhusudhan Agrahar3",
        "Account Number": 1234567890,
        "IFSC code": "ICIC0000001",
      },
      {
        "Bank Name": "ICICI Bank",
        "Account Holder Name": "Madhusudhan Agrahar4",
        "Account Number": 1234567890,
        "IFSC code": "ICIC0000001",
      },
    ],
    productPolicies: "aslkjn",
    BusinessProcessingDays: 12,
    categories: "adjl",
    orderHistory: "asd",
    storeName: "ZYX",
    totalOrders: "221",
    LastPayment: "20000",
    LastPaymentSettled: "09 Jan 2020",
    paymentSettledhistory: "sd",
    commisionThroughSales: 2000,
    commisionThroughReferees: 2000,
    paymentPending: 2000,
    ReactivatedDnt: "20 jan 2021 8:00",
    totalRefereeCount: 20,
    totalCustomerCount: 200,
    marketingToolSubscription: "sd",
  };
  const navTabs1 = [
    {
      id: 1,
      title: "Successfull",
    },
    {
      id: 2,
      title: "Un-Succesfull",
    },
    {
      id: 3,
      title: "Returned",
    },
  ];
  const navTabs2 = [
    {
      id: 1,
      title: "Total gross sale  ",
    },
    {
      id: 2,
      title: "Total net profit after deduction",
    },
    {
      id: 3,
      title: "Total commission earned from referrals",
    },
  ];
  const CustomerColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl. No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Customer ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const CustomerRows = [
    {
      id: "1",
      col1: "1",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "2",
      col1: "2",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "3",
      col1: "3",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "4",
      col1: "4",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "5",
      col1: "5",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "6",
      col1: "6",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "7",
      col1: "7",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "8",
      col1: "8",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "9",
      col1: "9",
      col2: "Customer ID",
      col3: "Customer Name",
    },
    {
      id: "10",
      col1: "10",
      col2: "Customer ID",
      col3: "Customer Name",
    },
  ];
  const renderActiveResellerDetails = () => {
    // return Object.entries(ActiveResellerDetails).forEach(([key, value]) => {
    return (
      <Grid
        container
        item
        sm={12}
        alignItems="center"
        // columnSpacing={1}
        rowSpacing={2}
      >
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Reseller ID{" "}
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.ResellerID}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Email{" "}
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Tooltip title={ActiveResellerDetails.Email} placement="top">
                <Typography className="text-truncate h-5  fw-bold">
                  {ActiveResellerDetails.Email}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Mobile No.
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.MobileNO}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end ">
                Next Payment release
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.NextPayment}
              </Typography>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.NextPaymentRelease}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Supplier Register Date and Time.
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.SupplierRegisterDnt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Admin Approval Date and Time
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.AdminApprovalDnt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Reseller First Name
              </Typography>
            </Grid>

            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.FName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Reseller Last Name
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.LName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Address
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Bank Details
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Product Policies
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Business Processing Days
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.BusinessProcessingDays}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                categories
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.categories}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Order History
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Store Name
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.storeName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Total Orders
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.totalOrders}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Last Payment settled
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.LastPayment}
              </Typography>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.LastPaymentSettled}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Payment Settled History
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Commission through sales
              </Typography>
            </Grid>

            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.commisionThroughSales}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Commission through Referees
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.commisionThroughReferees}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Payment pending
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.paymentPending}
              </Typography>
              <Typography className="h-5 ">
                (Next Payment {ActiveResellerDetails.NextPayment})
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Reactivated Date and Time
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 fw-bold">
                {ActiveResellerDetails.ReactivatedDnt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Total Referee Count
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>

            <Grid item sm={5}>
              <Typography className="text-decoration-underline text-primary fw-bold h-5">
                {ActiveResellerDetails.totalRefereeCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Total Customer Count
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="text-decoration-underline text-primary fw-bold h-5">
                {ActiveResellerDetails.totalCustomerCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} md={3}>
          <Grid container>
            <Grid item sm={6}>
              <Typography className="h-5 text-secondary text-end">
                Marketing Tool Subscription
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <Typography className="text-center">:</Typography>
            </Grid>
            <Grid item sm={5}>
              <Typography className="h-5 text-decoration-underline text-primary fw-bold">
                click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
    // });
  };
  return (
    <div>
      <div
        className="d-flex"
        onClick={() => {
          setShowActiveResellerView(false);
        }}
      >
        <CustomIcon type="keyboardBackspaceIcon" />
        <p className="cursor-pointer">Back</p>
      </div>
      <Grid container spacing={2}>
        {renderActiveResellerDetails()}
        <Grid container item sm={12} className="px-3">
          <Paper className="w-100 p-2 my-2 mx-1" elevation={3}>
            <Grid item sm={12}>
              {" "}
              <NavTabComponent listData={[...navTabs1]} />
            </Grid>
            <Grid item sm={12}>
              <LineChart
                height="300px"
                data={[
                  10000, 212130, 12030293, 12093012, 82301803, 20039402,
                  3627523,
                ]}
                labels={[
                  "Monday 09 Jan 2022",
                  "Tuesday 10 Jan 2022",
                  "WednesDay 11 Jan 2022",
                  "ThursDay 12 Jan 2022",
                  "Friday 13 Jan 2022",
                  "Saturday 14 Jan 2022",
                  "Sunday 15 Jan 2022",
                ]}
                lineColor="#007fff"
                showYGrid={false}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid container item sm={12} className="px-3">
          <Paper className="w-100 p-2 my-2 mx-1" elevation={3}>
            <Grid item sm={12}>
              {" "}
              <NavTabComponent listData={[...navTabs2]} />
            </Grid>
            <Grid item sm={12}>
              <LineChart
                height="300px"
                data={[
                  10000, 212130, 12030293, 12093012, 82301803, 20039402,
                  3627523,
                ]}
                labels={[
                  "Monday 09 Jan 2022",
                  "Tuesday 10 Jan 2022",
                  "WednesDay 11 Jan 2022",
                  "ThursDay 12 Jan 2022",
                  "Friday 13 Jan 2022",
                  "Saturday 14 Jan 2022",
                  "Sunday 15 Jan 2022",
                ]}
                lineColor="#007fff"
                showYGrid={false}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={12} container spacing={2}>
          <Grid item sm={12} md={6}>
            <Paper className="m-1 px-2 py-1">
              <Typography className="h-5 fw-bold">
                Top 10 customer causing more Product return(Under this reseller)
              </Typography>
              <TableComponent
                tableRows={[...CustomerRows]}
                columns={[...CustomerColumns]}
                showPagination={false}
                showSearchbar={false}
              />
            </Paper>
          </Grid>
          <Grid
            item
            sm={12}
            md={6}
            // className="h-50"
            container
            alignSelf="flex-start"
            columnSpacing={2}
            rowSpacing={1}
          >
            <Grid item sm={12}>
              <Typography className="color-orange fw-bold">Store</Typography>
            </Grid>
            <Grid item sm={6}>
              <Card
                className="p-2"
                sx={{
                  backgroundColor: "#fcfcfc",
                  border: "1px solid #c0defd",
                }}
              >
                <Typography className="h-5 text-secondary">
                  Last Payment Paid
                </Typography>
                <Typography className="fw-bold fs-2">
                  &#x20B9; 12,12,345
                </Typography>
                <Typography className="text-end">5 Jan 2022, 12:12</Typography>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card
                className="p-2"
                sx={{
                  backgroundColor: "#fcfcfc",
                  border: "1px solid #c0defd",
                }}
              >
                <Typography className="h-5 text-secondary">
                  Last Payment Paid
                </Typography>
                <Typography className="fw-bold fs-2">
                  &#x20B9; 12,12,345
                </Typography>
                <Typography className="text-end">5 Jan 2022, 12:12</Typography>
              </Card>
            </Grid>
            <Grid item sm={12}>
              <Typography className="color-orange fw-bold">
                {" "}
                Referral Commission
              </Typography>
            </Grid>
            <Grid item sm={6} alignItems="center">
              <Card
                className="p-2"
                sx={{
                  backgroundColor: "#fcfcfc",
                  border: "1px solid #c0defd",
                }}
              >
                <Typography className="h-5 text-secondary">
                  Last Payment Paid
                </Typography>
                <Typography className="fw-bold fs-2">
                  &#x20B9; 12,12,345
                </Typography>
                <Typography className="text-end">5 Jan 2022, 12:12</Typography>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card
                className="p-2"
                sx={{
                  backgroundColor: "#fcfcfc",
                  border: "1px solid #c0defd",
                }}
              >
                <Typography className="h-5 text-secondary">
                  Last Payment Paid
                </Typography>
                <Typography className="fw-bold fs-2">
                  &#x20B9; 12,12,345
                </Typography>
                <Typography className="text-end">5 Jan 2022, 12:12</Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default ViewActiveResellers;
