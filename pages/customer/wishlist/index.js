/* eslint-disable react/no-array-index-key */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ButtonTabsList from "@/atoms/ButtonTabsList";
import ButtonComponent from "@/atoms/ButtonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";

const WishList = () => {
  const list = [
    { title: "Wishlist 1" },
    { title: "Wishlist 2" },
    { title: "Wishlist 3" },
  ];
  const [products, setProducts] = useState([]);

  const getproducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);
  const getList = () => {
    return products.map((ele, index) => {
      return (
        <Paper
          className="d-flex justify-content-between ms-3 mb-2 rounded-1 align-items-center"
          key={index}
        >
          <Box className="d-flex">
            <Box>
              <Image src={ele.image} height={100} width={100} />
            </Box>
            <Box className="ps-2">
              <Typography className="fw-bold h-5">{ele.title}</Typography>
              <StarRatingComponentReceivingRating rating={3} className="h-4" />
              <Typography className="h-5">
                {ele.rating.count} Reviews
              </Typography>
            </Box>
          </Box>
          <Box className="">
            <Typography className="mb-1 text-center h-5">
              Item added 2 Aug 2021
            </Typography>
            <Box className="mb-1">
              <ButtonComponent
                label="Add to cart"
                muiProps="fw-bold fs-10 bg-primary w-100 px-5"
                textColor="color-black"
              />
            </Box>
            <Box className="mb-1">
              <ButtonComponent
                label="Remove from list"
                muiProps="fw-bold fs-10 w-100 text-dark px-5"
                textColor="text-dark"
                bgColor="bg-white"
              />
            </Box>
          </Box>
        </Paper>
      );
    });
  };
  return (
    <Box className="d-flex xjustify-content-between">
      <Paper className="bg-white p-2 rounded-1 w-20p mb-2">
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
      </Paper>
      <Box
        className="w-100 overflow-y-scroll hide-scrollbar"
        sx={{
          maxHeight: "79vh !important",
        }}
      >
        {getList()}
      </Box>
    </Box>
  );
};

export default WishList;
