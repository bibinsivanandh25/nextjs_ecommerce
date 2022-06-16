import ButtonComponent from "@/atoms/ButtonComponent";
import { Typography, Box, Checkbox } from "@mui/material";
import React from "react";
import styles from "./MyOrders.module.css";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const useStyles = makeStyles({
  checkBoxPaddingMargin: {
    // paddingTop: "0px",
    // marginTop: "-3px",
    // paddingLeft: "0px",
    verticalAlign: "top",
    alignItems: "top",
    "&:hover": {
      background: "none",
    },
    "&:focus": {
      background: "none",
    },
  },
});

// const SecondInfoBoxContainer = () => {
//   return (
//     <Box className="d-flex align-items-center justify-content-between bg-light-orange1 p-2 mb-3">
//       <Box className="w-50 d-flex justify-content-start">
//         <Box className="ms-1">
//           <Typography variantMapping="p">Orders Placed</Typography>
//           <Typography variantMapping="p">02 Sep 2021</Typography>
//         </Box>
//         <Box className="ms-5">
//           <Typography variantMapping="p">Total</Typography>
//           <Typography variantMapping="p">Rs. 578.00</Typography>
//         </Box>
//         <Box className="ms-5">
//           <Typography variantMapping="p">Ship ID</Typography>
//           <Typography variantMapping="p">
//             Sharath{/*Component Required Here*/}
//           </Typography>
//         </Box>
//       </Box>
//       <Box className="w-25 d-flex justify-content-end">
//         <ButtonComponent label="Cancel Order" variant="outlined" />
//         <ButtonComponent label="Return Products" muiProps="ms-2" />
//       </Box>
//       <Box className="w-25 d-flex flex-column align-items-end me-2">
//         <Typography variantMapping="p">Order ID #278345283t4</Typography>
//         <Typography variantMapping="p" className="color">
//           <a className="color-orange" href="#">
//             View Order Details
//           </a>
//           <Typography className="ms-2" variant="p">
//             Invoice {/*Invoice Component will be here*/}
//           </Typography>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const SingleProductDetails = () => {
//   const classes = useStyles();
//   return (
//     <Box className="d-flex align-items-center">
//       <Box className="align-self-start">
// <Checkbox
//   classes={{ root: classes.checkBoxPaddingMargin }}
//   className="py-0 ps-0"
//   {...label}
//   disableRipple
// />
//       </Box>
//       <Box style={{ width: "196px", height: "196px" }}>
//         <img
//           className="d-block w-100 h-100 img-fluid rounded-1"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXMWvWQyO6_SDsIxDQ33qBmWSgyUAiNPYfGY804qa6&s"
//           alt="product"
//         />
//       </Box>
//       <Box className="ms-2">
//         <Typography className="color-orange mb-1" variantMapping="p">
//           Supplier Name: Buisness Name
//         </Typography>
//         <Typography className="lead mb-1" variantMapping="p">
//           Product Name
//         </Typography>
// <Typography className="mb-1" variantMapping="p">
//   <small>Return window will close on 20 - Aug - 2021</small>
// </Typography>
// <ButtonComponent
//   label="Buy it Again"
//   variant="default"
//   muiProps="bg-light-orange1 fw-bold border border-secondary"
// />
//       </Box>
//     </Box>
//   );
// };

const SingleProductTrackDetails = () => {
  return (
    <Box>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Track Package
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Leave Seller feedback
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Write a Product review
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Save for later
      </Paper>
    </Box>
  );
};

const ProductDetailsPlusTrackDetails = () => {
  const classes = useStyles();
  return (
    <Box className="d-flex justify-content-between px-2">
      {/* <SingleProductDetails /> */}
      <ReusableProduct>
        <Checkbox
          classes={{ root: classes.checkBoxPaddingMargin }}
          className="py-0 ps-0"
          {...label}
          disableRipple
        />
        <Typography className="mb-1" variantMapping={<p />}>
          <small>Return window will close on 20 - Aug - 2021</small>
        </Typography>
        <ButtonComponent
          label="Buy it Again"
          variant="default"
          muiProps="bg-light-orange1 fw-bold border border-secondary"
        />
      </ReusableProduct>
      <SingleProductTrackDetails />
    </Box>
  );
};

const MyOrders = () => {
  return (
    <Box>
      <Box className="d-flex align-items-center mb-3">
        <Box className={`${styles.dropDownStyle}`}>
          <SimpleDropdownComponent size="small" label="Past 3 Months" />
        </Box>
        <Typography variantMapping={<p />} className="ms-2 fs-14">
          <span className="fw-bold fs-16">2 Orders</span> placed
        </Typography>
      </Box>
      <ReusableBar>
        <ButtonComponent label="Cancel Order" variant="outlined" />
        <ButtonComponent label="Return Products" muiProps="ms-2" />
      </ReusableBar>
      <Box className="ms-3 pb-2">
        <Typography className="fs-16 fw-bold" variantMapping={<p />}>
          Dilevered 2 - Aug - 2021
        </Typography>
      </Box>
      <ProductDetailsPlusTrackDetails />
    </Box>
  );
};

export default MyOrders;
