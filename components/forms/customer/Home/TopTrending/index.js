import { Box, Paper, Rating, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const TopTrending = () => {
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

  return (
    <Paper className="p-2 ">
      <Box className="mx-2 py-1 border-bottom">
        <Typography className="fw-600 fs-16">Top Trending</Typography>
      </Box>
      <Box className="mxh-400 mnh-400 overflow-y-scroll hide-scrollbar">
        {products.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box className="d-flex p-1" key={index}>
            <Box className="me-1">
              <Image
                src={item.image}
                layout="fixed"
                width={75}
                height={75}
                className="border rounded"
              />
            </Box>
            <Box className="ms-1">
              <Typography>{item.title}</Typography>
              <Rating value={item.rating.rate} readOnly />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
export default TopTrending;
