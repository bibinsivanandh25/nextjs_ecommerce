import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getFeaturedProducts,
  getMostPopularProducts,
  getNewArrivalProducts,
  getBestSoldProducts,
} from "services/customer/Home";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const PopularDepartments = () => {
  const [products, setProducts] = useState([]);
  const [popularDepartments, setPopularDepartments] = useState("New Arrivals");
  const [filterType, setFilterType] = useState("WEEK");

  const storeDetails = useSelector((state) => state.customer);

  const setAllProducts = (data) => {
    const temp = [];
    data.forEach((ele) => {
      temp.push({
        id: ele.productId,
        title: ele.productTitle,
        price: ele.salePrice,
        salePriceWithLogistics: ele.salePriceWithLogistics,
        image: ele.variationMedia,
        rating: {
          rate: ele.averageRatings,
          count: ele.totalRatings,
        },
        isWishlisted: ele.wishlisted,
        skuId: ele.skuId,
        wishlistId: ele.wishlistId,
        userCartId: ele.userCartId,
        isCarted: ele.presentInCart,
        variationDetails: ele.variationDetails,
        subCategoryId: ele.subcategoryId,
      });
    });
    setProducts([...temp]);
  };

  const getProducts = async (filter) => {
    if (popularDepartments === "New Arrivals") {
      const payload = {
        filterType: filter ?? filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getNewArrivalProducts(payload);
      if (data) {
        setAllProducts(data);
      }
    }
    if (popularDepartments === "Most Popular") {
      const payload = {
        filterType: filter ?? filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getMostPopularProducts(payload);
      if (data) {
        setAllProducts(data);
      }
    }
    if (popularDepartments === "Best Seller") {
      const payload = {
        filterType: filter ?? filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getBestSoldProducts(payload);
      if (data) {
        setAllProducts(data);
      }
    }

    if (popularDepartments === "Featured") {
      const payload = {
        filterType: filter ?? filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getFeaturedProducts(payload);
      if (data) {
        setAllProducts(data);
      }
    }
  };

  useEffect(() => {
    setProducts([]);
    getProducts("WEEK");
    setFilterType("WEEK");
  }, [popularDepartments, storeDetails]);

  return (
    <Box>
      <Typography className="fw-bold text-center my-2">
        Popular Departments
      </Typography>
      <Box className="row">
        <Box className="col-3" />
        <Box className="col-5 d-flex justify-content-around  h-5 pb-1">
          <Card
            onClick={() => {
              if (popularDepartments !== "New Arrivals")
                setPopularDepartments("New Arrivals");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "New Arrivals"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            New Arrivals
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Best Seller")
                setPopularDepartments("Best Seller");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Best Seller"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            Best Seller
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Most Popular")
                setPopularDepartments("Most Popular");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Most Popular"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            Most Popular
          </Card>
          <Card
            onClick={() => {
              if (popularDepartments !== "Featured")
                setPopularDepartments("Featured");
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              popularDepartments === "Featured"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            Featured
          </Card>
        </Box>
        <Box className="col-4 d-flex justify-content-end pb-1">
          <Card
            className={`px-3 py-1 d-flex align-items-center text-center h-5 border cursor-pointer  ${
              filterType === "WEEK"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
            onClick={() => {
              if (filterType !== "WEEK") {
                setFilterType("WEEK");
                getProducts("WEEK");
              }
            }}
          >
            W
          </Card>
          <Card
            className={`px-3 py-1 d-flex align-items-center text-center h-5 border cursor-pointer mx-3 ${
              filterType === "MONTH"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
            onClick={() => {
              if (filterType !== "MONTH") {
                setFilterType("MONTH");
                getProducts("MONTH");
              }
            }}
          >
            M
          </Card>
        </Box>
      </Box>
      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar">
        {products?.length ? (
          products.map((ele) => {
            return (
              <ProductCard getProducts={getProducts} key={ele.id} item={ele} />
            );
          })
        ) : (
          <div
            className="w-100 mx-2"
            style={{
              height: "300px",
              position: "relative",
            }}
          >
            <Image
              src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/asset/sorry.png"
              height="250px"
              layout="fill"
            />
          </div>
        )}
      </Box>
    </Box>
  );
};
export default PopularDepartments;
