/* eslint-disable no-unused-vars */
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import TableComponent from "@/atoms/TableComponent";
import FilterModal from "@/forms/admin/products/filterModal";
import ViewOrEditProducts from "@/forms/admin/products/VieworEditProducts";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { adminProductView } from "features/productsSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomIcon from "services/iconUtils";
import { getVariation } from "services/supplier/myProducts";
import toastify from "services/utils/toastUtils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getProductsBySupplierId } from "services/admin/supplier/active";

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

const SupplierProduct = ({ supplierId = null, backClick = () => {} }) => {
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const viewClick = async (masterProductId, variationId) => {
    const { data, err } = await getVariation([
      { masterProductId, variationId },
    ]);
    if (data) {
      const temp = {
        data: data[0],
        showExtraTabs: false,
        list: [],
      };
      dispatch(adminProductView(temp));
      setShowViewProducts(true);

      // window.open("/supplier/products&inventory/addnewproduct");
    } else {
      toastify(err?.response?.data?.messagea);
    }
  };

  const mapTableRows = (data) => {
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
        col3: (
          <Tooltip title={val.productTitle} placement="top">
            <Typography className="h-5 text-truncate">
              {val.productTitle}
            </Typography>
          </Tooltip>
        ),
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
              onIconClick={() => {
                viewClick(val.masterProductId, val.productVariationId);
              }}
            />
          </Box>
        ),
      });
    });
    return result;
  };

  const getTableData = async (
    page = 0,
    catIDs,
    subcatIds,
    brandNames,
    productIds,
    date
  ) => {
    const payLoad = {
      categoryIds: catIDs ?? categoryIds ?? [],
      subCategoryIds: subcatIds ?? subCategoryIds ?? [],
      brandNames: brandNames ?? brands ?? [],
      productVariationIds: productIds ?? products ?? [],
      dateFrom: date?.fromDate ?? null,
      dateTo: date?.toDate ?? null,
    };
    const { data } = await getProductsBySupplierId(supplierId, page, payLoad);
    if (data) {
      if (page === 0) {
        setTableRows([...mapTableRows(data)]);
      } else {
        setTableRows([...tableRows, ...mapTableRows(data)]);
        if (data.length) setPageNumber(pageNumber + 1);
      }
    }
  };

  useEffect(() => {
    if (supplierId) getTableData();
  }, []);
  return (
    <>
      {!showViewProducts ? (
        <Box>
          <Box onClick={backClick} className="d-flex ">
            <Typography className="h-5 d-flex align-items-center cursor-pointer me-3 color-orange">
              <ArrowBackIosIcon className="fs-14" />
              Back
            </Typography>
          </Box>
          <Box>
            <Paper
              sx={{ height: "78vh" }}
              className="overflow-auto hide-scrollbar"
            >
              <Box className="px-1 pt-2">
                <TableComponent
                  showFilterList={false}
                  onFilterButtonClick={() => {
                    setShowFilterModal(true);
                  }}
                  columns={columns}
                  tHeadBgColor="bg-light-gray"
                  tableRows={tableRows}
                  showDateFilter
                  showDateFilterSearch={false}
                  showSearchbar={false}
                  showSearchFilter={false}
                  showFilterButton
                  dateFilterBtnClick={() => {
                    setModalId(null);
                  }}
                  handleRowsPerPageChange={() => {
                    setPageNumber(1);
                  }}
                  handlePageEnd={(
                    searchText,
                    searchFilter,
                    page = pageNumber,
                    dateFilter
                  ) => {
                    getTableData(
                      page,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      dateFilter
                    );
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      ) : (
        <ViewOrEditProducts
          setShowViewOrEdit={() => {
            setShowViewProducts(false);
            //   dispatch(resetAdminProductView());
          }}
        />
      )}

      {showFilterModal && (
        <FilterModal
          status="INITIATED"
          showModal={showFilterModal}
          setShowModal={setShowFilterModal}
          getFilteredValues={(catIds, subcatIds, brandNames, productIds) => {
            setCategoryIds(catIds);
            setSubCategoryIds(subcatIds);
            setBrands(brandNames);
            setProducts(productIds);
            getTableData(0, catIds, subcatIds, brandNames, productIds);
          }}
        />
      )}
      <DisplayImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        rowsDataObjects={tableRows}
        modalId={modalId}
        images={images}
      />
    </>
  );
};

export default SupplierProduct;
