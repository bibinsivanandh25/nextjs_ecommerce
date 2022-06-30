/* eslint-disable react/no-array-index-key */
import { Box, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlusMinusButtonComponent from "@/atoms/PlusMinusButtonComponent";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const getproducts = async () => {
    await axios
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
        <Box>
          <Grid container key={ind + 1}>
            <Grid item sm={2} className="ps-5">
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
  return <div>{getCartList()}</div>;
};
export default Cart;
