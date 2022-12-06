/* eslint-disable react/no-danger */
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";

const AboutUs = ({ imageUrl = "", description = "" }) => {
  return (
    <Paper className="p-2">
      <Box className="mx-2 py-1 border-bottom">
        <Typography className="fw-600 fs-16">About Us</Typography>
      </Box>
      <Grid
        container
        columnSpacing={2}
        className="mxh-400 mnh-400 overflow-auto hide-scrollbar p-2"
      >
        <Grid item sm={3}>
          <Image width={175} height={175} src={imageUrl} />
        </Grid>
        <Grid item sm={9}>
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AboutUs;
