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
import { getTabledata } from "services/supplier/myProducts";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import InputBox from "@/atoms/InputBoxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";

const MyProducts = () => {
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = React.useState(0);
  const [showMenu, setShowMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showAddFlagModal, setShowAddFlagModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const columns = [
    {
      label: "Image",
      id: "col1",
      isFilter: false,
      minWidth: 100,
      align: "center",
    },
    {
      align: "center",
      data_align: "center",
      label: "Product Type",
      id: "col2",
      minWidth: 150,
    },
    {
      align: "center",
      data_align: "center",
      label: "Product ID",
      id: "col3",
      minWidth: 150,
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
      isFilter: false,
      id: "col7",
    },
    {
      align: "center",
      data_align: "center",
      label: "MRP Price",
      id: "col8",
      isFilter: false,
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
      label: "Updated Date & Time",
      id: "col10",
      isFilter: false,
    },
    {
      align: "center",
      data_align: "center",
      label: "Action",
      id: "col11",
      isFilter: false,
      minWidth: 100,
    },
  ];

  const { id } = useUserInfo();

  const handleClose = () => {
    setShowMenu(null);
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((masterProduct) => {
      masterProduct.productVariations.forEach((variation) => {
        result.push({
          col1: (
            <Image src={variation.variationMedia[0]} height={50} width={50} />
          ),
          col2: masterProduct.productType,
          col3: variation.productVariationId,
          col4: variation.productTitle,
          col5: variation.skuId,
          col6: variation.stockQty,
          col7: variation.salePrice,
          col8: variation.mrp,
          col9: variation.stockStatus,
          col10: variation.lastUpdatedAt,
          col11: (
            <Grid container className="h-6">
              <Grid item xs={3}>
                <CustomIcon className="fs-6" title="View" type="view" />
              </Grid>
              <Grid item xs={3}>
                <CustomIcon
                  className="fs-6"
                  title="share"
                  type="share"
                  onIconClick={() => {
                    setShowShareModal(true);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomIcon className="fs-6" title="Delete" type="delete" />
              </Grid>
              <Grid item xs={3}>
                <CustomIcon
                  className="fs-6"
                  title="More"
                  type="more"
                  onIconClick={(event) => setShowMenu(event.currentTarget)}
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

  const getTableData = async () => {
    const status = getStatus();
    const { data, err } = await getTabledata(status, id);
    if (data) {
      setTableRows(mapRowsToTable(data));
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };

  useEffect(() => {
    getTableData();
  }, [value]);

  const tabList = [
    {
      label: "Active",
      count: 2,
    },
    {
      label: "Out of Stock",
      count: 2,
    },
    {
      label: "QC Pending",
      count: 2,
    },
    {
      label: "QC Rejected",
      count: 2,
    },
    {
      label: "Blacklisted",
      count: 2,
    },
  ];

  return (
    <Paper
      sx={{ height: "100%" }}
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <SubTabComponent value={value} setValue={setValue} tabList={tabList} />
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
            columns={columns}
            tableRows={tableRows}
            customDropdownLabel="Style Code"
            customButtonLabel="Mark Out Of Stock"
            showCustomButton
            onCustomButtonClick={() => console.log("custom search button")}
            // searchBarSizeMd={4}
            disableCustomButton={!selected.length}
            OnSelectionChange={(vals) => setSelected(vals)}
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
            <MenuItem onClick={handleClose}>
              <CustomIcon
                type="edit"
                className="text-secondary"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
              />
              <span className="fs-12 ms-2">Edit</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <CustomIcon
                type="filecopy"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
              />
              <span className="fs-12 ms-2">Duplicate</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setShowAddFlagModal(true);
              }}
            >
              <CustomIcon
                type="flag"
                muiProps={{ sx: { zoom: 0.8 } }}
                showColorOnHover={false}
              />
              <span className="fs-12 ms-2">Add Flag</span>
            </MenuItem>
          </Menu>
          <ModalComponent
            onCloseIconClick={() => {
              setShowAddFlagModal(false);
            }}
            open={showAddFlagModal}
            ModalTitle="Add Flag"
            ModalWidth={600}
            footerClassName="justify-content-end border-top"
            titleClassName="h-4"
            ClearBtnText="Cancel"
            onClearBtnClick={() => {
              showAddFlagModal(false);
            }}
          >
            <Grid container spacing={2} className="my-2">
              <Grid item xs={12}>
                <SimpleDropdownComponent
                  size="small"
                  placeholder="Todays Deal"
                  // value={defaultFormData?.todaysDeals}
                />
              </Grid>
              <Grid item xs={6}>
                <InputBox size="small" placeholder="Sale Price" disabled />
              </Grid>
              <Grid item sm={6}>
                <InputBox size="small" placeholder="Enter discount %" />
              </Grid>
              <Grid item sm={6}>
                <DatePickerComponent
                  size="small"
                  label="Start Date"
                  inputlabelshrink
                />
              </Grid>
              <Grid item sm={6}>
                <DatePickerComponent
                  size="small"
                  label="End Date"
                  inputlabelshrink
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
