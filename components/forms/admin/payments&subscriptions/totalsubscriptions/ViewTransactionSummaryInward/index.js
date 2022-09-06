import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableComponent from "@/atoms/TableComponent";

const ViewTransactionSummaryInward = ({
  setShowViewTransactionSummaryInward,
}) => {
  const [tableRows, setTableRows] = useState([]);
  const tableColums = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
      position: "sticky",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col2",
      align: "center",
      label: "Reseller ID",
      data_align: "center",
      position: "sticky",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col3",
      align: "center",
      label: "Customer ID",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col4",
      align: "center",
      label: "Supplier ID",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col5",
      align: "center",
      label: "Logistics",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col6",
      align: "center",
      label: "Total Orders",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col7",
      align: "center",
      label: "Total Amount Payable",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col8",
      align: "center",
      label: "Payment ID",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col9",
      align: "center",
      label: "Payment Source",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col10",
      align: "center",
      label: "Payment Date & Time",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col11",
      align: "center",
      label: "Status",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col12",
      align: "center",
      label: "Reason",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
    {
      id: "col13",
      align: "center",
      label: "Comments",
      data_align: "center",
      minWidth: 120,
      data_classname: "",
    },
  ];

  const rowsForTable = [
    {
      id: 1,
      col1: "01",
      col2: "#762383",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
      col11: "Un-Successful",
      col12: "RTO Payment",
      col13: "--",
    },
  ];

  const getTableRows = () => {
    const anArray = [];
    rowsForTable.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: val.col1,
        col2: val.col2,
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: val.col8,
        col9: val.col9,
        col10: val.col10,
        col11: val.col11,
        col12: val.col12,
        col13: val.col13,
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <>
      <Box>
        <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
          <Typography
            className="h-5 mb-3 cursor-pointer fw-bold"
            onClick={() => {
              setShowViewTransactionSummaryInward(false);
            }}
          >
            {"<"}Back
          </Typography>
          <TableComponent
            table_heading="View Transaction Summary Inward"
            columns={[...tableColums]}
            tableRows={tableRows}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            // showDateFilter
            stickyHeader
          />
        </Paper>
      </Box>
    </>
  );
};

export default ViewTransactionSummaryInward;
