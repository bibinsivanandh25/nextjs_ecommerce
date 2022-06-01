import { Button, Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import CustomIcon from "services/iconUtils";

const ReturnedOrders = () => {
  const columns = [
    {
      label: "Purchase ID",
      id: "col1",
    },
    {
      label: "Order ID",
      id: "col2",
    },
    {
      label: "Order Date",
      id: "col3",
    },
    {
      label: "Size",
      id: "col4",
    },
    {
      label: "Weight",
      id: "col5",
    },
    {
      label: "Manifest Date",
      id: "col6",
    },
    {
      label: "Qty",
      id: "col7",
    },
    {
      label: "Status",
      align: "center",
      id: "col8",
    },
    {
      label: "Choose Action",
      id: "col9",
      align: "center",
      minWidth: 250,
    },
    {
      label: "Action",
      id: "col10",
      align: "center",
      minWidth: 100,
    },
  ];

  const [tableRows, setTableRows] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState({});
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
        col8: <div className={getClassnames(row.status)}>{row.status}</div>,
        col9: (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <SimpleDropdownComponent
                label="Choose Action"
                list={chooseActionList}
                size="small"
                value={row.chooseActionValue}
                id={`${row.purchaseid}chooseAction`}
                onDropdownSelect={(val) =>
                  handleChooseActionChange(val, row.purchaseid)
                }
                fontSize="0.8rem"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="small"
                disabled={!row.chooseActionValue}
                sx={{ fontSize: 8 }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        ),
        col10: (
          <Grid container mx={1} alignItems="center" justifyContent="center">
            <Grid item>
              <CustomIcon title="Download" type="download" />
            </Grid>
            <Grid item>
              <CustomIcon title="View" type="view" />
            </Grid>
          </Grid>
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
        chooseActionValue: null,
        orderQuantity: 1,
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
        orderQuantity: 1,
      },
      {
        purchaseid: "#123458",
        orderid: "123456",
        orderdate: "12-01-2022",
        size: "UK24",
        weight: "200gm",
        manifestdate: "23-01-2022",
        qty: "4",
        status: "PRODUCT LIVE",
        chooseActionValue: null,
        orderQuantity: 1,
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
        orderQuantity: 1,
      },
      {
        purchaseid: "#123458",
        orderid: "123456",
        orderdate: "12-01-2022",
        size: "UK24",
        weight: "200gm",
        manifestdate: "23-01-2022",
        qty: "4",
        status: "PRODUCT LIVE",
        chooseActionValue: null,
        orderQuantity: 1,
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
        orderQuantity: 1,
      },
      {
        purchaseid: "#123458",
        orderid: "123456",
        orderdate: "12-01-2022",
        size: "UK24",
        weight: "200gm",
        manifestdate: "23-01-2022",
        qty: "4",
        status: "PRODUCT LIVE",
        chooseActionValue: null,
        orderQuantity: 1,
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
        orderQuantity: 1,
      },
      {
        purchaseid: "#123459",
        orderid: "123423",
        orderdate: "12-01-2023",
        size: "UK22",
        weight: "300gm",
        manifestdate: "23-01-2022",
        qty: "1",
        status: "VALIDATION FAILED",
        chooseActionValue: null,
        orderQuantity: 3,
      },
    ];
    setTableData(rows);
  }, []);

  const filterByType = React.useCallback(() => {
    if (dropdownFilter && dropdownFilter.id) {
      switch (dropdownFilter?.id) {
        case "single":
          setTableRows(
            tableRows?.filter((row) => parseInt(row["col7"], 10) === 1)
          );
          break;
        case "multiple":
          setTableRows(
            tableRows?.filter((row) => parseInt(row["col7"], 10) > 1)
          );
          break;
        default:
          setTableRows(mapRowsToTable(tableData));
      }
    } else {
      setTableRows(mapRowsToTable(tableData));
    }
  }, [dropdownFilter]);

  useEffect(() => {
    filterByType();
  }, [dropdownFilter]);

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          table_heading={`Returned Orders (${tableRows.length})`}
          columns={columns}
          tableRows={tableRows}
          showSearchbar={false}
          showCheckbox={false}
          showCustomDropdown
          customDropdownLabel="Order Type"
          customDropdownList={[
            { id: "single", label: "Single" },
            { id: "multiple", label: "Multiple" },
          ]}
          showCustomButton
          customButtonLabel="Download All Orders"
          onCustomButtonClick={() => {
            console.log("onCustomButtonClick");
          }}
          onCustomDropdownChange={(val) => setDropdownFilter(val)}
          customDropdownValue={dropdownFilter}
        />
      </Paper>
    </Paper>
  );
};

export default ReturnedOrders;
