import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import testImage from "../../../../../public/assets/test-image.jpg";

const ComapareProducts = () => {
  const [theItems, setTheItems] = useState([
    {
      id: 1,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 23342134",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magnaLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
      productRatingReviews: (
        <StarRatingComponentReceivingRating rating={2} fontSize="small" />
      ),
      noOfReviews: "(23 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
    {
      id: 2,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 235",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: (
        <StarRatingComponentReceivingRating fontSize="small" rating={3.5} />
      ),
      noOfReviews: "(23676777 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
    {
      id: 3,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 235",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum ",
      productRatingReviews: (
        <StarRatingComponentReceivingRating fontSize="small" />
      ),
      noOfReviews: "(23 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
    {
      id: 4,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 235",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: (
        <StarRatingComponentReceivingRating fontSize="small" />
      ),
      noOfReviews: "(23 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
    {
      id: 5,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 235",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: (
        <StarRatingComponentReceivingRating fontSize="small" />
      ),
      noOfReviews: "(23 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
  ]);

  const getCompareProducts = () => {
    const checklengthAndReturn = (description) => {
      const desArray = description.split(" ");
      return desArray.length < 30 ? (
        desArray.join(" ")
      ) : (
        <>
          {desArray.splice(0, 29).join(" ")}
          <Tooltip className="bg-white color-dark-green" title={description}>
            <span className="text-truncate cursor-pointer h-5 d-block color-dark-green">
              {desArray.splice(29, desArray.length).join(" ")}
            </span>
          </Tooltip>
        </>
      );
    };
    return theItems.map((val, index) => {
      return (
        <Box sx={{ minWidth: "250px" }} className=" border w-250px mnh-80vh">
          <Box className="mnh-200 mb-4 d-flex justify-content-center">
            <Box>
              <Box className="text-center mt-2 mb-3">
                <CloseIcon
                  onClick={() => {
                    const items = [...theItems];
                    items.splice(index, 1);
                    setTheItems([...items]);
                  }}
                  className="color-dark-gray cursor-pointer"
                />
              </Box>
              <Box>
                <Image
                  src={testImage}
                  layout="intrinsic"
                  width="120"
                  height="120"
                />
              </Box>
              <Box className="fs-14 text-center">{val.productName}</Box>
            </Box>
          </Box>
          <Typography className="h-30 fs-14 fw-bold color-blue text-center">
            {val.productPrice}
          </Typography>
          <Typography className="h-30 fs-14 text-center color-dark-green">
            {val.productAvailability}
          </Typography>
          <Box className="mnh-150 mxh-150">
            <Typography className="ps-1 pe-1 text-center h-5 color-dark-green ">
              {checklengthAndReturn(val.productDescription)}
            </Typography>
          </Box>
          <Box className="h-30 d-flex justify-content-around">
            {val.productRatingReviews}
            <Typography className="fs-14">{val.noOfReviews}</Typography>
          </Box>
          <Typography className="h-30 fs-14 text-center">
            {val.productSku}
          </Typography>
          <Typography className="h-30 fs-14 text-center">
            {val.productColor}
          </Typography>
          <Typography className="h-30 fs-14 text-center">
            {val.productSize}
          </Typography>
        </Box>
      );
    });
  };

  const returnDivs = () => {
    return (
      <Box overflow="scroll" className="d-flex">
        {getCompareProducts()}
        <Box sx={{ minWidth: "250px" }} className="border w-250px mnh-80vh">
          <Box className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Box className="w-75 cursor-pointer h-25 d-flex justify-content-center align-items-center border">
              <Box>
                <AddRoundedIcon className="color-dark-gray cursor-pointer border h-1 rounded-circle" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box className="d-flex">
        <Box
          sx={{
            minWidth: "250px",
          }}
          className=" ps-2 border w-250px  mnh-80vh position-sticky top-0 start-0
          bg-white zIndex-1
          "
        >
          <Box className="mnh-200 mb-4 d-flex align-items-center">
            <Typography className="fw-bold fs-14">Product</Typography>
          </Box>
          <Typography className=" fw-bold fs-14 h-30">Price</Typography>
          <Typography className="h-30 fw-bold fs-14">AvailabIlity</Typography>
          <Box className="mxh-150 mnh-150">
            <Typography className="fw-bold fs-14">Description</Typography>
          </Box>
          <Typography className="h-30 fw-bold fs-14">
            Ratings & Reviews
          </Typography>
          <Typography className="h-30 fw-bold fs-14">SKU</Typography>
          <Typography className="h-30 fw-bold fs-14">Color</Typography>
          <Typography className="h-30 fw-bold fs-14">Size</Typography>
        </Box>
        {returnDivs()}
      </Box>
    </>
  );
};

export default ComapareProducts;
