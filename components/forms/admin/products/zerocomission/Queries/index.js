/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import {
  deleteProducts,
  // getBrands,
  // getMainCategories,
  // getProductTitles,
  // getSubCategories,
} from "services/admin/products";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import toastify from "services/utils/toastUtils";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import { getVariation } from "services/supplier/myProducts";
import { viewProduct } from "features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
// import ViewProducts from "./ViewProducts";
import { helpandSupportGetTicketById } from "services/admin/help&support";
import HelpandsupportView from "@/forms/admin/help&support/helpandsupportview";
import AcceptRejectModal from "./AcceptRejectmodal";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";
import FilterModal from "../../FilterModal";
import ViewOrEditProducts from "../../VieworEditProducts";

const Queries = ({
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
  const [selectedRow, setSelectedRow] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    type: "",
    show: "",
    details: null,
  });
  const user = useSelector((state) => state.user);

  const deleteProduct = async (id) => {
    const { data, err } = await deleteProducts(id);
    if (data) {
      toastify(data?.message, "success");
      getTableData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const getTicketById = async (ticketId) => {
    const { data } = await helpandSupportGetTicketById(ticketId);
    if (data?.data) {
      // setSelectedData(data.data);
      setShowModal({
        details: data.data,
        show: true,
        type: "view",
      });
    }
  };

  const onClickOfMenuItem = (ele, val) => {
    setSelectedRow(val);

    if (ele === "Delete") {
      deleteProduct(val.productVariationId);
    } else if (ele === "Close") {
      console.log(val);
    } else if (ele === "Replay") {
      getTicketById(64);
    }
  };
  const viewClick = async (masterProductId, variationId) => {
    const { data, err } = await getVariation([
      { masterProductId, variationId },
    ]);
    if (data) {
      dispatch(viewProduct(data[0]));
      setShowViewProducts(true);

      // window.open("/supplier/products&inventory/addnewproduct");
    } else {
      toastify(err?.response?.data?.messagea);
    }
  };

  useEffect(() => {
    getTableData();
    // getAllInitialFilters();
  }, []);

  const options = ["Replay", "Close", "Delete"];

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
      label: "Issue Subject",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Created Date & Time",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Ticket Status",
      data_align: "center",
    },
    { id: "col9", align: "center", label: "Action", data_align: "center" },
  ];

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
        col9: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => {
                viewClick(val.masterProductId, val.productVariationId);
              }}
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
      status: "IN_QUERY",
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

  return (
    <>
      <Box>
        {showModal.show ? (
          <HelpandsupportView
            selectedData={showModal.details}
            setShowModal={() => {
              setShowModal({
                show: false,
                type: "",
                details: null,
              });
            }}
            user={user}
          />
        ) : !showViewProducts ? (
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
                    // setProductDetails({
                    //   vendorIdOrName: "",
                    //   images: "",
                    //   productTitle: "",
                    //   sku: "",
                    //   categorySubcategory: "",
                    //   weightOrVolume: "",
                    //   totalStock: "",
                    //   salePriceAndMrp: "",
                    //   discounts: "",
                    // });
                    setImageArray([]);
                    setOpenEditModal(true);
                    setModalId(null);
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
        ) : (
          <ViewOrEditProducts setShowViewOrEdit={setShowViewProducts} />
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
      {showFilterModal && (
        <FilterModal
          status="IN_QUERY"
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

export default Queries;
