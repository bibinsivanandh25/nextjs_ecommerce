import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import serviceUtil from "services/utils";
import CategoryCards from "@/atoms/CategoryCards";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const getproducts = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products/categories")
      .then((data) => {
        console.log(data.data);
        setCategories([...data.data, ...data.data, ...data.data, ...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);
  const route = useRouter();
  const getProducts = () => {
    return categories.map((ele) => {
      return (
        <Box
          className="mx-1"
          onClick={() => {
            route.push("/customer/searchedproduct");
          }}
        >
          <CategoryCards categoryTitle={ele} height={150} width={150} />
        </Box>
      );
    });
  };
  return (
    <Box>
      <Typography className="fw-bold text-center">
        Top Categories of the Month
      </Typography>
      <Box className="w-100 overflow-auto hide-scrollbar d-flex">
        {getProducts()}
      </Box>
    </Box>
  );
};
export default TopCategories;
