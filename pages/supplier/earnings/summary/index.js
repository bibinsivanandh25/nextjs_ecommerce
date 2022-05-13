import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import OrderDetails from "components/forms/supplier/myearnings/orderdetails";
import { useEffect, useState } from "react";

const cardData = [
  {
    title: "Next Payment Release Date: Jun 05",
    description:
      "See Details of earnings so far in the Payment cycle from may 05 to june 30",
    amount: "10000",
  },
  {
    title: "Total Money Earned Till Date",
    description:
      "See Details of earnings so far in the Payment cycle from may 05 to june 30",
    amount: "10000",
  },
  {
    title: "Cycle wise Payment",
    description: "Total money paid till date",
    amount: "10000",
  },
];

const MyEarnings = () => {
  const [earningData, setEarningData] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    setEarningData([...cardData]);
  }, [cardData]);
  return (
    <Paper
      className="h-100"
      style={{
        minHeight: "80vh",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div className="border-bottom">
        <Box className=" d-flex justify-content-between align-items-center border-bottom-0 p-2 ">
          <Box className="fs-16 fw-700 ps-4">Summary</Box>
          <Box>
            <ButtonComponent label="Choose Bank" onBtnClick={() => {}} />
          </Box>
        </Box>
      </div>
      <Box className="m-3 mt-4">
        <Grid container spacing={2}>
          {earningData.map((item, index) => {
            return (
              <Grid item md={6} key={index}>
                <Card variant="outlined">
                  <CardContent className="p-2 pt-4">
                    <Typography
                      component="div"
                      className="border-bottom d-flex fs-16 fw-600 ps-2 pb-1"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      className="fs-14 mt-3 ps-2"
                    >
                      {item.description}
                    </Typography>
                    <div className="d-flex justify-content-between align-items-end p-2">
                      <Typography variant="h4" className="fw-700">
                        {"\u20A8"}
                        {item.amount}
                      </Typography>
                      <ButtonComponent
                        muiProps="p-1 h-75"
                        label="View Order details"
                        variant="outlined"
                        onBtnClick={() => {
                          setShowOrderDetails(true);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* {showOrderDetails ? ( */}
        <OrderDetails
          showModal={showOrderDetails}
          setshowModal={setShowOrderDetails}
        />
        {/* ) : null} */}
      </Box>
    </Paper>
  );
};
export default MyEarnings;
