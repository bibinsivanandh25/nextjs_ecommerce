import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ViewModal from "@/forms/admin/suppliers/active/viewmodal";

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
    label: "Supplier id with Business Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Location",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories/Sub-categories",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Total Catelogs",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Catelogs Size / 50MB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Total Orders",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Earnings",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Amount to be paid",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Created Date & Time",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Charges Collected / Pending days",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Actions",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];
const Active = () => {
  const [viewModalOpen, setViewModaOpen] = useState(false);
  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
  };
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
          <CustomIcon
            type="filecopy"
            size="small"
            className="fs-18"
            onIconClick={() => {
              copyText();
            }}
          />
        </Box>
      ),
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "3436",
      col9: "--",
      col10: "--",
      col11: "--",
      col12: (
        <Box>
          <CustomIcon
            type="view"
            className="fs-18 me-2"
            onIconClick={() => {
              setViewModaOpen(true);
            }}
          />
          <MenuOption
            options={[
              "Edit",
              <>
                Enable{" "}
                <Box className="ms-4">
                  <SwitchComponent label="" />
                </Box>
              </>,
              "Notify",
              "Rasie a query",
              "Supplier Home Page",
            ]}
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={() => {}}
          />
        </Box>
      ),
    },
  ];
  return (
    <Box>
      {!viewModalOpen ? (
        <Box>
          <Typography className="h-4 color-orange fw-bold ps-4">
            Active Suppliers (58)
          </Typography>
          <TableComponent
            columns={[...tableColumn]}
            showDateFilter
            tableRows={[...rows]}
            tHeadBgColor="bg-gray"
            stickyCheckBox
            stickyHeader
          />
        </Box>
      ) : (
        <ViewModal
          viewModalOpen={viewModalOpen}
          setViewModaOpen={setViewModaOpen}
        />
      )}
    </Box>
  );
};

export default Active;
