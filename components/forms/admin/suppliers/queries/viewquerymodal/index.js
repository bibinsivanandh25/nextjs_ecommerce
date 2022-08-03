/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ButtonComponent from "@/atoms/ButtonComponent";
import TextEditor from "@/atoms/TextEditor";

const ViewModalQueries = ({ setViewModalOpen = () => {} }) => {
  return (
    <Box>
      <Box className="p-3 border-bottom">
        <Box className="d-flex ">
          <Typography
            onClick={() => {
              setViewModalOpen(false);
            }}
            className="cursor-pointer me-4 color-orange fs-14"
          >
            {"<"} Back
          </Typography>
          <Typography className="">
            <span className="fw-bold h-4"> Help & Support </span>
            <span className="color-gray h-5 ms-2">(View & Reply)</span>
          </Typography>
        </Box>
      </Box>
      <Grid container sx={12} rowGap={2} className="py-2 border-bottom">
        <Grid item sm={2}>
          <Typography className="text-end h-5">
            Date & Time &nbsp;:&nbsp;
          </Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography className="h-5 fw-bold">24-04-2022, 12:22</Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography className="text-end h-5">
            Ticket ID&nbsp;:&nbsp;
          </Typography>
        </Grid>

        <Grid item sm={9}>
          <Typography className="h-5 fw-bold">#21318241</Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography className="text-end h-5">Subject&nbsp;:&nbsp;</Typography>
        </Grid>

        <Grid item sm={9}>
          <Typography className="h-5 fw-bold">Requested for refund</Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography className="text-end h-5">Status&nbsp;:&nbsp;</Typography>
        </Grid>

        <Grid item sm={9}>
          <Typography className="h-5 fw-bold color-dark-green">Open</Typography>
        </Grid>
      </Grid>
      <Box className="p-2 border-bottom">
        <Box className="ps-5">
          <TextEditor EditorHeight="150px" />
        </Box>
        <Box className="mt-2 d-flex justify-content-between px-5">
          <Box className="d-flex">
            <Typography className="d-center">Attach file :&nbsp;</Typography>
            <label
              htmlFor="pushNotify"
              className="bg-gray rounded px-5 py-2 cursor-pointer fs-14 px-2"
            >
              Choose file
            </label>
            {/* <label className="fs-12 ms-1 d-center">File Name...</label> */}
            <input type="file" className="d-none" id="pushNotify" />
          </Box>
          <Box>
            <ButtonComponent label="Send Reply" muiProps="px-4" />
          </Box>
        </Box>
      </Box>
      <Box className="mt-2">
        <Grid container xs={12}>
          <Grid item xs={1} className="d-flex justify-content-end">
            <Image
              src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
              width={60}
              height={60}
            />
          </Grid>
          <Grid item xs={10} className="ms-2">
            <Typography className="fw-bold h-5">Name</Typography>
            <Typography className="h-5">#123445</Typography>
            <Typography className="h-5 color-gray">
              10 min ago via mail
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={1} />
          <Grid item xs={10} className="mt-2">
            <Typography>Hello</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewModalQueries;
