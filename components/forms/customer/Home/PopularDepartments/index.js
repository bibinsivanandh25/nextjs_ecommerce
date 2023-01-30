/* eslint-disable no-nested-ternary */
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getFeaturedProducts,
  getMostPopularProducts,
  getNewArrivalProducts,
  getBestSoldProducts,
} from "services/customer/Home";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { customerHome } from "public/assets";
import ProductCard from "./ProductCard";

const PopularDepartments = () => {
  const [products, setProducts] = useState([]);
  const [storeData, setStoreData] = useState({});
  const [filters, setFilters] = useState({
    popularDepartments: "New Arrivals",
    filterType: "WEEK",
  });
  const [isLoading, setIsLoading] = useState(false);
  const storeDetails = useSelector((state) => state.customer);

  useEffect(() => {
    if (JSON.stringify(storeDetails) !== JSON.stringify(storeData))
      setStoreData(storeDetails);
  }, [storeDetails]);

  // const setAllProducts = (data) => {
  //   const temp = [];
  //   data.forEach((ele) => {
  //     temp.push({
  //       id: ele.productId,
  //       title: ele.productTitle,
  //       price: ele.salePrice,
  //       salePriceWithLogistics: ele.salePriceWithLogistics,
  //       image: ele.variationMedia,
  //       rating: {
  //         rate: ele.averageRatings,
  //         count: ele.totalRatings,
  //       },
  //       isWishlisted: ele.wishlisted,
  //       skuId: ele.skuId,
  //       wishlistId: ele.wishlistId,
  //       userCartId: ele.userCartId,
  //       isCarted: ele.presentInCart,
  //       variationDetails: ele.variationDetails,
  //       subCategoryId: ele.subcategoryId,
  //     });
  //   });
  //   setProducts([...temp]);
  // };

  const getProducts = async () => {
    setIsLoading(true);
    if (filters.popularDepartments === "New Arrivals") {
      const payload = {
        filterType: filters.filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getNewArrivalProducts(payload);
      setIsLoading(false);
      return data;
    }
    if (filters.popularDepartments === "Most Popular") {
      const payload = {
        filterType: filters.filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getMostPopularProducts(payload);
      if (data) {
        setIsLoading(false);
        return data;
      }
    }
    if (filters.popularDepartments === "Best Seller") {
      const payload = {
        filterType: filters.filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getBestSoldProducts(payload);
      if (data) {
        setIsLoading(false);
        return data;
      }
    }

    if (filters.popularDepartments === "Featured") {
      const payload = {
        filterType: filters.filterType,
        supplierId: storeDetails?.supplierId,
        profileId: storeDetails?.profileId,
      };
      const { data } = await getFeaturedProducts(payload);
      if (data) {
        setIsLoading(false);
        return data;
      }
    }
    return [];
  };

  const { data, refetch } = useQuery(
    ["POPULARDEPARTMENTS"],
    () => getProducts(),
    {
      staleTime: 0,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    const temp = [];
    if (data)
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
  }, [data]);

  useEffect(() => {
    setProducts([]);
    setFilters({
      filterType: "WEEK",
      popularDepartments: "New Arrivals",
    });
  }, [storeData]);

  useEffect(() => {
    refetch();
  }, [filters]);

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
              setProducts([]);
              if (filters.popularDepartments !== "New Arrivals") {
                setFilters({
                  popularDepartments: "New Arrivals",
                  filterType: "WEEK",
                });
              }
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              filters.popularDepartments === "New Arrivals"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            New Arrivals
          </Card>
          <Card
            onClick={() => {
              setProducts([]);
              if (filters.popularDepartments !== "Best Seller") {
                setFilters({
                  popularDepartments: "Best Seller",
                  filterType: "WEEK",
                });
              }
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              filters.popularDepartments === "Best Seller"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            Best Seller
          </Card>
          <Card
            onClick={() => {
              setProducts([]);
              if (filters.popularDepartments !== "Most Popular") {
                setFilters({
                  popularDepartments: "Most Popular",
                  filterType: "WEEK",
                });
                setProducts([]);
              }
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              filters.popularDepartments === "Most Popular"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
          >
            Most Popular
          </Card>
          <Card
            onClick={() => {
              setProducts([]);
              if (filters.popularDepartments !== "Featured") {
                setFilters({
                  popularDepartments: "Featured",
                  filterType: "WEEK",
                });
                setProducts([]);
              }
            }}
            className={`px-3 py-1 border d-flex align-items-center text-center cursor-pointer ${
              filters.popularDepartments === "Featured"
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
              filters.filterType === "WEEK"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
            onClick={() => {
              setProducts([]);
              if (filters.filterType !== "WEEK") {
                setFilters({
                  ...filters,
                  filterType: "WEEK",
                });
                // refetch();
              }
            }}
          >
            W
          </Card>
          <Card
            className={`px-3 py-1 d-flex align-items-center text-center h-5 border cursor-pointer mx-3 ${
              filters.filterType === "MONTH"
                ? "theme_border_color theme_bg_color_1 fw-bold"
                : ""
            }`}
            onClick={() => {
              setProducts([]);
              if (filters.filterType !== "MONTH") {
                setFilters({
                  ...filters,
                  filterType: "MONTH",
                });
                // getProducts("MONTH");
              }
            }}
          >
            M
          </Card>
        </Box>
      </Box>
      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar py-3">
        {products?.length ? (
          products.map((ele) => {
            return <ProductCard key={ele.id} item={ele} />;
          })
        ) : !isLoading ? (
          <div
            className="w-100 mx-2"
            style={{
              height: "300px",
              position: "relative",
            }}
          >
            <Image src={customerHome.noProducts} height="250px" layout="fill" />
          </div>
        ) : (
          <Box className="d-flex">
            <Skeleton height={250} width={150} />
            <Skeleton height={250} width={150} className="mx-4" />
            <Skeleton height={250} width={150} />
            <Skeleton height={250} width={150} className="mx-4" />
            <Skeleton height={250} width={150} />
            <Skeleton height={250} width={150} className="mx-4" />
            <Skeleton height={250} width={150} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default PopularDepartments;
