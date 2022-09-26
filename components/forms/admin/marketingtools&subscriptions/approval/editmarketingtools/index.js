import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import TextEditor from "@/atoms/TextEditor";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const productlist = [
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 1,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 2,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 3,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 2,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 3,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 2,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 3,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 2,
  },
  {
    productimage:
      "https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000040/product/image/1661584457066-revolt-164_6wVEHfI-unsplash.jpg",
    title: "Product1",
    id: 3,
  },
];
const EditMarketingTools = ({
  modalOpen,
  modalClose = () => {},
  title = "",
  viewModlwidth = "1000px",
  footer = false,
  editorPlaceHolder = "Description...",
}) => {
  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => modalClose(false)}
      ModalTitle={title}
      ModalWidth={viewModlwidth}
      showFooter={footer}
      titleClassName="fw-bold color-orange"
    >
      <Box className="my-2">
        <Grid container spacing={2}>
          <Grid item md={4} sm={6}>
            <InputBox disabled label="Discount" inputlabelshrink />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Category" inputlabelshrink />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Sub Category" inputlabelshrink />
          </Grid>
          <Grid item md={2} sm={6}>
            <ButtonComponent label="Edit" />
          </Grid>
        </Grid>
        <Grid container className="mt-2">
          <Grid item md={3} sm={6} display="flex">
            <Typography className="h-5">Start Date:</Typography>
            <Typography className="h-5">12/09/2022</Typography>
          </Grid>
          <Grid item md={3} sm={6} display="flex">
            <Typography className="h-5">End Date:</Typography>
            <Typography className="h-5">24/09/2022</Typography>
          </Grid>
          <Grid item md={3} sm={6} display="flex">
            <Typography className="h-5">Start Time:</Typography>
            <Typography className="h-5"> 09:08:00</Typography>
          </Grid>
          <Grid item md={3} sm={6} display="flex">
            <Typography className="h-5">End Time:</Typography>
            <Typography className="h-5">09:08:00</Typography>
          </Grid>
        </Grid>
        <Grid container className="mt-2">
          <Grid item md={4}>
            <InputBox
              label="Campaign Title"
              inputlabelshrink
              required
              placeholder="Enter the Campaign Title"
            />
          </Grid>
        </Grid>
        <Grid container className="mt-2">
          <TextEditor placeholder={editorPlaceHolder} />
        </Grid>
        <Grid container className="mt-2">
          {productlist.map((item) => (
            <Grid item md={2} sm={4} key={item.id}>
              <Image
                src={item.productimage}
                layout="intrinsic"
                height={100}
                width={100}
              />
              <Typography className="text-truncate">{item.title}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default EditMarketingTools;
