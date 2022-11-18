import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableComponent";
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getCategoryFilterData,
  getSuppliers,
} from "services/admin/supplier/supplierapproval";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";

const tableColumn = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 30,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Business Name",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Email / Mobile",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "GSTIN Number",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Categories",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Stock Count ",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Website link",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Other Marketplace",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const Reajected = () => {
  const [masterData, setMasterData] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedFilterData, setSelectedFilterData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState([]);
  const [filterValues, setFilterValues] = useState({ searchvalue: "" });

  const copyText = () => {
    const copyTexts = document.getElementById("gstinnumber").innerHTML;
    navigator.clipboard.writeText(copyTexts);
    toastify("GSTIN Number Copied Successfully!", "success");
  };
  const handleViewClick = (item) => {
    setViewModalData(item);
    setViewModalOpen(true);
  };

  const getTableRows = (data) => {
    const rowDatas = [];
    data?.forEach((item, index) => {
      rowDatas.push({
        id: index + 1,
        col1: index + 1,
        col2: item.businessName,
        col3: item.emailId ? item.emailId : item.mobileNumber,
        col4: (
          <Box className="d-flex justify-content-around ">
            <span className="h-5" id="gstinnumber">
              {item.gstin}
            </span>
            <Tooltip title="copy" placement="top">
              <Typography className="text-truncate text-center h-5 fw-bold">
                <CustomIcon
                  type="filecopy"
                  size="small"
                  className="fs-18"
                  onIconClick={() => {
                    copyText();
                  }}
                />
              </Typography>
            </Tooltip>
          </Box>
        ),
        col5: (
          <div className="d-flex justify-content-center">
            <Tooltip
              title={item.mainCategories.map((e) => (
                <Typography>{e}</Typography>
              ))}
              placement="top"
            >
              <Typography
                className="text-truncate h-5"
                style={{
                  maxWidth: "100px",
                }}
              >
                {item.mainCategories}
              </Typography>
            </Tooltip>
          </div>
        ),
        col6: item.avgStockCount,
        col7: item.websiteLink,
        col8: item.websiteName,
        col9: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-1 cursor-pointer"
              title="View"
              onIconClick={() => {
                handleViewClick(item);
              }}
            />
          </Box>
        ),
      });
    });
    return rowDatas;
  };
  const getAllTableData = async (page, selected, searchtext) => {
    const payload = {
      category: selected ?? [],
      keyword: searchtext || null,
      status: "REJECTED",
    };
    const { data, err } = await getSuppliers(page, payload);
    if (data?.data) setMasterData(data?.data?.count);
    if (data?.data?.supplierInfo?.length) {
      if (page == 0) {
        setTableRows(getTableRows(data.data.supplierInfo));
        setPageNumber(1);
      } else {
        setPageNumber((prev) => prev + 1);
        setTableRows((pre) => [
          ...pre,
          ...getTableRows(data.data.supplierInfo),
        ]);
      }
    } else if (data?.data?.supplierInfo?.length == 0 && page == 0) {
      setTableRows([]);
    }
    if (err) {
      setTableRows([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getCategoryFilter = async () => {
    const { data, err } = await getCategoryFilterData();
    if (data?.data) {
      const temp = [{ name: "Category", value: [] }];
      data.data.forEach((item) => {
        temp[0].value.push({
          item: item.name,
          id: item.id,
          isSelected: false,
        });
      });
      setFilterData(temp);
    }
    if (err) {
      setFilterData([]);
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getCategoryFilter();
  }, []);
  useEffect(() => {
    const selected = [];
    filterData[0]?.value?.forEach((item) => {
      if (item.isSelected) {
        selected.push(item.id);
      }
    });
    setPageNumber(0);
    getAllTableData(0, selected, filterValues.searchvalue);
  }, [selectedFilterData]);
  return (
    <Paper
      className="pt-2 mnh-85vh mxh-85vh overflow-auto hide-scrollbar"
      elevation={3}
    >
      <Box>
        <TableComponent
          table_heading={`Rejected (${masterData || 0})`}
          showDateFilter
          showDateFilterSearch
          showFilterButton
          showFromToDateFilter={false}
          columns={[...tableColumn]}
          tableRows={[...tableRows]}
          showCheckbox={false}
          allowOutSideClickClose
          filterData={filterData}
          getFilteredValues={(value) => {
            setFilterData(value);
            setSelectedFilterData(value);
          }}
          handlePageEnd={(searchtext, filter, page = pageNumber) => {
            const selected = [];
            filterData[0]?.value?.forEach((item) => {
              if (item.isSelected) {
                selected.push(item.id);
              }
            });
            setFilterValues((pre) => ({ ...pre, searchvalue: searchtext }));
            getAllTableData(page, selected, searchtext);
          }}
        />
        {viewModalOpen && (
          <ModalComponent
            open={viewModalOpen}
            onCloseIconClick={() => {
              setViewModalOpen(false);
            }}
            ModalTitle="View Rejected Supplier"
            titleClassName="h-5 color-orange"
            showFooter={false}
          >
            <Box className="mt-2">
              <Box className="border-bottom">
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Business Name</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.businessName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Email ID</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.emailId}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Mobile no</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.mobileNumber}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">GSTIN No</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.gstin}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Categories</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.mainCategories.join(", ")}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Stock Count</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.avgStockCount}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Website link</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.websiteLink}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                <Grid container className="py-2" xs={12} alignItems="center">
                  <Grid item sm={5} display="flex" justifyContent="end">
                    <Typography className="h-5">Website Name</Typography>
                  </Grid>
                  <Grid>&nbsp;:&nbsp;</Grid>
                  <Grid item sm={6} display="flex" justifyContent="start">
                    <Typography className="fw-bold h-5">
                      {viewModalData.websiteName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </ModalComponent>
        )}
      </Box>
    </Paper>
  );
};

export default Reajected;
