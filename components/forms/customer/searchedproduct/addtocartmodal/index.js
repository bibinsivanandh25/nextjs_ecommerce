import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProductDetailsByDeliveryType } from "services/customer/cart";

const AddToCartModal = ({
  type = "",
  showAddtoCartModal,
  setShowAddtoCartModal = () => {},
  productId = "",
}) => {
  const [masterData, setMasterData] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const getAddToCartData = async () => {
    const { data } = await getProductDetailsByDeliveryType(productId, type);
    if (data) {
      const temp = {
        finalPrice: data.finalPrice,
        productTitle: data.productTitle,
        productId: data.productVariationId,
        skuId: data.skuId,
        variationMedia: data.variationMedia,
        selectedAmount: data.productDeliveryCharges.deliveryAmount,
        returnAmount: 0,
        fastestDeliveryAmount:
          data.productDeliveryCharges.fastestDeliveryAmount,
        deliveryCharge: data.productDeliveryCharges.deliveryAmount,
        fastestDeliveryBy: data.productDeliveryCharges.fastestDeliveryBy,
        deliveryBy: data.productDeliveryCharges.deliveryBy,
        fastestReturnAmount: data.productReturnCharges.fastestReturnAmount,
        returnCharge: data.productReturnCharges.returnAmount,
        fastestReturnBy: data.productReturnCharges.fastestDeliveryBy,
        returnBy: data.productReturnCharges.deliveryBy,
        enableReturn: false,
      };
      setMasterData(temp);
    }
  };
  useEffect(() => {
    getAddToCartData();
  }, []);
  const handleReturnCheckClick = () => {
    setMasterData((pre) => ({
      ...pre,
      enableReturn: !masterData.enableReturn,
      returnAmount: masterData.enableReturn ? 0 : masterData.returnCharge,
    }));
  };
  const handleReturnRadioChange = (val) => {
    setMasterData((pre) => ({
      ...pre,
      returnAmount: val,
    }));
  };
  const handleDeliveryChargeClick = (val) => {
    setMasterData((pre) => ({
      ...pre,
      selectedAmount: val,
    }));
  };
  const renderNoFreeDelivery = () => {
    return (
      <Grid container>
        <Grid
          item
          sm={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Image
              height={120}
              width={120}
              src={masterData.variationMedia}
              layout="intrinsic"
              alt="alt"
            />
            <Typography className="h-p89">{masterData.productTitle}</Typography>
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Grid container>
            <Grid item sm={12}>
              <Box>
                <Typography className="color-orange fw-bold">
                  Choose Delivery options
                </Typography>
                <Box>
                  <RadiobuttonComponent
                    onRadioChange={() =>
                      handleDeliveryChargeClick(
                        masterData.deliveryCharge,
                        "normal"
                      )
                    }
                    isChecked={
                      masterData.deliveryCharge === masterData.selectedAmount
                    }
                    size="small"
                    label={
                      <Typography>
                        {masterData?.deliveryCharge} {masterData?.deliveryBy}
                      </Typography>
                    }
                  />
                </Box>
                <Box>
                  <RadiobuttonComponent
                    isChecked={
                      masterData.fastestDeliveryAmount ===
                      masterData.selectedAmount
                    }
                    onRadioChange={() =>
                      handleDeliveryChargeClick(
                        masterData.fastestDeliveryAmount,
                        "fast"
                      )
                    }
                    size="small"
                    label={
                      <Typography>
                        {masterData?.fastestDeliveryAmount}{" "}
                        {masterData?.fastestDeliveryBy}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12}>
              <CheckBoxComponent
                isChecked={masterData.enableReturn}
                label={
                  <Typography className="h-4 color-orange fw-bold">
                    Choose Return Shipment
                  </Typography>
                }
                checkBoxClick={() => {
                  handleReturnCheckClick();
                }}
              />
              <Box>
                <Box>
                  <RadiobuttonComponent
                    disabled={!masterData.enableReturn}
                    isChecked={
                      masterData.returnCharge === masterData.returnAmount
                    }
                    size="small"
                    label={
                      <Typography
                        className={`${
                          !masterData.enableReturn && `color-gray`
                        }`}
                      >
                        {masterData?.returnCharge} {masterData?.deliveryBy}
                      </Typography>
                    }
                    onRadioChange={() => {
                      handleReturnRadioChange(masterData?.returnCharge);
                    }}
                  />
                </Box>
                <Box>
                  <RadiobuttonComponent
                    disabled={!masterData.enableReturn}
                    isChecked={
                      masterData.fastestReturnAmount === masterData.returnAmount
                    }
                    size="small"
                    label={
                      <Typography
                        className={`${
                          !masterData.enableReturn && `color-gray`
                        }`}
                      >
                        {masterData?.fastestReturnAmount}{" "}
                        {masterData?.fastestDeliveryBy}
                      </Typography>
                    }
                    onRadioChange={() => {
                      handleReturnRadioChange(masterData.fastestReturnAmount);
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="end">
            <Typography className="fw-bold">
              Final Price - {masterData.finalPrice}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  };
  const renderFreeDelivery = () => {};
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
      open={showAddtoCartModal}
      onCloseIconClick={() => {
        setShowAddtoCartModal(false);
      }}
      showPositionedClose
      showCloseIcon={false}
      ModalTitle=""
      headerBorder=""
      footerClassName="justify-content-end"
      ModalWidth={600}
    >
      {renderContent(type)}
    </ModalComponent>
  );
};

export default AddToCartModal;
