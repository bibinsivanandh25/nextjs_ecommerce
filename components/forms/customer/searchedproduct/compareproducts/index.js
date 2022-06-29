import { Box, Grid, Paper, TableBody, Typography } from "@mui/material";
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
      productRatingReviews: <StarRatingComponentReceivingRating rating={2} />,
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
    {
      id: "",
      productName: "",
      productImage: "",
      productPrice: "",
      productAvailability: (
        <Box
          className={`${border} ${marginAuto} ${height150} ${width150}  d-flex justify-content-center align-items-center rounded-1 cursor-pointer `}
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
    },
  ]);

  return (
    // <>
    //   <TableContainer component={Paper}>
    //     <Table
    //       sx={{ minHeight: "80vh" }}
    //       size="small"
    //       aria-label="simple table"
    //     >
    //       <TableBody>
    //         <TableRow
    //           style={{
    //             maxWidth: "20px",
    //           }}
    //         >
    //           <TableCell className="bg-primary" style={{ maxWidth: "20px" }}>
    //             Product
    //           </TableCell>
    //           {theItems.map((val, index) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25`}
    //                   align="center"
    //                   style={{ maxWidth: "20px" }}
    //                 >
    //                   <Box>
    //                     <Box className="text-center mt-2 mb-4">
    //                       {val.productName && theItems[2].productName != "" && (
    //                         <CloseIcon
    //                           onClick={() => {
    //                             const newItems = [...theItems];
    //                             newItems.splice(index, 1);
    //                             // if (newItems.length < 4) {
    //                             //   newItems.push({
    //                             //     id: "",
    //                             //     productName: "",
    //                             //     productImage: "",
    //                             //     productPrice: "",
    //                             //     productAvailability: "",
    //                             //     productDescription: "",
    //                             //     productRatingReviews: "",
    //                             //     noOfReviews: "",
    //                             //     productSku: "",
    //                             //     productColor: "",
    //                             //     productSize: "",
    //                             //   });
    //                             // }
    //                             setTheItems([...newItems]);
    //                           }}
    //                           className={
    //                             theItems.length > 1
    //                               ? `${colorMoreGray} cursor-pointer`
    //                               : "d-none"
    //                           }
    //                         />
    //                       )}
    //                     </Box>
    //                     <Box className="">
    //                       {val.productImage && (
    //                         <Image
    //                           src={val.productImage}
    //                           layout="intrinsic"
    //                           width="120"
    //                           height="120"
    //                         />
    //                       )}
    //                     </Box>
    //                     <Typography className="text-center fs-14">
    //                       {val.productName}
    //                     </Typography>
    //                   </Box>
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight}`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Price
    //           </TableCell>
    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25`}
    //                   align="center"
    //                   style={{ maxWidth: "20px" }}
    //                 >
    //                   <Typography className="fw-bold fs-14 color-blue">
    //                     {val.productPrice}
    //                   </Typography>
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight}`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Availability
    //           </TableCell>

    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25`}
    //                   align="center"
    //                   style={{ maxWidth: "20px" }}
    //                 >
    //                   {val.id ? (
    //                     <Typography className="color-dark-green fs-14">
    //                       {val.productAvailability}
    //                     </Typography>
    //                   ) : (
    //                     <>{val.productAvailability}</>
    //                   )}
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight} align-top`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Description
    //           </TableCell>

    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25`}
    //                   align="center"
    //                 >
    //                   <Typography className="color-dark-green h-5">
    //                     {val.productDescription}
    //                   </Typography>
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight}`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Rating & Reviews
    //           </TableCell>
    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25`}
    //                   align="center"
    //                 >
    //                   <Box className="d-flex justify-content-around align-items-center ps-2 pe-2 mt-3">
    //                     {val.productRatingReviews}
    //                     <Typography className="fs-14">
    //                       {val.noOfReviews}
    //                     </Typography>
    //                   </Box>
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`${borderRight} ${borderBottomNone} fw-bold`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             SKU
    //           </TableCell>
    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderRight} ${borderBottomNone} fs-14 w-25`}
    //                   align="center"
    //                 >
    //                   {val.productSku}
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight}`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Color
    //           </TableCell>
    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25 fs-14`}
    //                   align="center"
    //                   style={{ maxWidth: "20px" }}
    //                 >
    //                   {val.productColor}
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //         <TableRow>
    //           <TableCell
    //             className={`fw-bold ${borderBottomNone} ${borderRight}`}
    //             sx={{ maxWidth: "20px" }}
    //           >
    //             Size
    //           </TableCell>
    //           {theItems.map((val) => {
    //             return (
    //               <>
    //                 <TableCell
    //                   key={val.id}
    //                   className={`${borderBottomNone} ${borderRight} w-25 fs-14`}
    //                   align="center"
    //                   style={{ maxWidth: "20px" }}
    //                 >
    //                   {val.productSize}
    //                 </TableCell>
    //               </>
    //             );
    //           })}
    //           {/* <TableCell></TableCell> */}
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </>
    <>
      <Box overflow="scroll" className="d-flex">
        <Box className="rounded-1 ps-2 border w-250px  mnh-80vh">
          <Box className="mnh-200 mb-4 d-flex align-items-center">
            <Typography className="fw-bold fs-14">Product</Typography>
          </Box>
          <Typography className=" fw-bold fs-14 h-30">Price</Typography>
          <Typography className="h-30 fw-bold fs-14">AvailabIlity</Typography>
          <Box className={`${height150}`}>
            <Typography className="fw-bold fs-14">Description</Typography>
          </Box>
          <Typography className="h-30 fw-bold fs-14">
            Ratings & Reviews
          </Typography>
          <Typography className="pt-4 pb-4 fw-bold fs-14">SKU</Typography>
          <Typography className="pt-4 pb-4 fw-bold fs-14">Color</Typography>
          <Typography className="pt-4 pb-4 fw-bold fs-14">Size</Typography>
        </Box>
        <Box className="rounded-1 border w-250px mnh-80vh">
          <Box className="mnh-200 mb-4 d-flex justify-content-center">
            <Box>
              <Box className="text-center mt-2 mb-3">
                <CloseIcon className={`${colorMoreGray} cursor-pointer`} />
              </Box>
              <Box>
                <Image
                  src={testImage}
                  layout="intrinsic"
                  width="120"
                  height="120"
                />
              </Box>
              <Box className="fs-14 text-center">Product Name</Box>
            </Box>
          </Box>
          <Typography className="h-30 fw-bold color-blue text-center">
            Rs. 254
          </Typography>
          <Typography className="h-30  text-center color-dark-green">
            In Stock
          </Typography>
          <Box className={`${height150}`}>
            <Typography className="ps-1 pe-1 text-center h-5 color-dark-green">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum
            </Typography>
          </Box>
          <Box className="h-30 d-flex justify-content-around">
            <StarRatingComponentReceivingRating />{" "}
            <Typography className="fs-14">(23 Reviews)</Typography>
          </Box>
          <Typography className="pt-4 pb-4">SKU</Typography>
          <Typography className="pt-4 pb-4">Color</Typography>
          <Typography className="pt-4 pb-4">Size</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ComapareProducts;
