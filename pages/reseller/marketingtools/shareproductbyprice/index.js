import {
  Badge,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonComponent from "components/atoms/ButtonComponent";
import { Delete, Download, Share } from "@mui/icons-material";
import CreatePriceCatalog from "components/forms/reseller/marketingtools/shareproductbyprice";

const ShareProductByPrice = () => {
  const [tableRows, setTableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
    info: null,
  });
  const columns = [
    {
      label: "Campaign Title",
      id: "col1",
    },
    {
      label: "Margin Type",
      id: "col2",
    },
    {
      label: "Category",
      id: "col3",
    },
    {
      label: "Sub Category",
      id: "col4",
    },
    {
      label: "Created Date",
      id: "col5",
    },
    {
      label: "Price Range",
      id: "col6",
    },
    {
      label: "Actions",
      id: "col7",
    },
  ];

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.campaignTitle,
        col2: row.marginType,
        col3: row.category,
        col4: row.subCategory,
        col5: row.createdDate,
        col6: row.priceRange,
        col7: (
          <Grid container sx={{ maxWidth: 100 }}>
            <Grid item xs={3} sx={{ px: 0, mx: 0 }}>
              <VisibilityIcon
                className="text-secondary cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    id: row.id,
                    type: "view",
                  })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Download
                className="text-secondary cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    id: row.id,
                    type: "download",
                  })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Share
                className="text-secondary cursor-pointer"
                onClick={(event) => {
                  setShowMenu(event.currentTarget);
                  setShowModal({
                    show: true,
                    id: row.id,
                    type: "share",
                  });
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Delete
                className="text-secondary cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    id: row.id,
                    type: "delete",
                  })
                }
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
        id: 1,
        campaignTitle: "Science Quiz",
        marginType: "New",
        category: "New",
        subCategory: "New",
        createdDate: "23-01-2022",
        priceRange: "199",
      },
      {
        id: 2,
        campaignTitle: "Maths Quiz",
        marginType: "Existing",
        category: "Existing",
        subCategory: "Existing",
        createdDate: "23-01-2022",
        priceRange: "299",
      },
    ];
    setTableData(rows);
  }, []);

  useEffect(() => {
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  const handleClose = () => {
    setShowMenu(null);
  };

  return (
    <Paper sx={{ p: 2, height: "100%", minHeight: "80vh" }}>
      {showCreatePage ? (
        <CreatePriceCatalog setShowCreatePage={setShowCreatePage} />
      ) : (
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justifyContent="space-between"
            // className="border-bottom"
          >
            <Grid item sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" fontSize={14}>
                Subscription Start Date & Time: --
              </Typography>
            </Grid>
            <Grid
              item
              sx={{ p: 2 }}
              className="d-flex justify-content-end w-75"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize={14}
                className="me-5"
              >
                Subscription End Date & Time: --
              </Typography>
              <ButtonComponent
                label="Create Price Catelog"
                size="small"
                onBtnClick={() => setShowCreatePage(true)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableComponent
              table_heading=""
              columns={columns}
              tableRows={tableRows}
              showSearchbar={false}
            />
          </Grid>
        </Grid>
      )}
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
          <span className="fs-12 ms-2">Facebook Group</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className="fs-12 ms-2">Facebook Page</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className="fs-12 ms-2">Instagram</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className="fs-12 ms-2">Telegram</span>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ShareProductByPrice;
