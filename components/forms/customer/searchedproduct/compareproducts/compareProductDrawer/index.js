/* eslint-disable import/no-cycle */
import ButtonComponent from "@/atoms/ButtonComponent";
import CustomDrawer from "@/atoms/CustomDrawer";
import ImageCard from "@/atoms/ImageCard";
import ProductCard from "@/forms/customer/Home/PopularDepartments/ProductCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSimilarProducts } from "services/customer/similarproducts";
// import ProductCard from "../../Home/PopularDepartments/ProductCard";

function CompareProductDrawer({
  showDrawer = false,
  setShowDrawer = () => {},
  productId = null,
  subCategoryId = null,
  imgSrc = null,
}) {
  const [products, setProducts] = useState([]);
  const [showCompareProductsDrawer, setShowCompareProductsDrawer] =
    useState(false);
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

  useEffect(() => {
    if (productId && imgSrc && products?.length === 0) {
      const temp = [...products];
      temp[0] = {
        imgSrc,
        productId,
      };
      setProducts([...temp]);
    }
  }, [productId, imgSrc]);
  const { supplierId } = useSelector((state) => state?.customer);

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
    if (
      isIntersecting &&
      productDetails?.length !== productCount &&
      showCompareProductsDrawer
    ) {
      getProducts();
    }
  }, [isIntersecting, showCompareProductsDrawer]);

  const renderProductCards = () => {
    return products?.map((product) => {
      return (
        <Box className="">
          <ImageCard imgSrc={product?.imgSrc} height={130} width={130} />
        </Box>
      );
    });
  };

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
      position="left"
      title={
        <Typography className="h-5 fw-bold">
          Compare Products &nbsp;
          <Typography component="span" className="fst-normal h-5">
            ( {products?.length}{" "}
            {products?.length === 1 ? " Product" : "Products"} )
          </Typography>
        </Typography>
      }
      open={showDrawer}
      widthClass="mxw-230px"
      handleClose={() => {
        setShowDrawer(false);
      }}
    >
      <Box className="mnh-87vh d-flex flex-column align-items-center">
        <Box>{renderProductCards()}</Box>
        <Box
          className={
            products?.length === 5
              ? "d-none"
              : "d-flex flex-column align-items-center"
          }
        >
          <ImageCard
            showClose={false}
            height={130}
            width={130}
            preventChooseFile
            handleCardClick={() => {
              setShowCompareProductsDrawer(true);
            }}
          />
        </Box>
      </Box>
      <Box className="d-flex  justify-content-evenly mt-auto mx-2 mb-2">
        <ButtonComponent
          label="Clear All"
          muiProps="me-2 text-muted"
          variant="outlined"
        />
        <ButtonComponent label="Start Compare" muiProps="p-0 h-5" />
      </Box>
      <CustomDrawer
        position="right"
        title="Similar Products"
        open={showCompareProductsDrawer}
        widthClass="mnw-450"
        handleClose={() => {
          setShowCompareProductsDrawer(false);
          setProductDetails([]);
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
              : "d-flex justify-content-center mx-auto"
          }
        >
          <CircularProgress className=" color-orange" />
        </div>
      </CustomDrawer>
    </CustomDrawer>
  );
}

export default CompareProductDrawer;
