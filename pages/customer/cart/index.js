/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import { Box, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlusMinusButtonComponent from "@/atoms/PlusMinusButtonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ChooseAddress from "@/forms/customer/address/ChooseAddress";
import {
  getCartProducts,
  removeProductFromCart,
  updateCartQuantity,
} from "services/customer/cart";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showChooseAddress, setShowChooseAddress] = useState(false);

  const { profileId } = useSelector((state) => state?.customer);

  const getproducts = async () => {
    const { data } = await getCartProducts(profileId);
    if (data) {
      const result = [];
      data?.userCartProductPojos?.forEach((ele) => {
        result.push({
          id: ele.productId,
          businessName: ele.businessName,
          image: ele.variationMedia,
          title: ele.productTitle,
          mrp: ele.mrp,
          salePrice: ele.salePrice,
          cartQty: ele.cartQty,
          stockQty: ele.stockQty,
          deliveryCharge: ele.deliveryCharge,
          orderType: ele.orderType,
          returnType: ele.returnType,
          returnCharge: ele.returnCharge,
        });
      });
      setProducts([...result]);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);

  const mainRef = useRef(null);
  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView();
    }
  }, []);

  const getOrderType = (type) => {
    if (type === "NOFREEDELIVERYANDRETURN") {
      return "No Free Delivery and Return";
    }
    if (type === "FREEDELIVERYANDRETURN") {
      return "Free Delivery and Return";
    }
    if (type === "STOREOWNERDELIVERY") {
      return "Delivery By Store Owner";
    }
    if (type === "HANDPICK") {
      return "Hand Pick";
    }
    return type;
  };

  const updateCartCount = async (productId, cartQuantity) => {
    const payload = {
      profileId,
      productId,
      cartQuantity: cartQuantity === "SUB" ? "SUBTRACTION" : cartQuantity,
    };
    const { data, err } = await updateCartQuantity(payload);
    if (data) {
      getproducts();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const removeProduct = async (id) => {
    const { data, err } = await removeProductFromCart(id, profileId);
    if (data) {
      toastify(data?.message, "success");
      getproducts();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getCartList = () => {
    return products.map((ele, ind) => {
      return (
        <Box className="mx-2 py-1 ">
          <Grid container key={ind + 1}>
            <Grid item sm={1.5} className="">
              <Image
                src={ele.image}
                height={85}
                width="100%"
                layout="intrinsic"
              />
              <Box className="mt-2">
                <PlusMinusButtonComponent
                  className="fs-5"
                  countClassName="px-3"
                  value={ele.cartQty}
                  maxValue={ele.stockQty}
                  getCount={(type) => {
                    updateCartCount(ele.id, type);
                  }}
                />
              </Box>
            </Grid>
            <Grid item sm={6.5}>
              <Typography className="color-orange h-5 fw-bold">
                Business Name: {ele.businessName}
              </Typography>
              <Typography className="h-5  my-2">{ele?.title}</Typography>
              <Typography component="span" className="fw-bold me-2">
                ₹{ele?.salePrice}
              </Typography>
              <Typography
                component="span"
                className="h-5 text-decoration-line-through"
              >
                ₹ {ele?.mrp}
              </Typography>
              <div className="mt-3">
                <Typography
                  component="span"
                  className="h-5 fw-bold mx-2 cursor-pointer"
                  onClick={() => {
                    removeProduct(ele.id);
                  }}
                >
                  Remove
                </Typography>
                <Typography component="span" className="fw-bold h-5">
                  Edit
                </Typography>
              </div>
            </Grid>
            <Grid item container sm={3.5} className="ps-3 h-5">
              <Grid item sm={12} display="flex" justifyContent="end">
                <Typography className="h-5 text-end mb-1 fw-bold">
                  Delivery in 6-7 Days
                </Typography>
              </Grid>
              <Grid item sm={4} className="h-5">
                <Typography className="h-5">Order Type</Typography>
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                {getOrderType(ele.orderType)}
              </Grid>
              <Grid item sm={4}>
                <Typography className="h-5 ">Delivery Charge</Typography>
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                <span className={ele.deliveryCharge ? "" : "text-success"}>
                  {ele.deliveryCharge || "FREE"}
                </span>
              </Grid>
              <Grid item sm={4}>
                Return Charge
              </Grid>
              <Grid item sm={1} display="flex" justifyContent="center">
                :
              </Grid>
              <Grid item sm={7}>
                <span
                  className={
                    ele.returnCharge ? "fst-normal" : "text-success fst-normal"
                  }
                >
                  {ele.returnCharge || "FREE"}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="middle" light className="my-2" />
        </Box>
      );
    });
  };

  const getFinalPrice = () => {
    let salePrice = 0;
    let deliveryPrice = 0;
    let totalPrice = 0;
    let returnCharges = 0;
    products.map((ele) => {
      salePrice += parseInt(ele.salePrice, 10) * parseInt(ele.cartQty, 10);
      deliveryPrice += parseInt(ele.deliveryCharge, 10);
      returnCharges += parseInt(ele.returnCharge, 10);
      return null;
    });
    totalPrice = deliveryPrice + salePrice + returnCharges;
    return { salePrice, deliveryPrice, totalPrice, returnCharges };
  };

  const getSkeletonLoader = () => {
    const temp = [];
    for (let i = 0; i <= 10; i++) {
      temp.push(
        <Grid item container className="mx-2 py-1 mb-3 ">
          <Grid container item key={i} spacing={0}>
            <Grid item sm={2} className="">
              <Skeleton variant="rectangular" height={125} width={125} />
              <Box className="mt-2">
                <Skeleton width="50%" />
              </Box>
            </Grid>
            <Grid item sm={9}>
              <Skeleton width="100%" />
              <Skeleton width="90%" />
              <Skeleton width="100%" />
              <Skeleton width="90%" />
              <Skeleton width="100%" />
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return temp;
  };
  return (
    <Grid container>
      <Grid item sm={9}>
        <Paper className="w-100" ref={mainRef}>
          <Box className="bg-light-pink d-flex justify-content-between align-items-center p-2 w-100">
            <Typography className="h-5 text-secondary">My Cart</Typography>
            <ButtonComponent
              muiProps="p-0"
              label="Choose Address"
              onBtnClick={() => setShowChooseAddress(true)}
            />
          </Box>
          <Box className="mnh-79vh mxh-79vh overflow-auto hide-scrollbar">
            {products?.length ? (
              getCartList()
            ) : (
              <Grid container>{getSkeletonLoader()}</Grid>
            )}
          </Box>
        </Paper>
      </Grid>
      {products.length ? (
        <Grid item sm={3} className="">
          <Paper className="ms-2 p-2">
            <Typography className="text-secondary h-5 fw-bold">
              Price Details
            </Typography>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Price ({products.length} items)
              </Typography>
              <Typography className="h-5 fw-bold">
                {getFinalPrice().salePrice}
              </Typography>
            </Box>
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Delivery Charges
              </Typography>
              <Typography
                className={`${
                  getFinalPrice().deliveryPrice === 0 ? "text-success" : ""
                } h-5`}
              >
                {getFinalPrice().deliveryPrice || "FREE"}
              </Typography>
            </Box>
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Return Charges
              </Typography>
              <Typography
                className={`${
                  getFinalPrice().returnCharges === 0 ? "text-success" : ""
                } h-5`}
              >
                {getFinalPrice().returnCharges || "FREE"}
              </Typography>
            </Box>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center my-2">
              <Typography className="h-5 fw-bold">Total Payable</Typography>
              <Typography className="h-5 fw-bold">
                {getFinalPrice().totalPrice}
              </Typography>
            </Box>
            <Divider />
            <Typography className="text-success text-center h-5 my-2">
              Your Total Savings on this Order is 10000
            </Typography>
          </Paper>
          <Box className="mt-3 w-100 ps-2">
            <ButtonComponent label="Place Order" muiProps="w-100" />
          </Box>
          <ChooseAddress
            showModal={showChooseAddress}
            setShowModal={setShowChooseAddress}
          />
        </Grid>
      ) : (
        <Grid item sm={3} spacing={2} className="">
          <Paper className="ms-2 p-2">
            <Typography className="text-secondary h-5 fw-bold">
              Price Details
            </Typography>
            <Divider />
            <Box className="px-2">
              <Skeleton width="100%" />
              <Skeleton width="80%" className="my-2" />
              <Skeleton width="100%" />
              <Skeleton width="80%" className=" my-2 " />
              <Skeleton width="100%" className=" my-2 " />
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
export default Cart;
