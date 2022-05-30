import { Grid, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import ModalComponent from "components/atoms/ModalComponent";
import { assetsJson } from "public/assets";

const ViewModal = ({ showViewModal = false, setShowViewModal = () => {} }) => {
  return (
    <ModalComponent
      open={showViewModal}
      ModalWidth={700}
      ModalTitle="View"
      headerClassName="color-orange"
      footerClassName="justify-content-start  border-top flex-row-reverse"
      ClearBtnText="Cancel"
      saveBtnClassName="mx-2"
      saveBtnText="Reply"
      onCloseIconClick={() => setShowViewModal(false)}
    >
      <Grid className="mb-4">
        <Grid
          className="mt-1"
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item sm={3} textAlign={"end"}>
            <Typography className="h-5">Customer Id :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="fw-bold h-5">#23450462 SMK Tex</Typography>
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item sm={3} textAlign={"end"}>
            <Typography className="h-5">Product Image :</Typography>
          </Grid>
          <Grid item sm={7} container spacing={0}>
            <Grid item sm={2}>
              <ImageCard
                showClose={false}
                height={50}
                width={50}
                imgSrc={assetsJson["Printed Dress"]}
              />
            </Grid>
            <Grid item sm={2}>
              <ImageCard
                showClose={false}
                height={50}
                width={50}
                imgSrc={assetsJson["Printed Dress"]}
              />
            </Grid>
            <Grid item sm={2}>
              <ImageCard
                showClose={false}
                height={50}
                width={50}
                imgSrc={assetsJson["Printed Dress"]}
              />
            </Grid>
            <Grid item sm={2}>
              <ImageCard
                showClose={false}
                height={50}
                width={50}
                imgSrc={assetsJson["Printed Dress"]}
              />
            </Grid>
            <Grid item sm={2}>
              <ImageCard
                showClose={false}
                height={50}
                width={50}
                imgSrc={assetsJson["Printed Dress"]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item sm={3} textAlign={"end"}>
            <Typography className="h-5">Question :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="h-5">Lorem ipsum deolem dummy</Typography>
          </Grid>
        </Grid>
        <Grid
          className="my-1"
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item sm={3} textAlign={"end"}>
            <Typography className="h-5">Date & Time :</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography className="h-5">{Date()}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default ViewModal;
