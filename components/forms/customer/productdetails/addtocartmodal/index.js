/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAddToCartData,
  mainProductAddToCart,
} from "services/customer/productdetails";
import toastify from "services/utils/toastUtils";

const AddToCartModal = ({
  showModal,
  setShowModal = () => {},
  frequentProduct,
  type,
}) => {
  const user = useSelector((state) => state.customer);
  const [deliveryType, setdeliveryType] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  const getData = (data) => {
    const temp = [];
    if (type === "FREEDELIVERYANDRETURN") {
      data.forEach((item) => {
        temp.push({
          finalPrice: item.finalPrice,
          productId: item.productVariationId,
          productTitle: item.productTitle,
          skuId: item.skuId,
          fastestDeliveryAmount:
            item.productDeliveryCharges.fastestDeliveryAmount,
          deliveryCharge: item.productDeliveryCharges.deliveryAmount,
          fastestReturnAmount: null,
          returnCharge: null,
          selectedAmount: "free",
          variationMedia: item.variationMedia,
          fastestDeliveryBy: item.productDeliveryCharges.fastestDeliveryBy,
          deliveryBy: item.productDeliveryCharges.deliveryBy,
        });
      });
    }
    if (type === "NOFREEDELIVERYANDRETURN") {
      data.forEach((item) => {
        temp.push({
          finalPrice: item.finalPrice,
          productTitle: item.productTitle,
          productId: item.productVariationId,
          skuId: item.skuId,
          variationMedia: item.variationMedia,
          selectedAmount: item.productDeliveryCharges.deliveryAmount,
          returnAmount: 0,
          fastestDeliveryAmount:
            item.productDeliveryCharges.fastestDeliveryAmount,
          deliveryCharge: item.productDeliveryCharges.deliveryAmount,
          fastestDeliveryBy: item.productDeliveryCharges.fastestDeliveryBy,
          deliveryBy: item.productDeliveryCharges.deliveryBy,
          fastestReturnAmount: item.productReturnCharges.fastestReturnAmount,
          returnCharge: item.productReturnCharges.returnAmount,
          fastestReturnBy: item.productReturnCharges.fastestDeliveryBy,
          returnBy: item.productReturnCharges.deliveryBy,
          enableReturn: false,
        });
      });
    }
    return temp;
  };

  const getSelectedDeliveryType = async () => {
    const payload = {
      productVariationId: [],
      deliveryType: type,
    };
    frequentProduct.forEach((item) => {
      if (item.isSelected) {
        payload.productVariationId.push(item.productVariationId);
      }
    });
    const { data, err } = await getAddToCartData(payload);
    if (data?.data?.length) {
      setdeliveryType(getData(data.data));
    }
    if (err) {
      setdeliveryType([]);
    }
  };

  useEffect(() => {
    getSelectedDeliveryType();
  }, []);
  const handleRadioChange = (item, val) => {
    const temp = [...deliveryType];
    temp.forEach((value) => {
      if (value.productId === item.productId) {
        value.selectedAmount = val;
      }
    });
    setdeliveryType(temp);
  };
  const renderFreeDelivery = () => {
    return (
      <>
        {deliveryType.map((item) => (
          <Grid container marginY={1}>
            <Grid
              item
              sm={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Image
                  height={120}
                  width={120}
                  src={item.variationMedia}
                  layout="intrinsic"
                  alt="alt"
                />
                <Typography className="h-p89">{item.productTitle}</Typography>
              </Box>
            </Grid>
            <Grid item sm={8} className="border-bottom">
              <Box>
                <Typography className="color-orange fw-bold">
                  Choose Delivery options
                </Typography>
                <Box>
                  <RadiobuttonComponent
                    isChecked={item.selectedAmount === "free"}
                    size="small"
                    label={<Typography>Free {item.deliveryBy}</Typography>}
                    onRadioChange={() => {
                      handleRadioChange(item, "free");
                    }}
                  />
                </Box>
                <Box>
                  <RadiobuttonComponent
                    size="small"
                    label={
                      <Typography>
                        {item.fastestDeliveryAmount}
                        &nbsp;{item.fastestDeliveryBy}
                      </Typography>
                    }
                    isChecked={
                      item.selectedAmount === item.fastestDeliveryAmount
                    }
                    onRadioChange={() => {
                      handleRadioChange(item, item.fastestDeliveryAmount);
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="end">
          <Typography className="fw-bold">
            Final Price - {finalPrice}
          </Typography>
        </Box>
      </>
    );
  };

  const createPayload = (flag) => {
    const payload = {
      profileId: user.profileId,
      customerId: user.userId,
      cartProduct: [],
      flag,
    };
    if (type == "FREEDELIVERYANDRETURN") {
      deliveryType.forEach((item) => {
        payload.cartProduct.push({
          productId: item.productId,
          quantity: 1,
          orderType: "FREEDELIVERYRETURNS",
          skuId: item.skuId,
          fastestDeliveryAmount:
            item.selectedAmount == "free" ? null : item.selectedAmount,
          deliveryCharge: null,
          fastestReturnAmount: null,
          returnCharge: null,
        });
      });
    }
    if (type === "NOFREEDELIVERYANDRETURN") {
      deliveryType.forEach((item) => {
        payload.cartProduct.push({
          productId: item.productId,
          quantity: 1,
          orderType: "NOFREEDELIVERYANDRETURN",
          skuId: item.skuId,
          fastestDeliveryAmount:
            item.fastestDeliveryAmount === item.selectedAmount
              ? item.selectedAmount
              : null,
          deliveryCharge:
            item.deliveryCharge === item.selectedAmount
              ? item.selectedAmount
              : null,
          fastestReturnAmount:
            item.fastestReturnAmount === item.returnAmount
              ? item.returnAmount
              : null,
          returnCharge:
            item.returnCharge === item.returnAmount ? item.returnAmount : null,
        });
      });
    }
    return payload;
  };
  const handleAddToCart = async (flag = false) => {
    const payload = createPayload(flag);
    const { data, err } = await mainProductAddToCart(payload);
    if (data) {
      if (!data?.popUp) {
        toastify(data?.message, "success");
        setShowConfirmModal(false);
        setShowModal(false);
      } else {
        setShowConfirmModal(true);
      }
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const handleReturnCheckClick = (value) => {
    const temp = [...deliveryType];
    temp.forEach((item) => {
      if (item.productId === value.productId) {
        item.enableReturn = !item.enableReturn;
        item.returnAmount = item.enableReturn ? item.returnCharge : 0;
      }
    });
    setdeliveryType([...temp]);
  };
  const handleReturnRadioChange = (value, val) => {
    const temp = [...deliveryType];
    temp.forEach((item) => {
      if (item.productId === value.productId) {
        item.returnAmount = val;
      }
    });
    setdeliveryType([...temp]);
  };
  const handleDeliveryChargeClick = (value, val) => {
    const temp = [...deliveryType];
    temp.forEach((item) => {
      if (item.productId === value.productId) {
        item.selectedAmount = val;
      }
    });
    setdeliveryType([...temp]);
  };
  const renderNoFreeDelivery = () => {
    return (
      <>
        {deliveryType.map((item) => (
          <Grid container>
            <Grid
              item
              sm={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Image
                  height={120}
                  width={120}
                  src={item.variationMedia}
                  layout="intrinsic"
                  alt="alt"
                />
                <Typography className="h-p89">{item.productTitle}</Typography>
              </Box>
            </Grid>
            <Grid item sm={9}>
              <Grid container>
                <Grid item sm={6}>
                  <Box>
                    <Typography className="color-orange fw-bold">
                      Choose Delivery options
                    </Typography>
                    <Box>
                      <RadiobuttonComponent
                        onRadioChange={() =>
                          handleDeliveryChargeClick(item, item.deliveryCharge)
                        }
                        isChecked={item.deliveryCharge === item.selectedAmount}
                        size="small"
                        label={
                          <Typography>
                            {item.deliveryCharge} {item.deliveryBy}
                          </Typography>
                        }
                      />
                    </Box>
                    <Box>
                      <RadiobuttonComponent
                        onRadioChange={() =>
                          handleDeliveryChargeClick(
                            item,
                            item.fastestDeliveryAmount
                          )
                        }
                        size="small"
                        label={
                          <Typography>
                            {item.fastestDeliveryAmount}
                            &nbsp;{item.fastestDeliveryBy}
                          </Typography>
                        }
                        isChecked={
                          item.selectedAmount === item.fastestDeliveryAmount
                        }
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={6}>
                  <CheckBoxComponent
                    isChecked={item.enableReturn}
                    label={
                      <Typography className="h-4 color-orange fw-bold">
                        Choose Return Shipment
                      </Typography>
                    }
                    checkBoxClick={() => {
                      handleReturnCheckClick(item);
                    }}
                  />
                  <Box>
                    <Box>
                      <RadiobuttonComponent
                        disabled={!item.enableReturn}
                        isChecked={item.returnCharge === item.returnAmount}
                        size="small"
                        label={
                          <Typography
                            className={`${!item.enableReturn && `color-gray`}`}
                          >
                            {item.returnCharge} {item.returnBy}
                          </Typography>
                        }
                        onRadioChange={() => {
                          handleReturnRadioChange(item, item.returnCharge);
                        }}
                      />
                    </Box>
                    <Box>
                      <RadiobuttonComponent
                        disabled={!item.enableReturn}
                        isChecked={
                          item.fastestReturnAmount === item.returnAmount
                        }
                        size="small"
                        label={
                          <Typography
                            className={`${!item.enableReturn && `color-gray`}`}
                          >
                            {item.fastestReturnAmount} {item.fastestReturnBy}
                          </Typography>
                        }
                        onRadioChange={() => {
                          handleReturnRadioChange(
                            item,
                            item.fastestReturnAmount
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="end">
          <Typography className="fw-bold">
            Final Price - {finalPrice}
          </Typography>
        </Box>
      </>
    );
  };
  useEffect(() => {
    const temp = [...deliveryType];

    let amount = 0;
    if (type == "FREEDELIVERYANDRETURN") {
      temp.length &&
        temp.forEach((item) => {
          amount += item.finalPrice;
          amount += item.selectedAmount == "free" ? 0 : item.selectedAmount;
        });
    }
    if (type === "NOFREEDELIVERYANDRETURN") {
      temp.length &&
        temp.forEach((item) => {
          amount += item.finalPrice;
          amount += item.selectedAmount;
          amount += item.returnAmount;
        });
    }
    setFinalPrice(parseInt(amount, 10));
  }, [deliveryType]);
  const renderContent = (value) => {
    switch (value) {
      case "FREEDELIVERYANDRETURN":
        return renderFreeDelivery();
      case "NOFREEDELIVERYANDRETURN":
        return renderNoFreeDelivery();
      default:
        return null;
    }
  };
  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      ModalTitle=""
      headerBorder=""
      showPositionedClose
      showCloseIcon={false}
      ModalWidth={type === "NOFREEDELIVERYANDRETURN" ? 950 : 750}
      footerClassName="justify-content-end"
      saveBtnText="Add To Cart"
      onSaveBtnClick={() => {
        handleAddToCart();
      }}
    >
      {renderContent(type)}
      {showConfirmModal ? (
        <ModalComponent
          open={showConfirmModal}
          showHeader={false}
          saveBtnText="No"
          ClearBtnText="Yes, Proceed"
          saveBtnVariant="outlined"
          clearBtnVariant="contained"
          onSaveBtnClick={() => {
            setShowConfirmModal(false);
          }}
          onClearBtnClick={() => {
            handleAddToCart(true);
          }}
        >
          <Typography className="mt-4 mb-2 fw-bold">
            If you add this product to the cart, it will replace any existing
            items from other stores. Do you still wish to proceed?
          </Typography>
        </ModalComponent>
      ) : null}
    </ModalComponent>
  );
};

export default AddToCartModal;
