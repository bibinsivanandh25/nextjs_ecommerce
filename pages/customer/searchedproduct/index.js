/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

import CustomIcon from "services/iconUtils";
import Image from "next/image";
import MenuWithCheckbox from "@/atoms/MenuWithCheckbox";
import CustomerProductgModal from "@/forms/customer/searchedproduct/CustomerProductCard";
import DrawerComponent from "@/atoms/DrawerComponent";
import SimilarProducts from "@/forms/customer/searchedproduct/SimilarProduct";
import ModalComponent from "@/atoms/ModalComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";

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
const viewImageData = [
  {
    links:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/img_snap.PNG",
  },
  {
    links:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/person.jpg",
  },
  {
    links:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg",
  },
];
const viewModalIcons = [
  {
    iconName: "favoriteBorderIcon",
    title: "Favorite",
  },
  {
    iconName: "localMallIcon",
    title: "Favorite",
  },
];

function SearchedProduct() {
  // checkbox data
  const [checkedValue, setCheckedValue] = useState([]);
  const [searchedCheckValue, setSearchedCheckValue] = useState([]);
  const [viewIconClick, setViewIconClick] = useState(false);
  const [productData, setProductData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalImage, setViewModalImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [viewModalRadioActual, setViewModalRadioActual] = useState(true);
  const [viewModalRadioFree, setViewModalRadioFree] = useState(false);
  const [viewModalInput, setViewModalInput] = useState("");
  const [count, setCount] = useState(1);
  const [iconcolor, setIconColor] = useState({});
  const [comparDrawer, setComparDrawer] = useState(false);

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

  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const mouseLeave = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: false }));
  };

  const handleImageClick = (value) => {
    setSelectedImage(value);
  };

  useEffect(() => {
    setViewModalImage(viewImageData);
    setSelectedImage(viewImageData[0]);
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
    }
  };
  const onSimilerIconClick = (value) => {
    console.log(value);
  };
  const handleMinusClick = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handlePlusClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <Box className="body-bg mnh-100vh">
      <Box className="row">
        <Box className="d-flex justify-content-end mt-1">
          <Box
            className={
              viewIconClick
                ? "border align-self-center bg-dark-gray p-1"
                : "border align-self-center p-1 "
            }
          >
            <CustomIcon
              title="RowView"
              type="tablerows"
              className="fs-26"
              onIconClick={() => {
                setViewIconClick(true);
              }}
              showColorOnHover={false}
              color={viewIconClick ? "color-white" : "color-dark-gray"}
            />
          </Box>
          <Box
            className={
              viewIconClick
                ? "border align-self-center p-1"
                : "border align-self-center bg-dark-gray p-1"
            }
          >
            <CustomIcon
              title="GridView"
              type="gridview"
              className="fs-26"
              onIconClick={() => {
                setViewIconClick(false);
              }}
              showColorOnHover={false}
              color={viewIconClick ? "color-dark-gray" : "color-white"}
            />
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
          <Box>
            <MenuWithCheckbox
              btnText="Filters"
              listData={searchedCheckValue}
              handleCheckboxClick={(id, value, title) => {
                handleSearchFilterClick(id, value, title);
              }}
            />
          </Box>
        </Box>
        <Box className="d-flex justify-content-end mt-3">
          <p className="text-danger fs-14"> Offer ends in 09h 42min 2sec</p>
        </Box>
        <Box className="w-100 overflow-y-scroll hide-scrollbar">
          <Box className="d-flex ">
            <Grid
              container={!viewIconClick}
              spacing={2}
              className=" mx-auto ms-0"
              sx={{
                width: `calc(100% - 10px)`,
              }}
            >
              {productData.map((item) => (
                <Grid item md={4} lg={3} sm={6}>
                  <CustomerProductgModal
                    data={item}
                    handleIconClick={(value) => onIconClick(value)}
                    viewType={viewIconClick ? "row" : "Grid"}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className="d-flex justify-content-center mt-3 mb-2">
            <Pagination
              count={pageCount}
              variant="outlined"
              shape="rounded"
              onChange={(e, pagenumber) => {
                setPage(pagenumber);
              }}
              page={page}
            />
          </Box>
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
          className="mx-auto ms-0 mt-2"
          sx={{
            width: `calc(100% - 10px)`,
          }}
        >
          {productData.map((item) => (
            <Grid item md={6} sm={6}>
              <SimilarProducts
                data={item}
                handleIconClick={(value) => onSimilerIconClick(value)}
              />
            </Grid>
          ))}
        </Grid>
      </DrawerComponent>

      {viewModalOpen && (
        <ModalComponent
          showCloseIcon
          showClearBtn={false}
          showSaveBtn={false}
          open={viewModalOpen}
          onCloseIconClick={() => setViewModalOpen(false)}
          // showHeader={false}
          ModalWidth={700}
          ModalTitle=""
          headerClassName=""
          iconStyle={{
            right: "0",
            top: "-25px",
            position: "absolute",
            color: "#fff !important",
          }}
          closeIconClasName="cursor-pointer color-white"
          headerBorder=""
        >
          <Box className="p-2">
            <Box className="row d-flex">
              <Box className="col-5">
                <Image
                  src={selectedImage.links}
                  width="250px"
                  height="250px"
                  alt=""
                  className="rounded bg-white"
                />
                <div style={{ position: "absolute", top: 30, left: 240 }}>
                  <Box className="d-flex flex-row-reverse p-2">
                    <Box className="d-flex flex-column">
                      {viewModalIcons.map((item, index) => (
                        <Box
                          sx={{
                            zIndex: "100",
                            padding: "1px",
                            width: "25px",
                            height: "25px",
                          }}
                          className={`rounded-circle mb-1 d-flex justify-content-center align-items-center ${
                            iconcolor[item.iconName] ? "bg-orange" : "bg-white"
                          }`}
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                        >
                          <CustomIcon
                            type={item.iconName}
                            className="fs-18"
                            // onIconClick={() => {
                            //   handleIconClick(item.iconName);
                            // }}
                            showColorOnHover={false}
                            onMouseEnter={() => mouseEnter(item.iconName)}
                            onMouseLeave={() => mouseLeave(item.iconName)}
                            color={
                              iconcolor[item.iconName]
                                ? "text-white"
                                : "text-secondary"
                            }
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </div>
                <div className="d-flex justify-content-evenly">
                  {viewModalImage.map((item) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      className="w-25 h-19p"
                      onClick={() => handleImageClick(item)}
                    >
                      <Image
                        src={item.links}
                        width={100}
                        height={100}
                        alt=""
                        className="border rounded"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </Box>
              <Box className="col-7">
                <p className="fs-14 fw-600">
                  Portronics SoundDrum Plus a 15W POR-1040 Bluetooth 5.0
                  Portable Stereo Speaker Comes with Boosted Bass, Equaliser
                  Function.
                </p>
                <Box className="mt-1 mb-1">
                  <StarRatingComponentReceivingRating
                    rating={3}
                    fontSize="medium"
                  />
                  <p className="fs-10 fw-400">
                    129 Rating | 22 Answered Questions
                  </p>
                </Box>
                <Box>
                  <RadiobuttonComponent
                    isChecked={viewModalRadioActual}
                    label="767.54 - 911.99 (Actual Product cost)"
                    size="small"
                    onRadioChange={() => {
                      setViewModalRadioActual(true);
                      setViewModalRadioFree(false);
                    }}
                  />
                  <RadiobuttonComponent
                    isChecked={viewModalRadioFree}
                    label="1000 - 1400 (with free delivery & Return)"
                    size="small"
                    onRadioChange={() => {
                      setViewModalRadioFree(true);
                      setViewModalRadioActual(false);
                    }}
                  />
                </Box>
                <Box>
                  <InputBox
                    value={viewModalInput}
                    placeholder="Enter pincode & check if its deliverable"
                    className="w-75"
                    onInputChange={(e) => {
                      setViewModalInput(e.target.value);
                    }}
                  />
                </Box>
                <Box className="d-flex mt-1">
                  <Box
                    className=" d-flex w-30p  justify-content-center align-items-center px-2 py-1 rounded"
                    style={{ border: "1px solid #292929" }}
                  >
                    <div
                      style={{ width: "20px", height: "20px" }}
                      className="border rounded-circle me-3 fs-12 d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() => handleMinusClick()}
                    >
                      -
                    </div>
                    <span>{count}</span>
                    <div
                      style={{ width: "20px", height: "20px" }}
                      className="border rounded-circle ms-3 fs-12 d-flex align-items-center justify-content-center cursor-pointer"
                      onClick={() => handlePlusClick()}
                    >
                      +
                    </div>
                  </Box>
                  <Box className="ms-5">
                    <ButtonComponent
                      borderColor="border-black"
                      bgColor="bg-white"
                      textColor="color-black"
                      label="Add to Cart"
                      variant="outlined"
                      size="medium"
                    />
                  </Box>
                </Box>
                <Box className="w-75 mt-1">
                  <ButtonComponent size="medium" label="Buy Now" fullWidth />
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalComponent>
      )}
      <DrawerComponent
        openDrawer={comparDrawer}
        anchor="bottom"
        width="vp-width "
        headerBorder={false}
        onClose={() => setComparDrawer(false)}
      >
        <p>Compare Products</p>
      </DrawerComponent>
    </Box>
  );
}

export default SearchedProduct;
