import { Box, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { similarProductsData } from "services/customer/productdetails";
import { useSelector } from "react-redux";
import ProductListCard from "../productlistcard";

const SimilarProducts = ({
  subCategoryId = "",
  scrollPage = () => {},
  userData = {},
  showActions,
}) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [showPage, setShowPage] = useState(true);

  const [isIntersecting, setIntersecting] = useState(true);
  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  });
  const storeDetails = useSelector((state) => state?.customer);

  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);
  const getRecentViewedProducts = async (page = pageNumber) => {
    const payload = {
      productVariationId: storeDetails.productId,
      supplierId: storeDetails.supplierId,
      subCategoryId,
      pageNumber: page,
      pageSize: 20,
      profileId: userData.profileId,
      //   productVariationId: "62fa5a03e5d1f7265bb58cd6",
      //   supplierId: "SP0822000040",
      //   subCategoryId: "62f91040e5d1f7265bb58caf",
      //   pageNumber: page,
      //   pageSize: 16,
    };
    const { data, err } = await similarProductsData(payload);
    if (data) {
      const temp = [];
      if (page === 0 && data?.productDetails?.length) {
        data.productDetails.forEach((ele) => {
          temp.push({
            id: ele.productVariationId,
            title: ele.productTitle,
            price: ele.salePrice,
            salePriceWithLogistics: ele.salePriceWithLogistics,
            image: ele.variationMedia,
            rating: {
              rate: ele.averageRatings,
              count: ele.totalRatings,
            },
            isWishlisted: ele.inWishList,
            skuId: ele.skuId,
            wishlistId: ele.wishListId,
            userCartId: ele.userCartId,
            isCarted: ele.inCarted,
            variationDetails: ele.variationDetails,
          });
        });
        setProducts([...temp]);
        setPageNumber(1);
        setShowPage(true);
      } else if (page !== 0 && data?.productDetails.length) {
        data.productDetails.forEach((ele) => {
          temp.push({
            id: ele.productVariationId,
            title: ele.productTitle,
            price: ele.salePrice,
            salePriceWithLogistics: ele.salePriceWithLogistics,
            image: ele.variationMedia,
            rating: {
              rate: ele.averageRatings,
              count: ele.totalRatings,
            },
            isWishlisted: ele.inWishList,
            skuId: ele.skuId,
            wishlistId: ele.wishlistId,
            userCartId: ele.userCartId,
            isCarted: ele.presentInCart,
            variationDetails: ele.variationDetails,
          });
        });
        setProducts((pre) => [...pre, ...temp]);
        setPageNumber((pre) => pre + 1);
      } else if (page == 0 && data?.productDetails?.length === 0) {
        setShowPage(false);
      }
    } else if (err) {
      setShowPage(false);
    }
  };
  useEffect(() => {
    if (storeDetails && subCategoryId && isIntersecting) {
      getRecentViewedProducts();
    }
  }, [storeDetails, subCategoryId, isIntersecting]);

  return (
    <>
      {showPage ? (
        <Box>
          <Typography className="fw-bold mt-2">Similar Products</Typography>
          <Box className="d-flex w-100 overflow-auto py-2 hide-scrollbar">
            {products?.map((ele) => {
              return (
                <ProductListCard
                  showActions={showActions}
                  item={ele}
                  getProducts={() => {
                    setPageNumber(0);
                    getRecentViewedProducts(0);
                  }}
                  scrollPage={scrollPage}
                />
              );
            })}
            {products.length > 19 ? (
              <div ref={footerRef} style={{ visibility: "hidden" }}>
                footerRef
              </div>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </>
  );
};
export default SimilarProducts;
