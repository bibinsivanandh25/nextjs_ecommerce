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

const list = [
  { label: "Last 30 days" },
  { label: "2020" },
  { label: "2019" },
  { label: "2018" },
  { label: "Archive Orders" },
];

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
          className="ps-0 py-1"
          {...label}
          disableRipple
        />
        <Typography className="mb-1" variantMapping={<p />}>
          <small>Return window will close on 20 - Aug - 2021</small>
        </Typography>
        <ButtonComponent
          label="Buy it Again"
          variant="outlined"
          muiProps="fw-bold border border-secondary fs-12 bg-primary"
          borderColor="bg-light-gray"
          textColor="color-black"
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
          <SimpleDropdownComponent
            list={list}
            size="small"
            label="Past 3 Months"
          />
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
