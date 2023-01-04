/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Add } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllFrequentProduct } from "services/customer/productdetails";

const FrequentBuyProduct = ({ productId }) => {
  const router = useRouter();
  const [frequentProduct, setfrequentProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [formFrequentData, setFormFrequentData] = useState({
    actualCost: "",
    fd: "",
    handpick: "",
    storeowner: "",
  });
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
          variationMedia: item.variationMedia,
          salePrice: item.salePrice,
          salePriceWithLogistics: item.salePriceWithLogistics,
          isSelected: true,
        });
      });
      priceCal(data);
      setSelectedProduct(temp1);
      setfrequentProduct(temp1);
    }
    if (err) {
      setfrequentProduct([]);
    }
  };
  useEffect(() => {
    if (router.query.id ?? productId) {
      const id = router.query.id ?? productId;
      getfrequentProduct(id);
    }
  }, [router.query, productId]);

  const handleCheckBoxClik = (id) => {
    const tempSelectedData = [...selectedProduct];
    tempSelectedData.forEach((item) => {
      if (item.productVariationId === id) {
        item.isSelected = !item.isSelected;
      }
    });
    const temp = tempSelectedData.filter((x) => x.isSelected);
    priceCal(temp);
    setSelectedProduct(tempSelectedData);
  };
  return (
    <>
      {frequentProduct.length ? (
        <Box>
          <Grid item md={12} className="my-2 mx-4">
            <Paper elevation={3}>
              <Box className="p-2">
                <Typography className="h-4 fw-bold mb-3">
                  Frequently Bought Together
                </Typography>
                <Grid container>
                  <Grid item md={6}>
                    <Grid container>
                      {frequentProduct.map((item, index) =>
                        item.isSelected ? (
                          <>
                            <Grid item md={3}>
                              <Image
                                height={120}
                                width={120}
                                src={item.variationMedia[0]}
                                layout="intrinsic"
                                alt="alt"
                              />
                            </Grid>
                            {frequentProduct.filter((x) => x.isSelected == true)
                              .length >
                              index + 1 && (
                              <Grid item md={1} className="d-center">
                                <Add sx={{ fontSize: "30px" }} />
                              </Grid>
                            )}
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
                          // label="Actual Price (Excl.Delivery & Return Charge)"
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
                          ₹ {formFrequentData.actualCost}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                      <Grid item md={6} display="flex" alignItems="center">
                        <RadiobuttonComponent size="small" />
                        <Typography className="h-5">
                          Price For Free Delivery & Return
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>:&nbsp;</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className="fw-bold">
                          ₹ {formFrequentData.fd}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
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
                    </Grid>
                    <Grid container display="flex" alignItems="center">
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
                    </Grid>
                    {/* <Typography className="h-5 color-orange cursor-pointer fit-content border">
                      Add All These To Cart
                    </Typography> */}
                    <ButtonComponent
                      label="Add All These To Cart"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container>
                    <Grid item md={8}>
                      {selectedProduct.map((item) => (
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
                            {item.productTitle}{" "}
                            <span
                              className={
                                item.isSelected ? "color-blue" : "color-gray"
                              }
                            >
                              - AC
                            </span>
                            <span
                              className={
                                item.isSelected
                                  ? "color-light-green"
                                  : "color-gray"
                              }
                            >
                              &nbsp;Rs.{item.salePrice}
                            </span>
                            /
                            <span
                              className={
                                item.isSelected ? "color-blue" : "color-gray"
                              }
                            >
                              FD
                            </span>
                            <span
                              className={
                                item.isSelected
                                  ? "color-light-green"
                                  : "color-gray"
                              }
                            >
                              &nbsp;Rs.{item.salePriceWithLogistics}
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
                        <Typography className="h-5">
                          AC - Actual Cost
                        </Typography>
                        <Typography className="h-5">
                          FD - Free Delivery & Return
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default FrequentBuyProduct;
