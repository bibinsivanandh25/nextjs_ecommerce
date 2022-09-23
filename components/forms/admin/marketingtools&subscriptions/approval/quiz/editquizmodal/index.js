import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TextEditor from "@/atoms/TextEditor";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const EditQuizModal = ({
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
      <Box className="my-2 mxh-600 mnh-600 overflow-y-scroll hide-scrollbar">
        <Grid container>
          <Grid item md={4} display="flex">
            <Typography>Start Date :</Typography>
            <input
              type="date"
              // value={format(new Date(formData.start_date), "yyyy-MM-dd")}
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item md={4} display="flex">
            <Typography>End Date :</Typography>
            <input
              type="date"
              // value={format(new Date(formData.start_date), "yyyy-MM-dd")}
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={(e) => {}}
            />
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <Typography>Whome you want to create the quiz</Typography>
          <Grid container>
            <Grid item md={3}>
              <RadiobuttonComponent label="New Customer" disabled />
            </Grid>
            <Grid item md={3}>
              <RadiobuttonComponent label="Existing Customer" disabled />
            </Grid>
          </Grid>
        </Grid>
        <Typography className="my-2 ms-2">
          How do you want to quiz amount ?
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Category" inputlabelshrink />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Set" inputlabelshrink />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Sub Category" inputlabelshrink />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox disabled label="Commision Mode" inputlabelshrink />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="my-2">
          <Grid item md={6} sm={6}>
            <InputBox
              disabled
              label="Enter Highest Discount Value"
              inputlabelshrink
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <ButtonComponent label="Choose Product" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={3} sm={6}>
            <InputBox
              disabled
              placeholder="Enter the usage limit /coupon"
              inputlabelshrink
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox
              disabled
              placeholder="Enter the usage limit / Customer"
              inputlabelshrink
            />
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <Typography>Whome you want to create the quiz</Typography>
          <Grid container>
            <Grid item md={3}>
              <RadiobuttonComponent label="Random Split" disabled />
            </Grid>
            <Grid item md={3}>
              <RadiobuttonComponent label="Equal Split" disabled />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <TextEditor className="w-90p" />
        </Grid>
        <Grid container>
          <Grid item md={4} sm={6}>
            <InputBox
              placeholder="Enter Quiz / campaign Name"
              inputlabelshrink
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={3}>
            <RadiobuttonComponent label="3 Questions" disabled />
          </Grid>
          <Grid item md={3}>
            <RadiobuttonComponent label="5 Questions" disabled />
          </Grid>
        </Grid>
        <Grid container className="w-100 mt-4" spacing={4}>
          <Grid item md={4} lg={3} xl={2} container spacing={2}>
            <Grid item md={12}>
              Question 1:
              <InputBox
                label=""
                placeholder="Enter the question"
                textInputProps={{
                  style: { padding: 5 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent label="" size="small" disabled />
              <InputBox
                label=""
                placeholder="Enter the option 1"
                textInputProps={{
                  style: { padding: 5 },
                }}
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent label="" size="small" disabled />
              <InputBox
                label=""
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 2"
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent label="" size="small" disabled />
              <InputBox
                label=""
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 3"
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent label="" size="small" disabled />
              <InputBox
                label=""
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 4"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default EditQuizModal;
