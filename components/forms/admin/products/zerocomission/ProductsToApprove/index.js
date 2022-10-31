/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import {
  getBrands,
  getMainCategories,
  getProductTitles,
  getSubCategories,
} from "services/admin/products";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import ViewProducts from "./ViewProducts";
import AcceptRejectModal from "./AcceptRejectmodal";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";

const ProductsToApprove = ({ getCount = () => {} }) => {
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [modalId, setModalId] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAcceptRejectModal, setOpenAcceptRejectModal] = useState(false);
  const [openMergeToModal, setOpenMergeToModal] = useState(false);
  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  const [openVisibilityRangeModal, setOpenVisibilityRangeModal] =
    useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [productDetails, setProductDetails] = useState({
    vendorIdOrName: "",
    images: "",
    productTitle: "",
    sku: "",
    categorySubcategory: "",
    weightOrVolume: "",
    totalStock: "",
    salePriceAndMrp: "",
    discounts: "",
  });

  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

  const [images, setImages] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const onClickOfMenuItem = (ele, val) => {
    setSelectedRow(val);
    if (ele === "Accept/Reject") {
      setOpenAcceptRejectModal(true);
    }
  };

  const getAllInitialFilters = () => {
    const subCategoryPayload = [];
    const productPayload = {
      categoryIds: [],
      subCategoryIds: [],
      brandNames: [],
      commissionType: "ZERO_COMMISSION",
      status: "INITIATED",
    };
    const BrandsPayload = {
      categoryIds: [],
      subCategoryIds: [],
      commissionType: "ZERO_COMMISSION",
      status: "APPROVED",
    };

    const mainCategories = () =>
      getMainCategories("ZERO_COMMISSION").then((res) => {
        return { categories: res.data };
      });
    const subCategories = () =>
      getSubCategories("ZERO_COMMISSION", subCategoryPayload).then((res) => {
        return { subCategories: res.data };
      });
    const productTitles = () =>
      getProductTitles(productPayload).then((res) => {
        return {
          Products: res.data,
        };
      });
    const Brands = () =>
      getBrands(BrandsPayload).then((res) => {
        return {
          brands: res.data,
        };
      });
    const promiseArr = [
      mainCategories(),
      subCategories(),
      productTitles(),
      Brands(),
    ];
    Promise.all(promiseArr).then((data) => {
      const temp = [
        { name: "categories", value: [] },
        { name: "Sub Categories", value: [] },
        { name: "Brands", value: [] },
        { name: "Products", value: [] },
      ];
      if (data) {
        data.forEach((ele) => {
          ele.categories?.forEach((item) => {
            temp[0].value.push({
              item: item.name,
              id: item.id,
              isSelected: false,
            });
          });
          ele.subCategories?.forEach((item) => {
            temp[1].value.push({
              item: item.name,
              id: item.id,
              isSelected: false,
            });
          });
          ele.brands?.forEach((item) => {
            temp[2].value.push({
              item: item.name,
              isSelected: false,
            });
          });
          ele.Products?.forEach((item) => {
            temp[3].value.push({
              item: item.name,
              isSelected: false,
            });
          });
        });
      }
      setFilterData([...temp]);
    });
  };

  const getProductTitleData = async () => {
    const payload = {
      categoryIds,
      subCategoryIds,
      brandNames: brands,
      commissionType: "ZERO_COMMISSION",
      status: "INITIATED",
    };
    const { data } = await getProductTitles(payload);
    if (data) {
      return {
        Products: data,
      };
    }
  };
  const getBrandsDropDown = async () => {
    const payload = {
      categoryIds,
      subCategoryIds,
      commissionType: "ZERO_COMMISSION",
      status: "APPROVED",
    };
    const { data } = await getBrands(payload);
    return {
      brands: data,
    };
  };
  const getSubCategoriesData = async () => {
    const payload = categoryIds;
    const { data } = await getSubCategories("ZERO_COMMISSION", payload);
    return {
      subCategories: data,
    };
  };

  useEffect(() => {
    getTableData();
    getAllInitialFilters();
  }, []);

  const options = [
    "Edit",
    "Delete",
    "Visibility Range",
    "Accept/Reject",
    "Raise Query",
    "Draft",
    "Merge to",
    "Flags",
  ];

  const columns = [
    {
      id: "col1",
      align: "center",
      label: "VendorID/Name",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Images", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Product Title",
      data_align: "center",
    },
    { id: "col4", align: "center", label: "SKU", data_align: "center" },
    {
      id: "col5",
      align: "center",
      label: "Category/Subcategory",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Weight/Volume",
      data_align: "center",
    },
    { id: "col7", align: "center", label: "Total Stock", data_align: "center" },
    {
      id: "col8",
      align: "center",
      label: "Sale Price/MRP",
      data_align: "center",
    },
    { id: "col9", align: "center", label: "Brand", data_align: "center" },
    { id: "col10", align: "center", label: "Action", data_align: "center" },
  ];

  const getTableData = async () => {
    const payLoad = {
      categoryIds: [],
      subCategoryIds: [],
      brandNames: [],
      productVariationIds: [],
      dateFrom: "",
      dateTo: "",
      commissionType: "ZERO_COMMISSION",
      status: "INITIATED",
    };
    const { data } = await getAdminProductsByFilter(payLoad);
    if (data) {
      const result = [];
      data?.forEach((val, index) => {
        result.push({
          id: index + 1,
          col1: (
            <>
              <Typography className="fs-12 text-primary">
                {val.supplierId}
              </Typography>
              <Typography className="fs-12 text-primary">
                {val.supplierName}
              </Typography>
            </>
          ),
          col2: val.variationMedia ? (
            <Box className="d-flex align-items-end justify-content-center">
              <Box
                onClick={() => {
                  setImages([...val.variationMedia]);
                  setImageIndexForImageModal(0);
                  setModalId(index);
                  setOpenImagesArrayModal(true);
                }}
                className="h-30 border d-flex justify-content-center"
              >
                <Image
                  src={val.variationMedia[0]}
                  width="50"
                  height="50"
                  className="cursor-pointer"
                />
              </Box>
              <Typography className="h-5">
                /{val.variationMedia.length}
              </Typography>
            </Box>
          ) : null,
          col3: <Typography className="h-5">{val.productTitle}</Typography>,
          col4: <Typography className="h-5">{val.skuId}</Typography>,
          col5: (
            <>
              <Typography className="h-5">{val.categoryName}</Typography>
              <Typography className="h-5">{val.subCategoryName}</Typography>
            </>
          ),
          col6: (
            <>
              <Typography className="h-5">
                {val.weightInclusivePackage}
              </Typography>
              <Typography className="h-5">{val.volume}</Typography>
            </>
          ),
          col7: val.stockQty,
          col8: (
            <Typography className="h-5">
              &#8377; {val.salePrice}/ &#8377; {val.mrp}
            </Typography>
          ),
          col9: val.brand,
          col10: (
            <Box className="d-flex justify-content-evenly align-items-center">
              <CustomIcon
                type="view"
                className="fs-18"
                onIconClick={() => setShowViewProducts(true)}
              />
              <MenuOption
                getSelectedItem={(ele) => {
                  onClickOfMenuItem(ele, val);
                }}
                options={options}
                IconclassName="fs-18 color-gray"
              />
            </Box>
          ),
        });
      });

      setTableRows([...result]);
    }
  };

  const getFilteredValue = (value) => {
    const temp = JSON.parse(JSON.stringify(value));
    const tempCategoryIds = [];
    temp[0].value?.forEach((i) => {
      if (i.isSelected) {
        tempCategoryIds.push(i.id);
      }
    });
    if (JSON.stringify(categoryIds) != JSON.stringify(tempCategoryIds))
      setCategoryIds([...tempCategoryIds]);
    const tempSubCategoryIds = [];
    temp[1].value?.forEach((i) => {
      if (i.isSelected) {
        tempSubCategoryIds.push(i.id);
      }
    });
    if (JSON.stringify(subCategoryIds) != JSON.stringify(tempSubCategoryIds))
      setSubCategoryIds([...tempSubCategoryIds]);
    const tempBrands = [];
    temp[2].value?.forEach((i) => {
      if (i.isSelected) {
        tempBrands.push(i.item);
      }
    });

    if (JSON.stringify(brands) != JSON.stringify(tempBrands))
      setBrands([...tempBrands]);
  };

  useEffect(() => {
    setSubCategoryIds([]);
    setBrands([]);
    setProducts([]);
    const promiseArr = [
      getSubCategoriesData(),
      getBrandsDropDown(),
      getProductTitleData(),
    ];
    Promise.all(promiseArr).then((data) => {
      if (data) {
        const temp = JSON.parse(JSON.stringify(filterData));
        if (temp.length) {
          temp[1].value = data[0]?.subCategories?.map((i) => ({
            item: i.name,
            id: i.id,
            isSelected: false,
          }));
          temp[2].value = data[1]?.brands?.map((i) => ({
            item: i.name,
            isSelected: false,
          }));
          temp[3].value = data[2]?.Products?.map((i) => ({
            item: i.name,
            id: i.id,
            isSelected: false,
          }));
          setFilterData(temp);
        }
      }
    });
  }, [categoryIds]);

  useEffect(() => {
    setBrands([]);
    setProducts([]);
    const promiseArr = [getBrandsDropDown(), getProductTitleData()];
    Promise.all(promiseArr).then((data) => {
      if (data) {
        const temp = JSON.parse(JSON.stringify(filterData));
        if (temp.length) {
          temp[2].value = data[0]?.brands?.map((i) => ({
            item: i.name,
            isSelected: false,
          }));
          temp[3].value = data[1]?.Products?.map((i) => ({
            item: i.name,
            id: i.id,
            isSelected: false,
          }));
          setFilterData(temp);
        }
      }
    });
  }, [subCategoryIds]);

  useEffect(() => {
    setProducts([]);
    const promiseArr = [getProductTitleData()];
    Promise.all(promiseArr).then((data) => {
      if (data) {
        const temp = JSON.parse(JSON.stringify(filterData));
        if (temp.length) {
          temp[3].value = data[0]?.Products?.map((i) => ({
            item: i.name,
            id: i.id,
            isSelected: false,
          }));
          setFilterData(temp);
        }
      }
    });
  }, [brands]);

  return (
    <>
      <Box>
        {!showViewProducts ? (
          <Box>
            <Paper
              sx={{ height: "78vh" }}
              className="overflow-auto hide-scrollbar"
            >
              <Box className="px-1 pt-2">
                <TableComponent
                  columns={columns}
                  getFilteredValuesOnCheckBoxClick
                  tHeadBgColor="bg-light-gray"
                  tableRows={tableRows}
                  showDateFilterBtn
                  showDateFilter
                  showDateFilterSearch={false}
                  showSearchbar={false}
                  showSearchFilter={false}
                  dateFilterBtnName="+ New Product"
                  showFilterButton
                  filterData={filterData}
                  getFilteredValues={(value) => {
                    getFilteredValue(value);
                    setFilterData(value);
                  }}
                  dateFilterBtnClick={() => {
                    setProductDetails({
                      vendorIdOrName: "",
                      images: "",
                      productTitle: "",
                      sku: "",
                      categorySubcategory: "",
                      weightOrVolume: "",
                      totalStock: "",
                      salePriceAndMrp: "",
                      discounts: "",
                    });
                    setImageArray([]);
                    setOpenEditModal(true);
                    setModalId(null);
                  }}
                />
              </Box>
            </Paper>
          </Box>
        ) : (
          <ViewProducts setShowViewProduct={setShowViewProducts} />
        )}
      </Box>
      {/* Edit Modal Component */}
      <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setTableRows}
        modalId={modalId}
        rowsDataObjects={tableRows}
      />
      {/* Images Modal Component */}
      <DisplayImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        rowsDataObjects={tableRows}
        modalId={modalId}
        productDetails={productDetails}
        images={images}
      />
      {/* Accept Reject Modal */}
      {openAcceptRejectModal ? (
        <AcceptRejectModal
          getCount={getCount}
          openAcceptRejectModal={openAcceptRejectModal}
          setOpenAcceptRejectModal={setOpenAcceptRejectModal}
          modalId={modalId}
          rowsDataObjects={selectedRow}
          getTableData={getTableData}
        />
      ) : null}
      {/* Raise Query Modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
        modalTitle="Raise Query"
        placeholder="Type your query"
      />
      {/* Merge To Modal */}
      <MergeToModal
        openMergeToModal={openMergeToModal}
        setOpenMergeToModal={setOpenMergeToModal}
      />
      <VisibilityRangeModal
        openVisibilityRangeModal={openVisibilityRangeModal}
        setOpenVisibilityRangeModal={setOpenVisibilityRangeModal}
      />
      {/* Flag Modal */}
      <FlagModal
        showFlagModal={showFlagModal}
        setShowFlagModal={setShowFlagModal}
      />
    </>
  );
};

export default ProductsToApprove;
