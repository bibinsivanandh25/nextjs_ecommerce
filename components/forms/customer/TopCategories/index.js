import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const getproducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products/categories")
      .then((data) => {
        console.log(data.data);
        setCategories([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);
  const getProducts = () => {
    // return categories.map(ele=>{
    //     <cate
    // })
  };
  return (
    <Box>
      <Typography className="fw-bold text-center">
        Top Categories of the Month
      </Typography>
      {getProducts()}
    </Box>
  );
};
export default TopCategories;
