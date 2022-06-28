import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import testImage from "../../../../../public/assets/test-image.jpg";
import styles from "./compareproducts.module.css";

const ComapareProducts = () => {
  const {
    borderBottomNone,
    borderRight,
    border,
    colorGray,
    fonsSizeFiveRem,
    paddingEndFive,
    colorMoreGray,
    marginAuto,
    height150,
    verticalAlign,
    width150,
  } = styles;

  const [theItems, setTheItems] = useState([
    {
      id: 1,
      productName: "Product Name",
      productImage: testImage,
      productPrice: "Rs. 235",
      productAvailability: "In Stock",
      productDescription:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: <StarRatingComponentReceivingRating />,
      noOfReviews: "(23 Reviews)",
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
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: <StarRatingComponentReceivingRating />,
      noOfReviews: "(23 Reviews)",
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
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: <StarRatingComponentReceivingRating />,
      noOfReviews: "(23 Reviews)",
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
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      productRatingReviews: <StarRatingComponentReceivingRating />,
      noOfReviews: "(23 Reviews)",
      productSku: "2112asdvasvasvds",
      productColor: "--",
      productSize: "--",
    },
  ]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell
              className={`fw-bold ${borderBottomNone} ${borderRight} ${paddingEndFive} `}
            >
              Product
            </TableCell>
            {theItems.map((val, index) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25`}
                    align="center"
                  >
                    <Box>
                      <Box className="text-center mt-2 mb-4">
                        {val.productName && (
                          <CloseIcon
                            onClick={() => {
                              const newItems = [...theItems];
                              newItems.splice(index, 1, {
                                id: index + 1,
                                productName: "",
                                productImage: "",
                                productPrice: "",
                                productAvailability: (
                                  <Box
                                    className={`${border} ${marginAuto} ${height150} ${width150} d-flex justify-content-center align-items-center w-75  rounded-1 cursor-pointer `}
                                  >
                                    <AddCircleOutlineIcon
                                      className={`${colorGray} ${fonsSizeFiveRem}  ${verticalAlign}`}
                                    />
                                  </Box>
                                ),
                                productDescription: "",
                                productRatingReviews: "",
                                noOfReviews: "",
                                productSku: "",
                                productColor: "",
                                productSize: "",
                              });
                              setTheItems([...newItems]);
                            }}
                            className={`${colorMoreGray} cursor-pointer`}
                          />
                        )}
                      </Box>
                      <Box className="">
                        {val.productImage && (
                          <Image
                            src={val.productImage}
                            layout="intrinsic"
                            width="150"
                            height="150"
                          />
                        )}
                      </Box>
                      <Typography className="text-center fs-14">
                        {val.productName}
                      </Typography>
                    </Box>
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Price
            </TableCell>
            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25`}
                    align="center"
                  >
                    <Typography className="fw-bold fs-14 color-blue">
                      {val.productPrice}
                    </Typography>
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Availability
            </TableCell>

            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25`}
                    align="center"
                  >
                    {val.id ? (
                      <Typography className="color-dark-green fs-14">
                        {val.productAvailability}
                      </Typography>
                    ) : (
                      <>{val.productAvailability}</>
                    )}
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Description
            </TableCell>

            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25`}
                    align="center"
                  >
                    <Typography className="color-dark-green fs-14">
                      {val.productDescription}
                    </Typography>
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Rating & Reviews
            </TableCell>
            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25`}
                    align="center"
                  >
                    <Box className="d-flex justify-content-around align-items-center ps-2 pe-2 mt-3">
                      {val.productRatingReviews}
                      <Typography className="fs-14">
                        {val.noOfReviews}
                      </Typography>
                    </Box>
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`${borderRight} ${borderBottomNone} fw-bold`}>
              SKU
            </TableCell>
            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderRight} ${borderBottomNone} fs-14 w-25`}
                    align="center"
                  >
                    {val.productSku}
                  </TableCell>
                </>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Color
            </TableCell>
            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25 fs-14`}
                    align="center"
                  >
                    {val.productColor}
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={`fw-bold ${borderBottomNone} ${borderRight}`}>
              Size
            </TableCell>
            {theItems.map((val) => {
              return (
                <>
                  <TableCell
                    key={val.id}
                    className={`${borderBottomNone} ${borderRight} w-25 fs-14`}
                    align="center"
                  >
                    {val.productSize}
                  </TableCell>
                </>
              );
            })}
            {/* <TableCell></TableCell> */}
          </TableRow>
        </Table>
      </TableContainer>
    </>
  );
};

export default ComapareProducts;
