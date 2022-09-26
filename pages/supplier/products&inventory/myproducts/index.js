/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import {
  getTabledata,
  getSupplierProductCountByStatus,
  markOutOfStock,
  deleteSingleProduct,
  getVariation,
  getFlags,
  getFlagById,
  addProductFlag,
} from "services/supplier/myProducts";
import { Box, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import SubTabComponent from "components/molecule/SubTabComponent";
import CustomIcon from "services/iconUtils";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Share from "@mui/icons-material/Share";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useUserInfo } from "services/hooks";
import Image from "next/image";
import toastify from "services/utils/toastUtils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, viewProduct } from "features/productsSlice";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { format, parse } from "date-fns";
// import ViewModal from "@/forms/supplier/myproducts/viewModal";

const MyProducts = () => {
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showAddFlagModal, setShowAddFlagModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const columns = [
    {
      label: "Image",
      id: "col1",
      isFilter: false,
      minWidth: 75,
      align: "center",
    },
    {
      align: "center",
      data_align: "center",
      label: "Product Type",
      id: "col2",
      minWidth: 100,
    },
    {
      align: "center",
      data_align: "center",
      label: "Product ID",
      isFilter: true,
      id: "col3",
      minWidth: 100,
    },
    {
      align: "center",
      data_align: "center",
      label: "Name",
      isFilter: false,
      id: "col4",
      minWidth: 100,
    },
    {
      align: "center",
      data_align: "center",
      isFilter: true,
      label: "SKU",
      id: "col5",
      minWidth: 150,
    },
    {
      align: "center",
      data_align: "center",
      label: "Quantity",
      id: "col6",
      isFilter: false,
    },
    {
      align: "center",
      data_align: "center",
      label: "Listing Price",
      isFilter: true,
      id: "col7",
    },
    {
      align: "center",
      data_align: "center",
      label: "MRP Price",
      isFilter: true,
      id: "col8",
    },
    {
      align: "center",
      data_align: "center",
      label: "Stock Status",
      isFilter: false,
      id: "col9",
    },
    {
      align: "center",
      data_align: "center",
      label: "Status",
      isFilter: false,
      id: "col10",
    },

    {
      align: "center",
      data_align: "center",
      label: "Updated Date & Time",
      id: "col11",
      isFilter: false,
    },
    {
      align: "center",
      data_align: "center",
      label: "Action",
      id: "col12",
      isFilter: false,
      minWidth: 100,
    },
  ];
  const [ids, setIds] = useState({
    masterProductId: "",
    variationId: "",
    flagged: false,
  });
  const { supplierId, storeCode } = useSelector((state) => state.user);
  const [flagsList, setFlagsList] = useState([]);
  const flagSchema = {
    flagTitle: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    variationList: [],
    discount: null,
    supplierStoreId: "",
    flagId: "",
    supplierId: "",
    userType: "SUPPLIER",
    purchaseId: null,
  };
  const [flagFormData, setFlagFormData] = useState(flagSchema);
  const [disableFlagField, setdisableFlagField] = useState(false);
  const { id } = useUserInfo();
  const router = useRouter();

  const handleClose = () => {
    setShowMenu(null);
  };

  const deleteSingleRow = async (productId) => {
    // console.log(productId);
    const { data } = await deleteSingleProduct(productId);
    if (data) {
      toastify(data.message, "success");
      getTabList();
    }
    getTableData("", "", 0);
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((masterProduct) => {
      masterProduct.productVariations.forEach((variation) => {
        result.push({
          col1: variation.variationMedia ? (
            <Image src={variation.variationMedia[0]} height={50} width={50} />
          ) : null,
          col2: masterProduct.productType,
          col3: variation.productVariationId,
          col4: variation.productTitle,
          col5: variation.skuId,
          col6: variation.stockQty,
          col7: variation.salePrice,
          col8: variation.mrp,
          col9: variation.stockStatus,
          col10: variation.status,
          col11: variation.lastUpdatedAt,
          col12: (
            <Grid container className="h-6">
              <Grid item xs={3}>
                <Link
                  href={`/supplier/products&inventory/myproducts/viewModal?productVariationId=${variation.productVariationId}`}
                >
                  <a target="_blank">
                    <CustomIcon className="fs-6" title="View" type="view" />
                  </a>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <CustomIcon
                  className="fs-6"
                  title="share"
                  type="share"
                  onIconClick={() => {
                    navigator.clipboard.writeText(variation.productVariationId);
                    toastify("Product ID Copied To The Clip Board", "success");
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomIcon
                  onIconClick={() => {
                    deleteSingleRow(variation.productVariationId);
                  }}
                  className="fs-6"
                  title="Delete"
                  type="delete"
                />
              </Grid>
              <Grid item xs={3}>
                <CustomIcon
                  className="fs-6"
                  title="More"
                  type="more"
                  onIconClick={(event) => {
                    setIds({
                      masterProductId: masterProduct.masterProductId,
                      variationId: variation.productVariationId,
                      flagged: variation.flagged,
                    });
                    setShowMenu(event.currentTarget);
                  }}
                />
              </Grid>
            </Grid>
          ),
          id: variation.productVariationId,
        });
      });
    });
    return result;
  };

  const getStatus = () => {
    if (value === 0) {
      return "APPROVED";
    }
    if (value === 1) {
      return "OUTOFSTOCK";
    }
    if (value === 2) {
      return "INITIATED";
    }
    if (value === 3) {
      return "REJECTED";
    }
    if (value === 4) {
      return "DISABLED";
    }
    return null;
  };
  const filterList = [
    { label: "All", id: "0", value: "ALL" },
    { label: "Product Type", id: "0", value: "PRODUCT_TYPE" },
    { label: "Product Name", id: "0", value: "PRODUCT_NAME" },
    { label: "SKU", id: "0", value: "SKUID" },
    { label: "MRP", id: "0", value: "MRP" },
    { label: "Sale Price", id: "0", value: "SALE_PRICE" },
    { label: "Sub Category Name", id: "0", value: "SUB_CATEGORY_NAME" },
    { label: "Brand", id: "0", value: "BRAND" },
    { label: "Commission Mode", id: "0", value: "COMMISSION_MODE" },
  ];

  const getTableData = async (
    searchText = "",
    filterText = "ALL",
    page = pageNumber
  ) => {
    const status = getStatus();
    if (search !== searchText.toUpperCase()) {
      setsearch(searchText.toUpperCase());
      page = 0;
    }
    const { data, err } = await getTabledata(
      status,
      id,
      page,
      searchText,
      filterText.toUpperCase() || "ALL"
    );
    if (data) {
      if (page === 0) {
        setTableRows(mapRowsToTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        // setpageNumber((pre) => pre + 1);
      }
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    setValue(0);
  }, []);
  useEffect(() => {
    if (Object.keys(router?.query ?? {}).length) {
      setValue(parseInt(router?.query?.active, 10));
    }
  }, [router?.query]);

  const getTabList = async () => {
    const { data } = await getSupplierProductCountByStatus(id);

    const getLabel = (key) => {
      if (key === "activeCount") return "Active";
      if (key === "disabledCount") return "Blacklisted";
      if (key === "initiatedCount") return "QC Pending";
      if (key === "outOfStockCount") return "Out of Stock";
      if (key === "rejectedCount") return "QC Rejected";
      return null;
    };
    const result = [];
    if (data) {
      Object.entries(data).forEach(([key, val]) => {
        result.push({
          label: getLabel(key),
          count: val.toString(),
        });
      });
    }
    setTabList([...result]);
  };

  useEffect(() => {
    if (value !== null && !Number.isNaN(value)) {
      getTableData("", "", 0);
      getTabList();
      setpageNumber(0);
      setsearch("");
    }
  }, [value]);

  const handleCustomButtonClick = async () => {
    const payload = [];
    tableRows.forEach((ele) => {
      if (selected.includes(ele.col3))
        payload.push({
          productVariationId: ele.col3,
          skuId: ele.col5,
        });
    });
    const { data, message, err } = await markOutOfStock(payload);
    if (data) {
      toastify(message, "success");
      getTabList();
      getTableData("", "", 0);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const editClick = async () => {
    const { data, err } = await getVariation([ids]);
    if (err) {
      toastify(err?.response?.data?.messagea);
    } else {
      setIds({ masterProductId: "", variationId: "", flagged: false });
      dispatch(updateProduct(data[0]));
      router.push("/supplier/products&inventory/addnewproduct");
    }
  };
  const duplicateClick = async () => {
    const { data, err } = await getVariation([ids]);
    if (err) {
      toastify(err?.response?.data?.messagea);
    } else {
      setIds({ masterProductId: "", variationId: "", flagged: false });
      dispatch(viewProduct(data[0]));
      router.push("/supplier/products&inventory/addnewproduct");
    }
  };

  const getflagList = async () => {
    const { data, err } = await getFlags(supplierId);
    if (data) {
      setFlagsList(
        data.map((item) => ({
          value: item.id,
          label: item.name,
          purchaseId: item.purchaseId,
          imageUrl: item.imageUrl,
        }))
      );
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (showAddFlagModal) {
      getflagList();
    }
  }, [showAddFlagModal]);

  const getFlagDetails = async (val) => {
    const { data, err } = await getFlagById(
      val.value,
      val.purchaseId,
      storeCode
    );
    if (data) {
      if (data.data) {
        setdisableFlagField(true);
        setFlagFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: val.imageUrl,
          supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          variationList: [...data.data.variationList, ids.variationId],
          startDate: data.data.startDate,
          endDate: data.data.endDate,
          discount: data.data.discount,
        }));
      } else {
        setdisableFlagField(false);
        setFlagFormData((pre) => ({
          ...pre,
          flagId: val.value,
          flagTitle: val.label,
          imageUrl: val.imageUrl,
          supplierId,
          supplierStoreId: storeCode,
          purchaseId: val.purchaseId,
          variationList: [ids.variationId],
          startDate: null,
          endDate: null,
          discount: "",
        }));
      }
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const flagSubmit = async () => {
    const { data, err } = await addProductFlag(flagFormData);
    if (data) {
      toastify(data.message, "success");
      setShowAddFlagModal(false);
      setFlagFormData({ ...flagSchema });
      setdisableFlagField(false);
      setIds({ masterProductId: "", variationId: "", flagged: false });
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <Paper
      sx={{ height: "100%" }}
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <SubTabComponent value={value} setValue={setValue} tabList={tabList} />
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
            filterList={filterList}
            columns={columns}
            tableRows={tableRows}
            customDropdownLabel="Style Code"
            customButtonLabel="Mark Out Of Stock"
            showCustomButton={getStatus === "APPROVED"}
            onCustomButtonClick={handleCustomButtonClick}
            // searchBarSizeMd={4}
            disableCustomButton={!selected.length}
            OnSelectionChange={(vals) => setSelected(vals)}
            handlePageEnd={(searchText, filterText, page = pageNumber) => {
              getTableData(searchText, filterText, page);
            }}
            handleRowsPerPageChange={() => {
              setpageNumber(0);
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={showMenu}
            open={Boolean(showMenu)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={editClick}>
              <CustomIcon
                type="edit"
                className="text-secondary"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
              />
              <span className="fs-12 ms-2">Edit</span>
            </MenuItem>
            <MenuItem onClick={duplicateClick}>
              <CustomIcon
                type="filecopy"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
              />
              <span className="fs-12 ms-2">Duplicate</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (ids.flagged) return;
                handleClose();
                setShowAddFlagModal(true);
                setFlagFormData((pre) => ({
                  ...pre,
                  variationList: [...pre.variationList, ids.variationId],
                }));
              }}
            >
              <CustomIcon
                type="flag"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
                className={ids.flagged && "color-orange"}
              />
              <span className="fs-12 ms-2">Add Flag</span>
            </MenuItem>
          </Menu>
          <ModalComponent
            onCloseIconClick={() => {
              setShowAddFlagModal(false);
              setFlagFormData({ ...flagSchema });
            }}
            open={showAddFlagModal}
            ModalTitle="Add Flag"
            ModalWidth={600}
            footerClassName="justify-content-end border-top"
            titleClassName="h-4"
            ClearBtnText="Cancel"
            onClearBtnClick={() => {
              setShowAddFlagModal(false);
              setFlagFormData({ ...flagSchema });
            }}
            onSaveBtnClick={flagSubmit}
          >
            <Grid container spacing={2} className="my-2">
              <Grid item xs={12}>
                <SimpleDropdownComponent
                  size="small"
                  placeholder="Todays Deal"
                  list={flagsList}
                  onDropdownSelect={(val) => {
                    getFlagDetails(val);
                  }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <InputBox
                  size="small"
                  placeholder="Sale Price"
                  type="number"
                  disabled
                />
              </Grid> */}
              <Grid item sm={6}>
                <InputBox
                  size="small"
                  value={flagFormData.discount}
                  placeholder="Enter discount in %"
                  onInputChange={(e) => {
                    setFlagFormData((pre) => ({
                      ...pre,
                      discount: e.target.value,
                    }));
                  }}
                  type="number"
                  disabled={disableFlagField}
                />
              </Grid>
              <Grid item sm={6}>
                <DatePickerComponent
                  size="small"
                  label="Start Date"
                  inputlabelshrink
                  value={
                    flagFormData.startDate
                      ? parse(
                          flagFormData.startDate,
                          "MM-dd-yyyy HH:mm:ss",
                          new Date()
                        )
                      : null
                  }
                  onDateChange={(date) => {
                    setFlagFormData((pre) => ({
                      ...pre,
                      startDate: format(date, "MM-dd-yyyy HH:mm:ss"),
                    }));
                  }}
                  disabled={disableFlagField}
                />
              </Grid>
              <Grid item sm={6}>
                <DatePickerComponent
                  size="small"
                  label="End Date"
                  inputlabelshrink
                  value={
                    flagFormData.endDate
                      ? parse(
                          flagFormData.endDate,
                          "MM-dd-yyyy HH:mm:ss",
                          new Date()
                        )
                      : null
                  }
                  onDateChange={(date) => {
                    setFlagFormData((pre) => ({
                      ...pre,
                      endDate: format(date, "MM-dd-yyyy HH:mm:ss"),
                    }));
                  }}
                  disabled={disableFlagField}
                />
              </Grid>
            </Grid>
          </ModalComponent>
          <ModalComponent
            open={showShareModal}
            onCloseIconClick={() => setShowShareModal(false)}
            ModalTitle="Share"
            showFooter={false}
          >
            <Grid
              container
              alignItems="center"
              // display="flex"
              className="border mt-2 mb-3 cursor-pointer"
              columnSpacing={1}
              onClick={() => {
                setShowShareModal(false);
              }}
            >
              <Grid item sm={1}>
                <Share className="h-4 cursor-pointer" />
              </Grid>
              <Grid item sm={9}>
                <Typography className="h-5 fw-bold cursor-pointer">
                  Share Description With Images
                </Typography>
              </Grid>
              <Grid item sm={2} display="flex" justifyContent="end">
                <ArrowRightIcon className="color-orange h-1 cursor-pointer " />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              // display="flex"
              className="border my-2 cursor-pointer"
              columnSpacing={1}
              onClick={() => {
                setShowShareModal(false);
              }}
            >
              <Grid item sm={1}>
                <StorefrontIcon className="h-4 cursor-pointer" />
              </Grid>
              <Grid item sm={9}>
                <Typography className="h-5 fw-bold cursor-pointer">
                  Share Description With Price And Your Online Shop Link
                </Typography>
              </Grid>
              <Grid item sm={2} display="flex" justifyContent="end">
                <ArrowRightIcon className="color-orange h-1 cursor-pointer " />
              </Grid>
            </Grid>
          </ModalComponent>
        </Paper>
      </Box>
    </Paper>
  );
};

export default MyProducts;
