/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid, Paper, Typography } from "@mui/material";
import NavTabComponent from "components/molecule/NavTabComponent";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import CardComponent from "@/atoms/CardComponent";
import TableComponent from "../../../../components/atoms/TableComponent";

const ProductDashboard = () => {
  const [fixedMarginSelected, setfixedMarginSelected] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [navData, setNavData] = useState([
    { id: 1, title: "Today" },
    { id: 2, title: "Yesterday" },
    { id: 3, title: "Last 7 days" },
    { id: 4, title: "Last month" },
    { id: 5, title: "Last year" },
  ]);

  const [cards, setCards] = useState([
    {
      id: 1,
      newProducts: "Newly added products (24345)",
      fixedMargin: "Fixed Margin (9423)",
      zeroComission: "Zero Comission (15789)",
      incrementPercentage: "24%",
      decrementPercentage: "12%",
    },
    {
      id: 2,
      newProducts: "Newly added products (24345)",
      fixedMargin: "By Category (9423)",
      zeroComission: "By Subcategory (15789)",
      incrementPercentage: "34%",
      decrementPercentage: "12%",
    },
    {
      id: 3,
      newProducts: "Total Products (24345)",
      fixedMargin: "Fixed Margin (9423)",
      zeroComission: "Zero Comission (15789)",
      incrementPercentage: "22%",
      decrementPercentage: "12%",
    },
  ]);

  const columns = [
    { id: 0, label: "SI No.", align: "center", data_align: "center" },
    { id: 1, label: "Product Name", align: "center", data_align: "center" },
    { id: 2, label: "Supplier Name", align: "center", data_align: "center" },
    { id: 3, label: "Brands", align: "center", data_align: "center" },
    { id: 4, label: "Quantity", align: "center", data_align: "center" },
    { id: 5, label: "Price", align: "center", data_align: "center" },
  ];

  const columnsTwo = [
    { id: 0, label: "SI No.", align: "center", data_align: "center" },
    { id: 1, label: "Product Name", align: "center", data_align: "center" },
    { id: 2, label: "Category   ", align: "center", data_align: "center" },
    { id: 3, label: "Supplier", align: "center", data_align: "center" },
    { id: 4, label: "Price", align: "center", data_align: "center" },
  ];

  const rows = [
    [1, "Leather Jacket", "Suhas", "Levis", "102", "3000 Rs."],
    [2, "Night Wear", "Sharan", "Jockey", "102", "1200 Rs."],
  ];

  const rowsTwo = [
    [1, "Levis", "Leather Jacket", "Suhas", "3000 Rs."],
    [2, "Jockey", "Night Wear", "Sharan", "1200 Rs."],
  ];

  const returnCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item xs={3} key={card.id}>
          <CardComponent>
            <Box className="p-2">
              <Typography className="fs-12 color-dark-gray">
                {card.newProducts}
              </Typography>
              <Box className="d-flex justify-content-between align-items-center mt-1">
                <Typography className="fs-14 fw-bold">
                  {card.fixedMargin}
                </Typography>
                <Box className="d-flex align-items-center">
                  <Box className="border border-success rounded">
                    <CustomIcon
                      className="h-20p  text-success"
                      size="small"
                      type="trendingUpOutlinedIcon"
                      showColorOnHover={false}
                    />
                  </Box>
                  <Typography className="fs-12 text-success ms-1">
                    {card.incrementPercentage}
                  </Typography>
                </Box>
              </Box>

              <Box className="d-flex justify-content-between align-items-center mt-1">
                <Typography className="fs-14 fw-bold">
                  {card.zeroComission}
                </Typography>
                <Box className="d-flex align-items-center">
                  <Box className="border border-danger rounded">
                    <CustomIcon
                      className="h-20p text-danger"
                      size="small"
                      type="trendingDownOutlinedIcon"
                      showColorOnHover={false}
                    />
                  </Box>
                  <Typography className="fs-12 text-danger ms-1">
                    {card.decrementPercentage}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardComponent>
        </Grid>
      );
    });
  };

  return (
    <Box>
      <Box className="mb-3">
        <NavTabComponent
          listData={navData}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </Box>
      <Box className="mxh-75">
        <Grid container columnSpacing={2} className="mb-3">
          {returnCards()}
        </Grid>
        <Paper className="p-4">
          <Box className="d-flex justify-content-between">
            <Typography className="fs-14 fw-bold ms-3">
              Newly added Products
            </Typography>
            <Typography className="fs-14 me-3">
              <span
                onClick={() => {
                  setfixedMarginSelected(!fixedMarginSelected);
                }}
                className={`${
                  fixedMarginSelected ? "color-blue" : ""
                } cursor-pointer`}
              >
                Fixed Margin
              </span>
              <span className="px-2">|</span>
              <span
                onClick={() => {
                  setfixedMarginSelected(!fixedMarginSelected);
                }}
                className={`${
                  !fixedMarginSelected ? "color-blue" : ""
                } cursor-pointer`}
              >
                Zero Comission
              </span>
            </Typography>
          </Box>
          <TableComponent
            showCheckbox={false}
            columns={columns}
            showPagination={false}
            tableRows={rows}
            showSearchbar={false}
          />
          <Box className="d-flex justify-content-center pt-2 mt-2">
            {rows.length > 10 ? (
              <Typography className="color-blue">View All</Typography>
            ) : null}
          </Box>
        </Paper>
        <Paper className="p-4 mt-3">
          <Box>
            <Typography className="fs-14 fw-bold ms-3">
              Top 10 Repeated Orders
            </Typography>
          </Box>
          <TableComponent
            showCheckbox={false}
            columns={columnsTwo}
            showPagination={false}
            tableRows={rowsTwo}
            showSearchbar={false}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDashboard;
