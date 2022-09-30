import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/adminmanager/admincapabilities";

const AdminManger = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Admin ID",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "First Name",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Designation",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Email",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Mobile",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Menus Managed",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col10",
      align: "Action",
      label: "Sale Price/MRP",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = () => {
    // console.log(ele);
  };

  const rows = [
    {
      id: 1,
      col1: "Suppliers Menu",
      col2: "------",
      col3: "--",
      col4: "--",
      col5r: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "Active",
      col10: (
        <Box className="d-flex align-items-center justify-content-around">
          <Box className="d-flex flex-column align-items-center">
            <Box className="ms-4">
              <SwitchComponent label="" />
            </Box>
            <Typography className="h-5">Disable</Typography>
          </Box>
          <MenuOption
            getSelectedItem={(ele) => {
              onClickOfMenuItem(ele);
            }}
            options={["view", "Edit", "Delete"]}
            IconclassName="color-gray"
          />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {!showAdminCapabilities ? (
        <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            tableRows={rows}
            showCustomButton
            customButtonLabel="Create Admin"
            table_heading="Admin Manger"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setShowAdminCapabilities(true);
            }}
          />
        </Paper>
      ) : (
        <AdminCapabilities
          setShowAdminCapabilities={setShowAdminCapabilities}
        />
      )}
    </Box>
  );
};

export default AdminManger;
