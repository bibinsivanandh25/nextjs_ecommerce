import { MenuOutlined, MoreVert } from "@mui/icons-material";
import { Grid, MenuList, Paper } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bar";
import Doughnutchart from "components/atoms/Doughnut/Doughnut";
import BasicMenu from "components/atoms/Menu";
import SelectComponent from "components/atoms/SelectComponent";
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
            <p className="fs-12 fw-bold px-4 pt-2 ">Month Wise Payment (%)</p>
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
            <Grid className="d-flex align-items-center ">
              <Grid className="fs-12 fw-bold px-2 mt-3">
                {" "}
                Month wise Payment Details
              </Grid>
              <Grid className="ms-auto ">
                <SelectComponent
                  disableUnderline={true}
                  list={[
                    {
                      id: 1,
                      value: 2021,
                      label: 2021,
                    },
                    {
                      id: 2,
                      value: 2022,
                      label: 2022,
                    },
                    {
                      id: 3,
                      value: 2023,
                      label: 2023,
                    },
                  ]}
                />
              </Grid>
              <Grid className="mt-3 cursor-pointer ">
                {/* <MoreVert /> */}
                <BasicMenu
                  menuList={["Sort By Sale Count", "Sort By Date", "Download"]}
                  getSelectedValue={(item) => {}}
                />
              </Grid>
            </Grid>
            <TableComponent showSearchFilter={false} showSearchbar={false} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper>
            <Grid className="d-flex align-items-center justify-content-between">
              <Grid className="fs-12 fw-bold px-2 mt-3">
                {" "}
                Month wise Payment Details
              </Grid>
              <Grid className="d-flex justify-content-between align-items-center">
                <SelectComponent
                  disableUnderline={true}
                  list={[
                    {
                      id: 1,
                      value: "completed",
                      label: "completed",
                    },
                    {
                      id: 2,
                      value: "pending",
                      label: "pending",
                    },
                    {
                      id: 3,
                      value: "refunded",
                      label: "refunded",
                    },
                    {
                      id: 4,
                      value: "cancelled",
                      label: "cancelled",
                    },
                  ]}
                  label="status"
                />
                <SelectComponent
                  disableUnderline={true}
                  list={[
                    {
                      id: 1,
                      value: 2021,
                      label: 2021,
                    },
                    {
                      id: 2,
                      value: 2022,
                      label: 2022,
                    },
                    {
                      id: 3,
                      value: 2023,
                      label: 2023,
                    },
                  ]}
                />
                <Grid className="mt-3 cursor-pointer">
                  <BasicMenu
                    menuList={["Sort By Price", "Sort By Date", "Download"]}
                    getSelectedValue={(item) => {}}
                  />
                </Grid>
              </Grid>
            </Grid>

            <TableComponent showSearchFilter={false} showSearchbar={false} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PaymentReports;
