import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ImageCard from "components/atoms/ImageCard";
import Image from "next/image";

import ProductDetailsCard from "components/reseller/atoms/productdetailscard";
import CategoryScrollComponent from "components/atoms/CategoryScrollComponent";

const HomeComponent = ({
  showMarginButton = false,
  categories = [],
  products = [],
  productTitle = "",
}) => {
  return (
    <div className="w-100">
      <Box className="d-flex justify-content-between mx-1 align-items-center">
        <Typography className="fw-bold">Top categories</Typography>
        <Typography className="fs-14 color-orange">See all</Typography>
      </Box>
      <Box className=" w-100 overflow-x-scroll">
        <CategoryScrollComponent categories={[...categories]} />
      </Box>
      <Box className="mt-5">
        <Typography className="fw-bold">{productTitle}</Typography>
        <ProductDetailsCard
          products={[...products]}
          showMarginButton={showMarginButton}
        />
      </Box>
    </div>
  );
};
export default HomeComponent;
