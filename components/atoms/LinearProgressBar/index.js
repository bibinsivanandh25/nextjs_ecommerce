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
    <Box>
      <Grid container spacing={0.5}>
        <Grid item sm={1.5} alignSelf="center">
          <Typography className="h-5 text-center">{leftTitle}</Typography>
        </Grid>
        <Grid item sm={9.5} alignSelf="center">
          <BorderLinearProgress variant="determinate" value={value} />
        </Grid>
        <Grid item sm={1} alignSelf="center">
          <Typography className="h-5">{rightTitle} </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LinearProgressBar;
