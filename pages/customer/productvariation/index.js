/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useRef, useState, useMemo } from "react";
import CustomIcon from "services/iconUtils";
import { makeStyles } from "@mui/styles";
import MenuWithCheckbox from "@/atoms/MenuWithCheckbox";
import { useRouter } from "next/router";
import { getProductsUnderCategoryOrSubCategory } from "services/customer/productVariation";
import { useSelector } from "react-redux";
import ProductDetailsCard from "@/forms/customer/searchedproduct/CustomerProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const useStyles = makeStyles(() => ({
  selected: {
    "& .Mui-selected": {
      color: "#fff",
      background: "#E56700 !important",
      // border: "1px solid #E56700",
    },
    // "& .css-1bu9iio-MuiButtonBase-root-MuiPaginationItem-root .Mui-selected": {
    // },
  },
}));

function SearchedProduct({ showBreadCrumb = () => {} }) {
  const classes = useStyles();
  showBreadCrumb(false);
  // checkbox data
  const [checkedValue, setCheckedValue] = useState([]);
  const [searchedCheckValue, setSearchedCheckValue] = useState([]);
  const [viewIconClick, setViewIconClick] = useState(false);
  const [productData, setProductData] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  // comparProduct
  const [totalProductCount, setTotalProductCount] = useState(null);

  const mainRef = useRef(null);
  useEffect(() => {
    mainRef.current.scrollIntoView();
  }, [mainRef]);

  // pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const route = useRouter();

  const dataPerPage = 40;

  useEffect(() => {
    setPageCount(Math.ceil(totalProductCount / dataPerPage));
  }, [totalProductCount]);

  const { profileId, supplierId } = useSelector((state) => state.customer);

  const getProducts = async (
    mainCategoryId,
    subCatId,
    pageNumber = page - 1 || 0
  ) => {
    const payload = {
      mainCategoryId,
      subCategoryId: subCatId,
      profileId,
      supplierId,
      eStatus: "APPROVED",
      pageNumber,
      pageSize: dataPerPage,
    };
    const { data } = await getProductsUnderCategoryOrSubCategory(payload);
    if (data) {
      const result = [];
      setTotalProductCount(data?.count);
      data?.customerProductResponses?.forEach((ele) => {
        result.push({
          title: ele.productName,
          description: ele.shortDescription,
          actualCost: ele.salePrice,
          freeDeliveryCost: ele.freeDelivary,
          mrp: ele.mrp,
          actualCostOff: ele.percentageOfActualCost,
          freeDeliveryCostOff: ele.percentageOfFreeDelivary,
          viewCount: ele.noOfViews,
          orderCount: ele.noOfOrdered,
          flagDetails: ele.supplierFlag,
          wishListId: ele.wishListId,
          wishListed: ele.inWishList,
          skuId: ele.skuId,
          carted: ele.inCarted,
          images: ele.productImages
            ? ele.productImages?.map((img, ind) => ({
                src: img,
                altText: `slide${ind + 1}`,
              }))
            : [],
          id: ele.productId,
          variationDetails: ele.variationProperty,
          subCategoryId: ele.subCategoryId,
        });
      });
      setProductData(result);
    }
  };

  useMemo(() => {
    if (categoryId?.length || subCategoryId?.length)
      getProducts(categoryId, subCategoryId, page - 1);
  }, [page]);

  useEffect(() => {
    Object.entries(route?.query).forEach(([key, value]) => {
      if (key === "categoryId") {
        getProducts(value, "");
        setCategoryId(value);
      }
      if (key === "subCategoryId") {
        getProducts("", value);
        setSubCategoryId(value);
      }
    });
  }, [route]);

  // old codes and functions
  // useEffect(() => {
  //   if (viewIconClick) {
  //     const productDataCopy = [...productData];
  //     const finalData = productDataCopy.slice((page - 1) * 6, page * 6);
  //     setProductData(finalData);
  //   } else {
  //     const productDataCopy = [...productData];
  //     const finalData = productDataCopy.slice((page - 1) * 5, page * 5);
  //     setProductData(finalData);
  //   }
  // }, [page]);
  // // useEffect(() => {
  // //   if (viewIconClick) {
  // //     // rowView
  // //     setPage(1);
  // //     const productDataCopys = [...productData];
  // //     const finalDatas = productDataCopys.slice((page - 1) * 6, page * 6);
  // //     setProductData(finalDatas);
  // //     const len = Math.ceil(productDataCopys.length / 6);
  // //     setPageCount(len);
  // //   } else {
  // //     // GridView
  // //     setPage(1);
  // //     const productDataCopys = [...productData];
  // //     const finalDatas = productDataCopys.slice((page - 1) * 5, page * 5);
  // //     setProductData(finalDatas);
  // //     const len = Math.ceil(productDataCopys.length / 5);
  // //     setPageCount(len);
  // //   }
  // // }, [viewIconClick]);

  // useEffect(() => {
  //   setCheckedValue(listDatas);
  //   setSearchedCheckValue(searchlListData);
  //   if (viewIconClick) {
  //     // rowView
  //     const productDataCopy = [...productData];
  //     const finalData = productDataCopy.slice((page - 1) * 6, page * 6);
  //     setProductData(finalData);
  //     const len = Math.ceil(productDataCopy.length / 6);
  //     setPageCount(len);
  //   } else {
  //     // GridView
  //     const productDataCopy = [...productData];
  //     const finalData = productDataCopy.slice((page - 1) * 5, page * 5);
  //     setProductData(finalData);
  //     const len = Math.ceil(productDataCopy.length / 5);
  //     setPageCount(len);
  //   }
  // }, []);

  // filter checkbox click
  const handleCheckboxsClick = (id, value, title) => {
    const masterData = [...checkedValue];
    masterData.forEach((val) => {
      if (val.title === title) {
        // eslint-disable-next-line array-callback-return
        val.datas.map((item) => {
          if (item.id == id) {
            // eslint-disable-next-line no-param-reassign
            item.isChecked = !item.isChecked;
          }
        });
      }
    });
    setCheckedValue(masterData);
  };
  const handleSearchFilterClick = (id, value, title) => {
    const masterData = [...searchedCheckValue];
    masterData.forEach((val) => {
      if (val.title === title) {
        // eslint-disable-next-line array-callback-return
        val.datas.map((item) => {
          if (item.id == id) {
            // eslint-disable-next-line no-param-reassign
            item.isChecked = !item.isChecked;
          }
        });
      }
    });
    setSearchedCheckValue(masterData);
  };

  const handlePreviousbtnClick = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const handleNextbtnClick = () => {
    setPage((prev) => (prev < pageCount ? prev + 1 : prev));
  };

  return (
    <Box className="mnh-79vh" ref={mainRef}>
      <Box className="row w-100">
        <Box className="d-flex justify-content-end mt-1">
          <Box
            className="d-flex px-1 rounded me-2"
            style={{ border: "1px solid #707070" }}
          >
            <Box
              className={
                viewIconClick
                  ? " align-self-center bg-dark-gray p-1 rounded cursor-pointer"
                  : " align-self-center p-1 rounded cursor-pointer"
              }
              onClick={() => {
                setViewIconClick(true);
              }}
            >
              <CustomIcon
                title=""
                type="tablerows"
                className="fs-20 w-30 cursor-pointer"
                showColorOnHover={false}
                color={viewIconClick ? "color-white" : "color-dark-gray"}
              />
            </Box>
            <Box
              className={
                viewIconClick
                  ? " align-self-center p-1 rounded cursor-pointer"
                  : " align-self-center bg-dark-gray p-1 rounded cursor-pointer"
              }
              onClick={() => {
                setViewIconClick(false);
              }}
            >
              <CustomIcon
                title=""
                type="gridview"
                className="fs-20 w-30 cursor-pointer"
                showColorOnHover={false}
                color={viewIconClick ? "color-dark-gray" : "color-white"}
              />
            </Box>
          </Box>
          <Box>
            <MenuWithCheckbox
              btnText="Sort by"
              listData={checkedValue}
              handleCheckboxClick={(id, value, title) => {
                handleCheckboxsClick(id, value, title);
              }}
              btnClassName="mx-2"
            />
          </Box>
          <Box className="me-2">
            <MenuWithCheckbox
              btnText="Filters"
              listData={searchedCheckValue}
              handleCheckboxClick={(id, value, title) => {
                handleSearchFilterClick(id, value, title);
              }}
              btnClassName="mx-2"
            />
          </Box>
        </Box>
        {/* <Box className="d-flex justify-content-end mt-3">
          <p className="text-danger fs-14 me-4">
            {" "}
            Offer ends in 09h 42min 2sec
          </p>
        </Box> */}
        <Box className="mt-2">
          <Box className="d-flex">
            <Grid
              container={!viewIconClick}
              spacing={2}
              className="ms-0"
              sx={{
                width: `calc(100% - 10px)`,
              }}
            >
              {productData.map((item, index) => (
                <Grid item md={4} lg={3} sm={6} key={index}>
                  <ProductDetailsCard
                    productDetail={item}
                    viewType={viewIconClick ? "row" : "Grid"}
                    getProducts={() => {
                      getProducts(categoryId, subCategoryId, 0);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {productData?.length ? (
            <Box className="d-flex justify-content-center align-items-center mt-3 mb-2">
              <ChevronLeftIcon
                className={page <= 1 ? "text-muted" : "text-black"}
                onClick={() => {
                  handlePreviousbtnClick();
                }}
              />
              {/* <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                className={`py-0 align-self-center fs-12 me-2 ${
                  page <= 1 ? `` : `border-black text-black`
                }`}
                disabled={page <= 1 ? true : false}
                onClick={() => {
                  handlePreviousbtnClick();
                }}
              ></Button> */}
              <Pagination
                classes={{ root: classes.selected }}
                count={Math.ceil(totalProductCount / dataPerPage)}
                // variant="outlined"
                // shape="rounded"
                onChange={(e, pagenumber) => {
                  setPage(pagenumber);
                }}
                page={page}
                hideNextButton
                hidePrevButton
              />
              <ChevronRightIcon
                fontSize="30"
                onClick={() => {
                  handleNextbtnClick();
                }}
                className={page < pageCount ? "text-black" : "text-muted"}
              />
              {/* <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                className={`py-0 align-self-center ms-2 fs-12 ${
                  page < pageCount ? `border-black text-black` : ``
                }`}
                disabled={page < pageCount ? false : true}
              >
                Next
              </Button> */}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default SearchedProduct;
