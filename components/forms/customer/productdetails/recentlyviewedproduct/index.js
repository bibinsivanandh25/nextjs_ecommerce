import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecentlyViewedProducts } from "services/customer/Home";
import { useSelector } from "react-redux";
import ProductListCard from "../productlistcard";

const RecentlyViewedProduct = ({ scrollPage = () => {}, showActions }) => {
  const [products, setProducts] = useState([]);
  const storeDetails = useSelector((state) => state?.customer);

  const getRecentViewedProducts = async () => {
    const payload = {
      customerId: storeDetails.userId,
      profileId: storeDetails.profileId,
      supplierStoreCode: storeDetails.storeCode,
    };
    const { data } = await getRecentlyViewedProducts(payload);
    if (data) {
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
        });
      });
      setProducts([...temp]);
    }
  };
  useEffect(() => {
    if (storeDetails) {
      getRecentViewedProducts();
    }
  }, [storeDetails]);

  return (
    <Box className={products?.length ? "" : "d-none"}>
      <Typography className="fw-bold mt-2">
        Your Recently Viewed Products
      </Typography>
      <Box className="d-flex w-100 overflow-auto py-2 hide-scrollbar">
        {products ? (
          products?.map((ele) => {
            return (
              <ProductListCard
                item={ele}
                getProducts={getRecentViewedProducts}
                scrollPage={scrollPage}
                showActions={showActions}
              />
            );
          })
        ) : (
          <Skeleton variant="rectangular" width={150} height={150} />
        )}
      </Box>
    </Box>
  );
};
export default RecentlyViewedProduct;
