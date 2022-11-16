/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import CreateTicket from "@/forms/admin/help&support/supplierSupport/CreateTicket";
import toastify from "services/utils/toastUtils";
import { deleteProducts } from "services/admin/products";
import {
  acceptOrRejectProduct,
  getAdminProductsByFilter,
  raiseQuery,
} from "services/admin/products/fixedMargin";
import { useDispatch } from "react-redux";
import { updateProduct, viewProduct } from "features/productsSlice";
import { getVariation } from "services/supplier/myProducts";
import RaiseQueryModal from "./RaiseQueryModal";
import EditProductModalForUpdated from "./EditProductModal";
import FilterModal from "../../FilterModal";
import ViewOrEditProducts from "../../VieworEditProducts";
import ReasonToReject from "../ProductsToApprove/AcceptRejectmodal/ReasonToReject";

const Updated = ({
  rowsDataObjectsForUpdated,
  getCount = () => {},
  commissionType = "ZERO_COMMISSION",
}) => {
  // eslint-disable-next-line no-unused-vars
  const [openAcceptRejectModal, setOpenAcceptRejectModal] = useState(false);
  const [openEditModalForUpdated, setOpenEditModalForUpdated] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [productId, setProductId] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);

  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [helpSupportModal, sethelpSupportModal] = useState({
    show: false,
    type: "",
    to: {},
    productVariationId: null,
  });
  const [modalId, setModalId] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [images, setImages] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const tableColumnsForProductsToUpdated = [
    {
      id: "col1",
      align: "center",
      label: "Product Id",
      data_align: "center",
    },
    {
      id: "col2",
      align: "center",
      label: "Images",
      data_align: "center",
    },
    {
      id: "col3",
      align: "center",
      label: "Product Title",
      data_align: "center",
    },
    {
      id: "col4",
      align: "center",
      label: "Vendor ID/Business Name",
      data_align: "center",
    },

    {
      id: "col5",
      align: "center",
      label: "Category/Subcategory",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Change",
      data_align: "center",
    },
    {
      id: "col7",
      align: "center",
      label: "Updated Date & time",
      data_align: "center",
    },
    { id: "col8", align: "center", label: "Action", data_align: "center" },
  ];
  const options = ["Edit", "Delete", "Raise Query", "Approve", "Reject"];

  const deleteProduct = async (id) => {
    const { data, err } = await deleteProducts(id);
    if (data) {
      toastify(data?.message, "success");
      // eslint-disable-next-line no-use-before-define
      getTableData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const dispatch = useDispatch();
  const editClick = async (payload) => {
    const { data, err } = await getVariation(payload);
    if (err) {
      toastify(err?.response?.data?.messagea);
    } else {
      dispatch(updateProduct(data[0]));
      setShowViewProducts(true);
    }
  };

  const approveOrRejectProduct = async (status, id) => {
    const payload = {
      productVariationId: id ?? productId,
      status,
      rejectedReason: status === "APPROVED" ? null : rejectReason,
    };
    const { data, err, message } = await acceptOrRejectProduct(payload);

    if (data) {
      setOpenAcceptRejectModal(false);
      toastify(message, "success");
      getTableData(0);
      getCount();
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const onClickOfMenuItem = (ele, val) => {
    setProductId(val.productVariationId);
    if (ele === "Approve") {
      approveOrRejectProduct("APPROVED", val?.productVariationId);
    }
    if (ele === "Reject") {
      setShowReasonModal(true);
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
  const mapTableRows = (data) => {
    const result = [];
    data?.forEach((val, index) => {
      result.push({
        id: index + 1,
        col1: val.productVariationId,
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
        col4: (
          <>
            <Typography className="fs-12 text-primary">
              {val.supplierId}
            </Typography>
            <Typography className="fs-12 text-primary">
              {val.supplierName}
            </Typography>
          </>
        ),
        col5: (
          <>
            <Typography className="h-5">{val.categoryName}</Typography>
            <Typography className="h-5">{val.subCategoryName}</Typography>
          </>
        ),
        col6: val.changes ?? "--",
        col7: val.lastUpdatedAt,
        col8: (
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
      status: "UPDATED",
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

  useEffect(() => {
    getTableData();
  }, []);

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
          <Box>
            <Paper
              sx={{ height: "78vh" }}
              className="overflow-auto hide-scrollbar"
            >
              <Box className="px-1 pt-2">
                <TableComponent
                  columns={tableColumnsForProductsToUpdated}
                  showFilterButton
                  showFilterList={false}
                  tHeadBgColor="bg-light-gray"
                  // showPagination={false}
                  tableRows={tableRows}
                  // showSearchbar={false}
                  showDateFilter
                  showDateFilterSearch={false}
                  dateFilterBtnClick={() => {
                    setModalId(null);
                  }}
                  showSearchbar={false}
                  showSearchFilter={false}
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
        </Box>
      ) : (
        <ViewOrEditProducts setShowViewOrEdit={setShowViewProducts} />
      )}
      <DisplayImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        modalId={modalId}
        images={images}
      />
      <ReasonToReject
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        showModal={showReasonModal}
        setShowModal={setShowReasonModal}
        onSaveClick={() => {
          approveOrRejectProduct("REJECTED");
        }}
      />
      {/* Edit */}
      <EditProductModalForUpdated
        openEditModalForUpdated={openEditModalForUpdated}
        setOpenEditModalForUpdated={setOpenEditModalForUpdated}
        rowsDataObjectsForUpdated={rowsDataObjectsForUpdated}
        modalId={modalId}
      />
      {showFilterModal && (
        <FilterModal
          status="UPDATED"
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
      {/* Reasons for remove modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
        modalTitle="Raise Query"
        placeholder="Type your Query"
      />{" "}
    </>
  );
};

export default Updated;
