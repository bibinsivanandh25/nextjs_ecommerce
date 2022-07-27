import React from "react";
import { DateRange } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

const notificationData = [
  {
    id: 1,
    imagesrc: "",
  },
  {
    id: 2,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 3,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 4,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 1,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 2,
    imagesrc: "",
  },
  {
    id: 3,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 4,
    imagesrc:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
];
const NewsandNotifications = () => {
  return (
    <Box className="bg-white p-2 rounded">
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        className="px-3 border-bottom pb-3"
      >
        <Grid item sm={4} className="d-flex align-self-center">
          <Typography className="h-4 fw-bold">Notification&apos;s</Typography>
        </Grid>
        <Grid item lg={2} md={3} sm={6} className="me-2">
          <SimpleDropdownComponent placeholder="Filter by type" size="small" />
        </Grid>
      </Grid>
      <Grid container className="ps-3">
        {notificationData.map((data) => (
          <Grid item lg={6} md={6} sm={12} className="mt-3">
            <div className="border rounded me-4">
              <Card className="d-flex">
                {data.imagesrc && (
                  <CardMedia
                    component="img"
                    image={data.imagesrc}
                    alt="green iguana"
                    style={{ maxHeight: "150px", maxWidth: "150px" }}
                  />
                )}
                <CardContent className="">
                  <Box className="d-flex justify-content-between">
                    <Typography gutterBottom variant="h5" component="div">
                      Message
                    </Typography>
                    <Box className="">
                      <DateRange sx={{ color: "gray" }} />
                    </Box>
                  </Box>
                  <Box className="mb-2">
                    <span className="fs-12">25 Jun 2022 | 10 min read</span>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsandNotifications;
