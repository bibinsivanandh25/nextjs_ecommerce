import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomIcon from "services/iconUtils";
import ClearIcon from "@mui/icons-material/Clear";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import UpdateViewModal from "@/forms/admin/suppliers/updated/viewmodal";
import UpdateRaiseQuery from "@/forms/admin/suppliers/updated/raisequery";

const tableColumn = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Supplier ID / Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Email / Mobile",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Categories",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Queries",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Answers",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Updated Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Actions",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const viewModalData = [
  {
    id: 1,
    title: "Supplier ID / Name",
    value: "Balu",
  },
  {
    id: 2,
    title: "Email / Mobile",
    value: "balu123@gmail.com",
  },
  {
    id: 3,
    title: "Categories",
    value: "--",
  },
  {
    id: 4,
    title: "Queries",
    value: "--",
  },
];
const Updated = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const rows = [
    {
      id: "col1",
      col1: 1,
      col2: "VRL Transport",
      col3: "--",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: (
        <Box>
          <DoneIcon className="border rounded bg-green color-white fs-18 me-1" />
          <ClearIcon className="border rounded bg-red color-white fs-18 me-1" />
          <CustomIcon
            type="view"
            className="fs-18 me-1"
            title="View"
            onIconClick={() => {
              setViewModalOpen(true);
            }}
          />
          <MenuOption
            options={["Edit", "Raise a query", "Supplier Shopping Page"]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              if (ele === "Raise a query") {
                setQueryModalOpen(true);
              }
            }}
          />
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Paper
        className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
        elevation={3}
      >
        <Box className="mt-2">
          <TableComponent
            showDateFilter
            tHeadBgColor="bg-tableGray"
            stickyCheckBox
            stickyHeader
            table_heading="Updated (4/58)"
            columns={[...tableColumn]}
            tableRows={[...rows]}
          />
        </Box>
      </Paper>
      {viewModalOpen && (
        <UpdateViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          data={viewModalData}
        />
      )}
      {queryModalOpen && (
        <UpdateRaiseQuery
          queryModalOpen={queryModalOpen}
          setQueryModalOpen={setQueryModalOpen}
        />
      )}
    </Box>
  );
};

export default Updated;
