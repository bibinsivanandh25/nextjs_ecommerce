import { Grid, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";

const CancelledOrders = () => {
  const [tableRows, setTableRows] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState({});
  const [tableData, setTableData] = useState([]);
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
      id: "col8",
    },
    {
      label: "Total",
      id: "col9",
    },
    {
      label: "Action",
      id: "col10",
      align: "center",
    },
  ];

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
        col8: row.status,
        col9: row.total,
        col10: (
          <Grid container>
            <Grid item xs={6}>
              <CustomIcon type="download" title="Download" />
            </Grid>
            <Grid item xs={6}>
              <CustomIcon type="view" title="View" />
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };

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
        total: 2,
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
        total: 3,
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
        total: 4,
        orderQuantity: 3,
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  const filterByType = React.useCallback(() => {
    if (dropdownFilter && dropdownFilter.id) {
      switch (dropdownFilter?.id) {
        case "single":
          setTableRows(
            tableRows?.filter((row) => parseInt(row.col7, 10) === 1)
          );
          break;
        case "multiple":
          setTableRows(tableRows?.filter((row) => parseInt(row.col7, 10) > 1));
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
    <Paper
      sx={{ p: 2, height: "100%" }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <Paper sx={{ px: 0, py: 2 }}>
        <TableComponent
          table_heading={`Cancelled Orders (${tableRows.length})`}
          columns={columns}
          tableRows={tableRows}
          showSearchbar={false}
          showSearchFilter={false}
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
            // console.log("onCustomButtonClick");
          }}
          onCustomDropdownChange={(val) => setDropdownFilter(val)}
          customDropdownValue={dropdownFilter}
        />
      </Paper>
    </Paper>
  );
};

export default CancelledOrders;
