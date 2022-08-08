import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import ViewProducts from "./ViewProducts";
import MenuOption from "@/atoms/MenuOptions";
import AcceptRejectModal from "./AcceptRejectModal";
import RaiseQueryModal from "./RaiseQueryModal";
import MergeToModal from "./MergeToModal";
import VisibilityRangeModal from "./VisibilityRangeModal";
import FlagModal from "./FlagModal";
import AddEditProductModal from "./AddEditProductModal";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";

const Queries = ({
  rowsDataObjectsForQueries = [],
  setrowsDataObjectsForQueries = () => {},
}) => {
  console.log("Hi");
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

  const onClickOfMenuItem = (ele, index) => {
    if (ele === "Edit") {
      setProductDetails({
        vendorIdOrName: rowsDataObjectsForQueries[index].col1,
        images: rowsDataObjectsForQueries[index].col2.imgSrc,
        productTitle: rowsDataObjectsForQueries[index].col3,
        sku: rowsDataObjectsForQueries[index].col4,
        categorySubcategory: rowsDataObjectsForQueries[index].col5,
        weightOrVolume: rowsDataObjectsForQueries[index].col6,
        totalStock: rowsDataObjectsForQueries[index].col7,
        salePriceAndMrp: `${rowsDataObjectsForQueries[index].col8.salePrice}/${rowsDataObjectsForQueries[index].col8.mrpPrice} `,
        discounts:
          rowsDataObjectsForQueries[index].col8.mrpPrice -
          rowsDataObjectsForQueries[index].col8.salePrice,
      });
      setModalId(index);
      setImageArray(rowsDataObjectsForQueries[index].col2.imgSrc);
      setOpenEditModal(true);
    }

    if (ele === "Delete") {
      const tempArray = [...rowsDataObjectsForQueries];
      tempArray.splice(index, 1);
      setrowsDataObjectsForQueries([...tempArray]);
    }

    if (ele === "Accept/Reject") {
      setModalId(index);
      setOpenAcceptRejectModal(true);
    }

    if (ele === "Merge to") {
      setModalId(index);
      setOpenMergeToModal(true);
    }

    if (ele === "Raise Query") {
      setModalId(index);
      setOpenRaiseQueryModal(true);
    }

    if (ele === "Visibility Range") {
      setModalId(index);
      setOpenVisibilityRangeModal(true);
    }

    if (ele === "Flags") {
      setModalId(index);
      setShowFlagModal(true);
    }
  };

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

  const tableColumnsForProductsToApprove = [
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

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForQueries.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="fs-12 text-primary">{val.col1}</Typography>
        ),
        col2: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box
              onClick={() => {
                setImages([...val.col2.imgSrc]);
                setImageIndexForImageModal(0);
                setModalId(index);
                setOpenImagesArrayModal(true);
              }}
              className="h-30 border d-flex justify-content-center"
            >
              <Image
                src={val.col2.imgSrc[0]}
                width="50"
                height="50"
                className="cursor-pointer"
              />
            </Box>
            <Typography className="fs-10">/{val.col2.imgCount}</Typography>
          </Box>
        ),
        col3: val.col3,
        col4: val.col4,
        col5: val.col5,
        col6: val.col6,
        col7: val.col7,
        col8: (
          <Typography className="fs-12">
            &#8377; {val.col8.salePrice}/ &#8377; {val.col8.mrpPrice}
          </Typography>
        ),
        col9: "PUMA",
        col10: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => setShowViewProducts(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                console.log("Index", index);
                onClickOfMenuItem(ele, index);
              }}
              options={options}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      });
    });

    setTableRows(anArray);
  };

  useEffect(() => {
    theTaleRowsData();
  }, []);

  useEffect(() => {
    theTaleRowsData();
  }, [rowsDataObjectsForQueries]);

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
                  columns={tableColumnsForProductsToApprove}
                  tHeadBgColor="bg-light-gray"
                  showPagination={false}
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
      <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setrowsDataObjectsForQueries}
        modalId={modalId}
        rowsDataObjects={rowsDataObjectsForQueries}
      />
      {/* Images Modal Component */}
      <DisplayImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        rowsDataObjects={rowsDataObjectsForQueries}
        modalId={modalId}
        productDetails={productDetails}
        images={images}
      />
      {/* Accept Reject Modal */}
      <AcceptRejectModal
        openAcceptRejectModal={openAcceptRejectModal}
        setOpenAcceptRejectModal={setOpenAcceptRejectModal}
        modalId={modalId}
        rowsDataObjects={rowsDataObjectsForQueries}
      />
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
