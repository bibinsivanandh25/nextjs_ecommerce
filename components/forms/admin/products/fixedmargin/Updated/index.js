import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import EditProductModalForUpdated from "./EditProductModal";
import RaiseQueryModal from "./RaiseQueryModal";
import AddEditProductModal from "./AddEditProductModal";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";

const Updated = ({
  rowsDataObjectsForUpdated,
  setRowsDataObjectsForUpdated,
}) => {
  const [openEditModalForUpdated, setOpenEditModalForUpdated] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productId: "",
    images: "",
    vendorIdBuisnessName: "",
    categorySubcategory: "",
    change: "",
    updatedDateAndTime: "",
  });

  const [imageArray, setImageArray] = useState([]);

  const [openRaiseQueryModal, setOpenRaiseQueryModal] = useState(false);
  const [openImagesArrayModal, setOpenImagesArrayModal] = useState(false);

  const [imageIndexForImageModal, setImageIndexForImageModal] = useState(0);

  const [modalId, setModalId] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const [images, setImages] = useState([]);
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
      label: "Vendor ID/Business Name",
      data_align: "center",
    },

    {
      id: "col4",
      align: "center",
      label: "Category/Subcategory",
      data_align: "center",
    },
    {
      id: "col5",
      align: "center",
      label: "Change",
      data_align: "center",
    },
    {
      id: "col6",
      align: "center",
      label: "Updated Date & time",
      data_align: "center",
    },
    { id: "col7", align: "center", label: "Action", data_align: "center" },
  ];

  const onClickOfMenuItem = (ele, index) => {
    console.log("Element ", ele);
    if (ele === "Edit") {
      setModalId(index);
      setOpenEditModalForUpdated(true);
    }

    if (ele === "Raise Query") {
      setOpenRaiseQueryModal(true);
    }
  };

  const options = ["Edit", "Delete", "Raise Query", "Approve", "Reject"];

  const theTableRowsData = () => {
    const anArray = [];
    rowsDataObjectsForUpdated.forEach((val, index) => {
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
        col7: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon type="view" className="fs-18" />
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
    theTableRowsData();
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
                columns={tableColumnsForProductsToUpdated}
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
                  setOpenEditModal(true);
                  setModalId(null);
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <DisplayImagesModal
        openImagesArrayModal={openImagesArrayModal}
        setOpenImagesArrayModal={setOpenImagesArrayModal}
        imageIndexForImageModal={imageIndexForImageModal}
        setImageIndexForImageModal={setImageIndexForImageModal}
        modalId={modalId}
        images={images}
      />
      <AddEditProductModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        productDetails={productDetails}
        setImageArray={setImageArray}
        setProductDetails={setProductDetails}
        imageArray={imageArray}
        setRowDataObjects={setRowsDataObjectsForUpdated}
        modalId={modalId}
        rowsDataObjects={rowsDataObjectsForUpdated}
      />
      {/* Edit  */}
      <EditProductModalForUpdated
        openEditModalForUpdated={openEditModalForUpdated}
        setOpenEditModalForUpdated={setOpenEditModalForUpdated}
        rowsDataObjectsForUpdated={rowsDataObjectsForUpdated}
        modalId={modalId}
      />
      {/* Reasons for remove modal */}
      <RaiseQueryModal
        openRaiseQueryModal={openRaiseQueryModal}
        setOpenRaiseQueryModal={setOpenRaiseQueryModal}
        modalTitle="Raise Query"
        placeholder="Type your Query"
      />
    </>
  );
};

export default Updated;
