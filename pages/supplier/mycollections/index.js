import { Grid, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import logo from "public/assets/logo.jpeg";
import Image from "next/image";

const MyCollections = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      label: "Image",
      id: "col1",
    },
    {
      label: "Commission Mode",
      id: "col2",
    },
    {
      label: "Product Type",
      id: "col3",
    },
    {
      label: "Category",
      id: "col4",
    },
    {
      label: "Transfer Price",
      id: "col5",
    },
    {
      label: "MRP",
      id: "col6",
    },
    {
      label: "Product Weight",
      id: "col7",
    },
    {
      label: "Product Volume",
      id: "col8",
    },
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: <Image src={logo} height={50} width={50} />,
        col2: row.commissionmode,
        col3: row.producttype,
        col4: row.category,
        col5: `${row.transferprice} Rs`,
        col6: `${row.mrp} Rs`,
        col7: `${row.productweight} gms`,
        col8: row.productvolume,
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
        productId: "#123456",
        commissionmode: "No commission",
        category: "Accessories",
        producttype: "Headphones",
        transferprice: "200",
        mrp: "250",
        productweight: "40",
        productvolume: "12cm, 15cm, 10cm",
      },
      {
        productId: "#123456",
        commissionmode: "No commission",
        category: "Accessories",
        producttype: "Headphones",
        transferprice: "200",
        mrp: "250",
        productweight: "40",
        productvolume: "12cm, 15cm, 10cm",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <Paper>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          className="border-bottom"
        >
          <Grid item sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" fontSize={16}>
              My Collections
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ my: 5, px: 2 }}>
          <Paper className="pt-2">
            <TableComponent
              table_heading=""
              columns={columns}
              tableRows={tableRows}
              showCheckbox={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MyCollections;
