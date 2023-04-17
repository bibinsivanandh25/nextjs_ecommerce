import { Box, Grid, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import ImageCard from "@/atoms/ImageCard";

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
              <ImageCard
                imgSrc={viewData.bannerImageUrlForMobile}
                height={100}
                width={100}
                showClose={false}
              />
            </Grid>
            <Grid item>
              <Typography className="h-6 text-center color-secondary">
                Image For Web
              </Typography>
              <ImageCard
                imgSrc={viewData.bannerImageUrlForWeb}
                height={100}
                width={100}
                showClose={false}
              />
            </Grid>
          </Grid>
          <Grid item sm={7}>
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="fw-bold">Navigation URL </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="text-break">
                  {viewData.navigationUrl}
                </Typography>
              </Grid>
            </Grid>{" "}
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="fw-bold">Display Page </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="">{viewData.displayPage}</Typography>
              </Grid>
            </Grid>
            {/* <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="fw-bold">Button Label </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="">{viewData.buttonName}</Typography>
              </Grid>
            </Grid> */}
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="fw-bold">From Date</Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="">
                  {new Date(viewData.startDateTime).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>{" "}
            <Grid container className="py-2" xs={12}>
              <Grid item sm={5} display="flex" justifyContent="end">
                <Typography className="fw-bold">To Date </Typography>
              </Grid>
              <Grid>&nbsp;:&nbsp;</Grid>
              <Grid item sm={6} display="flex" justifyContent="start">
                <Typography className="">
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
