import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import DisplayImagesModal from "@/atoms/DisplayImagesModal";
import toastify from "services/utils/toastUtils";
import { deleteProducts } from "services/admin/products";
import { getAdminProductsByFilter } from "services/admin/products/fixedMargin";
import AddEditProductModal from "./AddEditProductModal";
import RaiseQueryModal from "./RaiseQueryModal";
import EditProductModalForUpdated from "./EditProductModal";
import FilterModal from "../../FilterModal";

const Updated = ({
  rowsDataObjectsForUpdated,
  setRowsDataObjectsForUpdated,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [openAcceptRejectModal, setOpenAcceptRejectModal] = useState(false);
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

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

  const onClickOfMenuItem = (ele, val) => {
    if (ele === "Edit") {
      // setModalId(index);
      setOpenEditModalForUpdated(true);
    }

    if (ele === "Raise Query") {
      setOpenRaiseQueryModal(true);
    }
    // setSelectedRow(val);
    if (ele === "Accept/Reject") {
      setOpenAcceptRejectModal(true);
    }
    if (ele === "Delete") {
      deleteProduct(val.productVariationId);
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
          <>
            <Typography className="fs-12 text-primary">
              {val.supplierId}
            </Typography>
            <Typography className="fs-12 text-primary">
              {val.supplierName}
            </Typography>
          </>
        ),
        col4: (
          <>
            <Typography className="h-5">{val.categoryName}</Typography>
            <Typography className="h-5">{val.subCategoryName}</Typography>
          </>
        ),
        col5: val.changes ?? "--",
        col6: val.lastUpdatedAt,
        col7: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              // onIconClick={() => setShowViewProducts(true)}
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
      commissionType: "ZERO_COMMISSION",
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

  useEffect(() => {
    getTableData();
    // getAllInitialFilters();
  }, []);

  // const theTableRowsData = () => {
  //   const anArray = [];
  //   rowsDataObjectsForUpdated.forEach((val, index) => {
  //     anArray.push({
  //       id: index + 1,
  //       col1: (
  //         <Typography className="fs-12 text-primary">{val.col1}</Typography>
  //       ),
  //       col2: (
  //         <Box className="d-flex align-items-end justify-content-center">
  //           <Box
  //             onClick={() => {
  //               setImages([...val.col2.imgSrc]);
  //               setModalId(index);
  //               setOpenImagesArrayModal(true);
  //               setImageIndexForImageModal(0);
  //             }}
  //             className="h-30 border d-flex justify-content-center"
  //           >
  //             <Image
  //               src={val.col2.imgSrc[0]}
  //               width="50"
  //               height="50"
  //               className="cursor-pointer"
  //             />
  //           </Box>
  //           <Typography className="fs-10">/{val.col2.imgCount}</Typography>
  //         </Box>
  //       ),
  //       col3: val.col3,
  //       col4: val.col4,
  //       col5: val.col5,
  //       col6: val.col6,
  //       col7: (
  //         <Box className="d-flex justify-content-evenly align-items-center">
  //           <CustomIcon
  //             onIconClick={() => {
  //               setOpenEditModalForUpdated(true);
  //             }}
  //             type="view"
  //             className="fs-18"
  //           />
  //           <MenuOption
  //             getSelectedItem={(ele) => {
  //               // console.log("Index", index);
  //               // console.log("ele ", typeof ele);
  //               onClickOfMenuItem(ele, index);
  //             }}
  //             options={options}
  //             IconclassName="fs-18 color-gray"
  //           />
  //         </Box>
  //       ),
  //     });
  //   });
  //   setTableRows(anArray);
  // };

  // useEffect(() => {
  //   theTableRowsData();
  // }, []);

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
                showFilterButton
                showFilterList={false}
                tHeadBgColor="bg-light-gray"
                // showPagination={false}
                tableRows={tableRows}
                // showSearchbar={false}
                showDateFilter
                showDateFilterSearch={false}
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
