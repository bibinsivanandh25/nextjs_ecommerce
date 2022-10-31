import TableComponent from "@/atoms/TableComponent";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import CustomIcon from "services/iconUtils";

const tableColumn = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 30,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Business Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Email / Mobile",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Stock Count ",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Website link",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Other Marketplace",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const tableRows = [
  {
    id: 1,
    col1: 1,
    col2: "businessName",
    // col3: item.emailId ? item.emailId : item.mobileNumber,
    col3: "8870314911",
    col4: (
      <Box className="d-flex justify-content-around ">
        <span className="h-5" id="gstinnumber">
          gstin
        </span>
        <Tooltip title="copy" placement="top">
          <Typography className="text-truncate text-center h-5 fw-bold">
            <CustomIcon
              type="filecopy"
              size="small"
              className="fs-18"
              onIconClick={() => {
                // copyText();
              }}
            />
          </Typography>
        </Tooltip>
      </Box>
    ),
    col5: "mainCategories",
    col6: "avgStockCount",
    col7: "websiteLink",
    col8: "websiteName",
    col9: (
      <Box>
        {/* <DoneIcon
              className="border rounded bg-green color-white fs-18 me-1 cursor-pointer"
              onClick={() => {
                handleAcceptClick("supplierId", "APPROVED");
              }}
            />
            <ClearIcon
              className="border rounded bg-red color-white fs-18 me-1 cursor-pointer"
              onClick={() => {
                handleAcceptClick("supplierId", "REJECTED");
              }}
            /> */}
        <CustomIcon
          type="view"
          className="fs-18 me-1 cursor-pointer"
          title="View"
          onIconClick={() => {
            // handleViewClick(item);
          }}
        />
        {/* <CustomIcon
              type="notificationsIcon"
              className="fs-18 cursor-pointer"
              onIconClick={() => {
                setNotifyModalOpen(true);
              }}
            /> */}
      </Box>
    ),
  },
];

const Reajected = () => {
  return (
    <Paper
      className="pt-2 mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      <Box>
        <TableComponent
          columns={tableColumn}
          table_heading="Rejected"
          showFilterButton
          showDateFilterBtn
          showSearchFilter={false}
          showSearchbar
          stickyHeader={false}
          tableRows={[...tableRows]}
          showCheckbox={false}
          allowOutSideClickClose
        />
      </Box>
    </Paper>
  );
};

export default Reajected;
