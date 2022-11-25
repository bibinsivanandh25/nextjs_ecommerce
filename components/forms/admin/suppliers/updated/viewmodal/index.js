import { Box, Grid } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const UpdateViewModal = ({
  setViewModalOpen = () => {},
  viewModalOpen,
  data = [],
}) => {
  return (
    <ModalComponent
      open={viewModalOpen}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
      showFooter={false}
      ModalTitle="View Updates"
      titleClassName="fs-16 color-orange"
      ModalWidth="75%"
    >
      <Box className="my-3">
        <Grid container spacing={2}>
          <Grid item md={5}>
            Supplier Id
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.supplierId}
          </Grid>
          <Grid item md={5}>
            Mobile No.
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.mobileNumber}
          </Grid>
          <Grid item md={5}>
            Email
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.emailId}
          </Grid>
          <Grid item md={5}>
            Business Name
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.businessName}
          </Grid>
          <Grid item md={5}>
            Created Date
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.createdDate}
          </Grid>
          <Grid item md={5}>
            Updated Date
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.updatedAt ?? "--"}
          </Grid>
          <Grid item md={5}>
            Updated Fields
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.changedField}
          </Grid>
          <Grid item md={5}>
            Previous Value
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.oldValue}
          </Grid>
          <Grid item md={5}>
            Updated Value
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            {data.changedValue}
          </Grid>
          <Grid item md={5}>
            Catagories
          </Grid>
          <Grid item md={1}>
            :
          </Grid>
          <Grid item md={6}>
            <ol className="mxh-100 overflow-y-scroll">
              {data.mainCategoryWrappers.map((item) => (
                <li key={item.mainCategoryId}>{item.mainCategoryName}</li>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default UpdateViewModal;
