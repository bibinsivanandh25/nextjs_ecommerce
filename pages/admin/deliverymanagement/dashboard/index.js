/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart } from "@/atoms/PieChart";
import SelectComponent from "@/atoms/SelectComponent";
import Bargraph from "@/atoms/Bar/Bargraph";
import { getAlldeliveryManagementCard } from "services/admin/deliverymanagement/dashboard";

const DeliveryDetails = [
  {
    title: "Total Forward orders paid to logistics",
    value: 0,
    backgroundColor: "#f2f7ff",
    borderColor: "#bdd5fa",
    color: "#5500d4",
    key: "totalForwordOrdersPaidToLogistics",
  },
  {
    title: "Total Return orders paid to logistics",
    value: 0,
    backgroundColor: "#fffef8",
    borderColor: "#ffeeab",
    color: "#ffd42a",
    key: "totalReturnOrdersPaidToLogistics",
  },
  {
    title: "Total RTO orders paid to logistics",
    value: 0,
    backgroundColor: "#f1fff7",
    borderColor: "#a6ffca",
    color: "#00c153",
    key: "totalRTOPaidToLogistics",
  },
  {
    title: "Total Hand Pick orders ",
    value: 0,
    backgroundColor: "#fff7ff",
    borderColor: "#fccbfc",
    color: "#ff00ff",
    key: "totalHandPickOrder",
  },
  {
    title: "Delivered by store owner",
    value: 0,
    backgroundColor: "#edfeff",
    borderColor: "#a2f6fb",
    color: "#009faa",
    key: "deliveredByStoreOwner",
  },
];
const DeliveryDashboard = () => {
  const [cardData, setCardData] = useState([...DeliveryDetails]);
  const [totalAmount, setTotalAmount] = useState(0);

  const getAllCardData = async () => {
    const payload = {
      filterType: "type1",
      month: null,
      year: null,
    };
    const { data, err } = await getAlldeliveryManagementCard(payload);
    if (data) {
      const temp = JSON.parse(JSON.stringify(DeliveryDetails));
      temp.forEach((item) => {
        Object.entries(data).forEach((val) => {
          if (item.key === val[0]) {
            item.value = val[1];
          }
        });
      });
      setCardData(temp);
    }
    if (err) {
      setTotalAmount(0);
      setCardData(DeliveryDetails);
    }
  };
  useEffect(() => {
    getAllCardData();
  }, []);

  const [orderInfo, setOrderInfo] = useState([
    {
      title: "Total Orders",
      value: 690,
      data: [
        {
          title: "current day",
          values: {
            isSelected: true,
            data: [
              {
                title: "Payment to be settle/orders",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "Payment settled/orders",
                value: 50,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
        {
          title: "completed day",
          values: {
            isSelected: false,
            data: [
              {
                title: "Payment to be settle/orders",
                value: 25,
                bgColor: "#5500d4",
              },
              {
                title: "Payment settled/orders",
                value: 75,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
        {
          title: "week",
          values: {
            isSelected: false,
            data: [
              {
                title: "Payment to be settle/orders",
                value: 30,
                bgColor: "#5500d4",
              },
              {
                title: "Payment settled/orders",
                value: 70,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Amount Paid",
      value: 6900,
      data: [
        {
          title: "current day",
          values: {
            isSelected: true,
            data: [
              {
                title: "Forward Orders",
                value: 70,
                bgColor: "#ff5599",
              },
              {
                title: "Return Orders",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "RTO Orders",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "Orders lost in transit",
                value: 10,
                bgColor: "#0066ff",
              },
            ],
          },
        },
        {
          title: "completed day",
          values: {
            isSelected: false,
            data: [
              {
                title: "Forward Orders",
                value: 200,
                bgColor: "#ff5599",
              },
              {
                title: "Return Orders",
                value: 60,
                bgColor: "#5500d4",
              },
              {
                title: "RTO Orders",
                value: 10,
                bgColor: "#00d455",
              },
              {
                title: "Orders lost in transit",
                value: 10,
                bgColor: "#0066ff",
              },
            ],
          },
        },
        {
          title: "week",
          values: {
            isSelected: false,
            data: [
              {
                title: "Forward Orders",
                value: 70,
                bgColor: "#ff5599",
              },
              {
                title: "Return Orders",
                value: 20,
                bgColor: "#5500d4",
              },
              {
                title: "RTO Orders",
                value: 40,
                bgColor: "#00d455",
              },
              {
                title: "Orders lost in transit",
                value: 10,
                bgColor: "#0066ff",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Forward Orders",
      value: 690,
      data: [
        {
          title: "current day",
          values: {
            isSelected: true,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#ff5599",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#0066ff",
              },
              {
                title: "RTO",
                value: 10,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
        {
          title: "completed day",
          values: {
            isSelected: false,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#ff5599",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#0066ff",
              },
              {
                title: "RTO",
                value: 10,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
        {
          title: "week",
          values: {
            isSelected: false,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#ff5599",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#0066ff",
              },
              {
                title: "RTO",
                value: 10,
                bgColor: "#ffd42a",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Return Orders",
      value: 690,
      data: [
        {
          title: "current day",
          values: {
            isSelected: true,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#0066ff",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#ff5599",
              },
            ],
          },
        },
        {
          title: "completed day",
          values: {
            isSelected: false,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#0066ff",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#ff5599",
              },
            ],
          },
        },
        {
          title: "week",
          values: {
            isSelected: false,
            data: [
              {
                title: "Pending Approval",
                value: 70,
                bgColor: "#0066ff",
              },
              {
                title: "Picked up",
                value: 50,
                bgColor: "#00d455",
              },
              {
                title: "In commute",
                value: 50,
                bgColor: "#5500d4",
              },
              {
                title: "Delivered",
                value: 10,
                bgColor: "#ff5599",
              },
            ],
          },
        },
      ],
    },
  ]);
  const months = [
    "Month",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsList = months.map((val, ind) => ({
    id: ind,
    label: val,
    value: ind,
  }));
  const getCards = () => {
    return cardData.map((ele) => {
      return (
        <Grid item lg={2.4} md={3} sm={4} xs={6}>
          <Paper
            className="px-3 mnh-100 d-flex flex-column justify-content-between"
            sx={{
              background: ele.backgroundColor,
              border: `1px solid ${ele.borderColor}`,
            }}
          >
            <Typography className="text-center h-5 fw-bold">
              {ele.title}
            </Typography>
            <Typography
              className="fw-bold h-1 text-center"
              sx={{
                color: ele.color,
              }}
            >
              {ele.value.toLocaleString("en-IN")}
            </Typography>
          </Paper>
        </Grid>
      );
    });
  };

  const getOrderDetails = () => {
    return orderInfo.map((ele, ind) => {
      return (
        <Grid item md={6} sm={12} key={ind}>
          <Paper>
            <Box className="d-flex justify-content-between align-items-center p-1">
              <Box className="d-flex">
                <Typography className="mx-2 fw-bold h-5">
                  {ele.title}
                </Typography>
                <Typography className="fw-bold h-5">{ele.value}</Typography>
              </Box>
              <Box className="d-flex">
                {ele.data.map((item, index) => {
                  return (
                    <Typography
                      className={
                        item.values.isSelected ? "color-light-blue" : ""
                      }
                    >
                      <span
                        className="px-2 py-1 cursor-pointer "
                        onClick={() => {
                          const temp = JSON.parse(JSON.stringify(orderInfo));
                          temp[ind].data.forEach((a, inde) => {
                            if (index === inde) {
                              a.values.isSelected = true;
                            } else {
                              a.values.isSelected = false;
                            }
                          });
                          setOrderInfo([...temp]);
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        className={
                          index === ele.data.length - 1 ? "d-none" : "mx-2"
                        }
                      >
                        {" "}
                        |{" "}
                      </span>
                    </Typography>
                  );
                })}
              </Box>
            </Box>
            <Box>
              {ele.data.map((item) => {
                const arr = [];
                if (item.values.isSelected) {
                  item.values.data.forEach((element) => {
                    arr.push({
                      label: element.title,
                      value: element.value,
                      bgColor: element.bgColor,
                    });
                  });
                  return (
                    <Box className="p-2">
                      <PieChart data={arr} />
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <div className="mt-1">
      <Grid container justifyContent="space-between" spacing={1}>
        {getCards()}
      </Grid>
      <Grid container spacing={2} className="mt-2">
        <Grid container spacing={2} item sm={12}>
          {getOrderDetails()}
        </Grid>
        <Grid container spacing={2} item sm={12}>
          <Grid item sm={12} md={6}>
            <Paper className="p-2">
              <Box className="d-flex justify-content-between align-items-center">
                <Typography>current and completed day</Typography>
                <Typography>
                  <span>current day</span>
                  <span>|</span>
                  <span>week</span>
                </Typography>
                <SelectComponent
                  list={monthsList}
                  className="border rounded-1 px-1"
                />
                <SelectComponent className="border rounded-1 px-1" />
                <SelectComponent className="border rounded-1 px-1" />
              </Box>
              <Bargraph
                data={[100, 120, 130, 100, 130, 120, 150, 160, 179]}
                labels={[
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                  "12am",
                ]}
                showGridY={false}
                backgroundColor="#444b66"
                hoverBackgroundColor="#e56700"
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper className="p-2 bg-light-orange2 h-100 d-flex flex-column justify-content-center border-light-orange">
              <Typography className="text-center fs-3 my-2">
                Amount to be collected
              </Typography>
              <Typography className="text-center fs-3">
                from logistics partners
              </Typography>
              <Typography className="text-center color-orange h-5 fst-italic my-2">
                Lost in transit / Other
              </Typography>
              <Typography className="text-center color-orange fs-1 fw-600">
                &#8377; {totalAmount.toLocaleString("en-IN")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default DeliveryDashboard;
