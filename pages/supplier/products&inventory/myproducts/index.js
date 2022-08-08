import { Box, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import SubTabComponent from "components/molecule/SubTabComponent";
import CustomIcon from "services/iconUtils";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Share from "@mui/icons-material/Share";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import InputBox from "@/atoms/InputBoxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";

const MyProducts = () => {
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showAddFlagModal, setShowAddFlagModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const columns = [
    {
      label: "Image",
      id: "col1",
      isFilter: false,
    },
    {
      label: "Product Type",
      id: "col2",
    },
    {
      label: "Product ID",
      id: "col3",
    },
    {
      label: "Name",
      isFilter: false,
      id: "col4",
    },
    {
      label: "SKU",
      id: "col5",
    },
    {
      label: "Size",
      id: "col6",
      isFilter: false,
    },
    {
      label: "Listing Price",
      isFilter: false,
      id: "col7",
    },
    {
      label: "MRP Price",
      id: "col8",
      isFilter: false,
    },
    {
      label: "Stock",
      isFilter: false,
      id: "col9",
    },
    {
      label: "Status",
      id: "col10",
      isFilter: false,
    },
    {
      label: "Update & Date",
      id: "col11",
      isFilter: false,
    },
    {
      label: "Action",
      id: "col12",
      isFilter: false,
    },
  ];

  const handleClose = () => {
    setShowMenu(null);
  };

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.purchaseid,
        col2: row.productType,
        col3: row.productId,
        col4: row.name,
        col5: row.sku,
        col6: row.size,
        col7: row.listingPrice,
        col8: row.mrpPrice,
        col9: row.stock,
        col10: row.status,
        col11: row.updateAndDate,
        col12: (
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
        id: row.id,
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
        id: 1,
        productType: "Simple Product",
        productId: "#45523232",
        name: "Bag",
        sku: "SL 9083",
        size: "UK24",
        listingPrice: "500",
        mrpPrice: "1000",
        stock: "In Stock",
        status: "Available",
        updateAndDate: "12-01-2022 12:00",
      },
      {
        id: 2,
        productType: "Simple Product",
        productId: "#45523232",
        name: "Mouse",
        sku: "SL 9083",
        listingPrice: "500",
        mrpPrice: "1000",
        size: "UK24",
        stock: "In Stock",
        status: "Available",
        updateAndDate: "12-01-2022 12:00",
      },
      {
        id: 3,
        productType: "Simple Product",
        size: "UK24",
        productId: "#45523232",
        name: "Bagd",
        sku: "SL 9083",
        listingPrice: "500",
        mrpPrice: "1000",
        stock: "In Stock",
        status: "Available",
        updateAndDate: "12-01-2022 12:00",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

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
