import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import CategoryCards from "@/atoms/CategoryCards";

const FlashDeals = () => {
  const [categories, setCategories] = useState([]);

  const getproducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products/categories")
      .then((data) => {
        // console.log(data.data);
        setCategories([...data.data, ...data.data, ...data.data, ...data.data]);
      })
      .catch(() => {
        // console.log(err);
      });
  };
  const route = useRouter();
  useEffect(() => {
    getproducts();
  }, []);
  const getProducts = () => {
    return categories.map((ele) => {
      return (
        <Paper
          className="mx-1"
          onClick={() => route.push("/customer/searchedproduct")}
        >
          <CategoryCards categoryTitle={ele} height={150} width={150} />
        </Paper>
      );
    });
  };
  return (
    <Box>
      <Typography className="fw-bold text-center">Flash Deals</Typography>
      <Box className="w-100 overflow-auto hide-scrollbar d-flex">
        {getProducts()}
      </Box>
    </Box>
  );
};
export default FlashDeals;
