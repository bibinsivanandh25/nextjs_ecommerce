import { Paper, Typography } from "@mui/material";
import RateMrMrsCartForm from "components/forms/reseller/ratemrmrscartform";

const RateMrMrsCart = () => {
  return (
    <Paper sx={{ px: 5, py: 4, height: "100%", minHeight: "80vh" }}>
      <Typography className="fs-14">Rate us here</Typography>
      <RateMrMrsCartForm />
    </Paper>
  );
};

export default RateMrMrsCart;
