import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import TableComponent from "@/atoms/TableComponent";
import AddEditProductModal from "./AddEditProductModal";
import ViewProducts from "./ViewProducts";
import SwitchComponent from "@/atoms/SwitchComponent";
import RaiseQueryModal from "./RaiseQueryModal";
import DiscountModal from "./DiscountModal";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";

const Active = ({ rowsDataObjectsForActive, setRowsDataObjectsForActive }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
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
  const [imageArray, setImageArray] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);
  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  //   const [first, setfirst] = useState(second);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openDiscountModal, setOpenDiscountModal] = useState(false);

  const [images, setImages] = useState([]);

  const options = [
    "Edit",
    <Box className="d-flex align-items-cenetr">
      <Typography className="me-3">Disable</Typography>,
      <Box className="pt-1">
        <SwitchComponent label={null} />
      </Box>
    </Box>,
    "Remove",
    "Reject",
    "Discount",
  ];
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

  const onClickOfMenuItem = (ele, index) => {
    if (ele === "Edit") {
      setProductDetails({
        vendorIdOrName: rowsDataObjectsForActive[index].col5,
        images: rowsDataObjectsForActive[index].col3.imgSrc,
        productTitle: rowsDataObjectsForActive[index].col4,
        sku: rowsDataObjectsForActive[index].col6,
        categorySubcategory: rowsDataObjectsForActive[index].col11,
        weightOrVolume: rowsDataObjectsForActive[index].col8,
        totalStock: rowsDataObjectsForActive[index].col7,
        salePriceAndMrp: `${rowsDataObjectsForActive[index].col10.salePrice}/${rowsDataObjectsForActive[index].col10.mrpPrice} `,
        discounts:
          rowsDataObjectsForActive[index].col10.mrpPrice -
          rowsDataObjectsForActive[index].col10.salePrice,
      });
      setModalId(index);
      setImageArray(rowsDataObjectsForActive[index].col3.imgSrc);
      setOpenEditModal(true);
    }

    if (typeof ele === "object") {
      console.log("Display button clicked");
    }

    if (ele === "Remove") {
      setOpenRemoveModal(true);
    }

    if (ele === "Reject") {
      setOpenRejectModal(true);
    }

    if (ele === "Discount") {
      setOpenDiscountModal(true);
    }
  };

  const theTaleRowsData = () => {
    const anArray = [];
    rowsDataObjectsForActive.forEach((val, index) => {
      anArray.push({
        id: index + 1,
        col1: <Typography className="fs-12">{val.col1}</Typography>,
        col2: <Typography className="fs-12">{val.col2}</Typography>,
        col3: (
          <Box className="d-flex align-items-end justify-content-center">
            <Box
              onClick={() => {
                setImages([...val.col3.imgSrc]);
                setModalId(index);
                setOpenImagesArrayModal(true);
                setImageIndexForImageModal(0);
              }}
              className="h-30 border d-flex justify-content-center"
            >
              <Image
                src={val.col3.imgSrc[0]}
                width="50"
                height="50"
                className="cursor-pointer"
              />
            </Box>
            <Typography className="fs-10">/{val.col3.imgCount}</Typography>
          </Box>
        ),
        col4: <Typography className="fs-12">{val.col4}</Typography>,
        col5: <Typography className="fs-12">{val.col5}</Typography>,
        col6: <Typography className="fs-12">{val.col6}</Typography>,
        col7: <Typography className="fs-12">{val.col7}</Typography>,
        col8: <Typography className="fs-12">{val.col8}</Typography>,
        col9: <Typography className="fs-12">{val.col9}</Typography>,
        col10: (
          <Typography className="fs-12">{`${val.col10.salePrice}/${val.col10.mrpPrice}`}</Typography>
        ),
        col11: <Typography className="fs-12">{val.col11}</Typography>,
        col12: <Typography className="fs-12">{val.col12}</Typography>,
        col13: <Typography className="fs-12">{val.col13}</Typography>,
        col14: <Typography className="fs-12">{val.col14}</Typography>,
        col15: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => setShowViewProducts(true)}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                console.log("Index", index);
                console.log("ele ", typeof ele);
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

  return (
    <>
      {!showViewProducts ? (
        <Box>
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              <TableComponent
                columns={tableColumnsForActive}
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
        setRowDataObjects={setRowsDataObjectsForActive}
        modalId={modalId}
        rowsDataObjects={rowsDataObjectsForActive}
      />

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
      <DiscountModal
        openDiscountModal={openDiscountModal}
        setOpenDiscountModal={setOpenDiscountModal}
      />
    </>
  );
};

export default Active;
