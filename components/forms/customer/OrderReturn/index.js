/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import { returnProduct } from "services/customer/orders";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";
import ReturnOrderModel from "../returnordermodel/ReturnOrderModel";
import PickUpAddress from "../address/pickupaddress";

const OrderReturn = ({
  showReturnOrder,
  selectedProduct,
  setSelectedProduct = () => {},
  returnProducts = [],
  setShowReturnOrder = () => {},
  setgetOrderApiCall = () => {},
  getOrderApiCall,
}) => {
  const user = useSelector((state) => state.user);
  const address = useSelector((state) => state.customer.addressDetails);
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(true);
  const [showOrderSummary, setshowOrderSummary] = useState(false);
  const [products, setProducts] = useState([]);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [returnSucceccData, setreturnSucceccData] = useState([]);
  const [addressList, setaddressList] = useState([]);
  useEffect(() => {
    setProducts([...returnProducts]);
  }, [returnProducts]);
  const getOrderSummary = () => {
    return selectedProduct.map((ele) => {
      return (
        <Box className="mx-2 my-3">
          <Grid container key={ele.orderId}>
            <Grid item sm={2} className="">
              <Image src={ele.productImage} height={85} width={85} />
            </Grid>
            <Grid item sm={7}>
              <Typography className="theme_color">
                Supplier Name: {ele.businessName}
              </Typography>
              <Typography className="h-5  my-1">{ele.title}</Typography>
              <Typography component="span" className="h-5 me-2">
                Order Type :
              </Typography>
              <Typography component="span" className="h-5">
                Dummy data
              </Typography>
              <Typography className="h-5">
                Return Charges :{" "}
                <span className="text-danger">₹dummy data</span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    });
  };

  const returnProductFunction = async (ele) => {
    let payload = [];
    selectedProduct.forEach((val) => {
      payload = [
        ...payload,
        {
          orderId: val.orderId,
          emailAddress: user.emailId,
          addressId: ele.addressId,
          reason: val?.dropDownValue?.value,
          productImage: val.productImage,
        },
      ];
    });
    // const reqBody = { orderActions: [...payload] };
    const returnAction = "RETURN";
    const { data, errRes } = await returnProduct(payload, returnAction);
    if (data) {
      setreturnSucceccData(data.data);

      toastify(data.data.message, "success");
      setShowOrderSuccessModal(true);
    } else if (errRes) {
      toastify(errRes?.response?.data?.message, "error");
    }
  };
  const getTotalPrice = () => {
    let temp = 0;
    products.map((ele) => {
      temp += parseInt(ele.price, 10);
      return null;
    });
    return temp;
  };
  return (
    <Box>
      <div
        className="d-flex fw-600"
        onClick={() => {
          setShowReturnOrder(false);
        }}
      >
        <CustomIcon type="keyboardBackspaceIcon" />
        <p className="cursor-pointer">Back</p>
      </div>
      <Grid container>
        <Grid item sm={9}>
          <Box className="mxh-79vh overflow-auto hide-scrollbar">
            <Paper className="d-flex justify-content-between align-items-center px-2 rounded-0">
              <Box className="d-flex my-2">
                <Box>
                  <Typography className="mark me-3 py-1 px-2" component="span">
                    1
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-secondary fw-bold h-5">
                    Login
                  </Typography>
                  <Box>
                    <Typography component="span" className="fw-bold h-5 me-3">
                      User Name
                    </Typography>
                    <Typography
                      component="span"
                      className="text-secondary fw-bold h-5"
                    >
                      {address.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <ButtonComponent
                  label="Change"
                  muiProps="px-4"
                  variant="outlined"
                />
              </Box>
            </Paper>
            <Paper
              className="my-2"
              onClick={() => {
                if (!showDeliveryAddress) {
                  setShowDeliveryAddress(true);
                }
              }}
            >
              <Box className="d-flex justify-content-between align-items-center px-2 rounded-0">
                <Box className="d-flex my-2">
                  <Box>
                    <Typography
                      className="mark me-3 py-1 px-2"
                      component="span"
                    >
                      2
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="text-secondary fw-bold h-5">
                      Pickup Address
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {showDeliveryAddress ? (
                    <ButtonComponent
                      label="Continue"
                      muiProps="px-4"
                      onBtnClick={() => {
                        setShowDeliveryAddress(false);
                        setshowOrderSummary(true);
                      }}
                    />
                  ) : null}
                </Box>
              </Box>
              <Divider variant="middle" />
              {/* <Box className="py-2">{getDeliveryAddress()}</Box> */}
              {showDeliveryAddress ? (
                <>
                  {addressList.map((ele) => {
                    if (ele.primary) {
                      return (
                        <Paper className="d-flex  p-2 rounded-0">
                          <Box className="mx-5">
                            <Box className="">
                              <Typography className="fw-bold h-5">
                                {ele.name}
                              </Typography>
                              <Typography className="fw-bold h-5">
                                {ele.mobileNumber}
                              </Typography>
                            </Box>
                            <Typography className="h-5">
                              {ele.address}
                            </Typography>
                            <Typography className="h-5">
                              {ele.cityDistrictTown}
                            </Typography>
                            <Typography className="h-5">{ele.state}</Typography>
                            <Typography className="h-5">
                              {ele.location} - {ele.pinCode}
                            </Typography>
                            <Box className="d-flex">
                              {ele.latitudeValue && (
                                <Typography className="h-5">
                                  Latitude : {ele.latitudeValue}
                                </Typography>
                              )}
                              {ele.langitude && (
                                <Typography className="h-5 mx-3">
                                  Langitude : {ele.langitude}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Paper>
                      );
                    }
                  })}
                  <PickUpAddress
                    pageType="customer"
                    setaddressList={setaddressList}
                  />
                </>
              ) : (
                // eslint-disable-next-line array-callback-return
                addressList.map((ele) => {
                  if (ele.primary) {
                    return (
                      <Box className=" " key={ele.addressId}>
                        <Paper className="d-flex  p-2 rounded-0">
                          <Box className="mx-5">
                            <Box className="">
                              <Typography className="fw-bold h-5">
                                {ele.name}
                              </Typography>
                              <Typography className="fw-bold h-5">
                                {ele.mobileNumber}
                              </Typography>
                            </Box>
                            <Typography className="h-5">
                              {ele.address}
                            </Typography>
                          </Box>
                        </Paper>
                        <Paper className="my-2">
                          <Box className="d-flex justify-content-between align-items-center px-2 rounded-0">
                            <Box className="d-flex my-2">
                              <Box>
                                <Typography
                                  className="mark me-3 py-1 px-2"
                                  component="span"
                                >
                                  3
                                </Typography>
                              </Box>
                              <Box>
                                <Typography className="text-secondary fw-bold h-5">
                                  Return Order Summary
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              {showDeliveryAddress ? (
                                <ButtonComponent
                                  label="Continue"
                                  muiProps="px-4"
                                  onBtnClick={() =>
                                    setShowDeliveryAddress(false)
                                  }
                                />
                              ) : null}
                            </Box>
                          </Box>
                          <Divider variant="middle" />
                          <Box className="py-2 mxh-300 overflow-auto hide-scrollbar">
                            {showOrderSummary ? getOrderSummary() : null}
                          </Box>
                        </Paper>

                        <Paper className="d-flex justify-content-between align-items-center p-2">
                          <Typography>
                            Return Order confirmation will be sent to{" "}
                            <span className="fw-bold">xyz.gmail.com</span>{" "}
                          </Typography>
                          <ButtonComponent
                            label="Continue"
                            onBtnClick={() => {
                              returnProductFunction(ele);
                            }}
                          />
                        </Paper>
                      </Box>
                    );
                  }
                })
              )}
            </Paper>
          </Box>
        </Grid>
        {products.length ? (
          <Grid item sm={3}>
            <Paper className="ms-2 p-2">
              <Typography className="text-secondary h-5 fw-bold">
                Return Order Charges
              </Typography>
              <Divider />
              <Box className="d-flex justify-content-between align-items-center">
                <Typography className="h-5  my-2">
                  Total item for return shipment
                </Typography>
                <Typography className="h-5 ">{products.length}</Typography>
              </Box>
              <Box className="d-flex justify-content-between">
                <Typography className="h-5  my-2">
                  Return Shipment Charges
                </Typography>
                <Typography className="h-5  my-2">Rs.123</Typography>
              </Box>
              <Divider />
              <Box className="d-flex justify-content-between align-items-center my-2">
                <Typography className="h-5 fw-bold">Total payable</Typography>
                <Typography className="h-5 fw-bold">
                  {getTotalPrice()}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : null}
      </Grid>
      <ReturnOrderModel
        setgetOrderApiCall={setgetOrderApiCall}
        getOrderApiCall={getOrderApiCall}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        showReturnOrder={showReturnOrder}
        setShowReturnOrder={setShowReturnOrder}
        returnSuccessData={returnSucceccData}
        setreturnSuccessData={setreturnSucceccData}
        showModal={showOrderSuccessModal}
        setShowModal={setShowOrderSuccessModal}
      />
    </Box>
  );
};
export default OrderReturn;
