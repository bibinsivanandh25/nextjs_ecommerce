import InputBox from "@/atoms/InputBoxComponent";
import { Avatar, Box, Grid, Paper, Rating, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getAllQandA,
  getAllRating,
  getProductReview,
  postQuestions,
} from "services/customer/productdetails";
import LinearProgressBar from "@/atoms/LinearProgressBar";
import Image from "next/image";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import validateMessage from "constants/validateMessages";

const FAQPage = ({
  setSearchAnswers = () => {},
  searchAnswers,
  setShowQAPage = () => {},
  productId,
}) => {
  const [ratingData, setRatingData] = useState({});
  const [reviewMasterData, setReviewMasterData] = useState({});
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [reviewPageNumber, setReviewPageNumber] = useState(0);
  const [productReview, setProductReview] = useState([]);
  const [showPostQandA, setShowPostQandA] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const user = useSelector((state) => state.customer);

  const [isIntersecting, setIntersecting] = useState(false);
  const [reviewIsIntersecting, setReviewIsIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  });
  const reviewObserver = new IntersectionObserver(([entry]) => {
    setReviewIsIntersecting(entry.isIntersecting);
  });
  const reviewFooterRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    observer.observe(footerRef.current);
    if (reviewFooterRef.current) {
      reviewObserver.observe(reviewFooterRef.current);
    }
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
      reviewObserver.disconnect();
    };
  }, []);

  const getAllProductReview = async (page = reviewPageNumber) => {
    const { data, err } = await getProductReview(productId, page);
    if (data) {
      if (page == 0) {
        setReviewPageNumber(1);
        setProductReview(data);
      } else if (page !== 0 && data.length) {
        setProductReview((prev) => [...prev, ...data]);
        setReviewPageNumber((pre) => pre + 1);
      }
    } else if (err) {
      setProductReview([]);
    }
  };
  const getAllRatingDetails = async () => {
    const { data, err } = await getAllRating(productId);
    if (data) {
      setReviewMasterData(data);
      setRatingData({
        "5 Star": data.starRating5,
        "4 Star": data.starRating4,
        "3 Star": data.starRating3,
        "2 Star": data.starRating2,
        "1 Star": data.starRating1,
      });
    }
    if (err) {
      setReviewMasterData({});
      setRatingData({
        "5 Star": 0,
        "4 Star": 0,
        "3 Star": 0,
        "2 Star": 0,
        "1 Star": 0,
      });
    }
  };
  const [answerData, setAnswerData] = useState([]);
  const getProductQandAData = async (page = pageNumber) => {
    const payload = {
      productVariationId: productId,
      keyword: searchAnswers,
    };
    const { data, err } = await getAllQandA(payload, page);
    if (data) {
      if (page == 0) {
        setPageNumber(1);
        setAnswerData(data.customerQueAnsPojo);
        setShowPostQandA(true);
      } else if (page !== 0 && data.customerQueAnsPojo?.length) {
        setShowPostQandA(true);
        setAnswerData((prev) => [...prev, ...data.customerQueAnsPojo]);
        setPageNumber((pre) => pre + 1);
      }
    } else if (err) {
      setShowPostQandA(false);
      setAnswerData([]);
    }
  };

  useEffect(() => {
    const search = setTimeout(() => {
      getProductQandAData(0);
    }, 1000);
    return () => clearTimeout(search);
  }, [searchAnswers]);
  useEffect(() => {
    if (isIntersecting) {
      getProductQandAData();
    }
  }, [isIntersecting]);
  useEffect(() => {
    if (reviewIsIntersecting) {
      getAllProductReview();
    }
  }, [reviewIsIntersecting]);
  useEffect(() => {
    getAllProductReview(0);
    getAllRatingDetails();
  }, []);

  const [questionData, setQuestionData] = useState("");
  const [error, setError] = useState("");
  const validate = () => {
    let flag = true;
    if (questionData.length === 0) {
      setError(validateMessage.field_required);
      flag = false;
    } else {
      flag = true;
      setError("");
    }
    return flag;
  };
  const handlePostQuestionsClick = async () => {
    if (validate()) {
      const payload = {
        customerQuestion: questionData,
        variationId: productId,
        customerId: user.userId,
        customerName: user.customerName,
      };
      const { data, err } = await postQuestions(payload);
      if (data) {
        getProductQandAData(0);
        setQuestionData("");
        setShowQuestionPage(false);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleReviewImageClick = () => {
    setShowImageModal(true);
  };
  return (
    <Box paddingX={1}>
      <Typography
        onClick={() => {
          setSearchAnswers("");
          setShowQAPage(false);
        }}
        className="mb-2 h-5 cursor-pointer fw-bold py-1 d-flex align-item-center align-content-center fit-content"
      >
        <ArrowBackIcon className="fs-18 me-1" />
        Back
      </Typography>
      <Grid container>
        <Grid item md={12} sm={12}>
          <Typography className="fw-bold h-4 pb-1">
            Customer questions & answers
          </Typography>
        </Grid>
        {showPostQandA ? (
          <Grid item sm={6} marginBottom={1.1} xs={8}>
            <InputBox
              value={searchAnswers}
              onInputChange={(e) => {
                setSearchAnswers(e.target.value);
              }}
              placeholder="Have Questions?Search for Answers"
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  getProductQandAData(0);
                }
              }}
            />
          </Grid>
        ) : null}
        <Grid item md={6} sm={6} marginLeft={2}>
          <Box className="mxh-300 overflow-auto hide-scrollbar">
            {answerData?.length
              ? answerData.map((item) => (
                  <Grid container>
                    <Grid item md={1.5} sm={2} xs={3}>
                      <Typography className="h-p89 fw-bold">
                        Question:
                      </Typography>
                    </Grid>
                    <Grid item md={10} sm={10} xs={9}>
                      <Typography className="h-p89 color-blue">
                        {item.customerQuestion}
                      </Typography>
                    </Grid>
                    <Grid item md={1.5} sm={2} xs={3}>
                      <Typography className="h-p89 fw-bold">
                        {" "}
                        Answer:
                      </Typography>
                    </Grid>
                    <Grid item md={10} sm={10} xs={9}>
                      <Typography className="h-p89">
                        {item.userAnswer ? item.userAnswer : `--`}
                      </Typography>
                      <Typography className="h-6 color-gray">
                        By {item.profileName},on {item.lastModifiedAt}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}

            <div
              ref={footerRef}
              style={{
                visibility: "hidden",
                display: answerData?.length > 9 ? "block" : "none",
              }}
            >
              See More Answered Questions
            </div>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Paper>
            <Box className="d-flex" justifyContent="space-evenly" paddingY={2}>
              <Typography>
                Don&apos;t see the answers you are looking for ?
              </Typography>
              <ButtonComponent
                variant="outlined"
                label="Post Your Question"
                onBtnClick={() => {
                  setShowQuestionPage(true);
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container mt={2} columnSpacing={2}>
        <Grid item md={4}>
          <Typography className="fw-500">Customer Reviews</Typography>
          {reviewMasterData.averageRating ? (
            <Box
              display="flex"
              alignItems="center"
              alignSelf="center"
              alignContent="center"
              marginLeft={2}
            >
              <Rating
                readOnly
                sx={{ color: "#e56700" }}
                value={reviewMasterData.averageRating}
                precision={0.5}
              />
              (
              <Typography className="h-5 ms-1 fw-500">
                {reviewMasterData.averageRating} out of 5
              </Typography>
              )
            </Box>
          ) : null}
          {reviewMasterData.averageRating ? (
            <Typography marginLeft={3} className="h-5 mb-2">
              {reviewMasterData.globalNoOfRatings} Global Ratings
            </Typography>
          ) : null}
          <Grid item md={10}>
            {Object.keys(ratingData).length
              ? Object.entries(ratingData).map((item) => (
                  <LinearProgressBar
                    height={17}
                    leftTitle={`${item[0]}`}
                    rightTitle={`${item[1]}%`}
                    value={item[1]}
                    borderRadius={2}
                    className="mb-1"
                  />
                ))
              : null}
          </Grid>
          <Grid item md={10} marginTop={2}>
            <Typography className="fw-500 ">Review This Product</Typography>
            <Grid container marginLeft={3}>
              <Grid item md={12}>
                <Typography className="h-5 mb-1">
                  Share Your Thoughts With Other customers
                </Typography>
              </Grid>
              <Grid item md={10}>
                <ButtonComponent
                  label="Write a Review"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8}>
          {reviewMasterData?.reviewMediaUrl?.length ? (
            <Grid item md={12}>
              <Typography className="fw-bold">Reviews With Images</Typography>
              <Box display="flex">
                {reviewMasterData.reviewMediaUrl.map(
                  (item, index) =>
                    index < 6 && (
                      <Box position={index === 5 && "relative"} marginRight={1}>
                        <Image
                          layout="intrinsic"
                          height={120}
                          width={120}
                          src={item}
                          className={`${index === 5 ? "reviewIamge" : ""}`}
                          alt="No Image"
                        />
                        {index === 5 && index < 6 && (
                          <Box
                            position="absolute"
                            top={0}
                            zIndex={100}
                            onClick={() => {
                              handleReviewImageClick();
                            }}
                            className="cursor-pointer w-100 h-100"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography className="fs-26 color-white fw-500">
                              + {reviewMasterData.reviewMediaUrl.length - 5}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )
                )}
              </Box>
            </Grid>
          ) : null}
          {reviewMasterData?.customerTopReviewPojo ? (
            <Grid item md={12} mt={2}>
              <Typography className="fw-bold ">
                Top Reviews From India
              </Typography>
              <Box>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={reviewMasterData.customerTopReviewPojo.profileImage}
                  />
                  <Typography marginLeft={1}>
                    {reviewMasterData.customerTopReviewPojo.name}
                  </Typography>
                </Box>
                <Grid item md={8}>
                  <Box
                    display="flex"
                    alignItems="center"
                    alignSelf="center"
                    alignContent="center"
                  >
                    <Rating
                      readOnly
                      sx={{ color: "#e56700" }}
                      value={
                        reviewMasterData.customerTopReviewPojo.customerRatings
                      }
                      precision={0.5}
                    />
                    <Typography className="h-5 ms-1 fw-500">
                      {reviewMasterData.customerTopReviewPojo.customerRatings}{" "}
                      out of 5
                    </Typography>
                  </Box>
                  <Typography className="h-5">
                    Reviewed on,
                    {reviewMasterData.customerTopReviewPojo.reviewedDateTime}
                  </Typography>
                  <Typography className="h-5 fw-500">
                    {reviewMasterData.customerTopReviewPojo.headline}
                  </Typography>
                  <Typography className="h-5">
                    {reviewMasterData.customerTopReviewPojo.writtenReview}
                  </Typography>
                  <Typography className="h-5 color-gray">
                    {reviewMasterData.customerTopReviewPojo.helpfulCount} people
                    found this helpful
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          ) : null}
          <Grid item md={12} marginTop={3}>
            {productReview?.length ? (
              <Typography className="fw-bold my-1">Product Reviews</Typography>
            ) : null}
            {productReview?.length ? (
              <Box className="mxh-600 overflow-auto hide-scrollbar">
                {productReview.map((item) => (
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Avatar src={item.profileImage} />
                      <Typography marginLeft={1}>{item.name}</Typography>
                    </Box>
                    <Grid item md={8} marginBottom={2}>
                      <Box
                        display="flex"
                        alignItems="center"
                        alignSelf="center"
                        alignContent="center"
                      >
                        <Rating
                          precision={0.5}
                          readOnly
                          sx={{ color: "#e56700" }}
                          value={item.customerRatings}
                        />
                        <Typography className="h-5 ms-1 fw-500">
                          {item.customerRatings} out of 5
                        </Typography>
                      </Box>
                      <Typography className="h-5">
                        {item.reviewedDateTime}
                      </Typography>
                      <Typography className="h-5 fw-500">
                        {item.headline}
                      </Typography>
                      <Typography className="h-5">
                        {item.writtenReview}
                      </Typography>
                      <Box display="flex">
                        {item?.reviewMediaUrl?.length
                          ? item?.reviewMediaUrl.map((val) => (
                              <Box marginRight={1}>
                                <Image
                                  layout="intrinsic"
                                  height={70}
                                  width={70}
                                  src={val}
                                  alt="No Image"
                                />
                              </Box>
                            ))
                          : null}
                      </Box>
                      {item.helpfulCount > 0 ? (
                        <Typography className="h-5 color-gray">
                          {item.helpfulCount} people found this helpful
                        </Typography>
                      ) : null}
                      <Box className="mt-1 ms-2">
                        <ButtonComponent label="Helpful" variant="outlined" />
                      </Box>
                    </Grid>
                  </Box>
                ))}
                <div
                  ref={reviewFooterRef}
                  style={{
                    visibility: "hidden",
                    display: productReview?.length > 9 ? "block" : "none",
                  }}
                >
                  See More Review
                </div>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      {showQuestionPage ? (
        <ModalComponent
          open={showQuestionPage}
          onCloseIconClick={() => {
            setShowQuestionPage(false);
            setError("");
          }}
          ModalWidth={700}
          ModalTitle="Post Your Question"
          footerClassName="justify-content-end"
          saveBtnText="Post"
          ClearBtnText="Close"
          onClearBtnClick={() => {
            setShowQuestionPage(false);
            setError("");
          }}
          onSaveBtnClick={() => handlePostQuestionsClick()}
        >
          <Box paddingY={2}>
            <TextArea
              value={questionData}
              placeholder="Please enter a question..."
              onInputChange={(e) => setQuestionData(e.target.value)}
              rows={3}
              error={error !== ""}
              helperText={error}
            />
            <Typography className="h-5">
              Your question might be answered by suppliers, Re-sellers, or
              customers who bought this product.
            </Typography>
          </Box>
        </ModalComponent>
      ) : null}
      {showImageModal ? (
        <ModalComponent
          open={showImageModal}
          showPositionedClose
          showCloseIcon={false}
          showFooter={false}
          onCloseIconClick={() => setShowImageModal(false)}
          ModalTitle={`User Images (${reviewMasterData?.reviewMediaUrl?.length})`}
          titleClassName="fs-16 fw-500 color-orange"
          ModalWidth={800}
        >
          <Box className="mxh-600">
            <Grid container spacing={2} mt={1}>
              {reviewMasterData.reviewMediaUrl.map((item) => (
                <Grid item sm={4}>
                  <Image
                    layout="intrinsic"
                    height={220}
                    width={220}
                    src={item}
                    alt="No Image"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </ModalComponent>
      ) : null}
    </Box>
  );
};

export default FAQPage;
