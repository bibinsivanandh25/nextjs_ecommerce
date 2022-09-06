import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const ViewModal = ({ openViewModal, setOpenViewModal, imagesForViewModal }) => {
  const handleCloseIconClick = () => {
    setOpenViewModal(false);
  };

  const returnImages = () => {
    return imagesForViewModal.map((val, index) => {
      if (index < 5)
        return (
          <Grid item xs={2.4}>
            <Image src={val} height={50} width={50} />
          </Grid>
        );
      return null;
    });
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
        ModalWidth={500}
        minHeightClassName="overflow-auto"
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        onSaveBtnClick={() => {
          //   handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          //   handleCloseIconClick();
        }}
      >
        <Box className="ms-5 my-5">
          <Box>
            <Typography className="h-5">
              Customer ID <span className="fw-bold">#7687787876 SKM Tex</span>
            </Typography>
          </Box>
          <Box className="d-flex mt-2">
            <Typography className="h-5">Images: </Typography>
            <Grid className="mxh-150 overflow-auto" container>
              {returnImages()}
            </Grid>
          </Box>
          <Box>
            <Typography className="h-5 mt-2">
              Questions: <span className="h-5 fw-bold">--</span>
            </Typography>
          </Box>
          <Box>
            <Typography className="h-5 mt-2">
              Date & Time: <span className="h-5 fw-bold">--</span>
            </Typography>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ViewModal;
