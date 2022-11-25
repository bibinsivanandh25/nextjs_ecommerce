/* eslint-disable no-use-before-define */
import CustomIcon from "services/iconUtils";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
// import CreateCategories from "@/forms/admin/productcategories/categories/CreateCategories";
import CreateCategoriesModal from "@/forms/admin/productcategories/categories/CreateCategories/CreateCategoriesModal";
import {
  enableOrDisableMainCategory,
  getFilterDropDownList,
  getMainCategories,
  getMainCategoryDetailsByCategoryId,
} from "services/admin/products/productCategories/category";
import Image from "next/image";
import toastify from "services/utils/toastUtils";

const Categories = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateCategories, setShowCreateCategories] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [modalType, setmodalType] = useState("Add");
  const [categoryId, setCategoryId] = useState("");
  const [catagoryDetails, setCategoryDetails] = useState({});

  const tableColumns = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Image",
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
      label: "Comission Type",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "GST %",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Created By",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Last Updated At",
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
      label: "Actions",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = async (ele, val) => {
    setCategoryId(val.mainCategoryId);
    if (ele === "Edit") {
      const { data } = await getMainCategoryDetailsByCategoryId(
        val.mainCategoryId
      );
      if (data) {
        setmodalType(ele);
        setCategoryDetails(data);
        setShowCreateCategories(true);
      }
    }
  };

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

  const enableDisableCategory = async (status, id) => {
    const payload = {
      categoryType: "CATEGORY",
      categoryId: id,
      status,
    };
    const { data, err } = await enableOrDisableMainCategory(payload);

    if (data) {
      toastify(data?.message, "success");
      getTableData();
    }
    if (err) {
      toastify(err?.response?.data?.message);
    }
  };

  const mapTableRows = (data) => {
    const result = [];
    data.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: index + 1,
        col2: <Image height={50} width={50} src={val.categoryImageUrl} />,
        col3: (
          <Typography
            className="h-5"
            sx={{
              maxWidth: "100px",
            }}
          >
            {val.mainCategoryName}
          </Typography>
        ),
        col4: val.commissionType.replaceAll("_", " "),
        col5: val?.categoryGst ?? "--",
        col6: val?.createdAt,
        col7: val?.createdBy ?? "--",
        col8: val?.lastUpdatedAt,
        col9: val?.lastModifiedBy ?? "--",
        col10: (
          <Box className="d-flex justify-content-end align-items-center">
            <CustomIcon type="view" className="fs-20" />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, val);
              }}
              options={[
                "Edit",
                <Box className="d-flex align-items-center">
                  <Typography>{val.disabled ? "Disable" : "Enable"}</Typography>
                  <Box className="ms-3">
                    <SwitchComponent
                      label=""
                      defaultChecked={!val.disabled}
                      ontoggle={() => {
                        enableDisableCategory(
                          !val.disabled,
                          val.mainCategoryId
                        );
                      }}
                    />
                  </Box>
                </Box>,
              ]}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });
    return result;
  };

  const getTableData = async (
    page = pageNumber,
    date,
    mainCategory,
    commissionType
  ) => {
    const payload = {
      fromDate: date?.fromDate ?? null,
      toDate: date?.toDate ?? null,
      mainCategory: mainCategory ?? [],
      commissionType: commissionType ?? [],
    };
    const { data } = await getMainCategories(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows([...mapTableRows(data)]);
        setPageNumber(page + 1);
      } else {
        setTableRows([...tableRows, ...mapTableRows(data)]);
        setPageNumber(page + 1);
      }
    }
  };

  useEffect(() => {
    getTableData();
    getFilterValue();
  }, []);

  return (
    <>
      <Box>
        <Box className="px-1 pt-2">
          <Paper className="overflow-auto hide-scrollbar pt-3 mnh-85vh mxh-85vh">
            <TableComponent
              showSearchFilter={false}
              showDateFilterSearch={false}
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
                getTableData(0, undefined, categories, commissionType);
              }}
              showFilterButton
              filterData={[...filterData]}
              table_heading="Categories"
              columns={tableColumns}
              tHeadBgColor="bg-light-gray"
              // showPagination={false}
              tableRows={tableRows}
              showSearchbar={false}
              showDateFilterBtn
              showDateFilter
              dateFilterBtnName="Create Categories"
              dateFilterBtnClick={() => {
                setShowCreateCategories(true);
                setmodalType("Add");
              }}
              handlePageEnd={(
                searchText,
                searchFilter,
                page = pageNumber,
                dateFilter
              ) => {
                getTableData(page, dateFilter);
              }}
            />
          </Paper>
          {showCreateCategories ? (
            <CreateCategoriesModal
              modalType={modalType}
              categoryFormData={catagoryDetails}
              categoryId={categoryId}
              getTableData={getTableData}
              openCreateNewCategories={showCreateCategories}
              setOpenCreateCategoriesModal={setShowCreateCategories}
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Categories;
