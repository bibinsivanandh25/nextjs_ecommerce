import { Button, Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";

const ReturnedOrders = () => {
  const columns = [
    {
      label: "Purchase ID",
      align: "center",
      id: "col1",
    },
    {
      label: "Order ID",
      align: "center",
      id: "col2",
    },
    {
      label: "Order Date",
      align: "center",
      id: "col3",
    },
    {
      label: "Size",
      align: "center",
      id: "col4",
    },
    {
      label: "Weight",
      align: "center",
      id: "col5",
    },
    {
      label: "Manifest Date",
      align: "center",
      id: "col6",
    },
    {
      label: "Qty",
      align: "center",
      id: "col7",
    },
    {
      label: "Total",
      align: "center",
      id: "col8",
    },
    {
      label: "Status",
      align: "center",
      id: "col9",
    },
    {
      label: "Choose Action",
      id: "col10",
      align: "center",
    },
    {
      label: "Action",
      id: "col11",
      align: "center",
    },
  ];

  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const chooseActionList = [
    {
      id: "received",
      value: "received",
      label: "Product Received",
    },
    {
      id: "notreceived",
      value: "notreceived",
      label: "Product Not Received",
    },
    {
      id: "receivedwithdamage",
      value: "receivedwithdamage",
      label: "Product Received With Damage",
    },
    {
      id: "lost",
      value: "lost",
      label: "Product Lost In Transit",
    },
  ];

  const handleChooseActionChange = (val, id) => {
    const copy = tableData.map((row) => {
      if (row.purchaseid === id) {
        return {
          ...row,
          chooseActionValue: val,
        };
      }
      return row;
    });
    setTableData(copy);
  };

  const getClassnames = (status) => {
    if (status?.toLowerCase().includes("live")) {
      return "text-success";
    } else if (status.toLowerCase().includes("fail")) {
      return "text-danger";
    }
    return "";
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.purchaseid,
        col2: row.orderid,
        col3: row.orderdate,
        col4: row.size,
        col5: row.weight,
        col6: row.manifestdate,
        col7: row.qty,
        col8: row.total,
        col9: <div className={getClassnames(row.status)}>{row.status}</div>,
        col10: (
          <Grid container spacing={2} sx={{ width: 200 }}>
            <Grid item xs={8}>
              <SimpleDropdownComponent
                label="Choose Action"
                list={chooseActionList}
                size="small"
                value={row.chooseActionValue}
                id={`${row.purchaseid}chooseAction`}
                onDropdownSelect={(val) =>
                  handleChooseActionChange(val, row.purchaseid)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                size="small"
                disabled={!row.chooseActionValue}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        ),
        col11: (
          <>
            <DownloadIcon className="text-secondary mx-2" />
            <VisibilityIcon className="text-secondary" />
          </>
        ),
      });
    });
    return result;
  };

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  useEffect(() => {
    const rows = [
      {
        purchaseid: "#123458",
        orderid: "123456",
        orderdate: "12-01-2022",
        size: "UK24",
        weight: "200gm",
        manifestdate: "23-01-2022",
        qty: "4",
        status: "PRODUCT LIVE",
        total: 4,
        chooseActionValue: null,
      },
      {
        purchaseid: "#123456",
        orderid: "123456",
        orderdate: "12-01-2022",
        size: "UK24",
        weight: "200gm",
        manifestdate: "23-01-2022",
        qty: "4",
        status: "VALIDATION FAILED",
        chooseActionValue: null,
        total: 4,
      },
    ];
    setTableData(rows);
  }, []);

  return (
    <Paper sx={{ px: 0 }}>
      <TableComponent
        table_heading={`Returned Orders (${tableRows.length})`}
        columns={columns}
        tableRows={tableRows}
        showSearchbar={false}
        showCheckbox={false}
      />
    </Paper>
  );
};

export default ReturnedOrders;
