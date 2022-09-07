import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";

const NoCommissionStore = () => {
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Store Name",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Referral Code",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Description",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Start Date",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "End Date",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Status",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      col1: "Admin Store",
      col2: "467GKJD73",
      col3: "Use this referral code to register and start your reselling journey. There is no referral commission using this code.",
      col4: "10.12.2022 –12.45am",
      col5: "10.6.2023 -12.45am",
      col6: "Active",
      col7: (
        <Box className="d-flex align-items-center justify-content-around">
          <Box className="d-flex flex-column align-items-center">
            <Box className="ms-4">
              <SwitchComponent label="" />
            </Box>
            <Typography className="h-5">Disable</Typography>
          </Box>
          <MenuOption
            getSelectedItem={(ele) => {
              console.log(ele);
              //   onClickOfMenuItem(ele);
            }}
            options={["view", "Edit", "Delete"]}
            IconclassName="color-gray"
          />
        </Box>
      ),
    },
  ];
  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
      <TableComponent
        columns={columns}
        tHeadBgColor="bg-light-gray"
        showPagination={false}
        tableRows={rows}
        table_heading="No Commission Store"
        showSearchbar={false}
        showSearchFilter={false}
        showCustomButton
        customButtonLabel="Create No Commission Store"
      />
    </Paper>
  );
};

export default NoCommissionStore;
