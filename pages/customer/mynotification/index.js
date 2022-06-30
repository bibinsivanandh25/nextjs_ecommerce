/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RemoveRedEye, Reply } from "@mui/icons-material";
import Notification from "@/forms/customer/mynotification/notification";
import style from "./mynotification.module.css";
import TableComponent from "@/atoms/TableComponent";
import ImageCard from "@/atoms/ImageCard";
import MenuOption from "@/atoms/MenuOptions";

const myQueriescolumns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "SI. No.",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2", //  id value in column should be presented in row as key
    label: "Product image",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3", //  id value in column should be presented in row as key
    label: "Question",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4", //  id value in column should be presented in row as key
    label: "Reply",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5", //  id value in column should be presented in row as key
    label: "Replied By",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6", //  id value in column should be presented in row as key
    label: "Date & Time",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7", //  id value in column should be presented in row as key
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const myQueriesRow = [
  {
    col1: "1",
    col2: (
      <div className="d-flex justify-content-center">
        <ImageCard
          className="d-inline me-1 my-0"
          imgSrc="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
          showClose={false}
          height={30}
          width={30}
        />
        <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
          /5
        </Typography>
      </div>
    ),
    col3: " lorem",
    col4: "--",
    col5: "--",
    col6: "25 May 2022,12:02",
    col7: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        {/* <Reply className="fs-5" /> */}
        <RemoveRedEye
          className="fs-5 cursor-pointer"
          // onClick={() => setShowViewModal(true)}
        />
        <MenuOption
          IconclassName="fs-5 cursor-pointer"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
];
const myProductQueriesRow = [
  {
    col1: "1",
    col2: "123278",
    col3: (
      <div className="d-flex justify-content-center">
        <ImageCard
          className="d-inline me-1 my-0"
          imgSrc="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
          showClose={false}
          height={30}
          width={30}
        />
        <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
          /5
        </Typography>
      </div>
    ),
    col4: " lorem",
    col5: "--",
    col6: "--",
    col7: "25 May 2022,12:02",
    col8: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        <Reply className="fs-5 me-1 cursor-pointer" />
        <RemoveRedEye
          className="fs-5 me-1 cursor-pointer"
          // onClick={() => setShowViewModal(true)}
        />
        <MenuOption
          IconclassName="fs-5 cursor-pointer"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
];
const productQueriescolumns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "SI. No.",
    minWidth: 40,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2", //  id value in column should be presented in row as key
    label: "Customer ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3", //  id value in column should be presented in row as key
    label: "Product image",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4", //  id value in column should be presented in row as key
    label: "Question",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5", //  id value in column should be presented in row as key
    label: "Reply",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6", //  id value in column should be presented in row as key
    label: "Replied By",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7", //  id value in column should be presented in row as key
    label: "Date & Time",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8", //  id value in column should be presented in row as key
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const notificationData = [
  {
    id: 1,
    imagesrc: "",
  },
  {
    id: 2,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 3,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 4,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 1,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 2,
    imagesrc: "",
  },
  {
    id: 3,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 4,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
];
const MyNotification = () => {
  const [tabChange, setTabChange] = useState(true);
  const [tableChange, setTableChange] = useState(true);
  return (
    <div className="">
      {/* <ul className={`${style.nav} .nav-tabs`} id="myTab">
        <li className={`${style.active}`}>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#profile">Profile</a>
        </li>
      </ul> */}
      <div className="d-flex justify-content-start">
        <div
          className={
            tabChange
              ? `${style.activeTab} px-2  py-1`
              : `${style.inactivetabe} px-2 py-1`
          }
          onClick={() => {
            setTabChange(true);
            setTableChange(true);
          }}
        >
          <span className="cursor-pointer fs-14">My Notification</span>
        </div>
        <div
          className={
            tabChange
              ? `${style.inactivetabe} px-2 py-1`
              : `${style.activeTab} px-2  py-1`
          }
          onClick={() => {
            setTabChange(false);
            setTableChange(true);
          }}
        >
          <span className="cursor-pointer fs-14">Queries & Replies</span>
        </div>
      </div>
      <div className="bg-white">
        {tabChange ? (
          <Grid container className="">
            {notificationData.map((item, index) => (
              <Grid item lg={6} sm={6} key={index}>
                <Notification data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <Box className="d-flex  mt-4">
              <p
                className={
                  tableChange
                    ? `ms-5 cursor-pointer color-orange ${style.bottomborder}`
                    : "ms-5 cursor-pointer"
                }
                onClick={() => {
                  setTableChange(true);
                }}
              >
                My Queries
              </p>
              <p
                className={
                  tableChange
                    ? "ms-5 cursor-pointer"
                    : `ms-5 cursor-pointer color-orange ${style.bottomborder}`
                }
                onClick={() => {
                  setTableChange(false);
                }}
              >
                Product Queries
              </p>
            </Box>
            <Box>
              <TableComponent
                showSearchbar={false}
                columns={tableChange ? myQueriescolumns : productQueriescolumns}
                tableRows={tableChange ? myQueriesRow : myProductQueriesRow}
                tHeadBgColor="bg-tableGray"
              />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default MyNotification;
