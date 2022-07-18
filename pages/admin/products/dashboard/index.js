/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "../../../../components/atoms/TableComponent";

const ProductDashboard = () => {
  const [fixedMarginSelected, setfixedMarginSelected] = useState(true);
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
  return (
    <Box>
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
  );
};

export default ProductDashboard;
