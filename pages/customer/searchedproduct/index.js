/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import CustomIcon from "services/iconUtils";
import Image from "next/image";
import MenuWithCheckbox from "@/atoms/MenuWithCheckbox";
import CustomerProductgModal from "@/forms/customer/searchedproduct/CustomerProductCard";
import DrawerComponent from "@/atoms/DrawerComponent";
import SimilarProducts from "@/forms/customer/searchedproduct/SimilarProduct";
import ModalComponent from "@/atoms/ModalComponent";

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
    title: "Classic Hat",
    shortDescription: "short Description",
    actualCost: "300",
    freeDelivary: "300",
    flag: true,
    offer: true,
    offerFlag: false,
  },
  {
    title: "hat1",
    shortDescription: "short Description",
    actualCost: "400",
    freeDelivary: "300",
    flag: false,
    offer: true,
    offerFlag: false,
  },
  {
    title: "hat2",
    shortDescription: "short Description",
    actualCost: "500",
    freeDelivary: "300",
    flag: true,
    offer: false,
    offerFlag: true,
  },
  {
    title: "hat3",
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
    link: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/img_snap.PNG",
  },
  {
    link: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/person.jpg",
  },
  {
    link: "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/ecommerceBanner.jpg",
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

  // viewModalUseEffect
  useEffect(() => {
    setViewModalImage(viewImageData);
    setSelectedImage(viewImageData[0]);
  }, []);
  const handleImageClick = (value) => {
    setSelectedImage(value);
  };

  useEffect(() => {
    setCheckedValue(listDatas);
    setSearchedCheckValue(searchlListData);
    setProductData(data);
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
    }
  };
  const onSimilerIconClick = (value) => {
    console.log(value);
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
        <Box className="d-flex w-100 mxh-80vh overflow-y-scroll hide-scrollbar">
          <Grid
            container
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
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {showDrawer && (
        <DrawerComponent
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
      )}
      {viewModalOpen && (
        <ModalComponent
          showClearBtn={false}
          showSaveBtn={false}
          open={viewModalOpen}
          onCloseIconClick={() => setViewModalOpen(false)}
          showHeader={false}
          ModalWidth={700}
        >
          <Box className="p-2">
            <Box className="row d-flex">
              <Box className="col-5">
                <Image
                  src={selectedImage.link}
                  width="250px"
                  height="250px"
                  alt=""
                  className="rounded bg-white"
                />
                <div className="d-flex justify-content-evenly">
                  {viewModalImage.map((item) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      className="border rounded w-25 h-19p"
                      onClick={() => handleImageClick(item)}
                    >
                      <Image
                        src={item.link}
                        width={100}
                        height={100}
                        alt=""
                        className="rounded img-fluid bg-white"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </Box>
              <Box className="col-7">
                <p>dsf</p>
              </Box>
            </Box>
          </Box>
        </ModalComponent>
      )}
    </Box>
  );
}

export default SearchedProduct;
