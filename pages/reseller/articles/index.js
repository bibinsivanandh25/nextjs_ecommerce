import { Box, Grid, Menu, MenuItem, Paper } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SubTabComponent from "components/molecule/SubTabComponent";
import { Delete, Edit, FileCopy, MoreVert } from "@mui/icons-material";
import AddNewArticleModal from "components/forms/reseller/articles";

const Articles = () => {
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = React.useState(0);
  const [tableData, setTableData] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const columns = [
    {
      label: "Image",
      id: "col1",
      isFilter: false,
    },
    {
      label: "Article Name",
      id: "col2",
    },
    {
      label: "Description",
      id: "col3",
    },
    {
      label: "LInk",
      isFilter: false,
      id: "col4",
    },
    {
      label: "Status",
      id: "col5",
    },
    {
      label: "Date",
      id: "col6",
      isFilter: false,
    },
    {
      label: "Action",
      id: "col7",
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
        col2: row.articleName,
        col3: row.Description,
        col4: <span className="text-primary">{row.Link}</span>,
        col5: <span className="text-primary">{row.status}</span>,
        col6: row.date,
        col7: (
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
        articleName: "#45523232",
        Description: "Bag",
        Link: "SL 9083",
        status: "UK24",
        date: "17/12/2020",
      },
      {
        productType: "Simple Product",
        articleName: "#45523232",
        Description: "Bag",
        Link: "SL 9083",
        status: "UK24",
        date: "17/12/2020",
      },
      {
        productType: "Simple Product",
        articleName: "#45523232",
        Description: "Bag",
        Link: "SL 9083",
        status: "UK24",
        date: "17/12/2020",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  const tabList = [
    {
      label: "All",
      count: 2,
    },
    {
      label: "Published",
      count: 2,
    },
    {
      label: "Draft",
      count: 2,
    },
    {
      label: "Pending",
      count: 2,
    },
  ];

  return (
    <Paper sx={{ height: "100%" }}>
      <SubTabComponent value={value} setValue={setValue} tabList={tabList} />
      <Box p={2}>
        <Paper sx={{ px: 0, py: 2 }}>
          <TableComponent
          table_heading='2 Confirmed Orders'
            columns={columns}
            tableRows={tableRows}
            customDropdownLabel="Style Code"
            customSearchButtonLabel="Add New Article"
            showCustomSearchButton
            onCustomSearchButtonClick={() => setShowModal(true)}
            searchBarSizeMd={4}
            OnSelectionChange={(value)=>{
              console.log(value);
            }}
            customDropDownPlaceholder='Select Categories'
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
      {showModal ? (
        <AddNewArticleModal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </Paper>
  );
};

export default Articles;
