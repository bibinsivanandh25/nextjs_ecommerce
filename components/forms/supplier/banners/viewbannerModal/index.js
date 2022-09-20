import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";

const ViewBannerModal = ({
  viewModalOpen = {},
  setViewModalOpen = () => {},
  viewData = {},
}) => {
  return (
    <ModalComponent
      open={viewModalOpen}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
      showFooter={false}
      ModalTitle="Banner Details"
      titleClassName="fw-bold color-orange"
      ModalWidth={700}
    >
      <Box className="px-2 py-3">
        <Grid container>
          <Grid
            item
            sm={5}
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <Grid item>
              <Typography className="h-6 text-center color-secondary">
                Image For Mobile
              </Typography>
              <Image
                src={viewData.bannerImageUrlForMobile}
                height={100}
                width={100}
                alt="alt"
                layout="intrinsic"
                className="d-flex justify-content-center align-items-center"
              />
            </Grid>
            <Grid item>
              <Typography className="h-6 text-center color-secondary">
                Image For Web
              </Typography>
              <Image
                src={viewData.bannerImageUrlForMobile}
                height={100}
                width={100}
                alt="alt"
                layout="intrinsic"
              />
            </Grid>
          </Grid>
          <Grid item sm={7}>
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="">Navigation URL </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">
                  {viewData.navigationUrl}
                </Typography>
              </Grid>
            </Grid>{" "}
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="">Display Page </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">
                  {viewData.displayPage}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="">Button Label </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">
                  {viewData.buttonName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="">From Date</Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">
                  {new Date(viewData.startDateTime).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>{" "}
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="">To Date </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="fw-bold">
                  {new Date(viewData.endDateTime).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default ViewBannerModal;
