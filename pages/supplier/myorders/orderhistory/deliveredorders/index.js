import { Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DeliveredOrders = () => {
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
  ];

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
        table_heading={`Delivered Orders (${rows.length})`}
        columns={columns}
        tableRows={rows}
        showCheckbox={false}
        showSearchbar={false}
      />
    </Paper>
  );
};

export default DeliveredOrders;
