/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import styles from "./fixedmargin.module.css";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import AddEditProductModal from "@/forms/admin/products/fixedmargin/AddEditProduct";
import CheckImagesModal from "@/forms/admin/products/fixedmargin/CheckImagesModal";
import AcceptRejectModal from "@/forms/admin/products/fixedmargin/AcceptRejectModal";
import ViewProducts from "@/forms/admin/products/fixedmargin/ViewProducts";
import RaiseQueryModal from "@/forms/admin/products/fixedmargin/RaiseQueryModal";
import MergeToModal from "@/forms/admin/products/fixedmargin/MergeToModal";
import VisibilityRangeModal from "@/forms/admin/products/fixedmargin/VisibilityRangeModal";
import FlagModal from "@/forms/admin/products/fixedmargin/FlagModal";

const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [imageArray, setImageArray] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [showViewProducts, setShowViewProducts] = useState(false);

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

  // ALL the modal states are present here
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [openAcceptRejectModal, setOpenAcceptRejectModal] = useState(false);
  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  const [openMergeToModal, setOpenMergeToModal] = useState(false);
  const [openVisibilityRangeModal, setOpenVisibilityRangeModal] =
    useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);

  const titles = [
    "Products to approve (48)",
    "Drafts (23)",
    "Queries (10)",
    "Active (155)",
    "Update(432)",
    "Rejected(58)",
  ];

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

  const tableColumns = [
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

  const [rowsDataObjects, setRowDataObjects] = useState([
    {
      id: 1,
      col1: "#345345 SKM Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1200, mrpPrice: 1500 },
      col9: "PUMA",
      col10: "nothing",
    },
    // {
    //   id: 2,
    //   col1: "#345345 SKM hi Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 100, mrpPrice: 200 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
    // {
    //   id: 3,
    //   col1: "#345345 SKM hello Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 1300, mrpPrice: 2000 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
  ]);

  const onClickOfMenuItem = (ele, index) => {
    if (ele === "Edit") {
      setProductDetails({
        vendorIdOrName: rowsDataObjects[index].col1,
        images: rowsDataObjects[index].col2.imgSrc,
        productTitle: rowsDataObjects[index].col3,
        sku: rowsDataObjects[index].col4,
        categorySubcategory: rowsDataObjects[index].col5,
        weightOrVolume: rowsDataObjects[index].col6,
        totalStock: rowsDataObjects[index].col7,
        salePriceAndMrp: `${rowsDataObjects[index].col8.salePrice}/${rowsDataObjects[index].col8.mrpPrice} `,
        discounts:
          rowsDataObjects[index].col8.mrpPrice -
          rowsDataObjects[index].col8.salePrice,
      });
      setModalId(index);
      setImageArray(rowsDataObjects[index].col2.imgSrc);
      setOpenEditModal(true);
    }

    if (ele === "Delete") {
      const tempArray = [...rowsDataObjects];
      tempArray.splice(index, 1);
      setRowDataObjects([...tempArray]);
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

  const theTableRowsData = () => {
    const anArray = [];
    rowsDataObjects.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: (
          <Typography className="fs-12 text-primary">{val.col1}</Typography>
        ),
        col2: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box
              onClick={() => {
                setModalId(index);
                setOpenImagesArrayModal(true);
                setImageIndexForImageModal(0);
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
    setTableRows([...anArray]);
  };

  useEffect(() => {
    theTableRowsData();
  }, []);

  useEffect(() => {
    theTableRowsData();
  }, [rowsDataObjects]);

  const returnTabs = () => {
    return titles.map((val, index) => {
      return (
        <Box
          onClick={() => {
            setActiveTab(index);
          }}
          className={`px-4 py-1 border fs-14 cursor-pointer 
          ${activeTab === index ? styles.activeTab : styles.inActivetab}
          `}
          key={val}
        >
          <Typography className="cursor-pointer fs-14">{val}</Typography>
        </Box>
      );
    });
  };

  return (
    <>
      {!showViewProducts ? (
        <Box>
          <Box className="d-flex mt-3">{returnTabs()}</Box>
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumns}
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
      {/* Edit Modal Component */}
      <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setRowDataObjects}
        modalId={modalId}
        rowsDataObjects={rowsDataObjects}
      />
      {/* Images Modal Component */}
      <CheckImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        rowsDataObjects={rowsDataObjects}
        modalId={modalId}
      />
      {/* Accept Reject Modal */}
      <AcceptRejectModal
        openAcceptRejectModal={openAcceptRejectModal}
        setOpenAcceptRejectModal={setOpenAcceptRejectModal}
        modalId={modalId}
        rowsDataObjects={rowsDataObjects}
      />
      {/* Raise Query Modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
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

export default FixedMargin;
