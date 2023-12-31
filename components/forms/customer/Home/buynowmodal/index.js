/* eslint-disable react/no-danger */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { cartCount } from "features/customerSlice";
import Image from "next/image";
import { customerHome } from "public/assets";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { countCart } from "services/admin/storeList";
import {
  // addProductToCart,
  editCartProduct,
  getDeliveryOptions,
  getProductDetailsByDeliveryType,
} from "services/customer/cart";
import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const DeliveryOptionsModal = ({
  modalOpen = false,
  setModalOpen = () => {},
  getProducts = () => {},
  productId = "",
  skuId = "",
  modalType = "ADD",
  choosedDeliveryandReturnCharges = {},
}) => {
  const tabList = [
    {
      id: "NOFREEDELIVERYANDRETURN",
      label: "No Free Delivery Returns",
    },
    {
      id: "FREEDELIVERYANDRETURN",
      label: "Free Delivery Returns",
    },
    {
      id: "STOREOWNERDELIVERY",
      label: "Store Owner Delivery",
    },
    {
      id: "HANDPICK",
      label: "Hand Pick",
    },
  ];
  const initialCharges = {
    freeDeliveryFastDelivery: false,
    noFreeDeliveryStandardDelivery: true,
    noFreeDeliveryFastDelivery: false,
    noFreeDeliveryStandardReturn: false,
    noFreeDeliveryFastReturn: false,
    chooseReturnOption: false,
  };
  const { userId, profileId } = useSelector((state) => state.customer);

  const [selectedTab, setSelectedTab] = useState("");
  const [noFreeRetunModal, setNoFreeReturnModal] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [
    selectedDeliveryandReturnCharges,
    setSelectedDeliveryandReturnCharges,
  ] = useState({ ...initialCharges });
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [finalPriceWithDeliveryCharges, setFinalPriceWithDeliveryCharge] =
    useState(0);
  const customer = useSelector((state) => state.customer);

  const queryClient = useQueryClient();

  const getAllTabList = async () => {
    const { data } = await getDeliveryOptions(productId);
    if (data) {
      setDeliveryOptions([...data]);
    }
    // setSelectedTab(tabList[0].id);
    if (
      modalType === "ADD" ||
      (modalType === "EDIT" &&
        JSON.parse(JSON.stringify(choosedDeliveryandReturnCharges))
          ?.deliveryOption === "NOFREEDELIVERYANDRETURN")
    ) {
      setNoFreeReturnModal(true);
    } else {
      setNoFreeReturnModal(false);
    }
  };

  useEffect(() => {
    if (modalType === "EDIT") {
      const deliveryOrReturnOptions = JSON.parse(
        JSON.stringify(choosedDeliveryandReturnCharges)
      );
      setSelectedDeliveryandReturnCharges({
        ...selectedDeliveryandReturnCharges,
        freeDeliveryFastDelivery:
          JSON.parse(JSON.stringify(choosedDeliveryandReturnCharges))
            ?.deliveryOption === "FREEDELIVERYANDRETURN"
            ? deliveryOrReturnOptions.deliveryOrReturnOptions?.fastDelivery
            : false,
        noFreeDeliveryFastDelivery:
          deliveryOrReturnOptions?.deliveryOrReturnOptions?.fastDelivery,
        noFreeDeliveryFastReturn:
          deliveryOrReturnOptions?.deliveryOrReturnOptions?.fastReturn,
        noFreeDeliveryStandardDelivery:
          deliveryOrReturnOptions?.deliveryOrReturnOptions?.standardDelivery,
        noFreeDeliveryStandardReturn:
          deliveryOrReturnOptions?.deliveryOrReturnOptions?.standardReturn,
        chooseReturnOption:
          deliveryOrReturnOptions.deliveryOrReturnOptions?.standardReturn ||
          deliveryOrReturnOptions.deliveryOrReturnOptions?.fastReturn,
      });
    }
    if (modalType === "ADD") {
      setSelectedTab("NOFREEDELIVERYANDRETURN");
    } else {
      setSelectedTab(
        JSON.parse(JSON.stringify(choosedDeliveryandReturnCharges))
          ?.deliveryOption
      );
    }
  }, [modalType]);

  useEffect(() => {
    getAllTabList();
  }, []);

  const getProductDetails = async (type) => {
    const { data } = await getProductDetailsByDeliveryType(
      productId,
      type ?? selectedTab,
      profileId
    );
    if (data) {
      if (modalType === "ADD") {
        setFinalPriceWithDeliveryCharge(data?.finalPrice);
      } else {
        const { deliveryOrReturnOptions } = choosedDeliveryandReturnCharges;
        const temp = JSON.parse(JSON.stringify(deliveryOrReturnOptions));
        if (temp.fastDelivery) {
          setFinalPriceWithDeliveryCharge(
            data.salePrice + data.productDeliveryCharges?.fastestDeliveryAmount
          );
        }
        if (temp.standardDelivery) {
          setFinalPriceWithDeliveryCharge(
            data.salePrice + data.productDeliveryCharges?.deliveryAmount
          );
        }
      }
      setProductDetails({
        ...productDetails,
        id: data.productVariationId,
        image: data.variationMedia,
        title: data.productTitle,
        finalPrice: data.finalPrice,
        deliveryCharges: data.productDeliveryCharges?.deliveryAmount,
        fastDeliveryCharges: data.productDeliveryCharges?.fastestDeliveryAmount,
        returnCharges: data.productReturnCharges?.returnAmount,
        fastReturnCharges: data.productReturnCharges?.fastestReturnAmount,
        description: data.longDescription,
        rtoAccepted: data.rtoAccepted,
        deliveryBy: data.productDeliveryCharges?.deliveryBy,
        fastestDeliveryBy: data.productDeliveryCharges?.fastestDeliveryBy,
        returnBy: data.productReturnCharges?.deliveryBy,
        fastestReturnBy: data.productReturnCharges?.fastestDeliveryBy,
      });
    }
  };

  useEffect(() => {
    if (modalType === "ADD") {
      getProductDetails("NOFREEDELIVERYANDRETURN");
    } else {
      getProductDetails(
        JSON.parse(JSON.stringify(choosedDeliveryandReturnCharges))
          ?.deliveryOption
      );
    }
  }, [modalType]);

  useEffect(() => {
    if (modalType === "ADD") {
      setSelectedDeliveryandReturnCharges({ ...initialCharges });
    }
  }, [selectedTab]);

  const handleChangeTab = (item) => {
    if (deliveryOptions?.includes(item?.id)) getProductDetails(item.id);
    setSelectedTab(item.id);
    if (item.label == "No Free Delivery Returns") {
      setNoFreeReturnModal(true);
    } else {
      setNoFreeReturnModal(false);
    }
  };
  const renderTabList = () => {
    return (
      <Box display="flex" justifyContent="space-evenly" marginBottom={2}>
        {tabList.map((item) => (
          <Box
            className={`${
              item.id === selectedTab ? "theme_bg_color color-white" : ``
            } border rounded-pill cursor-pointer`}
            paddingY={1}
            paddingX={1.5}
            onClick={() => {
              handleChangeTab(item);
              setProductDetails({});
            }}
          >
            <Typography className="h-5 cursor-pointer">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const getDeliveryCharge = (deliveryType) => {
    let result = null;
    if (selectedTab === "FREEDELIVERYANDRETURN") {
      if (
        selectedDeliveryandReturnCharges?.freeDeliveryFastDelivery &&
        deliveryType === "fast"
      ) {
        return Number(productDetails.fastDeliveryCharges);
      }
    }
    if (selectedTab === "NOFREEDELIVERYANDRETURN") {
      Object.entries(selectedDeliveryandReturnCharges).forEach(
        ([key, value]) => {
          if (value) {
            if (
              key === "noFreeDeliveryFastDelivery" &&
              deliveryType === "fast"
            ) {
              result = Number(productDetails.fastDeliveryCharges);
            }
            if (
              key === "noFreeDeliveryStandardDelivery" &&
              deliveryType === "standard"
            ) {
              result = Number(productDetails?.deliveryCharges);
            }
          }
        }
      );
    }
    return result;
  };
  const getReturnCharge = (returnType) => {
    let result = null;
    if (selectedTab === "NOFREEDELIVERYANDRETURN") {
      Object.entries(selectedDeliveryandReturnCharges).forEach(
        ([key, value]) => {
          if (value) {
            if (key === "noFreeDeliveryFastReturn" && returnType === "fast") {
              result = Number(productDetails.fastReturnCharges);
            }
            if (
              key === "noFreeDeliveryStandardReturn" &&
              returnType === "standard"
            ) {
              result = Number(productDetails?.returnCharges);
            }
          }
        }
      );
    }
    return result;
  };

  const dispatch = useDispatch();

  const addToCartMutation = useMutation(
    (reqObj) => {
      return serviceUtil.post(`products/product/user-cart`, reqObj);
    },
    {
      onSuccess: async ({ data }) => {
        if (!data?.popUp) {
          const { data: count } = await countCart(customer.profileId);
          if (count) {
            dispatch(cartCount({ cartCount: count }));
          }

          queryClient.invalidateQueries(["POPULARDEPARTMENTS"]);
          queryClient.refetchQueries("POPULARDEPARTMENTS", { force: true });
          queryClient.invalidateQueries(["RECENTLYVIEWED"]);
          queryClient.refetchQueries("RECENTLYVIEWED", { force: true });
          queryClient.invalidateQueries(["CARTCOUNT"]);
          queryClient.refetchQueries("CARTCOUNT", { force: true });
          setModalOpen(false);
          toastify(data?.message, "success");
          getProducts();
          // dispatch(
          //   cartCount({
          //     productId: item?.id,
          //     variationDetails: item.variationDetails,
          //   })
          // );
        } else setShowConfirmModal(true);
      },
      onError: (err) => {
        toastify(err?.response?.data?.message, "error");
      },
    }
  );

  const handleSubmit = async (flag = false) => {
    if (modalType === "ADD") {
      const payload = {
        profileId,
        customerId: userId,
        cartProduct: [
          {
            productId,
            quantity: 1,
            orderType: selectedTab,
            skuId,
            fastestDeliveryAmount: getDeliveryCharge("fast"),
            deliveryCharge: getDeliveryCharge("standard"),
            fastestReturnAmount: getReturnCharge("fast"),
            returnCharge: getReturnCharge("standard"),
          },
        ],
        flag,
      };
      addToCartMutation.mutate(payload);
      // const { data, err } = await addProductToCart(payload);
      // if (data) {
      //   if (!data?.popUp) {
      //     toastify(data?.message, "success");
      //     setModalOpen(false);
      //     getProducts();
      //   } else setShowConfirmModal(true);
      // }
      // if (err) {
      //   toastify(err?.response?.data?.message, "error");
      // }
    }
    if (modalType === "EDIT") {
      const payload = {
        profileId,
        orderType: selectedTab,
        productId,
        deliveryCharge: getDeliveryCharge("standard"),
        fastestDeliveryAmount: getDeliveryCharge("fast"),
        fastestReturnAmount: getReturnCharge("fast"),
        returnCharge: getReturnCharge("standard"),
      };
      const { data, err } = await editCartProduct(payload);
      if (data) {
        toastify(data?.message, "success");
        setModalOpen(false);
        getProducts();
        const { data: count } = await countCart(customer.profileId);
        if (count) {
          dispatch(cartCount({ cartCount: count }));
        }
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };
  const renderGeneralModal = () => {
    if (deliveryOptions.includes(selectedTab)) {
      if (Object.keys(productDetails)?.length) {
        return (
          <Grid container marginY={2} marginLeft={2}>
            <Grid item xs={3}>
              <Image
                src={productDetails?.image}
                alt="image"
                height={100}
                width={100}
                className="border"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography className="h-4 fw-bold">
                {productDetails?.title}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails?.description,
                }}
              />

              {selectedTab === "FREEDELIVERYANDRETURN" ? (
                <CheckBoxComponent
                  label={` ₹ ${productDetails.fastDeliveryCharges} - ${productDetails?.fastestDeliveryBy}`}
                  isChecked={
                    selectedDeliveryandReturnCharges?.freeDeliveryFastDelivery
                  }
                  checkBoxClick={() => {
                    if (
                      !selectedDeliveryandReturnCharges?.freeDeliveryFastDelivery
                    ) {
                      setProductDetails({
                        ...productDetails,
                        finalPrice:
                          productDetails?.finalPrice +
                          productDetails?.fastDeliveryCharges,
                      });
                    } else {
                      setProductDetails({
                        ...productDetails,
                        finalPrice:
                          productDetails?.finalPrice -
                          productDetails?.fastDeliveryCharges,
                      });
                    }
                    setSelectedDeliveryandReturnCharges({
                      ...selectedDeliveryandReturnCharges,
                      freeDeliveryFastDelivery:
                        !selectedDeliveryandReturnCharges?.freeDeliveryFastDelivery,
                    });
                  }}
                />
              ) : null}
            </Grid>
          </Grid>
        );
      }
      return (
        <Box
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "300px",
          }}
        >
          <CircularProgress className="theme_color" />
        </Box>
      );
    }
    return (
      <Box className="position-relative">
        <Image
          src={customerHome.featureNotAvailable}
          height={300}
          width={750}
        />
      </Box>
    );
  };
  const renderNoFreeReturnModal = () => {
    if (Object.keys(productDetails)?.length) {
      return (
        <Grid container marginY={2} marginLeft={2}>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center">
              <Box>
                <Image
                  src={productDetails?.image}
                  alt="image"
                  height={100}
                  width={100}
                  className="border"
                />
                <Typography className="h-4 fw-bold">
                  {productDetails?.title}
                </Typography>
              </Box>
            </Box>
            {/* <Typography className="h-5">
              {productDetails?.description}
            </Typography> */}
            <div
              dangerouslySetInnerHTML={{
                __html: productDetails?.description,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Box className="ps-4">
              <CheckBoxComponent
                label="Choose Delivery options"
                size="medium"
                isChecked
              />
              <Box>
                <RadiobuttonComponent
                  isChecked={
                    selectedDeliveryandReturnCharges?.noFreeDeliveryStandardDelivery
                  }
                  label={`₹ ${productDetails?.deliveryCharges} - ${productDetails?.deliveryBy}`}
                  onRadioChange={() => {
                    setSelectedDeliveryandReturnCharges({
                      ...selectedDeliveryandReturnCharges,
                      noFreeDeliveryStandardDelivery: true,
                      noFreeDeliveryFastDelivery: false,
                    });
                    if (
                      !selectedDeliveryandReturnCharges?.noFreeDeliveryStandardDelivery
                    ) {
                      setFinalPriceWithDeliveryCharge(
                        finalPriceWithDeliveryCharges +
                          productDetails?.deliveryCharges -
                          productDetails.fastDeliveryCharges
                      );
                      setProductDetails({
                        ...productDetails,
                        finalPrice:
                          productDetails?.finalPrice +
                          productDetails?.deliveryCharges -
                          productDetails.fastDeliveryCharges,
                      });
                    }
                  }}
                />
              </Box>
              <RadiobuttonComponent
                isChecked={
                  selectedDeliveryandReturnCharges?.noFreeDeliveryFastDelivery
                }
                onRadioChange={() => {
                  setSelectedDeliveryandReturnCharges({
                    ...selectedDeliveryandReturnCharges,
                    noFreeDeliveryStandardDelivery: false,
                    noFreeDeliveryFastDelivery: true,
                  });
                  if (
                    !selectedDeliveryandReturnCharges?.noFreeDeliveryFastDelivery
                  ) {
                    setFinalPriceWithDeliveryCharge(
                      finalPriceWithDeliveryCharges +
                        productDetails?.fastDeliveryCharges -
                        productDetails.deliveryCharges
                    );
                    setProductDetails({
                      ...productDetails,
                      finalPrice:
                        productDetails?.finalPrice +
                        productDetails?.fastDeliveryCharges -
                        productDetails.deliveryCharges,
                    });
                  }
                }}
                label={`₹ ${productDetails?.fastDeliveryCharges} - ${productDetails?.fastestDeliveryBy}`}
              />
            </Box>
            <Box
              className={`border-top border-dark-gray ps-4 ${
                productDetails?.rtoAccepted ? "" : "d-none"
              }`}
            >
              <CheckBoxComponent
                label="Choose Return options"
                size="medium"
                isChecked={selectedDeliveryandReturnCharges?.chooseReturnOption}
                checkBoxClick={() => {
                  if (!selectedDeliveryandReturnCharges?.chooseReturnOption) {
                    setProductDetails({
                      ...productDetails,
                      finalPrice:
                        finalPriceWithDeliveryCharges +
                        productDetails?.returnCharges,
                    });
                  } else {
                    setProductDetails({
                      ...productDetails,
                      finalPrice: finalPriceWithDeliveryCharges,
                    });
                  }
                  setSelectedDeliveryandReturnCharges({
                    ...selectedDeliveryandReturnCharges,
                    chooseReturnOption:
                      !selectedDeliveryandReturnCharges?.chooseReturnOption,
                    noFreeDeliveryStandardReturn:
                      !selectedDeliveryandReturnCharges?.noFreeDeliveryFastReturn
                        ? !selectedDeliveryandReturnCharges?.noFreeDeliveryStandardReturn
                        : false,
                    noFreeDeliveryFastReturn: false,
                  });
                }}
              />
              <Box>
                <RadiobuttonComponent
                  disabled={
                    !selectedDeliveryandReturnCharges?.chooseReturnOption
                  }
                  isChecked={
                    selectedDeliveryandReturnCharges?.noFreeDeliveryStandardReturn
                  }
                  onRadioChange={() => {
                    if (
                      !selectedDeliveryandReturnCharges?.noFreeDeliveryStandardReturn
                    ) {
                      setProductDetails(() => ({
                        ...productDetails,
                        finalPrice:
                          finalPriceWithDeliveryCharges +
                          productDetails?.returnCharges,
                      }));
                    }
                    setSelectedDeliveryandReturnCharges({
                      ...selectedDeliveryandReturnCharges,
                      noFreeDeliveryStandardReturn: true,
                      noFreeDeliveryFastReturn: false,
                    });
                  }}
                  label={`₹ ${productDetails?.returnCharges} - ${productDetails?.returnBy}`}
                />
              </Box>
              <RadiobuttonComponent
                disabled={!selectedDeliveryandReturnCharges?.chooseReturnOption}
                isChecked={
                  selectedDeliveryandReturnCharges?.noFreeDeliveryFastReturn
                }
                onRadioChange={() => {
                  if (
                    !selectedDeliveryandReturnCharges?.noFreeDeliveryFastReturn
                  ) {
                    setProductDetails(() => ({
                      ...productDetails,
                      finalPrice:
                        finalPriceWithDeliveryCharges +
                        productDetails?.fastReturnCharges,
                    }));
                  }
                  setSelectedDeliveryandReturnCharges({
                    ...selectedDeliveryandReturnCharges,
                    noFreeDeliveryStandardReturn: false,
                    noFreeDeliveryFastReturn: true,
                  });
                }}
                label={`₹ ${productDetails?.fastReturnCharges} - ${productDetails?.fastestReturnBy}`}
              />
            </Box>
          </Grid>
        </Grid>
      );
    }
    return (
      <Box
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "300px",
        }}
      >
        <CircularProgress className="theme_color" />
      </Box>
    );
  };
  const getFinalPrice = (price) => {
    return price ?? productDetails?.finalPrice;
  };

  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => {
        setModalOpen(false);
      }}
      showPositionedClose
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      ModalWidth={750}
      showFooter={false}
    >
      <Box>{tabList.length ? renderTabList() : null}</Box>
      <Box
        className={`${
          deliveryOptions?.includes(selectedTab) &&
          Object.keys(productDetails)?.length
            ? "border-top border-bottom border-dark-gray"
            : ""
        } mb-1`}
      >
        <Box>
          {noFreeRetunModal ? renderNoFreeReturnModal() : renderGeneralModal()}
        </Box>
      </Box>
      {Object.keys(productDetails)?.length ? (
        <Box
          display="flex"
          justifyContent="space-between"
          className={deliveryOptions?.includes(selectedTab) ? "" : "d-none"}
        >
          <Box marginLeft={2}>
            <Typography className="d-flex align-items-center">
              <span className="h-4">Final Price -</span>
              <span className="h-3">&nbsp;₹ </span>
              <span className="h-3 theme_color">&nbsp;{getFinalPrice()}</span>
            </Typography>
          </Box>
          <Box className="mb-2">
            <ButtonComponent
              label={modalType === "ADD" ? "Add to Cart" : "Update Cart"}
              muiProps="color-black me-3 border-black"
              variant="outlined"
              onBtnClick={() => {
                handleSubmit();
              }}
            />
            <ButtonComponent label="Proceed to Checkout" />
          </Box>
        </Box>
      ) : null}
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
            setModalOpen(false);
          }}
          onClearBtnClick={() => {
            handleSubmit(true);
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

export default DeliveryOptionsModal;
