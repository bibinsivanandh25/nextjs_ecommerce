import { Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";

const ViewModal = ({
  viewModalOpen,
  setViewModalOpen = () => {},
  viewDetails = [],
}) => {
  return (
    <ModalComponent
      open={viewModalOpen}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
      showPositionedClose
      showHeader
      showCloseIcon={false}
      ModalTitle=""
      headerBorder=""
      footerClassName="justify-content-end"
      showClearBtn={false}
      saveBtnText="Submit"
      ModalWidth={1000}
      showFooter={false}
    >
      <Grid container spacing={2}>
        {viewDetails.map((item) => (
          <Grid item sm={1.2} key={item.id}>
            <Image
              src={item.imageUrl}
              layout="responsive"
              width={100}
              height={100}
            />
            <Typography className="text-center fw-bold h-5 text-break">
              {item.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </ModalComponent>
  );
};

export default ViewModal;
