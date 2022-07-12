/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ButtonComponent from "@/atoms/ButtonComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import PlusMinusButtonComponent from "@/atoms/PlusMinusButtonComponent";
import OrderSuccessModal from "@/forms/customer/OrderSuccessModal";
import NewAddress from "@/forms/customer/address/AddNewAddress";

const CheckOutOrder = () => {
  const [addressList, setAddressList] = useState([
    {
      id: 1,
      name: "Perry",
      address: "#109, 3rd Cross, 4th Main, Tokyo",
      phoneNUmber: "+91 9023934220",
      latitude: "15.898097",
      langitude: "87.678856",
      isSelected: false,
    },
    {
      id: 2,
      name: "Angela",
      address: "#987, 1st Cross, 1st Main, Argentina",
      phoneNUmber: "+91 9023934220",
      latitude: "15.898097",
      langitude: "87.678856",
      isSelected: false,
    },
    {
      id: 3,
      name: "Natasha",
      address: "#9870, 2nd Cross, 1st Main, Bangalore",
      phoneNUmber: "+91 9023934220",
      latitude: "15.898097",
      langitude: "87.678856",
      isSelected: false,
    },
    {
      id: 4,
      name: "Joker",
      address: "#9987, 1st Cross, 1st Main, Mysore",
      phoneNUmber: "+91 9023934220",
      latitude: "15.898097",
      langitude: "87.678856",
      isSelected: false,
    },
  ]);
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(true);
  const [showOrderSummary, setshowOrderSummary] = useState(false);
  const [showApplyCoupon, setShowApplyCoupon] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedDeliveryAddress, setselectedDeliveryAddress] = useState({});
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({
    name: "",
    mobilenumber: "",
    pincode: "",
    location: "",
    address: "",
    city: "",
    state: {},
    landmark: "",
    alternatenumber: "",
    latitudvalue: "",
    longitudevalue: "",
    addresstype: "",
  });
  const getproducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproducts();
  }, []);

  const getOrderSummary = () => {
    return products.map((ele, ind) => {
      return (
        <Box className="mx-2">
          <Grid container key={ele.id}>
            <Grid item sm={2} className="">
              <Image src={ele.image} height={85} width={85} />
              <Box className="mt-2">
                <PlusMinusButtonComponent
                  className="fs-5"
                  countClassName="px-3"
                />
              </Box>
            </Grid>
            <Grid item sm={7}>
              <Typography className="color-orange">
                Supplier Name: Business Name
              </Typography>
              <Typography className="h-5  my-2">{ele.title}</Typography>
              <Typography component="span" className="fw-bold me-2">
                ₹{ele.price}
              </Typography>
              <Typography
                component="span"
                className="h-5 text-decoration-line-through"
              >
                ₹ {ele.price * 4}
              </Typography>
              <div className="mt-3">
                <Typography
                  component="span"
                  className="h-5 fw-bold mx-2 cursor-pointer"
                  onClick={() => {
                    const temp = [...products];
                    temp.splice(ind, 1);
                    setProducts([...temp]);
                  }}
                >
                  Remove
                </Typography>
                <Typography component="span" className="fw-bold h-5">
                  Edit
                </Typography>
              </div>
            </Grid>
            <Grid item sm={3} justifyContent="flex-end" className="ps-3">
              <Typography className="h-5 text-end mb-3 fw-bold">
                Delivery in 6-7 Days
              </Typography>
              <Typography className="h-5 fw-bold">
                Order Type : Free Delivery & Return
              </Typography>
              <Typography className="h-5 fw-bold">
                Delivery Charge : Free{" "}
              </Typography>
              <Typography className="h-5 fw-bold">
                Return Charge : Free
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" light className="my-2" />
        </Box>
      );
    });
  };

  const getDeliveryAddress = () => {
    if (showDeliveryAddress) {
      return addressList.map((ele) => {
        return (
          <Box
            className={`d-flex justify-content-between my-2 p-2 ${
              ele.isSelected ? "bg-light-pink" : ""
            }`}
            key={ele.id}
          >
            <Box className="d-flex">
              {" "}
              <RadiobuttonComponent
                id={ele.id}
                isChecked={ele.isSelected}
                onRadioChange={(e) => {
                  const temp = [...addressList];
                  temp.map((item) => {
                    if (e.target.id == item.id) {
                      return (item.isSelected = true);
                    }
                    return (item.isSelected = false);
                  });
                  setAddressList([...temp]);
                  setselectedDeliveryAddress({ ...ele });
                }}
              />
              <Box>
                <Box className="d-flex">
                  <Typography className="fw-bold h-5">{ele.name}</Typography>
                  <Typography className="fw-bold h-5">
                    {ele.phoneNUmber}
                  </Typography>
                </Box>
                <Typography className="h-5">{ele.address}</Typography>
                <Box className="d-flex">
                  <Typography className="h-5">
                    Latitude : {ele.latitude}
                  </Typography>
                  <Typography className="h-5 mx-3">
                    Langitude : {ele.langitude}
                  </Typography>
                </Box>
                {ele.isSelected ? (
                  <ButtonComponent label="Deliver Here" />
                ) : null}
              </Box>
            </Box>
            <Typography
              className={`${
                ele.isSelected ? "" : "d-none"
              } color-orange h-5 fw-bold pe-5`}
            >
              Edit
            </Typography>
          </Box>
        );
      });
    }
    return addressList.map((ele) => {
      if (ele.isSelected) {
        return (
          <Box className="d-flex justify-content-between my-2 p-2" key={ele.id}>
            <Box className="d-flex mx-5">
              <Box>
                <Box className="d-flex">
                  <Typography className="fw-bold h-5">{ele.name}</Typography>
                  <Typography className="fw-bold h-5">
                    {ele.phoneNUmber}
                  </Typography>
                </Box>
                <Typography className="h-5">{ele.address}</Typography>
                <Box className="d-flex">
                  <Typography className="h-5">
                    Latitude : {ele.latitude}
                  </Typography>
                  <Typography className="h-5 mx-3">
                    Langitude : {ele.langitude}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }
      return null;
    });
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
    <Grid container>
      {" "}
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
                    +91 123453453
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
                  <Typography className="mark me-3 py-1 px-2" component="span">
                    2
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-secondary fw-bold h-5">
                    Delivery Address
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
            <Box className="py-2">{getDeliveryAddress()}</Box>
          </Paper>
          {showDeliveryAddress ? (
            <Paper
              className="my-2 px-4 py-2 color-orange h-5 cursor-pointer"
              onClick={() => setShowAddNewAddress(true)}
            >
              {" "}
              + Add New Address
            </Paper>
          ) : null}
          <Paper className="my-2">
            <Box className="d-flex justify-content-between align-items-center px-2 rounded-0">
              <Box className="d-flex my-2">
                <Box>
                  <Typography className="mark me-3 py-1 px-2" component="span">
                    3
                  </Typography>
                </Box>
                <Box>
                  <Typography className="text-secondary fw-bold h-5">
                    Order Summary
                  </Typography>
                </Box>
              </Box>
              {/* <Box>
                {showDeliveryAddress ? (
                  <ButtonComponent
                    label="Continue"
                    muiProps="px-4"
                    onBtnClick={() => setShowDeliveryAddress(false)}
                  />
                ) : null}
              </Box> */}
            </Box>
            <Divider variant="middle" />
            <Box className="py-2 mxh-250 overflow-auto hide-scrollbar">
              {showOrderSummary ? getOrderSummary() : null}
            </Box>
          </Paper>
          {showApplyCoupon ? (
            <Paper className="d-flex align-items-center p-2">
              <Typography className="h-5">
                Do You have additional Coupons ?
              </Typography>
              <Box className="d-flex ">
                <Box className="mx-3">
                  <input
                    className="mx-2 w-100"
                    style={{
                      outline: "none",
                    }}
                    placeholder="Enter coupon code"
                  />
                </Box>
                <ButtonComponent label="Apply" />
              </Box>
            </Paper>
          ) : null}
          <Paper className="d-flex justify-content-between align-items-center p-2 mt-2">
            <Typography>
              Order confirmation will be sent to{" "}
              <span className="fw-bold">xyz.gmail.com</span>{" "}
            </Typography>
            <ButtonComponent
              label={showApplyCoupon ? "Place Order" : "Continue"}
              onBtnClick={() => {
                if (!showApplyCoupon) {
                  setShowApplyCoupon(true);
                } else {
                  setShowOrderSuccessModal(true);
                }
              }}
            />
          </Paper>
          <OrderSuccessModal
            showModal={showOrderSuccessModal}
            setShowModal={setShowOrderSuccessModal}
            address={selectedDeliveryAddress}
            products={products}
          />
        </Box>
      </Grid>
      {products.length ? (
        <Grid item sm={3}>
          <Paper className="ms-2 p-2">
            <Typography className="text-secondary h-5 fw-bold">
              Price Details
            </Typography>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Price ({products.length} items)
              </Typography>
              <Typography className="h-5 fw-bold">{getTotalPrice()}</Typography>
            </Box>
            <Box className="d-flex justify-content-between align-items-center">
              <Typography className="h-5 fw-bold my-2">
                Delivery Charges
              </Typography>
              <Typography className="text-success h-5">Free</Typography>
            </Box>
            <Divider />
            <Box className="d-flex justify-content-between align-items-center my-2">
              <Typography className="h-5 fw-bold">Total Payable</Typography>
              <Typography className="h-5 fw-bold">{getTotalPrice()}</Typography>
            </Box>
            <Divider />
            <Typography className="text-success text-center h-5 my-2">
              Your Total Savings on this Order is 10000
            </Typography>
          </Paper>
          <NewAddress
            defaultFormData={defaultFormData}
            setDefaultFormData={setDefaultFormData}
            newAddressModal={showAddNewAddress}
            setNewAddressModal={setShowAddNewAddress}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};
export default CheckOutOrder;
