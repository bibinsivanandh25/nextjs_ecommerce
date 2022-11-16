/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import {
  disableActiveProduct,
  getAdminProductsByFilter,
  raiseQuery,
} from "services/admin/products/fixedMargin";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import SwitchComponent from "@/atoms/SwitchComponent";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import CreateTicket from "@/forms/admin/help&support/supplierSupport/CreateTicket";
import { getVariation } from "services/supplier/myProducts";
import { useDispatch } from "react-redux";
import { updateProduct, viewProduct } from "features/productsSlice";
import toastify from "services/utils/toastUtils";
import AddEditProductModal from "./AddEditProductModal";
import RaiseQueryModal from "./RaiseQueryModal";
import FilterModal from "../../FilterModal";
import ViewOrEditProducts from "../../VieworEditProducts";
import DiscountModal from "../DiscountModal";

const Active = ({ commissionType = "ZERO_COMMISSION" }) => {
  const [rowsDataObjectsForActive, setRowsDataObjectsForActive] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    vendorIdOrName: "",
    images: "",
    sku: "",
    categorySubcategory: "",
    weightOrVolume: "",
    totalStock: "",
    salePriceAndMrp: "",
    discounts: "",
  });
  const [imageArray, setImageArray] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  //   const [first, setfirst] = useState(second);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [images, setImages] = useState([]);
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

  const dispatch = useDispatch();

  const tableColumnsForActive = [
    {
      id: "col1",
      align: "center",
      label: "S.No.",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Product ID",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Images",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Product Title",
      data_align: "center",
      maxWidth: 100,
    },
    {
      id: "col5",
      align: "center",
      label: "Vendor ID/Buisness Name",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "SKU",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Total Stock",
      data_align: "center",
    },
    {
      id: "col8",
      align: "center",
      label: "Weight/Volume",
      data_align: "center",
    },
    {
      id: "col9",
      align: "center",
      label: "Brand",
      data_align: "center",
    },
    {
      id: "col10",
      align: "center",
      label: "Sale Price/MRP",
      data_align: "center",
    },
    {
      id: "col11",
      align: "center",
      label: "Category/Sub-category",
      data_align: "center",
    },
    {
      id: "col12",
      align: "center",
      label: "Active flag",
      data_align: "center",
    },
    {
      id: "col13",
      align: "center",
      label: "Date of creation",
      data_align: "center",
    },
    {
      id: "col14",
      align: "center",
      label: "Date of Approval",
      data_align: "center",
    },
    {
      id: "col15",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];
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
    setProductId(val.productVariationId);
    setSupplierId(val.supplierId);
    if (ele === "Discount") {
      setOpenDiscountModal(true);
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

  const enableDisableProduct = async (id, status) => {
    const { data, err } = await disableActiveProduct(id, status);
    if (data) {
      toastify(data?.message, "success");
      getTableData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      getTableData(0);
    }
  };

  const mapTableRows = (data) => {
    const result = [];
    data?.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: (
          <>
            <Typography className="fs-12">{index + 1}</Typography>
          </>
        ),
        col2: val.productVariationId,
        col3: (
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
                src={val.variationMedia?.length ? val.variationMedia[0] : ""}
                width="50"
                height="50"
                className="cursor-pointer"
              />
            </Box>
            <Typography className="fs-10">
              /{val?.variationMedia?.length ?? 0}
            </Typography>
          </Box>
        ),
        col4: (
          <Tooltip title={val.productTitle} placement="top">
            <Typography
              style={{
                maxWidth: "100px",
              }}
              className="h-5 text-truncate"
            >
              {val.productTitle}
            </Typography>
          </Tooltip>
        ),
        col5: `${val.supplierId} / ${val.supplierName}`,
        col6: val.skuId,
        col7: val.stockQty,
        col8: `${val.weightInclusivePackage} / ${val.volume}`,
        col9: val.brand,
        col10: (
          <Typography className="fs-12">
            &#8377; {val.salePrice}/ &#8377; {val.mrp}
          </Typography>
        ),
        col11: `  ${val.categoryName} / ${val.subCategoryName}`,
        col12: val.activeFlag,
        col13: val.createdAt,
        col14: val.approvedAt,
        col15: (
          <Box className="d-flex align-items-center">
            <Box className="ms-2 w-75">
              <SwitchComponent
                label=""
                styledSwitch
                defaultChecked={!val.disable}
                ontoggle={() => {
                  enableDisableProduct(val.productVariationId, !val.disable);
                }}
              />
            </Box>
            <CustomIcon
              type="view"
              className="me-2"
              onIconClick={() => {
                viewClick(val.masterProductId, val.productVariationId);
              }}
            />

            <Box>
              <MenuOption
                getSelectedItem={(ele) => {
                  onClickOfMenuItem(ele, val);
                }}
                options={["Edit", "Remove", "Discount", "Raise Query"]}
                IconclassName="color-gray "
              />
            </Box>
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
      status: "APPROVED",
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
        />
      ) : !showViewProducts ? (
        <Box>
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumnsForActive}
                tHeadBgColor="bg-light-gray"
                // showPagination={false}
                tableRows={tableRows}
                // showSearchbar={false}
                showDateFilterBtn
                showDateFilter
                showFilterList={false}
                showFilterButton
                showDateFilterSearch={false}
                showSearchbar={false}
                dateFilterBtnName="+ New Product"
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
              />
            </Box>
          </Paper>
        </Box>
      ) : (
        <ViewOrEditProducts setShowViewOrEdit={setShowViewProducts} />
      )}
      {/* Edit Modal Component */}
      <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setRowsDataObjectsForActive}
        modalId={modalId}
        rowsDataObjects={rowsDataObjectsForActive}
      />
      {showFilterModal && (
        <FilterModal
          status="APPROVED"
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
        modalId={modalId}
        images={images}
      />
      {/* Reasons for remove modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRemoveModal}
        setOpenRaiseQueryModal={setOpenRemoveModal}
        modalTitle="Reason for Remove"
        placeholder="Type your Reason"
      />
      {/* Resons for reject modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRejectModal}
        setOpenRaiseQueryModal={setOpenRejectModal}
        modalTitle="Reason for Reject"
        placeholder="Type your Reason"
      />
      {/* Discount Modal */}
      {openDiscountModal ? (
        <DiscountModal
          showModal={openDiscountModal}
          setShowModal={setOpenDiscountModal}
          productVariationId={productId}
          supplierId={supplierId}
        />
      ) : null}
    </>
  );
};

export default Active;
