/* eslint-disable import/no-cycle */
import CustomDrawer from "@/atoms/CustomDrawer";
import { CircularProgress, Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSimilarProducts } from "services/customer/similarproducts";
import ProductCard from "../../Home/PopularDepartments/ProductCard";

function SimilarProducts({
  showDrawer = false,
  setShowDrawer = () => {},
  productId = null,
  subCategoryId = null,
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [productCount, setProductCount] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [isIntersecting, setIntersecting] = useState(true);

  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  });

  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [footerRef.current]);

  const mapProductDetails = (data) => {
    const temp = [];
    data.forEach((ele) => {
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
        skuId: ele.skuId,
        wishlistId: ele.wishlistId,
        userCartId: ele.userCartId,
        isCarted: ele.presentInCart,
        subCategoryId: ele.subcategoryId,
      });
    });
    return temp;
  };

  const { supplierId } = useSelector((state) => state?.customer);
  const getProducts = async (page = pageNumber ?? 0) => {
    const payload = {
      productVariationId: productId,
      supplierId,
      subCategoryId,
      pageNumber: page,
      pageSize: 16,
    };
    const { data, err } = await getSimilarProducts(payload);
    if (data) {
      setProductCount(data.count ?? 0);
      if (page === 0) {
        setProductDetails(mapProductDetails(data?.productDetails || []));
        setPageNumber(1);
      } else {
        setPageNumber(pageNumber + 1);
        setProductDetails([
          ...productDetails,
          ...mapProductDetails(data?.productDetails || []),
        ]);
      }
    } else if (err) {
      setPageNumber(0);
    }
  };

  useEffect(() => {
    if (isIntersecting && productDetails?.length !== productCount)
      getProducts();
  }, [isIntersecting]);

  const renderProductDetails = () => {
    return productDetails?.map((ele) => {
      return (
        <Grid item sm={6} key={ele.id}>
          <ProductCard item={ele} showActionList={false} />
        </Grid>
      );
    });
  };

  return (
    <CustomDrawer
      position="right"
      title="Similar Products"
      open={showDrawer}
      widthClass="mnw-450"
      handleClose={() => {
        setShowDrawer(false);
      }}
    >
      <Grid
        container
        spacing={2}
        className="mx-auto ms-0 mt-2"
        sx={{
          width: `calc(100% - 10px)`,
        }}
      >
        {renderProductDetails()}
      </Grid>
      <div
        ref={footerRef}
        className={
          Boolean(productDetails?.length) && productCount !== 0
            ? "invisible"
            : ""
        }
      >
        <CircularProgress className="d-flex justify-content-center color-orange" />
      </div>
    </CustomDrawer>
  );
}

export default SimilarProducts;
