/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import {
  getAdminProductsByFilter,
  raiseQuery,
} from "services/admin/products/fixedMargin";
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
import { useDispatch } from "react-redux";
import { updateProduct, viewProduct } from "features/productsSlice";
import CreateTicket from "@/forms/admin/help&support/supplierSupport/CreateTicket";
import AcceptRejectModal from "./AcceptRejectmodal";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";
import FilterModal from "../../FilterModal";
import ViewOrEditProducts from "../../VieworEditProducts";

const ProductsToApprove = ({
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
  const [helpSupportModal, sethelpSupportModal] = useState({
    show: false,
    type: "",
    to: {},
    productVariationId: null,
  });
  const [productVariationId, setProductVariationId] = useState("");

  const [images, setImages] = useState([]);

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

  const editClick = async (payload) => {
    const { data, err } = await getVariation(payload);
    if (err) {
      toastify(err?.response?.data?.messagea);
    } else {
      dispatch(updateProduct(data[0]));
      setShowViewProducts(true);
    }
  };
  const onClickOfMenuItem = (ele, val) => {
    setSelectedRow(val);
    if (ele === "Accept/Reject") {
      setOpenAcceptRejectModal(true);
    }
    if (ele === "Delete") {
      deleteProduct(val.productVariationId);
    }
    if (ele === "Edit") {
      editClick([
        {
          masterProductId: val.masterProductId,
          variationId: val.productVariationId,
          flagged: false,
        },
      ]);
    }
    if (ele === "Raise Query") {
      sethelpSupportModal({
        show: true,
        type: "ACTIVE_PRODUCT",
        to: {
          id: val.supplierId,
          label: val.supplierName,
          value: val.supplierId,
        },
        productVariationId: val?.productVariationId,
      });
    }

    if (ele === "Merge to") {
      setProductVariationId(val?.productVariationId);
      setOpenMergeToModal(true);
    }
  };

  useEffect(() => {
    getTableData();
    // getAllInitialFilters();
  }, []);

  const options = [
    "Edit",
    "Delete",
    "Visibility Range",
    "Accept/Reject",
    "Raise Query",
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

  const dispatch = useDispatch();

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
      dateFrom: date?.fromDate ?? "",
      dateTo: date?.toDate ?? "",
      commissionType,
      status: "INITIATED",
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

  const saveQuery = async (val) => {
    const payload = {
      issueType: "PRODUCT_RELATED_ISSUE",
      issueSubject: val.issueSubject,
      userFromType: "ADMIN",
      userFromId: val.userFromId,
      userToType: "SUPPLIER",
      userToId: val.userToId,
      mediaUrl: [...val.mediaUrl],
      helpSupportMessagePojos: [...val.helpSupportMessagePojos],
      productVariationId: helpSupportModal.productVariationId,
    };
    const { data, message, err } = await raiseQuery(payload);
    if (data) {
      toastify(message, "success");
      sethelpSupportModal({
        show: false,
        type: "",
        to: {},
        productVariationId: null,
      });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <>
      <Box>
        {helpSupportModal.show ? (
          <CreateTicket
            setShowCreateTicketComponent={() => {
              sethelpSupportModal({
                show: false,
                type: "",
                to: {},
                productVariationId: null,
              });
            }}
            type={helpSupportModal.type}
            to={helpSupportModal.to}
            submit={saveQuery}
            getTabledata={getTableData}
            getCount={getCount}
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
                  showDateFilterBtn
                  showDateFilter
                  showDateFilterSearch={false}
                  showSearchbar={false}
                  showSearchFilter={false}
                  dateFilterBtnName="+ New Product"
                  showFilterButton
                  dateFilterBtnClick={() => {
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
        productId={productVariationId}
        openMergeToModal={openMergeToModal}
        setOpenMergeToModal={setOpenMergeToModal}
        viewClick={viewClick}
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
