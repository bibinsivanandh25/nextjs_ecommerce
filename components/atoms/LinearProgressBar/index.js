import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const LinearProgressBar = ({
  value = 0,
  leftTitle = "",
  rightTitle = "",
  height = 10,
  borderRadius = 10,
  className = "",
}) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height,
    borderRadius,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius,
      backgroundColor: theme.palette.mode === "light" ? "#e56700" : "#308fe8",
    },
  }));
  return (
    <Box className={className}>
      <Grid container paddingX={2}>
        <Grid item lg={2} xs={3} alignSelf="center" paddingRight={1}>
          <Typography className="h-5 text-center">{leftTitle}</Typography>
        </Grid>
        <Grid item lg={8.5} xs={7} alignSelf="center">
          <BorderLinearProgress variant="determinate" value={value} />
        </Grid>
        <Grid item lg={1.5} xs={2} alignSelf="center" paddingLeft={1}>
          <Typography className="h-5">{rightTitle} </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LinearProgressBar;
