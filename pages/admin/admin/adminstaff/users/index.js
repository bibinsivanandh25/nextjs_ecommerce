import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/users/AdminCapabilities";

const Users = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "User ID",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "First Name",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Designation",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Email",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Mobile",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Menu's Managed",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = () => {
    // console.log(ele);
  };

  const rows = [
    {
      id: 1,
      col1: "01",
      col2: "#8273423",
      col3: "------",
      col4: "--",
      col5r: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "Active",
      col11: (
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
      <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
        {!showAdminCapabilities ? (
          <TableComponent
            columns={columns}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            tableRows={rows}
            showCustomButton
            customButtonLabel="Create User"
            table_heading="Users"
            showSearchFilter={false}
            onCustomButtonClick={() => {
              setShowAdminCapabilities(true);
            }}
          />
        ) : (
          <AdminCapabilities
            setShowAdminCapabilities={setShowAdminCapabilities}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Users;
