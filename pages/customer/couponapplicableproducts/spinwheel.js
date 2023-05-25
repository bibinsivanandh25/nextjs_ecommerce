/* eslint-disable no-param-reassign */
import CarousalComponent from "@/atoms/Carousel";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { forwardRef, useEffect, useState, useRef } from "react";
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
import WheelSpin from "@/forms/supplier/marketingtools/createluckydraw/createSpinWheel/WheelSpin";

const SpinWheel = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ purchaseId, setShowSearch = () => {} }, ref = null) => {
    const [bannerImages, setbannerImages] = useState([]);
    const [productdetails, setProductDetails] = useState([]);
    const [campaigndetails, setCampaigndetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const spinWheelRef = useRef(null);
    const [showproductModal, setShowProductModal] = useState(false);
    const [result, setResult] = useState({
      message: "",
      status: "",
    });
    const segments = [
      "better luck next time",
      "better luck next time",
      "won a voucher",
      "better luck next time",
    ];
    const [winSegment, setWinSegment] = useState(
      Math.round(Math.random() * segments.length)
    );
    const segColors = [
      "#EE4040",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
    ];
    const onFinished = (winner) => {
      setResult({
        message: winner.includes("won")
          ? "Congratulations"
          : "Beter Luck Next Time",
        status: winner.includes("won"),
      });
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    };

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

    useEffect(() => {
      setShowSearch(false);
    }, []);

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
              subCategoryId: item.subcategoryId,
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
                      setSelected(item);
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
                  <WheelSpin
                    ref={spinWheelRef}
                    segments={segments}
                    segColors={segColors}
                    winningSegment={segments[winSegment]}
                    onFinished={(winner) => onFinished(winner)}
                    primaryColor="black"
                    contrastColor="white"
                    buttonText="Spin"
                    isOnlyOnce={false}
                    size={290}
                    upDuration={100}
                    downDuration={1000}
                  />
                  <ButtonComponent
                    label="Click to Spin"
                    onBtnClick={() => {
                      if (spinWheelRef.current) {
                        setWinSegment(
                          Math.floor(Math.random() * segments.length - 1)
                        );
                        spinWheelRef.current.callSpin();
                      }
                    }}
                    variant="outlined"
                    size="medium"
                    muiProps=" fs-12"
                  />
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

export default SpinWheel;
