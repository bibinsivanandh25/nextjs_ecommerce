import React from "react";
import { Grid, Typography } from "@mui/material";
import { Share } from "@mui/icons-material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ModalComponent from "@/atoms/ModalComponent";

const ShareCollection = ({ setShowShareModal = () => {}, showShareModal }) => {
  return (
    <ModalComponent
      open={showShareModal}
      onCloseIconClick={() => {
        setShowShareModal(false);
      }}
      showFooter={false}
      ModalTitle="Share"
      titleClassName="fs-16"
    >
      <Grid
        container
        alignItems="center"
        // display="flex"
        className="border my-2 cursor-pointer"
        columnSpacing={1}
        onClick={() => {
          setShowShareModal(false);
        }}
      >
        <Grid item sm={1}>
          <Share className="h-4 cursor-pointer" />
        </Grid>
        <Grid item sm={9}>
          <Typography className="h-5 fw-bold cursor-pointer">
            Share Description With Images
          </Typography>
        </Grid>
        <Grid item sm={2} display="flex" justifyContent="end">
          <ArrowRightIcon className="color-orange h-1 cursor-pointer " />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        // display="flex"
        className="border my-2 cursor-pointer"
        columnSpacing={1}
        onClick={() => {
          setShowShareModal(false);
        }}
      >
        <Grid item sm={1}>
          <StorefrontIcon className="h-4 cursor-pointer" />
        </Grid>
        <Grid item sm={9}>
          <Typography className="h-5 fw-bold cursor-pointer">
            Share Description With Price And Your Online Shop Link
          </Typography>
        </Grid>
        <Grid item sm={2} display="flex" justifyContent="end">
          <ArrowRightIcon className="color-orange h-1 cursor-pointer " />
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default ShareCollection;
