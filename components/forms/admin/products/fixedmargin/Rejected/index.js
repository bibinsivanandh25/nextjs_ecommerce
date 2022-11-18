import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import ViewProducts from "./ViewProducts";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";
import AcceptRejectModal from "./AcceptRejectmodal";

const Rejected = () => {
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
      commissionType: "FIXED_COMMISSION",
      status: "REJECTED",
    };
    const { data, err } = await getAdminProductsByFilter(payLoad);

    if (data) {
      // console.log("The data ", data);
      const result = [];
      data.forEach((val, index) => {
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
          col2: (
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
          ),
          col3: val.productTitle,
          col4: val.skuId,
          col5: (
            <>
              <Typography>{val.categoryName}</Typography>
              <Typography>{val.subCategoryName}</Typography>
            </>
          ),
          col6: (
            <>
              <Typography>{val.weightInclusivePackage}</Typography>
              <Typography>{val.volume}</Typography>
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
            <Box className="d-flex justify-content-evenly align-items-center">
              <CustomIcon
                type="view"
                className="fs-18"
                onIconClick={() => setShowViewProducts(true)}
              />
              <MenuOption
                getSelectedItem={() => {
                  // onClickOfMenuItem(ele, index);
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
    if (err) {
      // console.log(err);
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
                  tHeadBgColor="bg-light-gray"
                  // showPagination={false}
                  tableRows={tableRows}
                  // showSearchbar={false}
                  showDateFilterBtn
                  showDateFilter
                  dateFilterBtnName="+ New Product"
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
