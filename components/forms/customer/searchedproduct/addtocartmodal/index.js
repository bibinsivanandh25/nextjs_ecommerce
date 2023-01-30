import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import {
  // addProductToCart,
  getProductDetailsByDeliveryType,
} from "services/customer/cart";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const AddToCartModal = ({
  type = "",
  showAddtoCartModal,
  setShowAddtoCartModal = () => {},
  productId = "",
  count,
  getProducts = () => {},
  setViewModalOpen = () => {},
}) => {
  const [masterData, setMasterData] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [price, setPrice] = useState({
    deliveryAmount: 0,
    returnAmount: 0,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const getAddToCartData = async () => {
    const { data } = await getProductDetailsByDeliveryType(productId, type);
    if (data) {
      let temp;
      if (type === "FREEDELIVERYANDRETURN") {
        temp = {
          price: data.finalPrice,
          finalPrice: data.finalPrice,
          productId: data.productVariationId,
          productTitle: data.productTitle,
          skuId: data.skuId,
          fastestDeliveryAmount:
            data.productDeliveryCharges.fastestDeliveryAmount,
          deliveryCharge: data.productDeliveryCharges.deliveryAmount,
          fastestReturnAmount: null,
          returnCharge: null,
          selectedAmount: 0,
          variationMedia: data.variationMedia,
          fastestDeliveryBy: data.productDeliveryCharges.fastestDeliveryBy,
          deliveryBy: data.productDeliveryCharges.deliveryBy,
        };
      }
      if (type == "NOFREEDELIVERYANDRETURN") {
        temp = {
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
      }
      setFinalPrice(data.finalPrice);
      setPrice({ deliveryAmount: 0, returnAmount: 0 });
      setMasterData(temp);
    }
  };
  useEffect(() => {
    getAddToCartData();
  }, []);
  const handleReturnCheckClick = () => {
    setPrice((pre) => ({
      ...pre,
      returnAmount: masterData.enableReturn ? 0 : masterData.returnCharge,
    }));
    setMasterData((pre) => ({
      ...pre,
      enableReturn: !masterData.enableReturn,
      returnAmount: masterData.enableReturn ? 0 : masterData.returnCharge,
    }));
  };
  const handleReturnRadioChange = (val) => {
    setPrice((pre) => ({ ...pre, returnAmount: val }));
    setMasterData((pre) => ({
      ...pre,
      returnAmount: val,
    }));
  };
  const [selectedPrice, setSelectedPrice] = useState(0);
  useEffect(() => {
    const temp = finalPrice + price.deliveryAmount + price.returnAmount;
    setSelectedPrice(temp);
  }, [price, finalPrice]);
  const handleDeliveryChargeClick = (val, flag) => {
    if (flag === "normal") {
      setFinalPrice(masterData.finalPrice);
      setPrice((pre) => ({ ...pre, deliveryAmount: 0 }));
    } else if (flag === "fast") {
      setFinalPrice(masterData.finalPrice - masterData.deliveryCharge);
      setPrice((pre) => ({
        ...pre,
        deliveryAmount: val,
      }));
    }
    setMasterData((pre) => ({
      ...pre,
      selectedAmount: val,
    }));
  };
  const renderNoFreeDelivery = () => {
    return (
      <Grid container>
        <Grid item sm={12}>
          <Grid container>
            <Grid item sm={12}>
              <Box className="border-bottom-gray">
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
                        ₹ {masterData?.deliveryCharge} {masterData?.deliveryBy}
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
                        ₹ {masterData?.fastestDeliveryAmount}{" "}
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
              <Box className="border-bottom-gray">
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
                        ₹ {masterData?.returnCharge} {masterData?.deliveryBy}
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
                        ₹ {masterData?.fastestReturnAmount}{" "}
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
          <Box display="flex" justifyContent="center" mt={1}>
            <Typography className="fw-500">
              Final Price -{" "}
              <span className="color-orange fw-bold">{selectedPrice}</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  };
  const renderFreeDelivery = () => {
    return (
      <Grid container>
        <Grid item sm={12}>
          <Typography className="color-orange fw-bold my-1">
            Choose Delivery options
          </Typography>
          <Box>
            <RadiobuttonComponent
              isChecked={masterData.selectedAmount === 0}
              size="small"
              label={
                <Typography className="h-p89">
                  Free&nbsp;{masterData.deliveryBy}
                </Typography>
              }
              onRadioChange={() => {
                setMasterData((pre) => ({
                  ...pre,
                  selectedAmount: 0,
                  price: masterData.finalPrice,
                }));
              }}
            />
          </Box>
          <Box className="border-bottom-gray">
            <RadiobuttonComponent
              onRadioChange={() => {
                setMasterData((pre) => ({
                  ...pre,
                  selectedAmount: masterData.fastestDeliveryAmount,
                  price:
                    masterData.finalPrice + masterData.fastestDeliveryAmount,
                }));
              }}
              isChecked={
                masterData.selectedAmount === masterData.fastestDeliveryAmount
              }
              size="small"
              label={
                <Typography className="h-p89">
                  {masterData.fastestDeliveryAmount}&nbsp;
                  {masterData.fastestDeliveryBy}
                </Typography>
              }
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={1}>
            <Typography className="fw-500">
              Final Price -{" "}
              <span className="color-orange fw-bold">
                {Number(selectedPrice).toLocaleString("en-IN")}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  };
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
  const user = useSelector((state) => state.customer);
  const createPayload = (flag) => {
    const payload = {
      profileId: user.profileId,
      customerId: user.userId,
      cartProduct: [],
      flag,
    };
    if (type == "FREEDELIVERYANDRETURN") {
      payload.cartProduct.push({
        productId: masterData.productId,
        quantity: count,
        orderType: "FREEDELIVERYRETURNS",
        skuId: masterData.skuId,
        fastestDeliveryAmount:
          masterData.selectedAmount == 0 ? null : masterData.selectedAmount,
        deliveryCharge: null,
        fastestReturnAmount: null,
        returnCharge: null,
      });
    }
    if (type === "NOFREEDELIVERYANDRETURN") {
      payload.cartProduct.push({
        productId: masterData.productId,
        quantity: count,
        orderType: "NOFREEDELIVERYANDRETURN",
        skuId: masterData.skuId,
        fastestDeliveryAmount:
          masterData.fastestDeliveryAmount === masterData.selectedAmount
            ? masterData.selectedAmount
            : null,
        deliveryCharge:
          masterData.deliveryCharge === masterData.selectedAmount
            ? masterData.selectedAmount
            : null,
        fastestReturnAmount:
          masterData.fastestReturnAmount === masterData.returnAmount
            ? masterData.returnAmount
            : null,
        returnCharge:
          masterData.returnCharge === masterData.returnAmount
            ? masterData.returnAmount
            : null,
      });
    }
    return payload;
  };

  const queryClient = useQueryClient();
  const addToCartMutation = useMutation(
    (reqObj) => {
      return serviceUtil.post(`products/product/user-cart`, reqObj);
    },
    {
      onSuccess: ({ data }) => {
        if (!data?.popUp) {
          toastify(data?.message, "success");
          setShowAddtoCartModal(false);
          setViewModalOpen(false);
          getProducts();
          queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
          queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
          queryClient.invalidateQueries(["RECENTLYVIEWED"]);
          queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
        } else setShowConfirmModal(true);
      },
      onError: (err) => {
        toastify(err?.response?.data?.message, "error");
      },
    }
  );

  const handleAddToCartClick = async (flag = false) => {
    const payload = createPayload(flag);
    addToCartMutation.mutate(payload);
    // const { data, err } = await addProductToCart(payload);
    // if (data) {
    //   if (!data?.popUp) {
    //     toastify(data?.message, "success");
    //     getProducts();

    //     setShowAddtoCartModal(false);
    //     setViewModalOpen(false);
    //   } else setShowConfirmModal(true);
    // }
    // if (err) {
    //   toastify(err?.response?.data?.message, "error");
    // }
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
      footerClassName="justify-content-center mb-2"
      ModalWidth={400}
      saveBtnText="Add To Cart"
      saveBtnVariant="outlined"
      onSaveBtnClick={() => {
        handleAddToCartClick();
      }}
      ClearBtnText="Proceed to Checkout"
      clearBtnVariant="contained"
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
            setShowAddtoCartModal(false);
          }}
          onClearBtnClick={() => {
            handleAddToCartClick(true);
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
