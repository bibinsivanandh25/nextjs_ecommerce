import { Box, Rating, Typography } from "@mui/material";
import { productDetails } from "features/customerSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import serviceUtil from "services/utils";

const TopTrending = ({ products }) => {
  const dispatch = useDispatch();

  const getTrandingProductDetails = (item) => {
    dispatch(
      productDetails({
        productId: item.productVariationId,
        variationDetails: item.variationDetails,
      })
    );
  };

  return (
    <Box className="p-2 container-shadow rounded">
      <Box className="mx-2 py-1 border-bottom">
        <Typography className="fw-600 fs-16">Top Trending</Typography>
      </Box>
      {products.length ? (
        <Box className="mxh-400 mnh-400 overflow-y-scroll hide-scrollbar">
          {products.map((item) => (
            // eslint-disable-next-line react/no-array-index-key

            <Box
              className="d-flex p-1"
              key={item.productVariationId}
              onClick={() => {
                getTrandingProductDetails(item);
              }}
            >
              <Box className="me-1">
                <Image
                  src={item.variationMedia}
                  layout="fixed"
                  width={75}
                  height={75}
                  className="border rounded"
                />
              </Box>
              <Box className="ms-1">
                <Typography>{item.productTitle}</Typography>
                <Rating value={item.customerRatings} readOnly />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <div
          className="mxh-400 mnh-400"
          style={{
            height: "30vh",
            width: "30vw",
            position: "relative",
          }}
        >
          <Image
            src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/sorry.png"
            height="250px"
            layout="fill"
          />
        </div>
      )}
    </Box>
  );
};
export default TopTrending;
