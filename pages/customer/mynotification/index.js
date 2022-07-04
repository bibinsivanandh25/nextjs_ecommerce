/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { RemoveRedEye, Reply } from "@mui/icons-material";
import CustomIcon from "services/iconUtils";
import Notification from "@/forms/customer/mynotification/notification";
import style from "./mynotification.module.css";
import TableComponent from "@/atoms/TableComponent";
import ImageCard from "@/atoms/ImageCard";
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

const MyNotification = () => {
  const [tabChange, setTabChange] = useState(true);
  const [tableChange, setTableChange] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [myQueriesEditClick, setMyQueriesEditClick] = useState(false);
  const [replyModalOpen, setreplyModalOpen] = useState(false);
  const [ProductViewModal, setProductViewModal] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
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
            onClick={() => setShowViewModal(true)}
          />
          <MenuOption
            IconclassName="fs-5 cursor-pointer"
            getSelectedItem={(ele) => {
              console.log(ele, "ele");
              if (ele == "Edit") {
                setMyQueriesEditClick(true);
              }
            }}
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
          <Reply
            className="fs-5 me-1 cursor-pointer"
            onClick={() => {
              setreplyModalOpen(true);
            }}
          />
          <RemoveRedEye
            className="fs-5 me-1 cursor-pointer"
            onClick={() => setProductViewModal(true)}
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
  const imageDatacard = [
    {
      id: 1,
      imagesrc:
        "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
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
      id: 5,
      imagesrc:
        "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    },
  ];
  return (
    <div className="">
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
          <Grid container className="border-top">
            {notificationData.map((item, index) => (
              <Grid item lg={6} sm={6} key={index} className="mt-3">
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
      {showViewModal && (
        <ModalComponent
          open={showViewModal}
          onCloseIconClick={() => {
            setShowViewModal(false);
          }}
          ModalTitle="View"
          titleClassName=" fs-18 color-orange"
          footerClassName="d-flex justify-content-end"
          ClearBtnText="Cancel"
          saveBtnText="Reply"
          ModalWidth={700}
          minHeightClassName="mnh-200"
          onClearBtnClick={() => {
            setShowViewModal(false);
          }}
        >
          <Box className="d-flex justify-content-center mt-5">
            <Box>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Customer ID :{" "}
                <span className="fw-600">#345345 SKM Tex</span>
              </p>
              <div className="d-flex mt-2">
                <p className="align-self-center">
                  &nbsp;Product Image : &nbsp;
                </p>
                <div className="d-flex ">
                  {imageDatacard.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded me-2"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <CardMedia
                        component="img"
                        image={item.imagesrc}
                        showClose={false}
                        height={58}
                        width={60}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question
                : --
              </p>
              <p className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp; Date & Time : --</p>
            </Box>
          </Box>
        </ModalComponent>
      )}
      {myQueriesEditClick && (
        <ModalComponent
          open={myQueriesEditClick}
          onCloseIconClick={() => {
            setMyQueriesEditClick(false);
          }}
          ModalTitle="Capture question asked by customer here......"
          titleClassName=" fs-18"
          footerClassName="d-flex justify-content-end mb-3"
          ClearBtnText="Cancel"
          saveBtnText="Update"
          ModalWidth={700}
          minHeightClassName="mnh-200"
          onClearBtnClick={() => {
            setMyQueriesEditClick(false);
          }}
          onSaveBtnClick={() => {
            setResponseModal(true);
            setMyQueriesEditClick(false);
          }}
        >
          <Box className="mt-3 p-3">
            <textarea
              className="w-100 mnh-150 border rounded outline"
              placeholder="Reply here"
              style={{ outline: "1px solid gray" }}
            />
          </Box>
        </ModalComponent>
      )}
      {replyModalOpen && (
        <ModalComponent
          open={replyModalOpen}
          onCloseIconClick={() => {
            setreplyModalOpen(false);
          }}
          ModalTitle="Capture question asked by customer here......"
          titleClassName=" fs-18"
          footerClassName="d-flex justify-content-end mb-3"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          ModalWidth={700}
          minHeightClassName="mnh-200"
          onClearBtnClick={() => {
            setreplyModalOpen(false);
          }}
          onSaveBtnClick={() => {
            setResponseModal(true);
            setreplyModalOpen(false);
          }}
        >
          <Box className="mt-3 p-3">
            <textarea
              className="w-100 mnh-150 border rounded outline"
              placeholder="Reply here"
              style={{ outline: "1px solid gray" }}
            />
          </Box>
        </ModalComponent>
      )}
      {ProductViewModal && (
        <ModalComponent
          open={ProductViewModal}
          onCloseIconClick={() => {
            setProductViewModal(false);
          }}
          ModalTitle="View"
          titleClassName=" fs-18 color-orange"
          ModalWidth={700}
          minHeightClassName="mnh-200"
          showFooter={false}
        >
          <Box className="d-flex justify-content-center mt-5 mb-4">
            <Box>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Customer ID :{" "}
                <span className="fw-600">#345345 SKM Tex</span>
              </p>
              <div className="d-flex mt-2">
                <p className="align-self-center">
                  &nbsp;Product Image : &nbsp;
                </p>
                <div className="d-flex ">
                  {imageDatacard.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded me-2"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <CardMedia
                        component="img"
                        image={item.imagesrc}
                        showClose={false}
                        height={58}
                        width={60}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question
                : --
              </p>
              <p className="mt-2">&nbsp;&nbsp;&nbsp;&nbsp; Date & Time : --</p>
              <p className="mt-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reply
                : --
              </p>
              <p className="mt-2">
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Replied By : --
              </p>
            </Box>
          </Box>
        </ModalComponent>
      )}
      {responseModal && (
        <ModalComponent
          open={responseModal}
          onCloseIconClick={() => {
            setResponseModal(false);
          }}
          // showHeader={false}
          showFooter={false}
          minHeightClassName="mnh-150"
          ModalWidth={200}
          headerBorder=""
          ModalTitle=""
        >
          <Box className="mt-2">
            <Box className="d-flex justify-content-center">
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#d6ffc4",
                }}
                className="d-flex justify-content-center align-self-center"
              >
                <div
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#a6fd81",
                  }}
                  className="d-flex justify-content-center align-self-center"
                >
                  <CustomIcon
                    showColorOnHover={false}
                    type="checkCircleIcon"
                    className="fs-35 color-dark-green1"
                  />
                </div>
              </div>
            </Box>
            <p className="fs-16 fw-500">Your Response has been updated.</p>
            <div className="d-flex justify-content-center mt-2">
              <ButtonComponent
                label="OK"
                onBtnClick={() => {
                  setResponseModal(false);
                }}
              />
            </div>
          </Box>
        </ModalComponent>
      )}
    </div>
  );
};

export default MyNotification;
