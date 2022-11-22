import CustomIcon from "services/iconUtils";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableComponent";
// import CreateCategories from "@/forms/admin/productcategories/categories/CreateCategories";
import CreateCategoriesModal from "@/forms/admin/productcategories/categories/CreateCategories/CreateCategoriesModal";
import {
  getFilterDropDownList,
  getMainCategories,
} from "services/admin/products/productCategories/category";
import Image from "next/image";

const Categories = () => {
  const [tableRows, setTableRows] = useState([]);
  const [showCreateCategories, setShowCreateCategories] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [filterData, setFilterData] = useState([]);

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
      label: "Price Range",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Comission Type",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Comission Percentage",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "MrMrsCart Profit %",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Reseller Profit %",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "GST %",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Actions",
      data_align: "center",
    },
  ];

  const onClickOfMenuItem = () => {};

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

  const mapTableRows = (data) => {
    const getPriceRangeList = (list) => {
      if (list && list?.length) {
        return list?.map((ele) => {
          if (ele.priceRangeType === "MIN") {
            return (
              <Typography className="h-5">{`Below ${ele.priceEnd}`}</Typography>
            );
          }
          if (ele.priceRangeType === "EQUAL") {
            if (ele.priceStart && ele.priceEnd) {
              return (
                <Typography className="h-5">{`${ele.priceStart} to ${ele.priceEnd}`}</Typography>
              );
            }
          }
          if (ele.priceRangeType === "MAX") {
            return (
              <Typography className="h-5">{`Above ${ele.priceStart}`}</Typography>
            );
          }
          return "--";
        });
      }
      return "--";
    };
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
        col4: getPriceRangeList(val.priceRangeList),
        col5: val.commissionType.replaceAll("_", " "),
        col6: val.priceRangeList?.some((i) => i.commissionPercentage)
          ? val.priceRangeList?.map((i) => (
              <Typography className="h-5">
                {i.commissionPercentage ?? "--"}
              </Typography>
            ))
          : "--",
        col7: val.priceRangeList?.some((i) => i.adminProfitPercentage !== null)
          ? val.priceRangeList?.map((i) => (
              <Typography className="h-5">
                {i.adminProfitPercentage ?? "--"}
              </Typography>
            ))
          : "--",
        col8: val.proiceRangeList?.some((i) => i.resellerProfitPercentage)
          ? val.priceRangeList?.map((i) => (
              <Typography className="h-5">
                {i.resellerProfitPercentage ?? "--"}
              </Typography>
            ))
          : "--",
        col9: val?.categoryGst ?? "--",
        col10: val?.createdAt,
        col11: (
          <Box className="d-flex justify-content-end align-items-center">
            <CustomIcon type="view" className="fs-20" />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, index);
              }}
              options={[
                "Edit",
                <Box className="d-flex align-items-center">
                  <Typography>{val.disabled ? "Enable" : "Disable"}</Typography>
                  <Box className="ms-3">
                    <SwitchComponent label="" defaultChecked={!val.disabled} />
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
          <CreateCategoriesModal
            openCreateNewCategories={showCreateCategories}
            setOpenCreateCategoriesModal={setShowCreateCategories}
          />
        </Box>
      </Box>
    </>
  );
};

export default Categories;
