/* eslint-disable no-param-reassign */
import CarousalComponent from "@/atoms/Carousel";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import {
  getScratchCardMarketingTool,
  getScratchCardProduct,
} from "services/customer/couponapplicableproducts";
import toastify from "services/utils/toastUtils";
import { customerHome } from "public/assets";
import { motion } from "framer-motion";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Quiz = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ purchaseId, setShowSearch = () => {} }, ref = null) => {
    const [bannerImages, setbannerImages] = useState([]);
    const [productdetails, setProductDetails] = useState([]);
    const [campaigndetails, setCampaigndetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({
      id: null,
      marketingToolId: null,
      marketingToolQuestionAnswerList: [],
      description: "",
      couponCode: "",
    });
    const [questionCount, setquestionCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
      message: "",
      score: 0,
    });
    const [showproductModal, setShowProductModal] = useState(false);

    const getQuiz = async () => {
      const { data, err } = await getScratchCardMarketingTool(purchaseId);
      if (data) {
        setbannerImages(
          data.bannerImageUrlForWeb.map((ele) => {
            return {
              src: ele,
              navigateUrl: "",
            };
          })
        );
        setCampaigndetails(
          data.tools.map((ele) => {
            return {
              campaignTitle: ele.campaignTitle,
              couponCode: ele.couponCode,
              marketingToolId: ele.marketingToolId,
              description: ele.description,
              marketingToolQuestionAnswerList:
                ele.marketingToolQuestionAnswerList,
            };
          })
        );
      } else if (err) {
        toastify(err?.response?.data?.messsage, "error");
      }
    };

    useEffect(() => {
      if (purchaseId) getQuiz();
    }, [purchaseId]);

    const handleQuizSubmit = () => {
      let score = 0;
      selected.marketingToolQuestionAnswerList.forEach((ele) => {
        if (ele.selectedAnswer === ele.answer) {
          score += 1;
        }
      });
      const status = selected.marketingToolQuestionAnswerList.length === score;
      setResult({
        score,
        message: status ? "Congratulations" : "Beter Luck Next Time",
        status,
      });
      setShowResult(true);
    };

    const getProducts = async (marketingtoolId) => {
      const payload = {
        marketingtoolId,
        profileId: "",
        keyword: "",
      };
      const { data, err } = await getScratchCardProduct(payload);
      if (data) {
        setProductDetails(
          data.map((item) => {
            return {
              id: item.productId,
              title: item.productTitle,
              price: item.salePrice,
              salePriceWithLogistics: item.salePriceWithLogistics,
              image: item.variationMedia,
              rating: {
                rate: item.averageRatings,
                count: item.totalRatings,
              },
              isWishlisted: item.wishlisted,
              skuId: item.skuId,
              wishlistId: item.wishlistId,
              userCartId: item.userCartId,
              isCarted: item.presentInCart,
            };
          })
        );
      } else if (err) {
        toastify(err?.response?.data?.messsage, "error");
      }
    };

    useEffect(() => {
      if (showproductModal) {
        getProducts(selected.marketingToolId);
      }
    }, [showproductModal]);
    useEffect(() => {
      setShowSearch(false);
    }, []);

    return (
      <>
        <Box
          className="rounded shadow overflow-hidden"
          style={{
            maxHeight: "30vh",
            minHeight: "30vh",
            overflow: "hidden",
          }}
        >
          {Boolean(bannerImages.length) && (
            <CarousalComponent
              list={[...bannerImages]}
              autoPlay
              stopOnHover={false}
              carouselImageMaxHeight="30vh"
              carouselImageMinHeight="30vh"
            />
          )}
        </Box>
        <Box className="mnh-79vh oveflow-auto hide-scrollbar mt-4">
          <Grid container spacing={3}>
            {campaigndetails.map((item) => {
              return (
                <Grid item md={3} lg={1.5} className="cursor-pointer">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelected({
                        id: item.themeId,
                        marketingToolId: item.marketingToolId,
                        marketingToolQuestionAnswerList:
                          item.marketingToolQuestionAnswerList.map((ele) => ({
                            ...ele,
                            questionOptions: ele.questionOptions.map((q) => ({
                              option: q,
                              selected: false,
                            })),
                            selectedAnswer: null,
                          })),
                        couponCode: item.couponCode,
                        description: item.description,
                      });
                      setOpen(true);
                    }}
                  >
                    <div className="cursor-pointer">
                      <Paper
                        elevation={4}
                        className="position-relative cursor-pointer mb-2"
                      >
                        <Image
                          src={customerHome.quizBackgroung}
                          width="100%"
                          layout="responsive"
                          height={80}
                          className="cursor-pointer"
                        />
                        <Typography
                          className="w-100 text-center cursor-pointer"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: " translate(-50%,-50%)",
                            background: "#cbcbcba6",
                            color: "#fff",
                          }}
                        >
                          Click to play
                        </Typography>
                      </Paper>
                      <Typography className="text-center cursor-pointer">
                        {item.campaignTitle}
                      </Typography>
                    </div>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {open && (
          <ModalComponent
            ModalTitle="Quiz"
            showCloseIcon={showResult}
            titleClassName="color-orange fs-14"
            showFooter={false}
            open
            minWidth={showResult ? 500 : "60%"}
            onCloseIconClick={() => {
              setOpen(false);
              setSelected({
                id: null,
                marketingToolId: null,
                marketingToolQuestionAnswerList: [],
                description: "",
              });
              setquestionCount(0);
              setShowResult(false);
            }}
          >
            <div className="py-3 d-flex flex-column  justify-content-center">
              {showResult ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="d-flex flex-column align-items-center"
                  >
                    <Typography className="h-3">{result.message}</Typography>
                    <div
                      className="d-flex justify-content-between rounded mt-2"
                      style={{
                        width: "400px",
                        padding: "15px",
                        border: "1px solid #E56700",
                        background: "#FFF0E3",
                      }}
                    >
                      <Typography className="h-2">Your Score</Typography>
                      <Typography className="h-2 color-orange">
                        {result.score}/
                        {selected.marketingToolQuestionAnswerList.length}
                      </Typography>
                    </div>
                    {result.status && (
                      <>
                        <Box className="border rounded p-3 my-2 shadow ">
                          <Typography
                            className="fs-12 d-flex"
                            style={{ minWidth: "260px" }}
                          >
                            Your Coupon Code -{" "}
                            <Typography
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  selected.couponCode
                                );
                              }}
                              className="color-light-blue cursor-pointer fs-12"
                            >
                              {selected.couponCode}
                            </Typography>
                            <span className="hover-class">
                              <ContentCopyIcon
                                className="cursor-pointer fs-14 ms-2 "
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    selected.couponCode
                                  );
                                }}
                              />
                            </span>
                          </Typography>
                        </Box>
                        <ButtonComponent
                          label="View Coupon Applicable Products"
                          onBtnClick={() => {
                            setOpen(false);
                            //   setSelected({
                            //     id: null,
                            //     marketingToolId: null,
                            //     marketingToolQuestionAnswerList: [],
                            //     description: "",
                            //   });
                            setquestionCount(0);
                            setShowResult(false);
                            setShowProductModal(true);
                          }}
                          muiProps="px-4"
                        />
                      </>
                    )}
                  </motion.div>
                </>
              ) : (
                <>
                  <Typography className="mb-3">
                    Answer all the questions.
                  </Typography>
                  <div>
                    <Typography
                      className="fs-14 rounded mb-3"
                      style={{
                        border: "1px solid #E56700",
                        background: "#FFF0E3",
                        padding: "15px",
                      }}
                    >
                      {`${questionCount + 1}. `}
                      {
                        selected.marketingToolQuestionAnswerList[questionCount]
                          .question
                      }
                    </Typography>
                    {selected.marketingToolQuestionAnswerList[
                      questionCount
                    ].questionOptions.map((item, index) => {
                      return (
                        <motion.div
                          whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.5 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const temp = JSON.parse(JSON.stringify(selected));
                            temp.marketingToolQuestionAnswerList[
                              questionCount
                            ].questionOptions.forEach((ele, ind) => {
                              if (ind === index) {
                                ele.selected = true;
                              } else {
                                ele.selected = false;
                              }
                            });
                            temp.marketingToolQuestionAnswerList[
                              questionCount
                            ].selectedAnswer = item.option;

                            setSelected(temp);
                          }}
                        >
                          <Typography
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className="fs-14 rounded mb-2 hoverShadow"
                            style={{
                              border: "1px solid ",
                              background: "#FAFAFA",
                              padding: "8px",
                              borderColor: item.selected
                                ? "#E56700"
                                : "#666666",
                            }}
                          >
                            {item.option}
                          </Typography>
                        </motion.div>
                      );
                    })}
                    {selected.marketingToolQuestionAnswerList[questionCount]
                      .selectedAnswer && (
                      <div className="d-flex justify-content-end">
                        <ButtonComponent
                          label={
                            selected.marketingToolQuestionAnswerList.length -
                              1 ===
                            questionCount
                              ? "Submit"
                              : "Next"
                          }
                          onBtnClick={() => {
                            if (
                              selected.marketingToolQuestionAnswerList.length -
                                1 !==
                              questionCount
                            ) {
                              setquestionCount(questionCount + 1);
                            } else {
                              handleQuizSubmit();
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </ModalComponent>
        )}
        <ModalComponent
          showHeader={false}
          showFooter={false}
          open={showproductModal}
          modalClose={() => {
            setShowProductModal(false);
          }}
          minWidth="80vw"
          minHeightClassName="mnh-80vh "
        >
          <div className="p-2 py-3">
            {productdetails?.map((ele) => {
              return (
                <ProductCard item={ele} cardPaperClass="container-shadow-sm" />
              );
            })}
          </div>
        </ModalComponent>
      </>
    );
  }
);

export default Quiz;
