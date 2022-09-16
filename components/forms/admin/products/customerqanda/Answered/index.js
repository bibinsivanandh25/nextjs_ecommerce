import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import TableComponent from "@/atoms/TableComponent";
// import ViewProducts from "./ViewProducts";
import MenuOption from "@/atoms/MenuOptions";
// import AcceptRejectModal from "./AcceptRejectModal";
// import RaiseQueryModal from "./RaiseQueryModal";
// import MergeToModal from "./MergeToModal";
// import VisibilityRangeModal from "./VisibilityRangeModal";
// import FlagModal from "./FlagModal";
// import AddEditProductModal from "./AddEditProductModal";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import ReplyModal from "./ReplyModal";
import ViewModal from "./ViewModal";

const Answered = () => {
  //   const [showViewProducts, setShowViewProducts] = useState(false);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [modalId, setModalId] = useState(null);
  //   const [imageArray, setImageArray] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  //   const [openEditModal, setOpenEditModal] = useState(false);
  //   const [openAcceptRejectModal, setOpenAcceptRejectModal] = useState(false);
  //   const [openMergeToModal, setOpenMergeToModal] = useState(false);
  //   const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  //   const [openVisibilityRangeModal, setOpenVisibilityRangeModal] =
  //     useState(false);
  //   const [showFlagModal, setShowFlagModal] = useState(false);
  //   const [selectedRow, setSelectedRow] = useState([]);
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
  const [openViewModal, setOpenViewModal] = useState(false);

  const [openReplyModal, setOpenReplyModal] = useState(false);

  const [images, setImages] = useState([]);
  const imagesForViewModal = [
    "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
  ];

  const onClickOfMenuItem = (ele) => {
    if (ele === "Edit") {
      setOpenReplyModal(true);
    }
  };

  const options = ["Edit", "Delete"];

  const columns = [
    {
      id: "col1",
      align: "center",
      label: "SI.No.",
      data_align: "center",
    },
    { id: "col2", align: "center", label: "Customer ID", data_align: "center" },
    {
      id: "col3",
      align: "center",
      label: "Product Image",
      data_align: "center",
    },
    { id: "col4", align: "center", label: "Question", data_align: "center" },
    {
      id: "col5",
      align: "center",
      label: "Reply",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Replied By",
      data_align: "center",
    },
    { id: "col7", align: "center", label: "Date & Time", data_align: "center" },
    {
      id: "col8",
      align: "center",
      label: "Action",
      data_align: "center",
    },
  ];

  const tableRowsData = [
    {
      id: 1,
      col1: 1,
      col2: 131231,
      col3: (
        <Box className="d-flex align-items-end justify-content-center">
          <Box
            onClick={() => {
              setImages([
                "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
                "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
                "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
                "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
              ]);
              setImageIndexForImageModal(0);
              setModalId(0);
              setOpenImagesArrayModal(true);
            }}
            className="h-30 border d-flex justify-content-center"
          >
            <Image
              src="https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png"
              width="50"
              height="50"
              className="cursor-pointer"
            />
          </Box>
          <Typography className="fs-10">/4</Typography>
        </Box>
      ),
      col4: (
        <Typography className="h-5 text-trancate">
          Lorem ipsum kajsdbkajsbdkaj kasdkajb
        </Typography>
      ),
      col5: "--",
      col6: "--",
      col7: "25/5/2021",
      col8: (
        <Box className="d-flex justify-content-evenly align-items-center">
          <CustomIcon
            type="view"
            onIconClick={() => {
              setOpenViewModal(true);
            }}
            className="h-4"
          />
          <MenuOption
            getSelectedItem={(ele) => {
              onClickOfMenuItem(ele);
            }}
            options={options}
            IconclassName="fs-18 color-gray"
          />
        </Box>
      ),
    },
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
    const { data, err } = await getAdminProductsByFilter(payLoad);
    if (data) {
      const result = [];
      data.products.forEach((val, index) => {
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
              <CustomIcon type="view" className="fs-18" />
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
        <Box>
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={columns}
                tHeadBgColor="bg-light-gray"
                showPagination={false}
                tableRows={tableRowsData}
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
                  //   setImageArray([]);
                  setModalId(null);
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      <ReplyModal
        openReplyModal={openReplyModal}
        setOpenReplyModal={setOpenReplyModal}
      />
      <ViewModal
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        imagesForViewModal={imagesForViewModal}
      />
      {/* Edit Modal Component */}
      {/* <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setTableRows}
        modalId={modalId}
        rowsDataObjects={tableRows}
      /> */}
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
      {/* {openAcceptRejectModal ? (
        <AcceptRejectModal
          openAcceptRejectModal={openAcceptRejectModal}
          setOpenAcceptRejectModal={setOpenAcceptRejectModal}
          modalId={modalId}
          rowsDataObjects={selectedRow}
        />
      ) : null} */}
      {/* Raise Query Modal */}
      {/* <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
        modalTitle="Raise Query"
        placeholder="Type your query"
      /> */}
      {/* Merge To Modal */}
      {/* <MergeToModal
        openMergeToModal={openMergeToModal}
        setOpenMergeToModal={setOpenMergeToModal}
      /> */}
      {/* <VisibilityRangeModal
        openVisibilityRangeModal={openVisibilityRangeModal}
        setOpenVisibilityRangeModal={setOpenVisibilityRangeModal}
      /> */}
      {/* Flag Modal */}
      {/* <FlagModal
        showFlagModal={showFlagModal}
        setShowFlagModal={setShowFlagModal}
      /> */}
    </>
  );
};

export default Answered;
