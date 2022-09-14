import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";

const ReturnedOrders = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        // // console.log(data.data);
        setProducts([...data.data]);
      })
      .catch(() => {
        // console.log(err);
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
      <ReusableBar ordersplaced="Return Orders" />
      <Typography
        className="fw-bold lead ms-3 pb-3 fs-18"
        variantMapping={<p />}
      >
        Returned Products
      </Typography>
      {products.map((product) => {
        return (
          <Box key={product.id} className="ms-3 mt-4">
            <ReusableProduct product={product} />
          </Box>
        );
      })}
    </Box>
  );
};

export default ReturnedOrders;
