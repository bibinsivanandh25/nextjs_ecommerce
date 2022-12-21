/* eslint-disable react/no-danger */
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
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
          {imageUrl ? (
            <Image width={175} height={175} src={imageUrl} />
          ) : (
            <Skeleton variant="rectangular" height={175} />
          )}
        </Grid>
        <Grid item sm={9}>
          {" "}
          {description?.length ? (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          ) : (
            <>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AboutUs;
