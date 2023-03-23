import { Box, Grid, Typography } from "@mui/material";
// import Image from "next/image";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";
import Image from "next/image";

const ViewModal = ({
  openViewModal,
  setOpenViewModal,
  selectedData = {},
  type = "UnAnswered",
}) => {
  const handleCloseIconClick = () => {
    setOpenViewModal(false);
  };
  return (
    <Box>
      <ModalComponent
        open={openViewModal}
        ModalTitle="View"
        titleClassName="fw-bold h-5 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Cancel"
        saveBtnText="Submit"
        saveBtnClassName="ms-1"
        ModalWidth={700}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          //   handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          setOpenViewModal(false);
          //   handleCloseIconClick();
        }}
      >
        <Grid container marginBottom={1}>
          <Grid item sm={4} justifyContent="end" display="flex">
            <Typography className="h-p89 fw-bold"> Customer ID : </Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography className="h-p89">
              &nbsp;{selectedData?.customerId}
            </Typography>
          </Grid>
        </Grid>
        <Grid container display="flex" alignItems="center" marginBottom={1}>
          <Grid item sm={4} justifyContent="end" display="flex">
            <Typography className="h-p89 fw-bold">Product Image : </Typography>
          </Grid>
          <Grid item sm={8}>
            <Box className="h-p89 d-flex">
              &nbsp;
              {selectedData?.productImages.map((item) => (
                <Box marginRight={2} className="border rounded p-1">
                  <Image src={item} width={50} height={50} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid container marginBottom={1}>
          <Grid item sm={4} justifyContent="end" display="flex">
            <Typography className="h-p89 fw-bold">Question : </Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography className="h-p89">
              &nbsp;{selectedData?.question}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={4} justifyContent="end" display="flex">
            <Typography className="h-p89 fw-bold"> Date & Time : </Typography>
          </Grid>
          <Grid item sm={8}>
            <Typography className="h-p89">
              &nbsp;{selectedData?.dateAndTime}
            </Typography>
          </Grid>
        </Grid>
        {type === "Answered" ? (
          <>
            <Grid container my={1}>
              <Grid item sm={4} justifyContent="end" display="flex">
                <Typography className="h-p89 fw-bold">Reply : </Typography>
              </Grid>
              <Grid item sm={8}>
                <Typography className="h-p89">
                  &nbsp;{selectedData?.reply}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={4} justifyContent="end" display="flex">
                <Typography className="h-p89 fw-bold">Replied By :</Typography>
              </Grid>
              <Grid item sm={8}>
                <Typography className="h-p89">
                  &nbsp;{selectedData?.repliedBy}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : null}
      </ModalComponent>
    </Box>
  );
};

export default ViewModal;
