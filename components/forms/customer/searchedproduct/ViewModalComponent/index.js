/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CustomIcon from "services/iconUtils";
import Image from "next/image";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import ModalComponent from "@/atoms/ModalComponent";

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
const ViewModalComponent = ({
  setViewModalOpen = () => {},
  viewModalOpen = false,
}) => {
  const [selectedImage, setSelectedImage] = useState({});
  const [iconcolor, setIconColor] = useState({});
  const [viewModalImage, setViewModalImage] = useState([]);
  const [viewModalRadioActual, setViewModalRadioActual] = useState(true);
  const [viewModalRadioFree, setViewModalRadioFree] = useState(false);
  const [viewModalInput, setViewModalInput] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    setViewModalImage(viewImageData);
    setSelectedImage(viewImageData[0]);
  }, []);
  const mouseEnter = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: true }));
  };
  const mouseLeave = (name) => {
    setIconColor((prev) => ({ ...prev, [name]: false }));
  };
  const handleImageClick = (value) => {
    setSelectedImage(value);
  };
  const handleMinusClick = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handlePlusClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
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
            {selectedImage.links && (
              <Image
                src={selectedImage.links}
                width="250px"
                height="250px"
                alt=""
                className="rounded bg-white"
                style={{ aspectRatio: " 1 / 1 " }}
              />
            )}
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
              {viewModalImage.map((item, index) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  className="w-25 h-19p"
                  onClick={() => handleImageClick(item)}
                  key={index}
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
              Portronics SoundDrum Plus a 15W POR-1040 Bluetooth 5.0 Portable
              Stereo Speaker Comes with Boosted Bass, Equaliser Function.
            </p>
            <Box className="mt-1 mb-1">
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
            <Box className="w-75">
              <InputBox
                value={viewModalInput}
                placeholder="Enter pincode & check if its deliverable"
                className="fs-10"
                onInputChange={(e) => {
                  setViewModalInput(e.target.value);
                }}
                size="small"
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
  );
};

export default ViewModalComponent;
