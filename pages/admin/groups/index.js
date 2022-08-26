import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import MenuOption from "@/atoms/MenuOptions";
import AdminCapabilities from "@/forms/admin/groups/AdminCapabilities";

const Users = () => {
  const [showAdminCapabilities, setShowAdminCapabilities] = useState(false);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Group Name",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Description",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Created Manger ID",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "User ID",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Admin ID",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Last Updated Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = (ele) => {
    console.log(ele);
  };

  const rows = [
    {
      id: 1,
      col1: "Suppliers Name",
      col2: "------",
      col3: "#8234823 by Arun Kumar",
      col4: "#8234823",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "Active",
      col9: (
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
            customButtonLabel="Create Group"
            table_heading="Groups"
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
