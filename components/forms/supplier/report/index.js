/* eslint-disable dot-notation */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Box, Grid, Paper } from "@mui/material";
import Bargraph from "components/atoms/Bar/Bargraph";
import Doughnutchart from "components/atoms/Doughnut/Doughnut";
import BasicMenu from "components/atoms/Menu";
import SelectComponent from "components/atoms/SelectComponent";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import exceldownload from "services/utils/exceldownload";
// import * as xlsx from "xlsx";
// import * as FileSaver from "file-saver";
// import { toast } from "react-toastify";

const ReportLayout = ({
  barGraphLabels = [],
  barGraphData = [],
  doughnutLabels = [],
  doughnutData = [],
  detailSelectList = [],
  detailMenuList = [],
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
  handleMonthOrderYear = () => {},
  currentYear = {},
  doughnutCurrentYear = {},
  handleMonthDoghnutOrderYear = () => {},
  monthCurrentYear = {},
  handleMonthTableYear = () => {},
  summaryYear = {},
  handleSummaryYear = () => {},
  summaryStatus = {},
  handleSummaryStatus = () => {},
  handleSummaryPageEnd = () => {},
  barChartDataSet = "",
}) => {
  const [tableRows, setTableRows] = useState([]);
  const [summarytableRows, setsummaryTableRows] = useState([]);
  const [dateTableRows, setDateTableRows] = useState([...summaryDateRows]);
  const [daterows, setDateRows] = useState([...dateRows]);
  // table 1
  useEffect(() => {
    setTableRows(Detailrows);
  }, [Detailrows]);
  const sortTable = (val) => {
    let sortCol;
    const rows = [...tableRows];
    if (val.label === "Sort By Sale Count") {
      sortCol = "col2";
    } else if (val.label === "Sort By Date") {
      sortCol = "id";
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
  useEffect(() => {
    setsummaryTableRows(summaryRows);
  }, [summaryRows]);
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
  const handleexcelDownload = (data) => {
    const copyRowData = [];
    data.forEach((item, index) => {
      const tempObj = {};
      tempObj["Sl.No"] = index + 1;
      tempObj["Months"] = item.col1;
      tempObj["No of Sales"] = item.col2;
      copyRowData.push(tempObj);
    });
    exceldownload(copyRowData, "Month_Wise_Order_Details");
  };
  const handleSummaryexcelDownload = (data) => {
    const copyRowData = [];
    data.forEach((item, index) => {
      const tempObj = {};
      tempObj["Sl.No"] = index + 1;
      tempObj["Payment Id"] = item.col1;
      tempObj["Product"] = item.col2;
      tempObj["Customer"] = item.col3;
      tempObj["Date"] = item.col4;
      tempObj["Amount"] = item.col5;
      tempObj["Status"] = item.col6;
      copyRowData.push(tempObj);
    });
    exceldownload(copyRowData, "Order_Summary");
  };

  const getCardDetails = () => {
    return cardDetails?.map((ele, ind) => {
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
          {cardDetails && getCardDetails()}
        </Grid>
        <Grid container spacing={3} className="mt-2">
          <Grid item sm={12} md={6}>
            <Paper className="rounded h-100">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <p className="fs-12 fw-bold px-4 pt-2 mb-2">{cardLabel}</p>
                <SelectComponent
                  value={currentYear.value}
                  disableUnderline
                  list={detailSelectList}
                  onChange={handleMonthOrderYear}
                />
              </Box>
              <Bargraph
                data={barGraphData}
                labels={barGraphLabels}
                backgroundColor={barGraphBackgroundColor}
                hoverBackgroundColor={barGraphHoverBackgroundColor}
                label={barChartDataSet}
              />
            </Paper>
          </Grid>
          <Grid item md={6} sm={12}>
            <Paper className="h-100 rounded">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <p className="fs-12 fw-bold px-4 pt-2 ">{cardLabel} (%)</p>
                <SelectComponent
                  value={doughnutCurrentYear.value}
                  disableUnderline
                  list={detailSelectList}
                  onChange={handleMonthDoghnutOrderYear}
                />
              </Box>
              <Grid className="mt-5 w-100">
                <Doughnutchart labels={doughnutLabels} data={doughnutData} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-2">
          <Grid item md={4.3} sm={12}>
            <Paper className="rounded h-100">
              <Grid className="d-flex align-items-center ">
                <Grid className="fs-12 fw-bold px-2 mt-3">{tableLabel1}</Grid>
                <Grid className="ms-auto " mt={2}>
                  <SelectComponent
                    value={monthCurrentYear.value}
                    disableUnderline
                    list={detailSelectList}
                    onChange={handleMonthTableYear}
                  />
                </Grid>
                <Grid className="mt-3 cursor-pointer zIndex-100">
                  {/* <MoreVert /> */}
                  <BasicMenu
                    menuList={detailMenuList}
                    getSelectedValue={(item) => {
                      if (
                        item.label == "Sort By Sale Count" ||
                        item.label == "Sort By Date"
                      ) {
                        sortTable(item);
                      }
                      if (item.label == "Download") {
                        handleexcelDownload(tableRows);
                      }
                    }}
                  />
                </Grid>
              </Grid>
              {Detailrows && (
                <TableComponent
                  showSearchFilter={false}
                  showSearchbar={false}
                  columns={[...Detailcolumns]}
                  tableRows={[...tableRows]}
                  showCheckbox={false}
                />
              )}
            </Paper>
          </Grid>
          <Grid item md={7.7} sm={12}>
            <Paper className="rounded h-100">
              <Grid className="d-flex align-items-center justify-content-between">
                <Grid className="fs-12 fw-bold px-2 mt-3">{tableLabel2}</Grid>
                <Grid className="d-flex justify-content-between align-items-center">
                  <Grid mt={2}>
                    <SelectComponent
                      value={summaryStatus.value}
                      disableUnderline
                      list={summaryStatusList}
                      label="Status"
                      onChange={handleSummaryStatus}
                    />
                    <SelectComponent
                      value={summaryYear.value}
                      disableUnderline
                      list={detailSelectList}
                      onChange={handleSummaryYear}
                    />
                  </Grid>
                  <Grid className="mt-3 cursor-pointer zIndex-100">
                    <BasicMenu
                      menuList={summaryMenuList}
                      getSelectedValue={(item) => {
                        if (item.label == "Download") {
                          handleSummaryexcelDownload(summarytableRows);
                        } else {
                          sortSummaryTable(item);
                        }
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
                handlePageEnd={handleSummaryPageEnd}
              />
            </Paper>
          </Grid>
        </Grid>
        {showCurrentDateTable ? (
          <Grid container spacing={3} className="mt-2">
            <Grid item xs={4.3}>
              <Paper className="h-100 rounded">
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
            <Grid item xs={7.7}>
              <Paper className="h-100 rounded">
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
