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
  const [formFrequentData, setFormFrequentData] = useState({
    actualCost: "",
    fd: "",
    handpick: "",
    storeowner: "",
  });
  const getfrequentProduct = async (id) => {
    const { data, err } = await getAllFrequentProduct(id);
    if (data?.length) {
      let actualCost = 0;
      let fd = 0;
      let handPicks = 0;
      data.forEach((item) => {
        if (item.mrp) {
          actualCost += item.mrp;
        }
        if (item.salePriceWithLogistics) {
          fd += item.salePriceWithLogistics;
        }
        if (item.salePrice) {
          handPicks += item.salePrice;
        }
      });
      setFormFrequentData({
        actualCost,
        fd,
        handpick: handPicks,
        storeowner: handPicks,
      });
      setfrequentProduct(data);
    }
    if (err) {
      setfrequentProduct([]);
    }
  };
  useEffect(() => {
    // console.log(router.query.id, "router.query.id");
    if (router.query.id ?? productId) {
      const id = router.query.id ?? productId;
      getfrequentProduct(id);
    }
  }, [router.query, productId]);
  return (
    <Box>
      {frequentProduct.length ? (
        <Grid item md={12} className="my-2 mx-4">
          <Paper elevation={3}>
            <Box className="p-2">
              <Typography className="h-4 fw-bold">
                Frequently Bought Together
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <Grid container>
                    {frequentProduct.map((item, index) => (
                      <>
                        <Grid item md={3}>
                          <Image
                            height={150}
                            width={150}
                            src={item.variationMedia[0]}
                            layout="intrinsic"
                            alt="alt"
                            className="border rounded"
                          />
                        </Grid>
                        {frequentProduct.length - 1 > index && (
                          <Grid item md={1} className="d-center">
                            <Add sx={{ fontSize: "40px" }} />
                          </Grid>
                        )}
                      </>
                    ))}
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
                  <Typography className="h-5 color-orange cursor-pointer">
                    Add All These To Cart
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item md={8}>
                    {frequentProduct.map((item) => (
                      <Grid item md={12} display="flex" alignItems="center">
                        <CheckBoxComponent
                          // label={`${item.productTitle} - AC ${item.mrp} / FD ${item.salePriceWithLogistics}`}
                          showIcon
                          varient="filled"
                          label=""
                        />
                        <Typography>
                          {item.productTitle}{" "}
                          <span className="color-blue">- AC</span>{" "}
                          <span className="color-light-green">
                            {" "}
                            Rs.{item.mrp}
                          </span>{" "}
                          / <span className="color-blue">FD</span>{" "}
                          <span className="color-light-green">
                            Rs.{item.salePriceWithLogistics}
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
              </Grid>
            </Box>
          </Paper>
        </Grid>
      ) : null}
    </Box>
  );
};

export default FrequentBuyProduct;
