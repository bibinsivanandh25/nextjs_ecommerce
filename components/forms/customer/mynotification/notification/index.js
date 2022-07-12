import { DateRange } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import React from "react";

const Notification = ({ data = {} }) => {
  return (
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
              Lizard
            </Typography>
            <Box className="">
              <DateRange />
            </Box>
          </Box>
          <Box className="mb-2">
            <span className="fs-12">25 Jun 2022 | 10 min read</span>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
