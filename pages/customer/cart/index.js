/* eslint-disable react/no-array-index-key */
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import PlusMinusButtonComponent from "@/atoms/PlusMinusButtonComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ChooseAddress from "@/forms/customer/address/ChooseAddress";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showChooseAddress, setShowChooseAddress] = useState(false);

  const getproducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);

  const getCartList = () => {
    return products.map((ele, ind) => {
      return (
        <Box className="mx-2 py-1">
          <Grid container key={ind + 1}>
            <Grid item sm={2} className="">
              <Image src={ele.image} height={85} width={85} />
              <Box className="mt-2">
                <PlusMinusButtonComponent
                  className="fs-5"
                  countClassName="px-3"
                />
              </Box>
            </Grid>
            <Grid item sm={7}>
              <Typography className="color-orange">
                Supplier Name: Business Name
              </Typography>
              <Typography className="h-5  my-2">{ele.title}</Typography>
              <Typography component="span" className="fw-bold me-2">
                ₹{ele.price}
              </Typography>
              <Typography
                component="span"
                className="h-5 text-decoration-line-through"
              >
                ₹ {ele.price * 4}
              </Typography>
              <div className="mt-3">
                <Typography
                  component="span"
                  className="h-5 fw-bold mx-2 cursor-pointer"
                  onClick={() => {
                    const temp = [...products];
                    temp.splice(ind, 1);
                    setProducts([...temp]);
                  }}
                >
                  Remove
                </Typography>
                <Typography component="span" className="fw-bold h-5">
                  Edit
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} justifyContent="flex-end" className="ps-3">
              <Typography className="h-5 text-end mb-3 fw-bold">
                Delivery in 6-7 Days
              </Typography>
              <Typography className="h-5 fw-bold">
                Order Type : Free Delivery & Return
              </Typography>
              <Typography className="h-5 fw-bold">
                Delivery Charge : Free{" "}
              </Typography>
              <Typography className="h-5 fw-bold">
                Return Charge : Free
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" light className="my-2" />
        </Box>
      );
    });
  };

  const getTotalPrice = () => {
    let temp = 0;
    products.map((ele) => {
      temp += parseInt(ele.price, 10);
      return null;
    });
    return temp;
  };
  return (
    <Grid container>
      <Grid item sm={9}>
        <Paper className="w-100">
          <Box className="bg-light-pink d-flex justify-content-between align-items-center p-2">
            <Typography className="h-5 text-secondary">My Cart</Typography>
            <ButtonComponent
              muiProps="p-0"
              label="Choose Address"
              onBtnClick={() => setShowChooseAddress(true)}
            />
          </Box>
          {getCartList()}
        </Paper>
      </Grid>
      {products.length ? (
        <Grid item sm={3}>
          <Paper className="ms-2 p-2">
            <Typography className="text-secondary h-5 fw-bold">
              Price Details
            </Typography>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Price ({products.length} items)
              </Typography>
              <Typography className="h-5 fw-bold">{getTotalPrice()}</Typography>
            </Box>
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Delivery Charges
              </Typography>
              <Typography className="text-success h-5">Free</Typography>
            </Box>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center my-2">
              <Typography className="h-5 fw-bold">Total Payable</Typography>
              <Typography className="h-5 fw-bold">{getTotalPrice()}</Typography>
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
      ) : null}
    </Grid>
  );
};
export default Cart;
