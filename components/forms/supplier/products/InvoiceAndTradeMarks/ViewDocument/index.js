import { Grid, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";

const ViewDocument = ({ showModal = false, setShowModal = () => {} }) => {
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalTitle="View Document"
    >
      <Grid container spacing={2}>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end h-5">Document Name :</Typography>
          </Grid>
          <Grid item sm={9}>
            <Typography className="h-5">Document </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end h-5">Description :</Typography>
          </Grid>
          <Grid item sm={9}>
            <Typography className="h-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} item sm={12}>
          <Grid item sm={3}>
            <Typography className="text-end h-5">Documents :</Typography>
          </Grid>
          <Grid item sm={9} spacing={1}>
            <Typography className="h-5 ">
              <Typography className="color-blue h-5">file1.jpg</Typography>
              <Typography className="color-blue h-5">file2.jpg</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default ViewDocument;
