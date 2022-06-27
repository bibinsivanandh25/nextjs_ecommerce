import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";

const Challenges = () => {
  return (
    <Paper className="mnh-80vh">
      <Grid className="d-flex justify-content-between align-items-center py-3 border-bottom ">
        <Typography variant="h-4" className="fw-bold px-4">
          Available Challenges
        </Typography>
        <ButtonComponent label="Add New Challenges" muiProps="mx-4" />
      </Grid>
      <Grid container spacing={2} className="px-3 my-2">
        <Grid item sm={4}>
          <Paper className="ps-4 pe-2 pt-4 pb-2">
            <Typography className=" mb-3 color-orange">
              Created By: Jaganath
            </Typography>
            <Typography>
              Sharath - 40000 RS target for April 2022 completing will get a
              gift Voucher worth RS 2000
            </Typography>
            <div className="d-flex justify-content-end mt-3">
              <ButtonComponent label="Notify" muiProps="fs-12" />
            </div>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper className="ps-4 pe-2 pt-4 pb-2">
            <Typography className=" mb-3 color-orange">
              Created By: Jaganath
            </Typography>
            <Typography>
              Sharath - 40000 RS target for April 2022 completing will get a
              gift Voucher worth RS 2000
            </Typography>
            <div className="d-flex justify-content-end mt-3">
              <ButtonComponent label="Notify" muiProps="fs-12" />
            </div>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper className="ps-4 pe-2 pt-4 pb-2">
            <Typography className=" mb-3 color-orange">
              Created By: Jaganath
            </Typography>
            <Typography>
              Sharath - 40000 RS target for April 2022 completing will get a
              gift Voucher worth RS 2000
            </Typography>
            <div className="d-flex justify-content-end mt-3">
              <ButtonComponent label="Notify" muiProps="fs-12" />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Challenges;
