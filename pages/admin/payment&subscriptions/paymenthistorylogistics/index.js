import { Box, Paper } from "@mui/material";
import React from "react";
import TableComponent from "@/atoms/TableWithSpan";

const PaymentHistoryLogistics = () => {
  // const column1 = [
  //   {
  //     id: "col1", //  id value in column should be presented in row as key
  //     label: "S.No.",
  //     minWidth: 100,
  //     align: "center",
  //     data_align: "center",
  //     data_classname: "",
  //     rowSpan: 2,
  //     position: "sticky",
  //   },

  //   {
  //     label: "Delhivery",
  //     minWidth: 100,
  //     align: "center",
  //     data_align: "center",
  //     data_classname: "",
  //     colSpan: 2,
  //   },
  //   {
  //     label: "Postal Department",
  //     minWidth: 100,
  //     align: "center",
  //     data_align: "center",
  //     data_classname: "",
  //     colSpan: 2,
  //   },
  //   {
  //     label: "Dimensions",
  //     minWidth: 100,
  //     align: "center",
  //     data_align: "center",
  //     data_classname: "",
  //     colSpan: 3,
  //   },
  //   {
  //     id: "col9",
  //     label: "Action",
  //     minWidth: 100,
  //     align: "center",
  //     data_align: "center",
  //     data_classname: "",
  //     rowSpan: 2,
  //   },
  // ];
  return (
    <Box>
      <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
        <TableComponent
          tHeadBgColor="bg-gray-1"
          // tableRows={[...rows]}
          // columns={[...column2]}
          // column2={[...column1]}
        />
      </Paper>
    </Box>
  );
};

export default PaymentHistoryLogistics;
