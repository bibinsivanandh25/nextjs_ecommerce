/* eslint-disable no-use-before-define */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import TableComponent from "@/atoms/TableComponent";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import { getVariation } from "services/supplier/myProducts";
import { useDispatch } from "react-redux";
import {
  adminProductView,
  resetAdminProductView,
} from "features/productsSlice";
import toastify from "services/utils/toastUtils";
import { deleteProducts } from "services/admin/products";
import AcceptRejectModal from "./AcceptRejectmodal";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";
import FilterModal from "../../filterModal";
import ViewOrEditProducts from "../../VieworEditProducts";

const Rejected = ({
  getCount = () => {},
  commissionType = "ZERO_COMMISSION",
}) => {
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

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

  const [images, setImages] = useState([]);

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

  const deleteProduct = async (id) => {
    const { data, err } = await deleteProducts(id);
    if (data) {
      toastify(data?.message, "success");
      getTableData(0);
      getCount();
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
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
              {val.businessName}
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
            <Typography className="fs-10">
              /{val.variationMedia.length}
            </Typography>
          </Box>
        ) : null,
        col3: (
          <Tooltip title={val.productTitle} placement="top">
            <Typography
              className="h-5 text-truncate"
              style={{
                maxWidth: "100px",
              }}
            >
              {val.productTitle}
            </Typography>
          </Tooltip>
        ),
        col4: val.skuId,
        col5: (
          <>
            <Typography className="fs-12">{val.categoryName}</Typography>
            <Typography className="fs-12">{val.subCategoryName}</Typography>
          </>
        ),
        col6: (
          <>
            <Typography className="fs-12">
              {val.weightInclusivePackage}
            </Typography>
            <Typography className="fs-12">{val.volume}</Typography>
          </>
        ),
        col7: val.stockQty,
        col8: (
          <Typography className="fs-12">
            &#8377; {val.salePrice}/ &#8377; {val.mrp}
          </Typography>
        ),
        col9: val.brand,
        col10: (
          <Box className="d-flex justify-content-between align-items-center">
            <CustomIcon
              type="view"
              className="h-4"
              title="view"
              onIconClick={() => {
                viewClick(val.masterProductId, val.productVariationId);
              }}
            />
            <CustomIcon
              type="delete"
              className="h-4 ms-1"
              title="delete"
              onIconClick={() => {
                deleteProduct(val.productVariationId);
              }}
            />
            {/* <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(ele, val);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            /> */}
          </Box>
        ),
      });
    });

    return result;
  };

  const getTableData = async (
    page = pageNumber,
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
      commissionType,
      status: "REJECTED",
    };
    const { data } = await getAdminProductsByFilter(payLoad, page);

    if (data) {
      if (page === 0) {
        setTableRows([...mapTableRows(data)]);
        setPageNumber(pageNumber + 1);
      } else {
        setTableRows([...tableRows, ...mapTableRows(data)]);
        setPageNumber(pageNumber + 1);
      }
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

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
                  showFilterButton
                  tHeadBgColor="bg-light-gray"
                  showFilterList={false}
                  tableRows={tableRows}
                  showDateFilterSearch={false}
                  onFilterButtonClick={() => {
                    setShowFilterModal(true);
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
                  showDateFilter
                />
              </Box>
            </Paper>
          </Box>
        ) : (
          <ViewOrEditProducts
            setShowViewOrEdit={() => {
              setShowViewProducts(false);
              dispatch(resetAdminProductView());
            }}
          />
        )}
      </Box>
      {/* Edit Modal Component */}
      {openEditModal ? (
        <AddEditProductModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          productDetails={productDetails}
          setImageArray={setImageArray}
          setProductDetails={setProductDetails}
          imageArray={imageArray}
          // setRowDataObjects={setrowsDataObjectsForRejected}
          modalId={modalId}
          // rowsDataObjects={rowsDataObjectsForRejected}
        />
      ) : null}
      {showFilterModal && (
        <FilterModal
          status="REJECTED"
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
      {/* Images Modal Component */}
      {openImagesArrayModal ? (
        <DisplayImagesModal
          openImagesArrayModal={openImagesArrayModal}
          setOpenImagesArrayModal={setOpenImagesArrayModal}
          imageIndexForImageModal={imageIndexForImageModal}
          setImageIndexForImageModal={setImageIndexForImageModal}
          // rowsDataObjects={rowsDataObjectsForRejected}
          modalId={modalId}
          productDetails={productDetails}
          images={images}
        />
      ) : null}
      {/* Accept Reject Modal */}
      {openAcceptRejectModal ? (
        <AcceptRejectModal
          openAcceptRejectModal={openAcceptRejectModal}
          setOpenAcceptRejectModal={setOpenAcceptRejectModal}
          modalId={modalId}
          // rowsDataObjects={rowsDataObjectsForRejected}
        />
      ) : null}
      {/* Raise Query Modal */}
      {openRaiseQueryModal ? (
        <RaiseQueryModal
          openRaiseQueryModal={openRaiseQueryModal}
          setOpenRaiseQueryModal={setOpenRaiseQueryModal}
          modalTitle="Raise Query"
          placeholder="Type your query"
        />
      ) : null}
      {/* Merge To Modal */}
      {openMergeToModal ? (
        <MergeToModal
          openMergeToModal={openMergeToModal}
          setOpenMergeToModal={setOpenMergeToModal}
        />
      ) : null}
      {openVisibilityRangeModal ? (
        <VisibilityRangeModal
          openVisibilityRangeModal={openVisibilityRangeModal}
          setOpenVisibilityRangeModal={setOpenVisibilityRangeModal}
        />
      ) : null}
      {/* Flag Modal */}
      {showFlagModal ? (
        <FlagModal
          showFlagModal={showFlagModal}
          setShowFlagModal={setShowFlagModal}
        />
      ) : null}
    </>
  );
};

export default Rejected;
