import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { customerHome } from "public/assets";
import { useState, useEffect } from "react";
import {
  getDeliveryOptions,
  getProductDetailsByDeliveryType,
} from "services/customer/cart";

const DeliveryOptionsModal = ({
  modalOpen = false,
  setModalOpen = () => {},
  productId = "",
}) => {
  const tabList = [
    {
      id: "FREEDELIVERYANDRETURN",
      label: "Free Delivery Returns",
    },
    {
      id: "NOFREEDELIVERYANDRETURN",
      label: "No Free Delivery Returns",
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
  const [selectedTab, setSelectedTab] = useState("FREEDELIVERYANDRETURN");
  const [noFreeRetunModal, setNoFreeReturnModal] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [
    selectedDeliveryandReturnCharges,
    setSelectedDeliveryandReturnCharges,
  ] = useState({ ...initialCharges });
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [finalPriceWithDeliveryCharges, setFinalPriceWithDeliveryCharge] =
    useState(0);

  const getAllTabList = async () => {
    const { data } = await getDeliveryOptions(productId);
    if (data) {
      setDeliveryOptions([...data]);
    }
    setSelectedTab(tabList[0].id);
    if (tabList[0].label === "No Free Delivery Returns") {
      setNoFreeReturnModal(true);
    } else {
      setNoFreeReturnModal(false);
    }
  };

  useEffect(() => {
    getAllTabList();
  }, []);

  const getProductDetails = async (type) => {
    const { data } = await getProductDetailsByDeliveryType(
      productId,
      type ?? selectedTab
    );
    if (data) {
      setFinalPriceWithDeliveryCharge(data?.finalPrice);
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
      });
    }
  };

  useEffect(() => {
    getProductDetails("FREEDELIVERYANDRETURN");
  }, []);

  useEffect(() => {
    setSelectedDeliveryandReturnCharges({ ...initialCharges });
  }, [selectedTab]);
  const handleChangeTab = (item) => {
    getProductDetails(item.id);
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
              item.id === selectedTab ? "bg-orange color-white" : ``
            } border rounded-pill cursor-pointer`}
            paddingY={1}
            paddingX={1.5}
            onClick={() => {
              handleChangeTab(item);
            }}
          >
            <Typography className="h-5 cursor-pointer">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    );
  };
  const renderGeneralModal = () => {
    if (deliveryOptions.includes(selectedTab))
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
            <Typography className="h-5">
              {productDetails?.description}
            </Typography>
            {selectedTab === "FREEDELIVERYANDRETURN" ? (
              <CheckBoxComponent
                label={`${productDetails.fastDeliveryCharges} - Fastest delivery by sunday , sep 18`}
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
    return (
      <Box className="position-relative">
        <Image
          src={customerHome.deliveryOptionModal}
          height={400}
          width={750}
        />
      </Box>
    );
  };
  const renderNoFreeRetunModal = () => {
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
          <Typography className="h-5">{productDetails?.description}</Typography>
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
                label={`${productDetails?.deliveryCharges}- Delivery by wed, sep 22`}
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
              label={`${productDetails?.fastDeliveryCharges} - Fastest Delivery by wed, sep 22`}
            />
          </Box>
          <Box className="border-top border-dark-gray ps-4">
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
                disabled={!selectedDeliveryandReturnCharges?.chooseReturnOption}
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
                label={`${productDetails?.returnCharges} - Return by wed, sep 22`}
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
              label={`${productDetails?.fastReturnCharges}- Fastest Return by mon, sep 22`}
            />
          </Box>
        </Grid>
      </Grid>
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
          deliveryOptions?.includes(selectedTab)
            ? "border-top border-bottom border-dark-gray"
            : ""
        } mb-1`}
      >
        <Box>
          {noFreeRetunModal ? renderNoFreeRetunModal() : renderGeneralModal()}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={deliveryOptions?.includes(selectedTab) ? "" : "d-none"}
      >
        <Box marginLeft={2}>
          <Typography className="d-flex align-items-center">
            <span className="h-4">Final Price -</span>{" "}
            <span className="h-3 color-orange">&nbsp;{getFinalPrice()}</span>
          </Typography>
        </Box>
        <Box className="mb-2">
          <ButtonComponent
            label="Add to Cart"
            muiProps="color-black me-3 border-black"
            variant="outlined"
          />
          <ButtonComponent label="Proceed to Checkout" />
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default DeliveryOptionsModal;
