import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
import CreateFlagModal from "./CreateFlagModal";

const AdminFlags = () => {
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Flag Title",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Image",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Pixel Ratio",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Updated Date & Time",
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
      col1: "Deal of the Day",
      col2: (
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg"
          height={50}
          width={50}
        />
      ),
      col3: "---",
      col4: "---",
      col5: "---",
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
            getSelectedItem={() => {
              // console.log(ele);
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
    <>
      <Box className="mt-4">
        <TableComponent
          columns={columns}
          tHeadBgColor="bg-light-gray"
          showPagination={false}
          tableRows={rows}
          customButtonLabel="Create Group"
          table_heading="Flags"
          showDateFilter
          showDateFilterBtn
          dateFilterBtnName="Create Flags"
          dateFilterBtnClick={() => {
            setOpenCreateFlagModal(true);
          }}
        />
      </Box>
      <CreateFlagModal
        openCreateFlagModal={openCreateFlagModal}
        setOpenCreateFlagModal={setOpenCreateFlagModal}
      />
    </>
  );
};

export default AdminFlags;
