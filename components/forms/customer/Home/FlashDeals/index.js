import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryCards from "@/atoms/CategoryCards";

const FlashDeals = () => {
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);

  const route = useRouter();
  useEffect(() => {
    // getproducts();
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
    <Box className={categories?.length ? "" : "d-none"}>
      <Typography className="fw-bold text-center">Flash Deals</Typography>
      <Box className="w-100 overflow-auto hide-scrollbar d-flex">
        {getProducts()}
      </Box>
    </Box>
  );
};
export default FlashDeals;
