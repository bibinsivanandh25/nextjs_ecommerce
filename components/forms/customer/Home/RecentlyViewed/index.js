/* eslint-disable import/no-named-as-default */
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecentlyViewedProducts } from "services/customer/Home";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import ProductCard from "../PopularDepartments/ProductCard";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const userInfo = useSession();
  const storeDetails = useSelector((state) => state?.customer);

  const getRecentViewedProducts = async () => {
    const payload = {
      customerId: storeDetails.userId,
      profileId: storeDetails.profileId,
      supplierStoreCode: storeDetails.storeCode,
    };
    const { data } = await getRecentlyViewedProducts(payload);
    if (data) {
      return data;
    }
    return [];
  };

  const { data, refetch } = useQuery(
    ["RECENTLYVIEWED"],
    getRecentViewedProducts,
    {
      enabled: Boolean(userInfo?.data && storeDetails),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const temp = [];
    if (data) {
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
          subCategoryId: ele.subCategoryId,
          isCarted: ele.presentInCart,
          flagImageUrl: ele.flagImageUrl,
          flaged: ele.flaged,
          visibilityPlace: ele.visibilityPlace,
          variationDetails: ele.variationDetails,
        });
      });
    }
    setProducts([...temp]);
  }, [data]);

  useEffect(() => {
    if (userInfo?.data && storeDetails) {
      refetch();
    }
  }, [userInfo, storeDetails]);

  return (
    <Box className={products?.length ? "" : "d-none"}>
      <Typography className="fw-bold text-center my-2">
        Your Recently Viewed Products
      </Typography>

      <Box className="d-flex w-100 overflow-auto mt-2 hide-scrollbar py-3">
        {products ? (
          products?.map((ele) => {
            return <ProductCard item={ele} />;
          })
        ) : (
          <Skeleton variant="rectangular" width={150} height={150} />
        )}
      </Box>
    </Box>
  );
};
export default RecentlyViewed;
