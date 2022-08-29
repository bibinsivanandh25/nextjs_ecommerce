import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import ModalComponent from "@/atoms/ModalComponent";

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
    align: "center",
    data_align: "center",
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
    align: "start",
    data_align: "start",
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

const TransactionsSummaryOutward = () => {
  const [ManualModalOpen, setManualModalOpen] = useState(false);
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
        col6: "45",
        col7: "4789",
        col8: "REFR3444FRT",
        col9: "--",
        col10: "12/09/2022",
        col11: (
          <Typography
            className="h-5 color-blue text-decoration-underline cursor-pointer fit-content"
            onClick={() => {
              setManualModalOpen(true);
            }}
          >
            Manual
          </Typography>
        ),
        col12: "Non-Active",
        col13: "NO",
        col14: "--",
        col15: (
          <Box>
            <CustomIcon type="view" className="fs-20 me-2" />
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
          table_heading="Transaction summary Outward"
          tHeadBgColor="bg-light-gray"
          stickyCheckBox
          stickyHeader
          tableRows={[...rows]}
          columns={[...tableColumn]}
        />
      </Box>
      <ModalComponent
        open={ManualModalOpen}
        onCloseIconClick={() => {
          setManualModalOpen(false);
        }}
        showFooter={false}
        ModalTitle="Mode of transaction (manual)"
        titleClassName="fw-bold h-5 color-orange"
      >
        <Box>
          <Grid container className="py-2" xs={12} alignItems="center">
            <Grid item sm={3} display="flex" justifyContent="end">
              <Typography className="h-5">Admin ID</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={8} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">211352</Typography>
            </Grid>
          </Grid>{" "}
          <Grid container className="py-2" xs={12} alignItems="center">
            <Grid item sm={3} display="flex" justifyContent="end">
              <Typography className="h-5">Name</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={8} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">Balu</Typography>
            </Grid>
          </Grid>{" "}
          <Grid container className="py-2" xs={12} alignItems="center">
            <Grid item sm={3} display="flex" justifyContent="end">
              <Typography className="h-5">E-mail</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={8} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">
                baluMurugesan@24@gmail.com
              </Typography>
            </Grid>
          </Grid>{" "}
          <Grid container className="py-2" xs={12} alignItems="center">
            <Grid item sm={3} display="flex" justifyContent="end">
              <Typography className="h-5">Mobile No</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={8} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">9865211352</Typography>
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>
    </Paper>
  );
};
export default TransactionsSummaryOutward;
