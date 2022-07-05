/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";

const viewImageData = [
  {
    links:
      "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
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

const HotDealsOfTheDay = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const [viewModalImage, setViewModalImage] = useState([]);
  const [viewModalRadioActual, setViewModalRadioActual] = useState(true);
  const [viewModalRadioFree, setViewModalRadioFree] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // viewModal
  useEffect(() => {
    setViewModalImage(viewImageData);
    setSelectedImage(viewImageData[0]);
  }, []);

  const handleImageClick = (value) => {
    setSelectedImage(value);
  };
  const handleMinusClick = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handlePlusClick = () => {
    setCount((prev) => prev + 1);
  };
  const handleBuyNowClick = () => {};

  const getPageDots = () => {
    const arr = [1, 2, 3, 4, 5];
    return arr.map((ele, ind) => {
      return (
        <div
          onClick={() => setSelectedIndex(ind)}
          className={`border rounded-circle mx-1 ${
            selectedIndex === ind ? "bg-secondary" : "bg-white"
          }`}
          style={{
            height: "13px",
            width: "13px",
          }}
        />
      );
    });
  };

  return (
    <Box className="p-2 ">
      <Box className="mx-2 py-1 border-bottom">
        <Typography className="fw-600 fs-16">Hot Deals of The Day</Typography>
      </Box>
      <Box className="mxh-400 mnh-400">
        <Box className="row d-flex mb-5">
          <Box className="col-4 d-flex">
            <Box>
              {viewModalImage.map((item, index) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div onClick={() => handleImageClick(item)} key={index}>
                  <Image
                    src={item.links}
                    width={60}
                    height={60}
                    alt=""
                    className="border rounded cursor-pointer"
                  />
                </div>
              ))}
            </Box>
            {selectedImage.links && (
              <Box>
                <Image
                  src={selectedImage.links}
                  width={200}
                  height={200}
                  alt=""
                  className="rounded bg-white"
                  // style={{ aspectRatio: " 1 / 1 " }}
                />
              </Box>
            )}
          </Box>
          <Box className="col-8">
            <Box className="d-flex justify-content-between align-items-center">
              <p className="fs-14 fw-600 w-75">
                Portronics SoundDrum Plus a 15W POR-1040 Bluetooth 5.0 Portable
                Stereo Speaker Comes with Boosted Bass, Equaliser Function.
              </p>
              <CustomIcon type="favoriteBorderIcon" className="me-2" />
            </Box>
            <Box className="my-1">
              <StarRatingComponentReceivingRating
                rating={3}
                fontSize="medium"
              />
              <p className="fs-10 fw-400">129 Rating | 22 Answered Questions</p>
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
            <Box className="d-flex mt-1">
              <Box
                className=" d-flex w-30p  justify-content-center align-items-center px-2 py-1 rounded"
                style={{ border: "1px solid #292929" }}
              >
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="border rounded-circle me-3 h-4 d-flex align-items-center justify-content-center cursor-pointer"
                  onClick={() => handleMinusClick()}
                >
                  -
                </div>
                <span>{count}</span>
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="border rounded-circle ms-3 h-4 d-flex align-items-center justify-content-center cursor-pointer"
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
            <ButtonComponent
              size="medium"
              label="Buy Now"
              muiProps="w-60p mt-2"
              onBtnClick={() => handleBuyNowClick()}
            />
          </Box>
        </Box>
        <Box className="row align-items-center">
          <Box className="col-4" />
          <Box className="col-4 d-flex justify-content-center ">
            {getPageDots()}
          </Box>
          <Box className="col-4 text-end color-orange fw-bold h-5 pe-5">
            View More Deals &gt;&gt;
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HotDealsOfTheDay;
