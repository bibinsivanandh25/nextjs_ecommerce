/* eslint-disable no-param-reassign */
import CarousalComponent from "@/atoms/Carousel";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsByMarketingTool } from "services/customer/couponapplicableproducts";

const TODAYSDEAL = forwardRef(({ purchaseId, searchText = "" }, ref = null) => {
  const [bannerImages, setbannerImages] = useState([]);
  const [productdetails, setProductDetails] = useState([]);
  const { profileId } = useSelector((state) => state.customer);

  const getProducts = async (keyword) => {
    const payload = {
      purchaseId,
      profileId,
      keyword: keyword ?? searchText ?? "",
    };
    const { data } = await getProductsByMarketingTool(payload);
    if (data) {
      const temp = [];
      setbannerImages([
        {
          src: data.bannerImageUrlForWeb,
          navigateUrl: "",
        },
      ]);
      data.marketingTool.forEach((ele) => {
        temp.push({
          campaignName: ele.campaignTitle,
          products: ele.productResponse.map((item) => ({
            id: item.productId,
            title: item.productTitle,
            price: item.salePrice,
            salePriceWithLogistics: item.salePriceWithLogistics,
            image: item.variationMedia,
            rating: {
              rate: item.averageRatings,
              count: item.totalRatings,
            },
            isWishlisted: item.wishlisted,
            skuId: item.skuId,
            wishlistId: item.wishlistId,
            userCartId: item.userCartId,
            isCarted: item.presentInCart,
          })),
        });
      });
      setProductDetails([...temp]);
    }
  };

  const renderProducts = () => {
    return productdetails?.map((ele) => {
      return (
        <Box className="mt-4">
          <Typography className="fw-bold ms-2">
            <span className="fw-500 h-4 color-orange"> Campaign Title</span> :{" "}
            {ele.campaignName}
          </Typography>
          <Box className="d-flex w-100 overflow-auto  hide-scrollbar py-3">
            {ele?.products?.map((product) => {
              return (
                <ProductCard
                  item={product}
                  cardPaperClass="container-shadow-sm"
                />
              );
            })}
          </Box>
        </Box>
      );
    });
  };
  //   console.log(productdetails, bannerImages);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    ref.current.getProducts = getProducts;
  }, [ref]);

  return (
    <>
      <Box
        className="rounded shadow overflow-hidden"
        style={{
          maxHeight: "30vh",
          minHeight: "30vh",
          overflow: "hidden",
        }}
      >
        {Boolean(bannerImages.length) && (
          <CarousalComponent
            list={[...bannerImages]}
            autoPlay
            stopOnHover={false}
            carouselImageMaxHeight="30vh"
            carouselImageMinHeight="30vh"
          />
        )}
      </Box>
      <Box className="mnh-79vh oveflow-auto hide-scrollbar">
        {renderProducts()}
      </Box>
    </>
  );
});

export default TODAYSDEAL;
