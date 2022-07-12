/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CustomIcon from "services/iconUtils";
import Image from "next/image";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import StarRatingComponentReceivingRating from "@/atoms/StarRatingComponentReceiving";
import ModalComponent from "@/atoms/ModalComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

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
  // Delivery Modal
  const [buyNow, setBuyNow] = useState(false);
  const [deliveryOptions, setDelivaryOptions] = useState({
    delivery: true,
    fastDeliery: false,
  });
  const [returnOptions, setReturnOptions] = useState({
    return: false,
    fastReturn: false,
  });
  const [returnCheckBox, setReturnCheckBox] = useState(false);
  // Choose Delivery options
  const [ChooseDelivryOpen, setChooseDelivryOpen] = useState(false);
  const [freeDeliveryOptions, seFreetDelivaryOptions] = useState({
    freeDelivery: true,
    freeFastDeliery: false,
  });
  const route = useRouter();
  //  Delivery Modal
  const handleReturnCheckBoxClick = () => {
    if (returnCheckBox) {
      setReturnOptions({
        return: false,
        fastReturn: false,
      });
    } else {
      setReturnOptions({
        return: true,
        fastReturn: false,
      });
    }
    setReturnCheckBox(!returnCheckBox);
  };
  const handleCloseIonClick = () => {
    setReturnCheckBox(false);
    setReturnOptions({
      return: false,
      fastReturn: false,
    });
    setBuyNow(false);
  };
  // Choose Delivery options
  const handleProcedClick = () => {
    setChooseDelivryOpen(true);
  };

  // viewModal
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
  const handleBuyNowClick = () => {
    setBuyNow(true);
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
                {/* <div
                  style={{ width: "20px", height: "20px" }}
                  className="border rounded-circle me-3 fs-12 d-flex align-items-center justify-content-center cursor-pointer"
                  onClick={() => handleMinusClick()}
                >
                  -
                </div> */}
                <div className="me-3" onClick={() => handleMinusClick()}>
                  <CustomIcon
                    type="removeIcon"
                    className="border rounded-circle fs-20"
                    showColorOnHover={false}
                  />
                </div>
                <span>{count}</span>
                <div className="ms-3" onClick={() => handlePlusClick()}>
                  <CustomIcon
                    type="add"
                    className="border rounded-circle  fs-20"
                    showColorOnHover={false}
                  />
                </div>
                {/* <div
                  style={{ width: "20px", height: "20px" }}
                  className="border rounded-circle ms-3 fs-12 d-flex align-items-center justify-content-center cursor-pointer"
                  onClick={() => handlePlusClick()}
                >
                  +
                </div> */}
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
              <ButtonComponent
                size="medium"
                label="Buy Now"
                fullWidth
                onBtnClick={() => handleBuyNowClick()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {buyNow && (
        <ModalComponent
          open={buyNow}
          onCloseIconClick={() => {
            handleCloseIonClick();
          }}
          showCloseIcon
          showClearBtn={false}
          showSaveBtn={false}
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
          ModalWidth={450}
        >
          <Box className="">
            <Box className="ps-2" style={{ borderTop: "1px solid #797878" }}>
              <CheckBoxComponent
                label="Choose Delivery options"
                size="large"
                labelColor="#144F9D"
                lableFontSize="fs-26"
                lableFontWeight="fw-700"
                isChecked
              />
              <Box className="ms-1">
                <RadiobuttonComponent
                  size="medium"
                  label="₹83 - Delivery by wed, sep 22"
                  isChecked={deliveryOptions.delivery}
                  onRadioChange={() => {
                    setDelivaryOptions({
                      delivery: true,
                      fastDeliery: false,
                    });
                  }}
                />
                <RadiobuttonComponent
                  size="medium"
                  label="₹183 - Fastest delivery by sunday , sep 18"
                  isChecked={deliveryOptions.fastDeliery}
                  onRadioChange={() => {
                    setDelivaryOptions({
                      delivery: false,
                      fastDeliery: true,
                    });
                  }}
                />
              </Box>
            </Box>
            <Box className="ps-2" style={{ borderTop: "1px solid #797878" }}>
              <CheckBoxComponent
                label="Choose Return Shipment"
                size="large"
                labelColor="#144F9D"
                lableFontSize="10px"
                lableFontWeight="fw-700"
                isChecked={returnCheckBox}
                checkBoxClick={() => handleReturnCheckBoxClick()}
              />
              <Box className="ms-1">
                <RadiobuttonComponent
                  disabled={!returnCheckBox}
                  size="medium"
                  label="₹83 - Product Return Charges"
                  isChecked={returnOptions.return}
                  onRadioChange={() => {
                    setReturnOptions({
                      return: true,
                      fastReturn: false,
                    });
                  }}
                />
                <RadiobuttonComponent
                  disabled={!returnCheckBox}
                  size="medium"
                  label="₹183 - Product fast Return"
                  isChecked={returnOptions.fastReturn}
                  onRadioChange={() => {
                    setReturnOptions({
                      return: false,
                      fastReturn: true,
                    });
                  }}
                />
              </Box>
            </Box>
            <Box className="d-flex justify-content-center">
              <span className="mt-1">Final Price - &nbsp;</span>
              <span style={{ color: "#e56700", fontSize: "24px" }}>
                1,240/-
              </span>
            </Box>
            <Box className="d-flex justify-content-center mt-2">
              <Box className="me-3 ">
                <ButtonComponent
                  borderColor="border-black"
                  bgColor="bg-white"
                  textColor="color-black"
                  label="Add to Cart"
                  variant="outlined"
                  size="medium"
                />
              </Box>
              <ButtonComponent
                size="medium"
                label="Proceed to Checkout"
                onBtnClick={() => handleProcedClick()}
              />
            </Box>
          </Box>
        </ModalComponent>
      )}
      {ChooseDelivryOpen && (
        <ModalComponent
          open={ChooseDelivryOpen}
          onCloseIconClick={() => {
            setChooseDelivryOpen(false);
          }}
          showCloseIcon
          showClearBtn={false}
          showSaveBtn={false}
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
          ModalWidth={450}
        >
          <Box>
            <CheckBoxComponent
              label="Choose Delivery options"
              size="large"
              labelColor="#144F9D"
              lableFontSize="fs-26"
              lableFontWeight="fw-700"
              isChecked
            />
            <Box className="ms-1">
              <RadiobuttonComponent
                size="medium"
                label="₹FreeDelivery by wed, sep 22"
                isChecked={freeDeliveryOptions.freeDelivery}
                onRadioChange={() => {
                  seFreetDelivaryOptions({
                    freeDelivery: true,
                    freeFastDeliery: false,
                  });
                }}
              />
              <RadiobuttonComponent
                size="medium"
                label="₹42 - Fastest delivery by sunday , sep 18"
                isChecked={freeDeliveryOptions.freeFastDeliery}
                onRadioChange={() => {
                  seFreetDelivaryOptions({
                    freeDelivery: false,
                    freeFastDeliery: true,
                  });
                }}
              />
            </Box>
            <Box
              className="d-flex justify-content-center mt-1"
              style={{ borderBottom: "1px solid #797878" }}
            >
              <span className="mt-1">Final Price - &nbsp;</span>
              <span style={{ color: "#e56700", fontSize: "24px" }}>
                1,240/-
              </span>
            </Box>
            <Box className="d-flex justify-content-center mt-2">
              <Box className="me-3 ">
                <ButtonComponent
                  borderColor="border-black"
                  bgColor="bg-white"
                  textColor="color-black"
                  label="Add to Cart"
                  variant="outlined"
                  size="medium"
                />
              </Box>
              <ButtonComponent
                size="medium"
                label="Proceed to Checkout"
                onBtnClick={() => {
                  route.push("/customer/checkoutorder");
                }}
              />
            </Box>
          </Box>
        </ModalComponent>
      )}
    </ModalComponent>
  );
};

export default ViewModalComponent;
