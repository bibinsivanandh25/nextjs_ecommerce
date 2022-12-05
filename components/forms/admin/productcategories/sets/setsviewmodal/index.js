import ImageCard from "@/atoms/ImageCard";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSetDataById } from "services/admin/products/productCategories/sets";

const SetsViewModal = ({ viewModalopen, setViewModalOpen, selectedData }) => {
  const [viewData, setViewData] = useState({});
  const getViewModalData = async () => {
    const { data, err } = await getSetDataById(selectedData.categorySetId);
    if (data.data) {
      setViewData(data.data);
    }
    if (err) {
      setViewData({});
    }
  };
  useEffect(() => {
    getViewModalData();
  }, [selectedData]);
  return (
    <ModalComponent
      open={viewModalopen}
      ModalTitle="View Sets"
      ModalWidth={650}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
      titleClassName="h-4 color-orange"
      showFooter={false}
    >
      {viewData && (
        <Box my={1}>
          {/* <Box display="flex" justifyContent="center">
            <Typography className=" text-end fw-bold h-5">Set Image</Typography>
          </Box> */}
          {/* <Box display="flex" justifyContent="center">
            <ImageCard
              imgSrc={viewData.categorySetImageUrl}
              showClose={false}
            />
          </Box> */}
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item xs={5} display="flex" justifyContent="end">
                  <Typography className=" text-end fw-bold h-5">
                    Set Name
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  display="flex"
                  justifyContent="center"
                  className="h-5"
                >
                  :
                </Grid>
                <Grid item xs={6} display="flex">
                  <Typography className="text-break h-5">
                    {viewData.setName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <Grid item xs={5} display="flex" justifyContent="end">
                  <Typography className=" text-end fw-bold h-5">
                    Category Name
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  display="flex"
                  justifyContent="center"
                  className="h-5"
                >
                  :
                </Grid>
                <Grid item xs={6} display="flex">
                  <Typography className="text-break h-5">
                    {viewData.mainCategoryName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <Grid item xs={5} display="flex" justifyContent="end">
                  <Typography className=" text-end fw-bold h-5">
                    Created By
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  display="flex"
                  justifyContent="center"
                  className="h-5"
                >
                  :
                </Grid>
                <Grid item xs={6} display="flex">
                  <Typography className="text-break h-5">
                    {viewData.createdBy}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <Grid item xs={5} display="flex" justifyContent="end">
                  <Typography className=" text-end fw-bold h-5">
                    Created Date
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  display="flex"
                  justifyContent="center"
                  className="h-5"
                >
                  :
                </Grid>
                <Grid item xs={6} display="flex">
                  <Typography className="text-break h-5">
                    {viewData.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <ImageCard
              imgSrc={viewData.categorySetImageUrl}
              showClose={false}
            />
          </Box>
        </Box>
      )}
    </ModalComponent>
  );
};

export default SetsViewModal;
