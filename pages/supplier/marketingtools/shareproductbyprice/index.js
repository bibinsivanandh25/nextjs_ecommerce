/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { Grid, Menu, MenuItem, Paper, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "components/atoms/ButtonComponent";
import CreateDiscount from "@/forms/supplier/marketingtools/creatediscount";
import { useSelector } from "react-redux";
import {
  deleteMarketingToolData,
  getUserMarketingTool,
} from "services/supplier/marketingtools";
import toastify from "services/utils/toastUtils";
import CustomIcon from "services/iconUtils";
import CreateShareProductByPrice from "@/forms/supplier/marketingtools/shareproductbyprice";
import ViewModal from "@/forms/supplier/marketingtools/viewmodal";
// import { useRouter } from "next/router";

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
    align: "center",
    data_align: "center",
  },
];
const ShareProductByPrice = () => {
  const user = useSelector((state) => state.user);
  // const router = useRouter();
  const [showMenu, setShowMenu] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState({
    show: false,
    id: null,
    info: null,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [masterData, setMasterData] = useState({});
  const [row, setRow] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState({});
  const handleViewClick = (item) => {
    if (item) {
      setViewModalOpen(true);
      setViewModalData(item);
    }
  };
  const handleDeleteClick = async (item) => {
    if (item) {
      const { data, err } = await deleteMarketingToolData(item.marketingToolId);
      if (data) {
        toastify(data.message, "success");
        setpageNumber(0);
        getTableRows(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleTableRows = (data) => {
    const temp = [];
    if (data) {
      data?.forEach((item, index) => {
        temp.push({
          id: index + 1,
          col1: item.campaignTitle,
          col2: item.marginType,
          col3: item.category,
          col4: item.subCategory,
          col5: new Date(item.createdDate).toLocaleString(),
          col6: `${item.priceStartRange} - ${item.priceEndRange}`,
          col7: (
            <div className="d-flex justify-content-center">
              <CustomIcon
                title="View"
                type="remove"
                className="fs-16 mx-1"
                onIconClick={() => handleViewClick(item)}
              />
              <a href={item.productCatalogueUrl} download>
                <CustomIcon
                  type="download"
                  className="fs-16 mx-1"
                  title="Download"
                />
              </a>
              <CustomIcon type="share" className="fs-16 mx-1" title="Share" />
              <CustomIcon
                type="delete"
                className="fs-16 ms-1"
                onIconClick={() => {
                  handleDeleteClick(item);
                }}
                title="Delete"
              />
            </div>
          ),
        });
      });
    }
    return temp;
  };
  const getTableRows = async (page) => {
    const { data, err } = await getUserMarketingTool(
      user.supplierId,
      "PRICE_TARGETED",
      page
    );
    if (data) {
      if (page == 0) {
        setMasterData(data);
        if (data.marketingToolResponsePojo) {
          setRow(handleTableRows(data.marketingToolResponsePojo));
        }
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRow((pre) => [
          ...pre,
          ...handleTableRows(data.marketingToolResponsePojo),
        ]);
      }
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };

  useEffect(() => {
    getTableRows(0);
  }, []);

  const handleClose = () => {
    setShowMenu(null);
  };

  return (
    <Paper sx={{ p: 2, height: "100%", minHeight: "80vh" }}>
      {!showCreateModal ? (
        <>
          <Grid container>
            <Grid
              item
              xs={12}
              className="d-flex justify-content-between align-items-center my-2"
            >
              <Grid>
                <Typography className="fs-12 fw-bold">
                  Subscription Start Date & time :{" "}
                  {masterData.subscriptionStartDateTime
                    ? new Date(
                        masterData.subscriptionStartDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid>
                <Typography className="fs-12 fw-bold">
                  Subscription End Date & time :{" "}
                  {masterData.subscriptionEndDateTime
                    ? new Date(
                        masterData.subscriptionEndDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid>
                <ButtonComponent
                  variant="outlined"
                  label="Create Price Catelog"
                  onBtnClick={() => setShowCreateModal(true)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableComponent
                table_heading=""
                columns={columns}
                tableRows={row}
                showSearchbar={false}
                showSearchFilter={false}
                handlePageEnd={(
                  searchText = "",
                  filterText = "ALL",
                  page = pageNumber
                ) => {
                  getTableRows(page);
                }}
              />
            </Grid>
          </Grid>
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
        </>
      ) : (
        <CreateShareProductByPrice
          showBackBtn
          inputLabel="Enter the Amount"
          showDateAndTime={false}
          btnText="View Price Catalog"
          onCustomBtnClick={() => {}}
          setShowCreateDiscount={setShowCreateModal}
          user={user}
          getTableRows={getTableRows}
          setpageNumber={setpageNumber}
        />
      )}
      {viewModalOpen && (
        <ViewModal
          open={viewModalOpen}
          data={viewModalData}
          modalClose={setViewModalOpen}
          modalTitle="Today's Deal View"
          hidedate={false}
        />
      )}
    </Paper>
  );
};

export default ShareProductByPrice;
