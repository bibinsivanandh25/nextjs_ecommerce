import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ImageCard from "components/atoms/ImageCard";
import Image from "next/image";

import ProductDetailsCard from "components/reseller/atoms/productdetailscard";

const HomeComponent = ({ categories = [], products = [] }) => {
  return (
    <div>
      <Box className="d-flex justify-content-between mx-1 align-items-center">
        <Typography className="fw-bold">Top categories</Typography>
        <Typography className="fs-14 color-orange">See all</Typography>
      </Box>
      <Box className="d-flex overflow-auto w-90vw hide-scrollbar">
        {categories.map((ele) => {
          return (
            <Box
              className=" mx-2 "
              style={{
                minWidth: "120px",
              }}
            >
              <ImageCard imgSrc={ele.image} showClose={false} />
              <Typography>{ele.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box className="mt-5">
        <Typography className="fw-bold">Top Products</Typography>
        <ProductDetailsCard products={[...products]} />
      </Box>
    </div>
  );
};
export default HomeComponent;
