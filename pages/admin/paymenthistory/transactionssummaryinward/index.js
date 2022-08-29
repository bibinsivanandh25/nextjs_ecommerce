import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";

const tableColumn = [
  {
    id: "col1",
    label: "SI.No",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Reseller ID / Store Code",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Customer ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Supplier ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Logistics",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Total Orders",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Total Amount Payable",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Payment ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Payment Source",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Payment Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Mode Of Transaction",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Status",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col13",
    label: "Reason",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col14",
    label: "Comments",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col15",
    label: "Action",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];

const TransactionsSummaryInward = () => {
  const [rows, setRows] = useState([]);
  const getTableData = () => {
    const tableRow = [
      {
        id: "col1",
        col1: "1",
        col2: "Non-Active",
        col3: "124DWD2WER",
        col4: "SUP10RSTR24",
        col5: "Non",
        col6: (
          <Typography className="h-5 color-blue text-decoration-underline cursor-pointer fit-content">
            45
          </Typography>
        ),
        col7: "4789",
        col8: "REFR3444FRT",
        col9: "--",
        col10: "12/09/2022",
        col11: "--",
        col12: "Non-Active",
        col13: "NO",
        col14: "--",
        col15: (
          <Box className="d-flex" justifyContent="center">
            <Box className="me-3">
              <CustomIcon type="view" className="fs-20" />
            </Box>
            <CustomIcon type="chatBubbleIcon" className="fs-20" />
          </Box>
        ),
      },
    ];
    setRows(tableRow);
  };
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box>
        <TableComponent
          showDateFilter
          table_heading="Transaction summary Inward"
          tHeadBgColor="bg-light-gray"
          stickyCheckBox
          stickyHeader
          tableRows={[...rows]}
          columns={[...tableColumn]}
        />
      </Box>
    </Paper>
  );
};
export default TransactionsSummaryInward;
