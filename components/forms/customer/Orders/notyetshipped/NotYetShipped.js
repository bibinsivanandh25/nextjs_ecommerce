import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBoxComponent
      isChecked={checked}
      checkBoxClick={() => {
        setChecked(!checked);
      }}
      className="color-blue"
    />
  );
};

const NotYetShipped = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        // console.log(data.data);
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box>
      <Box>
        <Typography className="pb-2 fs-14" variantMapping={<p />}>
          <span className="fw-bold fs-16">2 Orders </span> in past 2 months
        </Typography>
      </Box>
      <ReusableBar>
        <ButtonComponent label="Cancel Order" variant="outlined" />
      </ReusableBar>
      {/* <Typography
        className="fw-bold lead ms-3 pb-3 fs-18"
        variantMapping={<p />}
      >
        Cancelled
      </Typography> */}
      {products.map((product) => {
        return (
          <Box className="ms-3 mt-4">
            <ReusableProduct product={product}>
              <CheckBox />
              <Typography className="mb-1">
                <small>Return window will close on 20 - Aug - 2021</small>
              </Typography>
              <ButtonComponent
                label="Buy it Again"
                variant="outlined"
                muiProps="fw-bold border border-secondary fs-12 bg-primary"
                borderColor="bg-light-gray"
                textColor="color-black"
              />
            </ReusableProduct>
          </Box>
        );
      })}
    </Box>
  );
};

export default NotYetShipped;
