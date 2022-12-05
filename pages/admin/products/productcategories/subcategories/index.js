/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import CreateSubCategoryModal from "@/forms/admin/productcategories/productsubcategories/CreateSubCategoryModal";
import {
  disableOrEnable,
  getCategoryById,
  getSubCategories,
} from "services/admin/products/productCategories/subcategory";
import toastify from "services/utils/toastUtils";
import { format } from "date-fns";
import { getFilterDropDownList } from "services/admin/products/productCategories/category";
// import Image from "next/image";

const tableColumns = [
  {
    id: "col1",
    align: "center",
    label: "S.No.",
    data_align: "center",
  },
  {
    id: "col7",
    align: "center",
    label: "Sub Category Image",
    data_align: "center",
  },
  {
    id: "col2",
    align: "center",
    label: "Sub Category",
    data_align: "center",
  },
  {
    id: "col3",
    align: "center",
    label: "Parent Category",
    data_align: "center",
  },

  {
    id: "col4",
    align: "center",
    label: "Commission type",
    data_align: "center",
  },

  {
    id: "col8",
    align: "center",
    label: "Created By",
    data_align: "center",
  },
  {
    id: "col5",
    align: "center",
    label: "Created Date & Time",
    data_align: "center",
  },
  {
    id: "col9",
    align: "center",
    label: "Last Updated By",
    data_align: "center",
  },
  {
    id: "col10",
    align: "center",
    label: "Last Updated Date & Time",
    data_align: "center",
  },
  {
    id: "col6",
    align: "center",
    label: "Actions",
    data_align: "center",
  },
];

const SubCategories = () => {
  const [tableRows, setTableRows] = useState([]);
  const [openCreateNewSubCategories, setOpenCreateNewSubCategories] =
    useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [subCategoryData, setSubcategoryData] = useState(null);
  const [showView, setShowView] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const getFilterValue = async () => {
    const { data } = await getFilterDropDownList();
    const result = [
      {
        name: "Main Categories",
        value: [],
      },
      {
        name: "Commission Type",
        value: [],
      },
    ];
    if (data) {
      result[0].value = data?.mainCategory.map((ele) => {
        return {
          item: ele,
          isSelected: false,
        };
      });
      result[1].value = data?.commissionType.map((ele) => {
        return {
          item: ele,
          isSelected: false,
        };
      });
    }
    setFilterData([...result]);
  };

  const changeStatus = async (id, status) => {
    // eslint-disable-next-line no-unused-vars
    const { data, err } = await disableOrEnable({
      categoryType: "SUB_CATEGORY",
      categoryId: id,
      status,
    });
    if (data === null) {
      getTableData(0);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getSubCatagoryDetails = async (subCategoryId, cb = () => {}) => {
    const { data, err } = await getCategoryById(subCategoryId);
    if (data) {
      setSubcategoryData(data);
      cb();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapData = (data) => {
    return data.map((val, index) => {
      return {
        col1: index + 1,
        col2: val.subCategoryName,
        col3: val.mainCategoryName,
        col4: val.commissionType,
        col5: val.createdAt
          ? format(new Date(val.createdAt), "MM-dd-yyyy HH:mm:ss")
          : "--",
        col6: (
          <Box className="d-flex justify-content-center align-items-center">
            <Box className="d-flex align-items-center">
              <SwitchComponent
                label=""
                defaultChecked={!val.disable}
                ontoggle={() => {
                  changeStatus(val.subCategoryId, !val.disable);
                }}
              />
            </Box>
            <CustomIcon
              type="edit"
              className="fs-20"
              onIconClick={() => {
                getSubCatagoryDetails(val.subCategoryId, () => {
                  setOpenCreateNewSubCategories(true);
                });
                // setSubcategoryData(val);
                // setOpenCreateNewSubCategories(true);
              }}
            />
            <CustomIcon
              type="view"
              className="fs-20"
              onIconClick={() => {
                getSubCatagoryDetails(val.subCategoryId, () => {
                  console.log("view");
                  setOpenCreateNewSubCategories(true);
                  setShowView(true);
                });
              }}
            />
          </Box>
        ),
        col7: "--",
        // val.mediaUrl ? (
        //   <Image height={50} width={50} src={val.mediaUrl} />
        // ) : (
        //   "--"
        // ),
        col8: val.createdBy || "--",
        col9: val.lastUpdatedBy || "--",
        col10: val.lastUpdatedAt
          ? format(new Date(val.lastUpdatedAt), "MM-dd-yyyy HH:mm:ss")
          : "--",
      };
    });
  };

  const getTableData = async (
    page = pageNumber,
    payload = {
      commissionModeList: [],
      mainCategoryList: [],
      keyword: null,
      fromDate: null,
      toDate: null,
    }
  ) => {
    const { data, err } = await getSubCategories(page, payload);
    if (data) {
      setTableRows(mapData(data));
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getFilterValue();
    getTableData();
  }, []);

  return (
    <>
      <Box>
        <Box>
          <Box className="px-1 pt-2">
            <Paper
              sx={{ height: "84vh" }}
              className="overflow-auto hide-scrollbar pt-3"
            >
              <TableComponent
                table_heading="Sub-categories"
                columns={tableColumns}
                tHeadBgColor="bg-light-gray"
                tableRows={tableRows}
                showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                dateFilterBtnName="Create Sub-categories"
                dateFilterBtnClick={() => {
                  setOpenCreateNewSubCategories(true);
                }}
                handlePageEnd={(searchText, searchFilter, page, date) => {
                  getTableData(page, {
                    commissionModeList: [],
                    mainCategoryList: [],
                    keyword: searchText,
                    fromDate: date.fromDate,
                    toDate: date.toDate,
                  });
                }}
                showFilterButton
                filterData={[...filterData]}
                getFilteredValues={(value) => {
                  const categories = [];
                  const commissionType = [];
                  value.forEach((ele) => {
                    ele?.value.forEach((i) => {
                      if (ele.name === "Main Categories") {
                        if (i.isSelected) {
                          categories.push(i.item);
                        }
                      }
                      if (ele.name === "Commission Type") {
                        if (i.isSelected) {
                          commissionType.push(i.item);
                        }
                      }
                    });
                  });
                  getTableData(0, {
                    mainCategoryList: categories,
                    commissionModeList: commissionType,
                    keyword: null,
                    fromDate: null,
                    toDate: null,
                  });
                }}
              />
            </Paper>
          </Box>
        </Box>
      </Box>

      {openCreateNewSubCategories && (
        <CreateSubCategoryModal
          setOpenCreateNewSubCategories={setOpenCreateNewSubCategories}
          getTableData={getTableData}
          subCategoryData={subCategoryData}
          setSubcategoryData={setSubcategoryData}
          showView={showView}
          setShowView={setShowView}
        />
      )}
    </>
  );
};

export default SubCategories;
