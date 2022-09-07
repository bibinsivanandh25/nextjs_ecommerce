import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";

const Banners = () => {
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Banner Image",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Banner Image",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Display Page",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Navigation page URL",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Button",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Start Date & Time",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "End Date & Time",
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

  const rows = [
    {
      id: 1,
      col1: (
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg"
          height={50}
          width={50}
        />
      ),
      col2: "Reseller",
      col3: "Home Page",
      col4: "---",
      col5: "Shop Now",
      col6: "#2374238 Arun Kumar",
      col7: "23/06/2022 - 10.54",
      col8: "23/06/2022 - 10.54",
      col9: "23/06/2022 - 10.54",
      col10: "Published",
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
        table_heading="Reviews"
        showDateFilter
        showDateFilterBtn
        dateFilterBtnName="Create Banners"
        showSearchbar
      />
    </Paper>
  );
};

export default Banners;
