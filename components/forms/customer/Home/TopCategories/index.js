import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryCards from "@/atoms/CategoryCards";
import { getTopCategoriesOfMonth } from "services/customer/Home";
import { useSelector } from "react-redux";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const storeDetails = useSelector((state) => state.customer);

  const getCategories = async () => {
    const { data } = await getTopCategoriesOfMonth(storeDetails?.supplierId);
    if (data) {
      setCategories(
        data?.map((ele) => ({
          id: ele.mainCategoryId,
          categoryTitle: ele.mainCategoryName,
          image: ele.categoryImageUrl,
        }))
      );
    }
  };
  useEffect(() => {
    getCategories();
  }, [storeDetails]);

  const route = useRouter();
  const renderCategories = () => {
    return categories.map((ele) => {
      return (
        <Box
          className="mx-1"
          key={ele.id}
          onClick={() => {
            route.push("/customer/searchedproduct");
          }}
        >
          <CategoryCards
            categoryTitle={ele.categoryTitle}
            src={ele.image}
            height={150}
            width={150}
          />
        </Box>
      );
    });
  };
  return (
    <Box className={categories?.length ? "" : "d-none"}>
      <Typography className="fw-bold text-center">
        Top Categories of the Month
      </Typography>
      <Box className="w-100 overflow-auto hide-scrollbar d-flex">
        {renderCategories()}
      </Box>
    </Box>
  );
};
export default TopCategories;
