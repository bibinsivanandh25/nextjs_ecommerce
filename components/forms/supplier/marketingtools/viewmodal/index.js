import ImageCard from "@/atoms/ImageCard";
import ModalComponent from "@/atoms/ModalComponent";
import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";

const ViewModal = ({
  open = false,
  data,
  modalClose = () => {},
  modalTitle = "View",
  modalWidth = "700px",
  hidedate = true,
}) => {
  return (
    <ModalComponent
      open={open}
      onCloseIconClick={() => modalClose(false)}
      ModalTitle={modalTitle}
      ModalWidth={modalWidth}
      showFooter={false}
      titleClassName="fw-bold h-5 color-orange"
      minHeightClassName="mxh-600"
    >
      {data ? (
        <>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Campaign Title </Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">
                {data.campaignTitle}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Discount </Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">
                {data.totalDiscountValue} %
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Margin Type </Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">{data.marginType}</Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Category</Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">{data.category}</Typography>
            </Grid>
          </Grid>
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">subCategory</Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">
                {data.subCategory}
              </Typography>
            </Grid>
          </Grid>
          {hidedate ? (
            <>
              <Grid container className="py-2" xs={12}>
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">Start Date</Typography>
                </Grid>
                <Grid className="h-5">&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="h-5 fw-bold">
                    {data.startDateTime}
                  </Typography>
                </Grid>
              </Grid>{" "}
              <Grid container className="py-2" xs={12}>
                <Grid item sm={5} display="flex" justifyContent="end">
                  <Typography className="h-5">End Date</Typography>
                </Grid>
                <Grid className="h-5">&nbsp;:&nbsp;</Grid>
                <Grid item sm={6} display="flex" justifyContent="start">
                  <Typography className="h-5 fw-bold">
                    {data.endDateTime}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : null}
          <Grid container className="py-2" xs={12}>
            <Grid item sm={5} display="flex" justifyContent="end">
              <Typography className="h-5">Status</Typography>
            </Grid>
            <Grid className="h-5">&nbsp;:&nbsp;</Grid>
            <Grid item sm={6} display="flex" justifyContent="start">
              <Typography className="h-5 fw-bold">{data.toolStatus}</Typography>
            </Grid>
          </Grid>
          <Grid container display="flex" justifyContent="center" pb={2}>
            {data.marketingToolProductList?.map((item) => (
              <Grid item md={2} className="mx-2">
                <ImageCard
                  imgSrc={item.variationData.variationMedia[0]}
                  showClose={false}
                />
                <Tooltip title={item.variationData.productTitle}>
                  <Typography className="text-truncate">
                    {item.variationData.productTitle}
                  </Typography>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </ModalComponent>
  );
};

export default ViewModal;
