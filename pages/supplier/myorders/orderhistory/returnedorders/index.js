import { Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ReturnedOrders = () => {
  const columns = [
    {
      label: "Purchase ID",
      id: "purchaseid",
    },
    {
      label: "Order ID",
      id: "orderid",
    },
    {
      label: "Order Date",
      id: "orderdate",
    },
    {
      label: "Size",
      id: "size",
    },
    {
      label: "Weight",
      id: "weight",
    },
    {
      label: "Manifest Date",
      id: "manifestdate",
    },
    {
      label: "Qty",
      id: "qty",
    },
    {
      label: "Choose Action",
      id: "chooseaction",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Total",
      id: "total",
    },
    {
      label: "Action",
      id: "action",
    },
    4,
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    // data.forEach((row) => {

    // })
  }

  const rows = [
    {
      purchaseid: "#123456",
      orderid: "123456",
      orderdate: "12-01-2022",
      size: "UK24",
      weight: "200gm",
      manifestdate: "23-01-2022",
      qty: "4",
      status: "500",
      total: 4,
      action: (
        <>
          <DownloadIcon className="text-secondary mx-2" />
          <VisibilityIcon className="text-secondary" />
        </>
      ),
    },
    {
      purchaseid: "#123456",
      orderid: "123456",
      orderdate: "12-01-2022",
      size: "UK24",
      weight: "200gm",
      manifestdate: "23-01-2022",
      qty: "4",
      status: "500",
      total: 4,
      action: (
        <>
          <DownloadIcon className="text-secondary mx-2" />
          <VisibilityIcon className="text-secondary" />
        </>
      ),
    },
  ];
  return (
    <Paper sx={{ px: 0 }}>
      <TableComponent
        table_heading={`Returned Orders (${rows.length})`}
        columns={columns}
        tableRows={rows}
        showSearchbar={false}
        showCheckbox={false}
      />
    </Paper>
  );
};

export default ReturnedOrders;
