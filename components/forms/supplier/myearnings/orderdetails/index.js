/* eslint-disable react/no-array-index-key */
import { Card, Grid } from "@mui/material";
import ModalComponent from "components/atoms/ModalComponent";
import Image from "next/image";
import image from "public/assets/images/Coupon.png";

const OrderDetails = ({ showModal = false, setshowModal = () => {} }) => {
  const orderdetails = [
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
    {
      OrderId: "#12345",
      Name: "Jaipur Printed King size bed sheet",
      price: 1200,
      quantity: 10,
    },
  ];

  return (
    <ModalComponent
      ModalWidth="90%"
      open={showModal}
      showClearBtn={false}
      showSaveBtn={false}
      ModalTitle="Order Details (03 May 2021 to 02 Jun 2021)"
      minHeightClassName="mxh-600"
      onCloseIconClick={() => setshowModal(false)}
    >
      <Grid container spacing={2} className="mt-2   ">
        {orderdetails.map((ele, ind) => {
          return (
            <Grid
              item
              md={4}
              container
              //   className={`border`}
              key={ind}
              spacing={1}
            >
              <Card variant="outlined">
                <Grid container>
                  <Grid item md={3} className="mx-2 d-flex align-items-center">
                    <Image src={image} />
                  </Grid>
                  <Grid item md={8}>
                    <Grid className="color-orange fs-10">
                      OrderId:{ele.OrderId}
                    </Grid>
                    <Grid className="fs-11 fw-bold ">{ele.Name}</Grid>
                    <Grid className="fs-11  ">Price:{ele.price}</Grid>
                    <Grid className="fs-11 ">Quantity:{ele.quantity}</Grid>
                    <Grid className="d-flex justify-content-between align-items-center mb-2 ">
                      <Grid className="fs-11 text-success">
                        Order Delivered
                      </Grid>
                      <Grid className="bg-orange fs-11 p-2 text-white">
                        You Earned Rs.500
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ModalComponent>
  );
};
export default OrderDetails;
