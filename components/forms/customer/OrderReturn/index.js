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
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";

const OrderReturn = ({
  returnProducts = [],
  setShowReturnOrder = () => {},
}) => {
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
  const [products, setProducts] = useState([]);
  const [setselectedDeliveryAddress] = useState({});
  const [setShowOrderSuccessModal] = useState(false);

  useEffect(() => {
    setProducts([...returnProducts]);
  }, [returnProducts]);

  const getOrderSummary = () => {
    return products.map((ele) => {
      return (
        <Box className="mx-2 my-3">
          <Grid container key={ele.id}>
            <Grid item sm={2} className="">
              <Image src={ele.image} height={85} width={85} />
            </Grid>
            <Grid item sm={7}>
              <Typography className="color-orange">
                Supplier Name: Business Name
              </Typography>
              <Typography className="h-5  my-1">{ele.title}</Typography>
              <Typography component="span" className="h-5 me-2">
                Order Type :
              </Typography>
              <Typography component="span" className="h-5">
                Actual Cost
              </Typography>
              <Typography className="h-5">
                Return Charges : <span className="text-danger">₹123</span>
              </Typography>
            </Grid>
          </Grid>
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
                  <ButtonComponent label="Pickup Here" />
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
              <Box className="py-2">{getDeliveryAddress()}</Box>
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
                      onBtnClick={() => setShowDeliveryAddress(false)}
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
                  setShowOrderSuccessModal(true);
                }}
              />
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
    </Box>
  );
};
export default OrderReturn;
