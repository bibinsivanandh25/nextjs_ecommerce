import { Box, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import CustomIcon from "services/iconUtils";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";

const Reviews = () => {
  const columns = [
    {
      id: "col1",
      align: "center",
      label: "Customer/Reseller ID with Name",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Email",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Mobile",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Product Image",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Product ID",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Rating",
      data_align: "center",
      minWidth: "140px",
    },
    {
      id: "col7",
      align: "center",
      label: "Comments",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Supplier ID",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Review Date & Time",
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
      col1: "#C8372493 – Raja Raman",
      col2: "Home Page",
      col3: "1232131232",
      col4: (
        <Image
          src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg"
          height={50}
          width={50}
        />
      ),
      col5: "---",
      col6: <StarRatingComponentReceivingRating className="h-5" rating={3} />,
      col7: "Show any text added by customer or reseller",
      col8: "#S827342 MS fahion",
      col9: "23/06/2022 - 10.54",
      col10: "Published",
      col11: (
        <Box className="d-flex align-items-center justify-content-around">
          <CustomIcon
            type="doneIcon"
            showColorOnHover={false}
            className="p-1 bg-success color-white rounded"
          />
          <CustomIcon
            type="close"
            showColorOnHover={false}
            className="p-1 bg-danger color-white rounded ms-2"
          />
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
        showSearchbar
      />
    </Paper>
  );
};

export default Reviews;
