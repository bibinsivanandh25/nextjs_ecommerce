import { Box, Typography } from "@mui/material";
import React from "react";
import ButtonTabsList from "@/atoms/ButtonTabsList";
import ButtonComponent from "@/atoms/ButtonComponent";
import styles from "./wishlist.module.css";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";

const WishList = () => {
  const list = [
    { title: "Wishlist 1" },
    { title: "Wishlist 2" },
    { title: "Wishlist 3" },
  ];

  return (
    <Box className="d-flex align-items-start body-bg mnh-100vh p-4">
      <Box className={`${styles.minHeight265} w-20p bg-white p-2 rounded-1`}>
        <ButtonTabsList tabsList={list} />
        <Box className="mt-3">
          <ButtonComponent
            label="Add new wishlist"
            variant="outlined"
            muiProps="fw-bold border border-secondary fs-12 w-100 text-capitalize"
            borderColor="border-orange"
            textColor="color-orange"
          />
        </Box>
      </Box>
      <Box className="d-flex justify-content-between w-80p ms-4 bg-white p-2 rounded-1">
        <Box className="w-70p">
          <Box className="d-flex">
            <Box className={`${styles.image250}`}>
              <img
                className="d-block w-100 h-100 img-fluid rounded-1"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXMWvWQyO6_SDsIxDQ33qBmWSgyUAiNPYfGY804qa6&s"
                alt="product"
              />
            </Box>
            <Box className="ps-2">
              <Typography variant="h6" className="fw-bold mb-3">
                Product Name
              </Typography>
              <StarRatingComponentReceivingRating rating={3} />
              <Typography>581 Reviews</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="w-30p">
          <Typography className="mb-1 text-center">
            Item added 2 Aug 2021
          </Typography>
          <Box className="mb-1">
            <ButtonComponent
              label="Add to cart"
              variant="contained"
              muiProps="fw-bold border border-secondary fs-12 bg-primary w-100"
              borderColor="bg-light-gray"
              textColor="color-black"
            />
          </Box>
          <Box className="mb-1">
            <ButtonComponent
              label="Remove from list"
              variant="outlined"
              muiProps="fw-bold border border-secondary fs-12 w-100"
              borderColor="bg-light-gray"
              textColor="color-black"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WishList;
