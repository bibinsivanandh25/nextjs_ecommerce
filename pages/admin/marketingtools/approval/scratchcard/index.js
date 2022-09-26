import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import ViewMarketingtools from "@/forms/admin/marketingtools&subscriptions/approval/viewmarketingtools";
import EditMarketingTools from "@/forms/admin/marketingtools&subscriptions/approval/editmarketingtools";
import { useState } from "react";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Reseller ID/ Shop Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Tool",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Title",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Description",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Customer Type",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Start Date & Time",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "End Date & Time",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Created Date & Time",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const Scratchcard = () => {
  const [viewModalOpen, setViewModalopen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const rows = [
    {
      id: "col1",
      col1: "1",
      col2: (
        <Typography className="h-5 color-light-blue cursor-pointer text-decoration-underline">
          VLR Transport
        </Typography>
      ),
      col3: "--",
      col4: (
        <Box className="d-flex justify-content-around ">
          <span className="h-5" id="gstinnumber">
            MRK3556235F3
          </span>
        </Box>
      ),
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: (
        <Box>
          <DoneIcon className="border rounded bg-green color-white fs-18 me-1 cursor-pointer" />
          <ClearIcon className="border rounded bg-red color-white fs-18 me-1 cursor-pointer mx-2" />
          <CustomIcon
            type="view"
            className="fs-18 mx-2"
            onIconClick={() => setViewModalopen(true)}
          />
          <MenuOption
            options={["Edit", "Delete"]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              if (ele === "Edit") {
                setOpenEditModal(true);
              }
            }}
          />
        </Box>
      ),
    },
  ];
  return (
    <Paper
      className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      <Box className="mt-2">
        <TableComponent
          columns={[...tableColumn]}
          showDateFilter={false}
          showSearchFilter={false}
          showSearchbar={false}
          tableRows={[...rows]}
          tHeadBgColor="bg-tableGray"
          table_heading="Scratch card"
          showCheckbox={false}
        />
      </Box>
      <ViewMarketingtools
        modalOpen={viewModalOpen}
        modalClose={setViewModalopen}
        title="View Scratch Card"
      />
      <EditMarketingTools
        modalOpen={openEditModal}
        modalClose={setOpenEditModal}
        title="Edit Scratch Card"
        editorPlaceHolder="Description for the Scratch Card Products..."
      />
    </Paper>
  );
};

export default Scratchcard;
