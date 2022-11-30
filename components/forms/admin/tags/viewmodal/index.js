import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const TagsViewModal = ({ viewModalOpen, setViewModalOpen, viewData }) => {
  return (
    <ModalComponent
      open={viewModalOpen}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
      showFooter={false}
      ModalTitle="View Tags"
      titleClassName="fw-bold color-orange"
    >
      <Box className="px-2  overflow-auto hide-scrollbar">
        <Box>
          <Grid container className="py-2" alignItems="center">
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Tag Name</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">
                {viewData?.tagName}
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid container className="py-2" alignItems="center">
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Tag Id</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">{viewData?.tagId}</Typography>
            </Grid>
          </Grid> */}
          <Grid container className="py-2" alignItems="center">
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Created by ID</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">
                {viewData?.createdBy}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" alignItems="center">
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Created By</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">
                {viewData?.createdByType}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" alignItems="center">
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Last Update Date and Time</Typography>
            </Grid>
            <Grid>&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="fw-bold h-5">
                {viewData?.lastUpdatedAt}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default TagsViewModal;
