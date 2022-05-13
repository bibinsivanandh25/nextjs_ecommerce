import { Box, Grid, Menu, MenuItem, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SubTabComponent from "components/molecule/SubTabComponent";
import { Delete, Edit, FileCopy, MoreVert } from "@mui/icons-material";

const MyProducts = () => {
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
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
          <Grid container>
            <Grid item xs={4}>
              <VisibilityIcon className="text-secondary" />
            </Grid>
            <Grid item xs={4}>
              <Delete className="text-secondary" />
            </Grid>
            <Grid item xs={4}>
              <MoreVert
                className="text-secondary"
                onClick={(event) => setShowMenu(event.currentTarget)}
              />
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };

  useEffect(() => {
    const rows = [
      {
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
    <Paper sx={{ height: "100%" }}>
      <SubTabComponent value={value} setValue={setValue} tabList={tabList} />
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
            columns={columns}
            tableRows={tableRows}
            customDropdownLabel="Style Code"
            customSearchButtonLabel="Mark Out Of Stock"
            showCustomSearchButton
            onCustomSearchButtonClick={() =>
              console.log("custom search button")
            }
            searchBarSizeMd={4}
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
              <Edit className="text-secondary" sx={{ zoom: 0.8 }} />
              <span className="fs-12 ms-2">Edit</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FileCopy className="text-secondary" sx={{ zoom: 0.8 }} />
              <span className="fs-12 ms-2">Duplicate</span>
            </MenuItem>
          </Menu>
        </Paper>
      </Box>
    </Paper>
  );
};

export default MyProducts;