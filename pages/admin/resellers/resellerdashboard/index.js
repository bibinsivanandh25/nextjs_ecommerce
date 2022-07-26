import { Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import { useState } from "react";
import CardComponent from "@/atoms/CardComponent";
import TableComponent from "@/atoms/TableComponent";

const ResellerDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [navData, setNavData] = useState([
    { id: 1, title: "Week" },
    { id: 2, title: "Month" },
    { id: 3, title: "Year" },
  ]);

  const cardDetails = [
    {
      id: 1,
      title: "Total Number of Resellers",
      value: 452,
      color: "#00c033",
    },
    {
      id: 2,
      title: "Total Sales from Resellers",
      value: "₹452",
      color: "#007fff",
    },
    {
      id: 3,
      title: "Total Reseller payment selected",
      value: "₹452",
      color: "#ffa800",
    },
    {
      id: 4,
      title: "Reseller Payment Pending to settle",
      value: "₹452",
      color: "#ff00a2",
    },
  ];

  const paymentDetails = [
    {
      id: 1,
      title: "Last Payment",
      ReleaseAmount: "₹8,544.00",
      ReleaseDate: "16 Jan 2022",
    },
    {
      id: 2,
      title: "Next Payment",
      ReleaseAmount: "₹8,544.00",
      ReleaseDate: "16 Mar 2022",
    },
  ];
  const refereeColumns = [
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
      label: "Reseller",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Referee Count",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Categories",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const refereeRows = [
    {
      id: "1",
      col1: "1",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "2",
      col1: "2",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "3",
      col1: "3",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "4",
      col1: "4",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "5",
      col1: "5",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "6",
      col1: "6",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "7",
      col1: "7",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "8",
      col1: "8",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "9",
      col1: "9",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
    {
      id: "10",
      col1: "10",
      col2: "reseller Name",
      col3: "25",
      col4: "category",
    },
  ];
  const SalesColumns = [
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
      label: "Product Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Sales Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const salesRows = [
    {
      id: "1",
      col1: "1",
      col2: "Leather Jacket",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Leather Jacket",
      col3: "supplier Name",
      col4: "12,400",
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
      label: "Reseller Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Id",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Customer Count",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const CustomerRows = [
    {
      id: "1",
      col1: "1",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
  ];
  const OrdersColumns = [
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
      label: "Reseller ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Order Count",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Order Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  const OrdersRows = [
    {
      id: "1",
      col1: "1",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Reseller Name",
      col3: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Reseller Name",
      col3: "12,400",
    },
  ];
  const returnOrderSelfColumns = [
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
      label: "Reseller Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Id",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const returnOrderSelfRows = [
    {
      id: "1",
      col1: "1",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
  ];
  const returnOrderViaShoppingColumns = [
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
      label: "Reseller Name",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Reseller Id",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Return Amount Value",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const returnOrderViaShoppingRows = [
    {
      id: "1",
      col1: "1",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "2",
      col1: "2",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "3",
      col1: "3",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "4",
      col1: "4",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "5",
      col1: "5",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "6",
      col1: "6",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "7",
      col1: "7",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "8",
      col1: "8",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "9",
      col1: "9",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
    {
      id: "10",
      col1: "10",
      col2: "Customer Name",
      col3: "Reseller Name",
      col4: "12,400",
    },
  ];
  const getCardDetails = () => {
    return cardDetails.map((ele) => {
      return (
        <Grid item sm={6} md={3} key={ele.id}>
          <CardComponent className="px-2 py-3" boxColor={ele.color}>
            <Typography className="h-5 text-secondary">{ele.title}</Typography>
            <Typography className="fw-bold h-2 text-center">
              {ele.value}
            </Typography>
          </CardComponent>
        </Grid>
      );
    });
  };
  const getPaymentDetails = () => {
    return paymentDetails.map((ele) => {
      return (
        <Grid item sm={12} md={6} className="py-1" key={ele.id}>
          <Paper className="p-4">
            <Typography className="color-orange px-4">{ele.title}</Typography>
            <div className="d-flex justify-content-between px-4 my-2">
              <div>
                <Typography className="h-5 text-secondary">
                  {ele.id === 1 ? "Release Amount" : "Expected Release Amount"}
                </Typography>
                <Typography className="fw-bold h-3">
                  {ele.ReleaseAmount}
                </Typography>
              </div>
              <div>
                <Typography className="h-5 text-secondary">
                  {ele.id === 1 ? "Release Date" : "Expected Release Date"}
                </Typography>
                <Typography className="fw-bold h-3">
                  {ele.ReleaseDate}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <div>
      <Paper elevation={3} className="p-1">
        <NavTabComponent listData={[...navData]} />
      </Paper>
      <Grid
        container
        spacing={4}
        className="my-2 mxh-95vh overflow-auto hide-scrollbar"
      >
        <Grid container item sm={12} spacing={4} className="py-3">
          {getCardDetails()}
        </Grid>
        <Grid item container sm={12} spacing={4}>
          {getPaymentDetails()}
        </Grid>
        <Grid item sm={12} container spacing={4}>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Reseller who has more referee under them
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...refereeRows]}
                columns={[...refereeColumns]}
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Reseller with more sales
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...salesRows]}
                columns={[...SalesColumns]}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid item sm={12} container spacing={4}>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Reseller with Good Customer Base
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...CustomerRows]}
                columns={[...CustomerColumns]}
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Orders Placed By Reseller
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...OrdersRows]}
                columns={[...OrdersColumns]}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid item sm={12} container spacing={4}>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Reseller with highest return orders (Self)
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...returnOrderSelfRows]}
                columns={[...returnOrderSelfColumns]}
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper>
              <Typography className="fw-bold h-5 px-2 py-1">
                Reseller with highest return orders (Via shopping page)
              </Typography>
              <TableComponent
                paginationType="admin"
                showSearchbar={false}
                showCheckbox={false}
                tableRows={[...returnOrderViaShoppingRows]}
                columns={[...returnOrderViaShoppingColumns]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default ResellerDashboard;
