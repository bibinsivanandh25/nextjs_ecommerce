/* eslint-disable no-param-reassign */
import CarousalComponent from "@/atoms/Carousel";
import Theme2, {
  themeImg2,
} from "@/forms/supplier/marketingtools/createluckydraw/createScratchCard/Theme2";
import Theme1, {
  themeImg,
} from "@/forms/supplier/marketingtools/createluckydraw/createScratchCard/Theme1";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, forwardRef, useState } from "react";
import {
  getScratchCardMarketingTool,
  getScratchCardProduct,
} from "services/customer/couponapplicableproducts";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import { motion } from "framer-motion";
import ModalComponent from "@/atoms/ModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";

const ScratchCard = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ purchaseId, setShowSearch = () => {} }, ref) => {
    const [bannerImages, setbannerImages] = useState([]);
    const [campaigndetails, setCampaigndetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [showProductBtn, setShowProductBtn] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState({
      id: null,
      content: null,
      marketingToolId: null,
    });
    const [showproductModal, setShowProductModal] = useState(false);
    const [productdetails, setProductDetails] = useState([]);

    const scratchCardContent = () => {
      return (
        <div
          style={{ height: "200px", width: "250px" }}
          className=" shadow bg-white d-flex justify-content-center align-items-center"
        >
          <h3>{selectedTheme.content}</h3>
        </div>
      );
    };
    useEffect(() => {
      setShowSearch(false);
    }, []);

    const getScratchCard = async () => {
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
              themeId: ele.themeId,
            };
          })
        );
      } else if (err) {
        toastify(err?.response?.data?.messsage, "error");
      }
    };

    useEffect(() => {
      if (purchaseId) getScratchCard();
    }, [purchaseId]);

    const handleScratchComplete = () => {
      setShowProductBtn(true);
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
        getProducts(selectedTheme.marketingToolId);
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
                      setSelectedTheme({
                        id: item.themeId,
                        content: item.couponCode,
                        marketingToolId: item.marketingToolId,
                      });
                      setOpen(true);
                    }}
                  >
                    <div className="cursor-pointer">
                      <Paper
                        elevation={4}
                        className="position-relative cursor-pointer"
                      >
                        <Image
                          src={item.themeId === 1 ? themeImg : themeImg2}
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
        <ModalComponent
          ModalTitle="Scratch Card"
          onCloseIconClick={() => {
            setOpen(false);
            setShowProductBtn(false);
          }}
          titleClassName="color-orange fs-14"
          showFooter={false}
          open={open}
        >
          <div className="py-3 d-flex flex-column align-items-center justify-content-center">
            {selectedTheme.id === 1 ? (
              <Theme1
                width={250}
                height={200}
                onComplete={handleScratchComplete}
              >
                {scratchCardContent()}
              </Theme1>
            ) : (
              <Theme2
                width={250}
                height={200}
                onComplete={handleScratchComplete}
              >
                {scratchCardContent()}
              </Theme2>
            )}
            {showProductBtn && (
              <motion.div
                // animate={{ x: 100 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="d-flex flex-column align-items-center"
              >
                <Box className="border rounded p-3 my-2 shadow ">
                  <Typography className="fs-12 d-flex">
                    Your Coupon Code -{" "}
                    <Typography
                      onClick={() => {
                        navigator.clipboard.writeText(selectedTheme.content);
                      }}
                      className="color-light-blue cursor-pointer fs-12"
                    >
                      {selectedTheme.content}
                    </Typography>
                    <span className="hover-class">
                      <ContentCopyIcon
                        className="cursor-pointer fs-14 ms-2 "
                        onClick={() => {
                          navigator.clipboard.writeText(selectedTheme.content);
                        }}
                      />
                    </span>
                  </Typography>
                </Box>
                <ButtonComponent
                  label="View Coupon Applicable Products"
                  onBtnClick={() => {
                    setShowProductModal(true);
                    setOpen(false);
                    setShowProductBtn(false);
                  }}
                  muiProps="px-4"
                />
              </motion.div>
            )}
          </div>
        </ModalComponent>
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

export default ScratchCard;
