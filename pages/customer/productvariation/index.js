/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Button, Grid, Pagination, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomIcon from "services/iconUtils";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import MenuWithCheckbox from "@/atoms/MenuWithCheckbox";
import CustomerProductgModal from "@/forms/customer/searchedproduct/CustomerProductCard";
import DrawerComponent from "@/atoms/DrawerComponent";
import SimilarProducts from "@/forms/customer/searchedproduct/SimilarProduct";
import ViewModalComponent from "@/forms/customer/searchedproduct/ViewModalComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import ComapareProducts from "@/forms/customer/searchedproduct/compareproducts";

const listDatas = [
  {
    title: "category",
    datas: [
      {
        id: 1,
        value: "kurtas",
        isChecked: false,
      },
      {
        id: 2,
        value: "sdfsd",
        isChecked: false,
      },
    ],
  },
  {
    title: "Brand",
    datas: [
      {
        id: 1,
        value: "Puma",
        isChecked: false,
      },
      {
        id: 2,
        value: "adidas",
        isChecked: false,
      },
    ],
  },
];
const searchlListData = [
  {
    title: "category",
    datas: [
      {
        id: 1,
        value: "kurtas",
        isChecked: false,
      },
      {
        id: 2,
        value: "sdfsd",
        isChecked: false,
      },
    ],
  },
  {
    title: "Brand",
    datas: [
      {
        id: 1,
        value: "Puma",
        isChecked: false,
      },
      {
        id: 2,
        value: "adidas",
        isChecked: false,
      },
    ],
  },
];
const data = [
  {
    title: "Classic Hat1",
    shortDescription: "short Description",
    actualCost: "300",
    freeDelivary: "300",
    flag: true,
    offer: true,
    offerFlag: true,
  },
  {
    title: "Classic Hat2",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "Classic Hat3",
    shortDescription: "short Description",
    actualCost: "500",
    freeDelivary: "300",
    flag: true,
    offer: false,
    offerFlag: true,
  },
  {
    title: "Classic Hat4",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "Classic Hat5",
    shortDescription: "short Description",
    actualCost: "300",
    freeDelivary: "300",
    flag: true,
    offer: true,
    offerFlag: true,
  },
  {
    title: "Classic Hat6",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "Classic Hat7",
    shortDescription: "short Description",
    actualCost: "500",
    freeDelivary: "300",
    flag: true,
    offer: false,
    offerFlag: true,
  },
  {
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "300",
    freeDelivary: "300",
    flag: true,
    offer: true,
    offerFlag: true,
  },
  {
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "500",
    freeDelivary: "300",
    flag: true,
    offer: false,
    offerFlag: true,
  },
  {
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
];

const comparProductData = [
  {
    id: 1,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  },
  {
    id: 2,
    imageLink:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/img_snap.PNG",
  },
  {
    id: 3,
    imageLink: "",
  },
  {
    id: 4,
    imageLink: "",
  },
];
const useStyles = makeStyles(() => ({
  selected: {
    "& .Mui-selected": {
      color: "#E56700",
      border: "1px solid #E56700",
    },
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
  const [showDrawer, setShowDrawer] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  // comparProduct
  const [comparDrawer, setComparDrawer] = useState(false);
  const [comparedProduct, setCompredProduct] = useState([]);
  const [comparModalOpen, setComparModalOpan] = useState(false);
  useEffect(() => {
    setCompredProduct(comparProductData);
  }, []);

  const mainRef = useRef(null);
  useEffect(() => {
    mainRef.current.scrollIntoView();
  }, [mainRef]);
  const handleCloseIconClick = (id) => {
    const comparedProductCopy = [...comparedProduct];
    const final = comparedProductCopy.map((item) => {
      if (item.id == id) {
        return { ...item, imageLink: "" };
      }
      return item;
    });
    setCompredProduct(final);
  };
  const compareClearAll = () => {};

  // pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  useEffect(() => {
    if (viewIconClick) {
      const productDataCopy = [...data];
      const finalData = productDataCopy.slice((page - 1) * 6, page * 6);
      setProductData(finalData);
    } else {
      const productDataCopy = [...data];
      const finalData = productDataCopy.slice((page - 1) * 5, page * 5);
      setProductData(finalData);
    }
  }, [page]);
  useEffect(() => {
    if (viewIconClick) {
      // rowView
      setPage(1);
      const productDataCopys = [...data];
      const finalDatas = productDataCopys.slice((page - 1) * 6, page * 6);
      setProductData(finalDatas);
      const len = Math.ceil(productDataCopys.length / 6);
      setPageCount(len);
    } else {
      // GridView
      setPage(1);
      const productDataCopys = [...data];
      const finalDatas = productDataCopys.slice((page - 1) * 5, page * 5);
      setProductData(finalDatas);
      const len = Math.ceil(productDataCopys.length / 5);
      setPageCount(len);
    }
  }, [viewIconClick]);

  useEffect(() => {
    setCheckedValue(listDatas);
    setSearchedCheckValue(searchlListData);
    if (viewIconClick) {
      // rowView
      const productDataCopy = [...data];
      const finalData = productDataCopy.slice((page - 1) * 6, page * 6);
      setProductData(finalData);
      const len = Math.ceil(productDataCopy.length / 6);
      setPageCount(len);
    } else {
      // GridView
      const productDataCopy = [...data];
      const finalData = productDataCopy.slice((page - 1) * 5, page * 5);
      setProductData(finalData);
      const len = Math.ceil(productDataCopy.length / 5);
      setPageCount(len);
    }
  }, []);
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
  const onIconClick = (value) => {
    if (value === "viewCarouselOutlinedIcon") {
      setShowDrawer(true);
    } else if (value === "visibilityOutlinedIcon") {
      setViewModalOpen(true);
    } else if (value === "balanceIcon") {
      setComparDrawer(true);
      setCompredProduct(comparProductData);
    }
  };
  const onSimilerIconClick = () => {};
  const handlePreviousbtnClick = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const handleNextbtnClick = () => {
    setPage((prev) => (prev < pageCount ? prev + 1 : prev));
  };
  return (
    <Box className="mnh-100vh" ref={mainRef}>
      {!comparModalOpen ? (
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
          <Box className="d-flex justify-content-end mt-3">
            <p className="text-danger fs-14 me-4">
              {" "}
              Offer ends in 09h 42min 2sec
            </p>
          </Box>
          <Box className="">
            <Box className="d-flex">
              <Grid
                container={!viewIconClick}
                spacing={2}
                className="ms-0 "
                sx={{
                  width: `calc(100% - 10px)`,
                }}
              >
                {productData.map((item, index) => (
                  <Grid item md={4} lg={3} sm={6} key={index}>
                    <Paper elevation={3}>
                      <CustomerProductgModal
                        data={item}
                        handleIconClick={(value) => onIconClick(value)}
                        viewType={viewIconClick ? "row" : "Grid"}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box className="d-flex justify-content-center mt-3 mb-2">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                className={`py-0 align-self-center fs-12 me-2 ${
                  page <= 1 ? `` : `border-black text-black`
                }`}
                disabled={page <= 1 ? true : false}
                onClick={() => {
                  handlePreviousbtnClick();
                }}
              >
                Previous
              </Button>
              <Pagination
                classes={{ root: classes.selected }}
                count={pageCount}
                variant="outlined"
                shape="rounded"
                onChange={(e, pagenumber) => {
                  setPage(pagenumber);
                }}
                page={page}
                hideNextButton
                hidePrevButton
              />
              <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                className={`py-0 align-self-center ms-2 fs-12 ${
                  page < pageCount ? `border-black text-black` : ``
                }`}
                disabled={page < pageCount ? false : true}
                onClick={() => {
                  handleNextbtnClick();
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
          <DrawerComponent
            openDrawer={showDrawer}
            width="500px"
            modalTitle="Similar Products"
            onClose={() => setShowDrawer(false)}
          >
            <Grid
              container
              spacing={2}
              className="mx-auto ms-0 mt-2 mb-2 ps-1 pe-3"
              sx={{
                width: `calc(100% - 10px)`,
              }}
            >
              {productData.map((item, index) => (
                <Grid item md={6} sm={6} key={index}>
                  <SimilarProducts
                    data={item}
                    handleIconClick={(value) => onSimilerIconClick(value)}
                  />
                </Grid>
              ))}
            </Grid>
          </DrawerComponent>

          {viewModalOpen && (
            <ViewModalComponent
              setViewModalOpen={setViewModalOpen}
              viewModalOpen={viewModalOpen}
            />
          )}
          <DrawerComponent
            openDrawer={comparDrawer}
            anchor="bottom"
            width="vp-width"
            headerBorder={false}
            onClose={() => setComparDrawer(false)}
            enter={300}
          >
            <Box
              className="px-4 py-2 d-flex justify-content-between mnh-25p mx-4"
              style={{ height: "150px" }}
            >
              <Box className="align-self-center ">
                <p className="fw-600 fs-18">Compare Products</p>
                <p>( 1 Product )</p>
              </Box>
              {comparedProduct &&
                comparedProduct.map((item) => (
                  <Box className="d-flex justify-content-center border rounded mnw-150">
                    {item.imageLink ? (
                      <>
                        <Image
                          src={item?.imageLink}
                          alt=""
                          className="rounded bg-white"
                          style={{ position: "relative" }}
                          width="150%"
                          height="100%"
                        />

                        <CustomIcon
                          type="close"
                          className="position-absolute compareProductTop fs-18"
                          onIconClick={() => handleCloseIconClick(item.id)}
                        />
                      </>
                    ) : (
                      <Box className="align-self-center border p-3 rounded-circle cursor-pointer">
                        <CustomIcon type="add" className="" />
                      </Box>
                    )}
                  </Box>
                ))}
              <Box className="align-self-center">
                <ButtonComponent
                  label="Clear All"
                  variant="outlined"
                  borderColor="border-gray "
                  bgColor="bg-white"
                  textColor="color-black"
                  size="medium"
                  muiProps="me-3"
                  onBtnClick={() => compareClearAll()}
                />
                <ButtonComponent
                  label="Start Compare"
                  size="medium"
                  onBtnClick={() => {
                    setComparModalOpan(true);
                    setComparDrawer(false);
                  }}
                />
              </Box>
            </Box>
          </DrawerComponent>
        </Box>
      ) : (
        <ComapareProducts
          handleBackclick={() => {
            setComparModalOpan(false);
          }}
        />
      )}
    </Box>
  );
}

export default SearchedProduct;