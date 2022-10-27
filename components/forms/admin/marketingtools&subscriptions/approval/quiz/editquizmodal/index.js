/* eslint-disable react/no-danger */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { getMarketingToolDetailsByToolId } from "services/admin/marketingtools/approvals";

const EditQuizModal = ({
  views,
  marketingToolId,
  modalOpen,
  modalClose = () => {},
  title = "",
  footer = false,
  // editorPlaceHolder = "Description...",
}) => {
  const [viewdetails, setViewDetailes] = useState({
    marketingToolProductList: [],
    marketingToolQuestionAnswerList: [],
  });
  const getViewData = async () => {
    const { data } = await getMarketingToolDetailsByToolId(
      marketingToolId,
      "QUIZ"
    );
    if (data) {
      setViewDetailes({ ...data });
    }
  };

  useEffect(() => {
    getViewData();
  }, []);

  const renderQuestrions = () => {
    return viewdetails.marketingToolQuestionAnswerList.map(
      (question, index) => {
        return (
          <Grid
            item
            md={6}
            lg={4}
            xl={4}
            container
            spacing={2}
            key={question.questionId}
          >
            <Grid item md={12}>
              Question {index + 1}:
              <InputBox
                label=""
                disabled={views === "view"}
                placeholder="Enter your question"
                textInputProps={{
                  style: { padding: 5 },
                }}
                value={question.question}
                fullWidth
              />
            </Grid>
            {question.questionOptions.map((answer, index) => {
              return (
                <Grid item md={12} className="d-flex mt-2" key={index}>
                  <RadiobuttonComponent
                    label=""
                    size="small"
                    disabled={views === "view"}
                    isChecked={answer == question.answer ? "checked" : ""}
                  />
                  <InputBox
                    label=""
                    value={answer}
                    disabled={views === "view"}
                    placeholder="Enter the option 1"
                    textInputProps={{
                      style: { padding: 5 },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        );
      }
    );
  };

  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => modalClose(false)}
      ModalTitle={title}
      ModalWidth="75%"
      showFooter={footer}
      titleClassName="fw-bold color-orange"
    >
      <Box className="my-2 mxh-600 mnh-600 overflow-y-scroll hide-scrollbar">
        <Grid container>
          <Grid item md={4} display="flex">
            <Typography>Start Date :</Typography>
            <input
              disabled={views === "view"}
              type="date"
              value={
                viewdetails?.startDateTime?.split(" ")[0]
                  ? format(
                      new Date(viewdetails?.startDateTime?.split(" ")[0]),
                      "yyyy-MM-dd"
                    )
                  : null
              }
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={() => {}}
            />
          </Grid>
          <Grid item md={4} display="flex">
            <Typography>End Date :</Typography>
            <input
              disabled={views === "view"}
              type="date"
              // value={format(new Date(formData.start_date), "yyyy-MM-dd")}
              value={
                viewdetails?.startDateTime?.split(" ")[0]
                  ? format(
                      new Date(viewdetails?.endDateTime?.split(" ")[0]),
                      "yyyy-MM-dd"
                    )
                  : null
              }
              style={{
                border: "none",
                outline: "none",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              onChange={() => {}}
            />
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <Typography>Whom you want to create the quiz</Typography>
          <Grid container>
            <Grid item md={3}>
              <RadiobuttonComponent
                label="New Customer"
                disabled={views === "view"}
                isChecked={viewdetails?.customerType === "NEW_CUSTOMER"}
              />
            </Grid>
            <Grid item md={3}>
              <RadiobuttonComponent
                label="Existing Customer"
                disabled={views === "view"}
                isChecked={viewdetails?.customerType === "EXISTING_CUSTOMER"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography className="my-2 ms-2">
          How do you want to quiz amount ?
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={3} sm={6}>
            <InputBox
              disabled={views === "view"}
              label="Category"
              inputlabelshrink
              value={viewdetails?.category}
            />
          </Grid>
          {views !== "view" ? (
            <Grid item md={3} sm={6}>
              <InputBox disabled label="Set" inputlabelshrink />
            </Grid>
          ) : null}
          <Grid item md={3} sm={6}>
            <InputBox
              disabled={views === "view"}
              label="Sub Category"
              inputlabelshrink
              value={viewdetails?.subCategory}
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox
              disabled={views === "view"}
              label="Commision Mode"
              inputlabelshrink
              value={
                viewdetails?.marketingToolProductList.length > 0
                  ? viewdetails.marketingToolProductList[0].commissionMode
                  : ""
              }
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox
              disabled={views === "view"}
              label="Discount Value"
              inputlabelshrink
              value={viewdetails?.totalDiscountValue}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="my-2">
          <Grid item md={3} sm={6}>
            <InputBox
              disabled={views === "view"}
              placeholder="Enter the usage limit /coupon"
              label="Enter the usage limit /coupon"
              inputlabelshrink
              value={viewdetails?.couponUsageLimit}
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <InputBox
              label="Enter the usage limit / Customer"
              disabled={views === "view"}
              placeholder="Enter the usage limit / Customer"
              inputlabelshrink
              value={viewdetails?.customerUsageLimit}
            />
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <Typography>Whom you want to create the quiz</Typography>
          <Grid container>
            <Grid item md={3}>
              <RadiobuttonComponent
                label="Random Split"
                disabled={views === "view"}
                isChecked={viewdetails?.splitType === "RANDOM"}
              />
            </Grid>
            <Grid item md={3}>
              <RadiobuttonComponent
                label="Equal Split"
                disabled={views === "view"}
                isChecked={viewdetails?.splitType === "EQUAL"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="my-2">
          <div
            disabled={views === "view"}
            className="border rounded-3 pb-5 pt-3 w-95p px-4 "
            style={{
              background: "#fafafa",
            }}
            dangerouslySetInnerHTML={{
              __html: viewdetails?.description,
            }}
          />
        </Grid>
        <Grid container>
          <Grid item md={4} sm={6}>
            <InputBox
              placeholder="Enter Quiz / campaign Name"
              inputlabelshrink
              value={viewdetails?.campaignTitle}
              disabled={views === "view"}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={3}>
            <RadiobuttonComponent
              label="3 Questions"
              disabled={views === "view"}
              // marketingToolQuestionAnswerList

              isChecked={
                viewdetails?.marketingToolQuestionAnswerList.length === 3
              }
            />
          </Grid>
          <Grid item md={3}>
            <RadiobuttonComponent
              label="5 Questions"
              disabled={views === "view"}
              isChecked={
                viewdetails?.marketingToolQuestionAnswerList.length === 5
              }
            />
          </Grid>
        </Grid>
        {/* questions  */}
        <Box className="d-flex">
          <Grid container className="w-100 mt-4 " spacing={2}>
            {renderQuestrions()}
          </Grid>
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default EditQuizModal;
