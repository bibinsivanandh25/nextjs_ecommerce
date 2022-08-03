import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const UpdateViewModal = ({
  setViewModalOpen = () => {},
  viewModalOpen,
  data = [],
}) => {
  return (
    <Box>
      <ModalComponent
        open={viewModalOpen}
        onCloseIconClick={() => {
          setViewModalOpen(false);
        }}
        showFooter={false}
        ModalTitle="View Updates"
        titleClassName="fs-16 color-orange"
      >
        <Box className="my-3">
          {data.map((item) => (
            <Grid container key={item.id} className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className=""> {item.title}</Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">{item.value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default UpdateViewModal;
