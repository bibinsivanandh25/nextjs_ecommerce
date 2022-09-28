/* eslint-disable no-unused-vars */
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import { Box, Paper, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import EditQuizModal from "@/forms/admin/marketingtools&subscriptions/approval/quiz/editquizmodal";

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
    label: "Quiz Title",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Description",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Quiz Question",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Options",
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
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const Quiz = () => {
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
      col8: (
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
          table_heading="Quiz"
          showCheckbox={false}
        />
      </Box>
      <EditQuizModal
        modalOpen={openEditModal}
        modalClose={setOpenEditModal}
        title="Edit Quiz"
        editorPlaceHolder="Description for the Scratch Card Products..."
      />
    </Paper>
  );
};

export default Quiz;
