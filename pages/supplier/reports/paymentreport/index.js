import { Grid, Paper } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bar";
import Doughnutchart from "components/atoms/Doughnut/Doughnut";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";

const PaymentReports = () => {
  let cardDetails = [
    {
      label: "Total Payment Amount",
      value: "54,233.00",
      background: "#59698b",
    },
    {
      label: "No. of Payments Recieved",
      value: "233",
      background: "#4f98b5",
    },
    {
      label: "Refunded",
      value: " 2000.00",
      background: "#d83a56",
    },
    {
      label: "Pending Payment",
      value: "12,40,000",
      background: "#053742",
    },
  ];

  const getCardDetails = () => {
    return cardDetails.map((ele) => {
      return (
        <>
          <Grid className="" item xs={3}>
            <Paper
              className="px-3 py-2"
              sx={{
                backgroundColor: ele.background,
                color: "white",
              }}
            >
              <Grid className="fs-12">{ele.label}</Grid>
              <Grid className="fs-2">{ele.value}</Grid>
            </Paper>
          </Grid>
        </>
      );
    });
  };
  return (
    <Grid>
      <Grid container spacing={3}>
        {getCardDetails()}
      </Grid>
      <Grid container spacing={3} className="mt-2">
        <Grid item xs={6}>
          <Paper className="">
            <p className="fs-12 fw-bold px-4 pt-2">Month Wise Payment</p>
            <Bargraph
              data={[
                1000, 3000, 5000, 4000, 6000, 7000, 3000, 8000, 9000, 10000,
                200,
              ]}
              labels={[
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
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="h-100">
            <p className="fs-12 fw-bold px-4 pt-2 ">
              Month Wise Payment (&#37;)
            </p>
            <Grid className="mt-5 w-100">
              <Doughnutchart
                labels={[
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
                ]}
                data={[
                  1000, 3000, 5000, 4000, 6000, 7000, 3000, 8000, 9000, 10000,
                  200,
                ]}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-2">
        <Grid item xs={5}>
          <Paper>
            <Grid className="fs-12 fw-bold p-2">
              Month wise Payment Details
              <SimpleDropdownComponent />
            </Grid>
            <TableComponent showSearchFilter={false} showSearchbar={false} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper>
            <Grid className="fs-12 fw-bold p-2">
              Month wise Payment Details
            </Grid>

            <TableComponent showSearchFilter={false} showSearchbar={false} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PaymentReports;
