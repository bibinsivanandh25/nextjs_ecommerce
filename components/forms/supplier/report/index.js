import { MenuOutlined, MoreVert } from "@mui/icons-material";
import { Grid, MenuList, Paper } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bar";
import Doughnutchart from "components/atoms/Doughnut/Doughnut";
import BasicMenu from "components/atoms/Menu";
import SelectComponent from "components/atoms/SelectComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";
import { useState } from "react";
// const columns = [
//   {
//     id: "col1", //id value in column should be presented in row as key
//     label: "Date",
//     minWidth: 100,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
//   {
//     id: "col2",
//     label: "No. of Sales",
//     minWidth: 100,
//     align: "center",
//     data_align: "center",
//     data_classname: "",
//   },
// ];
// let rows = [
//   {
//     id: "1",
//     col1: "1 Jan 2021",
//     col2: 33333,
//   },
//   {
//     id: "1",
//     col1: "2 Feb 2022",
//     col2: 22222,
//   },
// ];
// let cardDetails = [
//   {
//     label: "Total Payment Amount",
//     value: "54,233.00",
//     background: "#59698b",
//   },
//   {
//     label: "No. of Payments Recieved",
//     value: "233",
//     background: "#4f98b5",
//   },
//   {
//     label: "Refunded",
//     value: " 2000.00",
//     background: "#d83a56",
//   },
//   {
//     label: "Pending Payment",
//     value: "12,40,000",
//     background: "#053742",
//   },
// ];

const ReportLayout = ({
  barGraphLabels = [],
  barGraphData = [],
  doughnutLabels = [],
  doughnutData = [],
  detailSelectList = [],
  detailMenuList = [],
  summarySelectList = [],
  summaryMenuList = [],
  summaryStatusList = [],
  summaryColumns = [],
  summaryRows = [],
  Detailcolumns = [],
  Detailrows = [],
  cardDetails = [],
  barGraphBackgroundColor = "",
  barGraphHoverBackgroundColor = "",
}) => {
  const [tableRows, setTableRows] = useState([...Detailrows]);

  const sortTable = (val) => {
    console.log(val, "val");
    let sortCol;
    let rows = [...tableRows];
    if (val.label === "Sort By Sale Count") {
      sortCol = "col2";
    } else if (val.label === "Sort By Date") {
      sortCol = "col1";
    }

    if (val.sort === "ascending") {
      rows.sort((a, b) => {
        if (a[sortCol] > b[sortCol]) {
          return -1;
        } else if (a[sortCol] < b[sortCol]) {
          return 1;
        }
      });
    } else if (val.sort === "descending") {
      rows.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return -1;
        } else if (a[sortCol] > b[sortCol]) {
          return 1;
        }
      });
    }
    setTableRows([...rows]);
  };

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
              data={barGraphData}
              labels={barGraphLabels}
              backgroundColor={barGraphBackgroundColor}
              hoverBackgroundColor={barGraphHoverBackgroundColor}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="h-100">
            <p className="fs-12 fw-bold px-4 pt-2 ">Month Wise Payment (%)</p>
            <Grid className="mt-5 w-100">
              <Doughnutchart labels={doughnutLabels} data={doughnutData} />
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
                  list={detailSelectList}
                />
              </Grid>
              <Grid className="mt-3 cursor-pointer ">
                {/* <MoreVert /> */}
                <BasicMenu
                  menuList={detailMenuList}
                  getSelectedValue={(item) => {
                    sortTable(item);
                  }}
                />
              </Grid>
            </Grid>
            <TableComponent
              showSearchFilter={false}
              showSearchbar={false}
              columns={[...Detailcolumns]}
              tableRows={[...tableRows]}
            />
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
                  list={summaryStatusList}
                  label="status"
                />
                <SelectComponent
                  disableUnderline={true}
                  list={summarySelectList}
                />
                <Grid className="mt-3 cursor-pointer">
                  <BasicMenu
                    menuList={summaryMenuList}
                    getSelectedValue={(item) => {
                      sortTable(item);
                    }}
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
export default ReportLayout;
