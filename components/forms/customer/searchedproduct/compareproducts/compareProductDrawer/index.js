/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import ButtonComponent from "@/atoms/ButtonComponent";
import CustomDrawer from "@/atoms/CustomDrawer";
import ImageCard from "@/atoms/ImageCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getCompareProductDetails } from "services/customer/compareProducts";
import { getSimilarProducts } from "services/customer/similarproducts";
import toastify from "services/utils/toastUtils";
import CompareProductCard from "../compareProductCard";
import CompareProductDetails from "../compareproductmodal";
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
  const [loading, setLoading] = useState(false);
  const [showCompareProductsModal, setShowCompareProductsModal] =
    useState(false);
  const [compareProductData, setCompareProductData] = useState([]);

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

  const startCompareProducts = async () => {
    const payload = {
      productVariationIds: products.map((e) => e.productId),
    };
    const { data } = await getCompareProductDetails(payload);
    if (data) {
      setCompareProductData(data);
      setShowCompareProductsModal(true);
    }
  };

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
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    console.log(loading, "loadinf");
  }, [loading]);

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
    return products?.map((product, ind) => {
      return (
        <Box className="">
          <ImageCard
            imgSrc={product?.imgSrc}
            showClose={ind !== 0}
            height={150}
            width={150}
            handleCloseClick={() => {
              const temp = [...products];
              temp.splice(ind, 1);
              setProducts([...temp]);
            }}
          />
        </Box>
      );
    });
  };

  const renderProductDetails = () => {
    return productDetails?.map((ele) => {
      return (
        <Grid item sm={6} key={ele.id}>
          <CompareProductCard
            item={ele}
            showActionList={false}
            handleCardClick={(item) => {
              const temp = [...products];
              if (temp.length <= 4) {
                temp.push({
                  imgSrc: item.image,
                  productId: item.id,
                });
                setProducts([...temp]);
              } else {
                toastify("You can compare up to five products.", "info");
              }
            }}
            removeProductFromList={(id) => {
              let temp = [...products];
              temp = temp.filter((e) => e.productId !== id);
              setProducts([...temp]);
            }}
          />
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
      <Box className="mnh-87vh mxh-87vh overflow-scroll d-flex flex-column align-items-center">
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
            height={150}
            width={150}
            preventChooseFile
            handleCardClick={() => {
              setShowCompareProductsDrawer(true);
              let tempProducts = [...products];
              tempProducts = tempProducts.slice(1).map((e) => e.productId);
              const tempProductDetails = [...productDetails];
              tempProductDetails.forEach((i) => {
                if (tempProducts?.includes(i?.id)) {
                  i.isSelected = true;
                } else {
                  i.isSelected = false;
                }
              });
              setProductDetails([...tempProductDetails]);
            }}
          />
        </Box>
      </Box>
      {products?.length > 1 ? (
        <Box className="d-flex my-2  justify-content-evenly mt-auto mx-2 mb-2">
          <ButtonComponent
            label="Clear All"
            muiProps="me-2 text-muted"
            variant="outlined"
            onBtnClick={() => {
              const temp = [products[0]];
              setProducts([...temp]);
            }}
          />
          <ButtonComponent
            label="Start Compare"
            muiProps="p-0 h-5"
            onBtnClick={() => {
              startCompareProducts();
            }}
          />
        </Box>
      ) : null}

      <CustomDrawer
        position="right"
        titleClassName="h-5 fw-bold"
        title={`${
          products.length === 1
            ? "Choose Products to Compare"
            : `${products.length - 1} products selected`
        }`}
        open={showCompareProductsDrawer}
        widthClass="mnw-450"
        handleClose={() => {
          setShowCompareProductsDrawer(false);
          setPageNumber(0);
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
            Boolean(productDetails?.length) && productCount !== 0 && !loading
              ? "invisible"
              : "d-flex justify-content-center mx-auto align-items-center mnh-79vh"
          }
        >
          <CircularProgress className="color-orange" />
        </div>
      </CustomDrawer>
      {showCompareProductsModal ? (
        <CompareProductDetails
          showModal={showCompareProductsModal}
          setShowModal={setShowCompareProductsModal}
          productDetails={compareProductData}
        />
      ) : null}
    </CustomDrawer>
  );
}

export default CompareProductDrawer;
