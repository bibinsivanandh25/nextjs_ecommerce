/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Grid, Paper } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bargraph";
import Doughnutchart from "components/atoms/Doughnut/Doughnut";
import BasicMenu from "components/atoms/Menu";
import SelectComponent from "components/atoms/SelectComponent";
import TableComponent from "components/atoms/TableComponent";
import { useState } from "react";
// const columns = [
//   {
//     id: "col1", //  id value in column should be presented in row as key
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
  cardLabel = "",
  tableLabel1 = "",
  tableLabel2 = "",
  showCurrentDateTable = false,
  dateTableTitle = "",
  dateSummaryTitle = "",
  summarydateSelectList = [],
  dateMenuList = [],
  dateSelectList = [],
  summarydateMenuList = [],
  summaryDateColumns = [],
  summaryDateRows = [],
  dateRows = [],
  Datecolumns = [],
}) => {
  const [tableRows, setTableRows] = useState([...Detailrows]);
  const [summarytableRows, setsummaryTableRows] = useState([...summaryRows]);
  const [dateTableRows, setDateTableRows] = useState([...summaryDateRows]);
  const [daterows, setDateRows] = useState([...dateRows]);

  // table 1
  const sortTable = (val) => {
    let sortCol;
    const rows = [...tableRows];
    if (val.label === "Sort By Sale Count") {
      sortCol = "col2";
    } else if (val.label === "Sort By Date") {
      sortCol = "col1";
    }

    if (val.sort === "ascending") {
      rows.sort((a, b) => {
        if (a[sortCol] > b[sortCol]) {
          return -1;
        }
        if (a[sortCol] < b[sortCol]) {
          return 1;
        }
      });
    } else if (val.sort === "descending") {
      rows.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return -1;
        }
        if (a[sortCol] > b[sortCol]) {
          return 1;
        }
      });
    }
    setTableRows([...rows]);
  };
  const sortSummaryTable = (val) => {
    let sortCol;
    const rows = [...summarytableRows];
    if (val.label === "Sort By Price") {
      sortCol = "col5";
    } else if (val.label === "Sort By Date") {
      sortCol = "col4";
    }

    if (val.sort === "ascending") {
      rows.sort((a, b) => {
        if (a[sortCol] > b[sortCol]) {
          return -1;
        }
        if (a[sortCol] < b[sortCol]) {
          return 1;
        }
      });
    } else if (val.sort === "descending") {
      rows.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return -1;
        }
        if (a[sortCol] > b[sortCol]) {
          return 1;
        }
      });
    }
    setsummaryTableRows([...rows]);
  };
  // table 2 sort
  const sortDateSummaryTable = (val) => {
    let sortCol;
    const rows = [...dateTableRows];
    if (val.label === "Sort By Price") {
      sortCol = "col5";
    } else if (val.label === "Sort By Date") {
      sortCol = "col4";
    }

    if (val.sort === "ascending") {
      rows.sort((a, b) => {
        if (a[sortCol] > b[sortCol]) {
          return -1;
        }
        if (a[sortCol] < b[sortCol]) {
          return 1;
        }
      });
    } else if (val.sort === "descending") {
      rows.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return -1;
        }
        if (a[sortCol] > b[sortCol]) {
          return 1;
        }
      });
    }
    setDateTableRows([...rows]);
  };
  const sortDateTable = (val) => {
    let sortCol;
    const rows = [...daterows];
    if (val.label === "Sort By Sale Count") {
      sortCol = "col2";
    } else if (val.label === "Sort By Date") {
      sortCol = "col1";
    }

    if (val.sort === "ascending") {
      rows.sort((a, b) => {
        if (a[sortCol] > b[sortCol]) {
          return -1;
        }
        if (a[sortCol] < b[sortCol]) {
          return 1;
        }
      });
    } else if (val.sort === "descending") {
      rows.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return -1;
        }
        if (a[sortCol] > b[sortCol]) {
          return 1;
        }
      });
    }
    setDateRows([...rows]);
  };

  const getCardDetails = () => {
    return cardDetails.map((ele, ind) => {
      return (
        <>
          <Grid
            className=""
            item
            md={2.9}
            key={ind}
            sm={3.8}
            xs={12}
            sx={{
              boxShadow: "0px 0px 4px #0000003D",
              border: "3px solid #FFFFFF",
              borderRadius: "8px",
              opacity: "0.9",
            }}
          >
            <Paper
              className="px-3 py-2 h-100"
              sx={{
                backgroundColor: ele.background,
                color: "white",
              }}
            >
              <Grid className="fs-12 text-break">{ele.label}</Grid>
              <Grid className="fs-2 text-break">{ele.value}</Grid>
            </Paper>
          </Grid>
        </>
      );
    });
  };
  return (
    <Paper>
      <Grid className="p-3">
        <Grid container gap={1}>
          {getCardDetails()}
        </Grid>
        <Grid container spacing={3} className="mt-2">
          <Grid item sm={12} md={6}>
            <Paper sx={{ borderRadius: 4 }}>
              <p className="fs-12 fw-bold px-4 pt-2 mb-2">{cardLabel}</p>
              <Bargraph
                data={barGraphData}
                labels={barGraphLabels}
                backgroundColor={barGraphBackgroundColor}
                hoverBackgroundColor={barGraphHoverBackgroundColor}
              />
            </Paper>
          </Grid>
          <Grid item md={6} sm={12}>
            <Paper className="h-100" sx={{ borderRadius: 4 }}>
              <p className="fs-12 fw-bold px-4 pt-2 ">{cardLabel} (%)</p>
              <Grid className="mt-5 w-100">
                <Doughnutchart labels={doughnutLabels} data={doughnutData} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-2">
          <Grid item xs={4}>
            <Paper sx={{ borderRadius: 4 }}>
              <Grid className="d-flex align-items-center ">
                <Grid className="fs-12 fw-bold px-2 mt-3">{tableLabel1}</Grid>
                <Grid className="ms-auto " mt={2}>
                  <SelectComponent disableUnderline list={detailSelectList} />
                </Grid>
                <Grid className="mt-3 cursor-pointer zIndex-100">
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
                showCheckbox={false}
              />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper sx={{ borderRadius: 4 }}>
              <Grid className="d-flex align-items-center justify-content-between">
                <Grid className="fs-12 fw-bold px-2 mt-3">{tableLabel2}</Grid>
                <Grid className="d-flex justify-content-between align-items-center">
                  <Grid mt={2}>
                    <SelectComponent
                      disableUnderline
                      list={summaryStatusList}
                      label="Status"
                    />
                    <SelectComponent
                      disableUnderline
                      list={summarySelectList}
                    />
                  </Grid>
                  <Grid className="mt-3 cursor-pointer zIndex-100">
                    <BasicMenu
                      menuList={summaryMenuList}
                      getSelectedValue={(item) => {
                        sortSummaryTable(item);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <TableComponent
                showSearchFilter={false}
                showSearchbar={false}
                tableRows={[...summarytableRows]}
                columns={[...summaryColumns]}
                showCheckbox={false}
              />
            </Paper>
          </Grid>
        </Grid>
        {showCurrentDateTable ? (
          <Grid container spacing={3} className="mt-2">
            <Grid item xs={4}>
              <Paper sx={{ borderRadius: 4 }}>
                <Grid className="d-flex align-items-center ">
                  <Grid className="fs-12 fw-bold px-2 mt-3">
                    {dateTableTitle}
                  </Grid>
                  <Grid className="ms-auto " mt={2}>
                    <SelectComponent disableUnderline list={dateSelectList} />
                  </Grid>
                  <Grid className="mt-3 cursor-pointer zIndex-100">
                    {/* <MoreVert /> */}
                    <BasicMenu
                      menuList={dateMenuList}
                      getSelectedValue={(item) => {
                        sortDateTable(item);
                      }}
                    />
                  </Grid>
                </Grid>
                <TableComponent
                  showSearchFilter={false}
                  showSearchbar={false}
                  columns={[...Datecolumns]}
                  tableRows={[...dateRows]}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ borderRadius: 4 }}>
                <Grid className="d-flex align-items-center justify-content-between">
                  <Grid className="fs-12 fw-bold px-2 mt-3">
                    {dateSummaryTitle}
                  </Grid>
                  <Grid className="d-flex justify-content-between align-items-center">
                    <Grid mt={2}>
                      <SelectComponent
                        disableUnderline
                        list={summarydateSelectList}
                      />
                    </Grid>
                    <Grid className="mt-3 cursor-pointer zIndex-100">
                      <BasicMenu
                        menuList={summarydateMenuList}
                        getSelectedValue={(item) => {
                          sortDateSummaryTable(item);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <TableComponent
                  showSearchFilter={false}
                  showSearchbar={false}
                  tableRows={[...dateTableRows]}
                  columns={[...summaryDateColumns]}
                  showCheckbox={false}
                />
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
};
export default ReportLayout;
