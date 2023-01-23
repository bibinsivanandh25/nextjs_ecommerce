/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Add } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getAllFrequentProduct } from "services/customer/productdetails";
import AddToCartModal from "../addtocartmodal";

const FrequentBuyProduct = () => {
  const [deliveryType, setDeliveryType] = useState("NOFREEDELIVERYANDRETURN");
  const [frequentProduct, setfrequentProduct] = useState([]);
  const [showImage, setShowImage] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [formFrequentData, setFormFrequentData] = useState({
    actualCost: "",
    fd: "",
    handpick: "",
    storeowner: "",
  });
  const [showModal, setShowModal] = useState(false);
  const priceCal = (array) => {
    let actualCost = 0;
    let fd = 0;
    let handPicks = 0;
    array?.length &&
      array.forEach((item) => {
        actualCost += item.salePrice;
        fd += item.salePriceWithLogistics;
        handPicks += item.salePrice;
      });
    setFormFrequentData({
      actualCost,
      fd,
      handpick: handPicks,
      storeowner: handPicks,
    });
  };
  const getfrequentProduct = async (id) => {
    const { data, err } = await getAllFrequentProduct(id);
    if (data?.length) {
      const temp1 = [];
      data.forEach((item) => {
        temp1.push({
          productVariationId: item.productVariationId,
          mrp: item.mrp,
          productTitle: item.productTitle,
          variationMedia: item.productImageUrl,
          salePrice: item.salePrice,
          salePriceWithLogistics: item.salePriceWithLogistics,
          isSelected: true,
        });
      });
      priceCal(temp1);
      setSelectedProduct(temp1);
      setfrequentProduct(temp1);
      setShowImage(temp1);
    }
    if (err) {
      setfrequentProduct([]);
    }
  };
  const userData = useSelector((state) => state.customer);
  useEffect(() => {
    if (userData) {
      getfrequentProduct(userData.productId);
    }
  }, [userData]);

  const handleCheckBoxClik = (id) => {
    const tempSelectedData = [...selectedProduct];
    tempSelectedData.forEach((item) => {
      if (item.productVariationId === id) {
        item.isSelected = !item.isSelected;
      }
    });
    const temp = tempSelectedData.filter((x) => x.isSelected);
    priceCal(temp);
    setShowImage(temp);
    setSelectedProduct(tempSelectedData);
  };

  return (
    <>
      {frequentProduct.length ? (
        <Box>
          <Grid item md={12} m={0.5}>
            <Paper elevation={3}>
              <Box className="p-2">
                <Typography className="h-4 fw-bold mb-3">
                  Frequently Bought Together
                </Typography>
                {selectedProduct.some((x) => x.isSelected) ? (
                  <Grid container>
                    <Grid item md={6}>
                      <Grid container>
                        {showImage.map((item, index) =>
                          item.isSelected ? (
                            <>
                              <Image
                                height={120}
                                width={120}
                                src={item.variationMedia}
                                layout="intrinsic"
                                alt="alt"
                              />
                              {showImage.filter((x) => x.isSelected == true)
                                .length >
                              index + 1 ? (
                                <Grid item md={1} className="d-center">
                                  <Add sx={{ fontSize: "30px" }} />
                                </Grid>
                              ) : null}
                            </>
                          ) : null
                        )}
                      </Grid>
                    </Grid>
                    <Grid item md={6}>
                      <Grid container display="flex" alignItems="center">
                        <Grid item md={6} display="flex" alignItems="center">
                          <RadiobuttonComponent
                            size="small"
                            onRadioChange={() => {
                              setDeliveryType("NOFREEDELIVERYANDRETURN");
                            }}
                            isChecked={
                              deliveryType === "NOFREEDELIVERYANDRETURN"
                            }
                          />
                          <Typography className="h-5">
                            Actual Price (Excl.Delivery & Return Charge)
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography>:&nbsp;</Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Typography className="fw-bold">
                            ₹ {parseInt(formFrequentData.actualCost, 10)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container display="flex" alignItems="center">
                        <Grid item md={6} display="flex" alignItems="center">
                          <RadiobuttonComponent
                            size="small"
                            onRadioChange={() => {
                              setDeliveryType("FREEDELIVERYANDRETURN");
                            }}
                            isChecked={deliveryType === "FREEDELIVERYANDRETURN"}
                          />
                          <Typography className="h-5">
                            Price For Free Delivery & Return
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography>:&nbsp;</Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Typography className="fw-bold">
                            ₹ {parseInt(formFrequentData.fd, 10)}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">Hand Pick</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.handpick}
                        </Typography>
                      </Grid>
                    </Grid> */}
                      {/* <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">
                          Store Owner Delivery
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.storeowner}
                        </Typography>
                      </Grid>
                    </Grid> */}
                      <ButtonComponent
                        label="Add To Cart"
                        variant="outlined"
                        onBtnClick={() => {
                          setShowModal(true);
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Box
                    className="mnh-100"
                    display="flex"
                    alignItems="center"
                    marginLeft={5}
                  >
                    <BsFillExclamationCircleFill size="25px" color="#e56700" />
                    <Typography marginLeft={0.5} className="h-p89">
                      Choose Items to Buy Together
                    </Typography>
                  </Box>
                )}
                <Grid container>
                  <Grid item md={8}>
                    {selectedProduct.map((item, index) => (
                      <Grid item md={12} display="flex" alignItems="center">
                        <CheckBoxComponent
                          showIcon
                          varient="filled"
                          label=""
                          isChecked={item.isSelected}
                          checkBoxClick={() => {
                            handleCheckBoxClik(item.productVariationId);
                          }}
                        />
                        <Typography
                          color={item.isSelected ? "black" : "gray"}
                          className="fs-14"
                        >
                          {index == 0 ? (
                            <span className="fw-500">This Item :</span>
                          ) : (
                            ""
                          )}{" "}
                          {item.productTitle}{" "}
                          <span
                            className={
                              item.isSelected ? "color-blue" : "color-gray"
                            }
                          >
                            - AC &nbsp;Rs.{item.salePrice}
                          </span>
                          /
                          <span
                            className={
                              item.isSelected ? "color-blue" : "color-gray"
                            }
                          >
                            FD &nbsp;Rs.{item.salePriceWithLogistics}
                          </span>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid
                    item
                    md={4}
                    display="flex"
                    alignItems="end"
                    justifyContent="end"
                  >
                    <Box>
                      <Typography className="h-5">AC - Actual Cost</Typography>
                      <Typography className="h-5">
                        FD - Free Delivery & Return
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      ) : null}
      {showModal ? (
        <AddToCartModal
          showModal={showModal}
          setShowModal={setShowModal}
          frequentProduct={frequentProduct}
          type={deliveryType}
        />
      ) : null}
    </>
  );
};

export default FrequentBuyProduct;
