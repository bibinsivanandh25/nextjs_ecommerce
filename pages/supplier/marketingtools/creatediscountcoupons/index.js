/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import ChooseBannerModal from "@/forms/supplier/marketingtools/choosebanner";
import ViewModal from "@/forms/supplier/marketingtools/viewmodal";
import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import CreateDiscount from "components/forms/supplier/marketingtools/creatediscount";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomIcon from "services/iconUtils";
import {
  deleteMarketingToolData,
  getUserMarketingTool,
} from "services/supplier/marketingtools";
import toastify from "services/utils/toastUtils";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Campaign Title",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Margin Type",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Category",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Sub Category",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Start Date",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "End Date",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Created Date",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Customer Type",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Admin Approval",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Tool Status",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Action",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const CreateDiscountCoupons = () => {
  const [showCreateDiscount, setShowCreateDiscount] = useState(false);
  const user = useSelector((state) => state.user);
  const [masterData, setMasterData] = useState({});
  const [row, setRow] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState({});
  const [showChooseBanner, setShowChooseBanner] = useState(false);

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
  const handleViewClick = (item) => {
    if (item) {
      setViewModalOpen(true);
      setViewModalData(item);
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
          col5: new Date(item.startDateTime).toLocaleString(),
          col6: new Date(item.endDateTime).toLocaleString(),
          col7: new Date(item.createdDate).toLocaleString(),
          col8: item.customerType,
          col9: item.adminApprovalStatus || "--",
          col10:
            item.adminApprovalStatus !== "REJECTED" ? item.toolStatus : "--",
          col11: (
            <div className="d-flex justify-content-center">
              <CustomIcon
                title="View"
                type="remove"
                className="fs-16"
                onIconClick={() => handleViewClick(item)}
              />
              <CustomIcon type="share" className="fs-16 mx-1" title="Share" />
              <CustomIcon
                title="Delete"
                type="delete"
                className="fs-16"
                onIconClick={() => {
                  handleDeleteClick(item);
                }}
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
      "DISCOUNT_COUPON",
      page
    );
    if (data) {
      if (page == 0) {
        setMasterData(data);
        if (data.marketingToolResponsePojo) {
          setRow(handleTableRows(data.marketingToolResponsePojo));
        }
        setpageNumber((pre) => pre + 1);
      } else if (page !== 0 && data.marketingToolResponsePojo?.length) {
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

  return (
    <Paper className="p-2 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
      <div>
        {!showCreateDiscount ? (
          <div>
            <Grid container>
              <Grid item sm={4}>
                <Typography className="fs-12 fw-bold">
                  Subscription Start Date & time :{" "}
                  {masterData.subscriptionStartDateTime
                    ? new Date(
                        masterData.subscriptionStartDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography className="fs-12 fw-bold">
                  Subscription End Date & time :{" "}
                  {masterData.subscriptionEndDateTime
                    ? new Date(
                        masterData.subscriptionEndDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid item sm={4} display="flex" justifyContent="end">
                <ButtonComponent
                  variant="outlined"
                  label="Choose Banner"
                  onBtnClick={() => {
                    setShowChooseBanner(true);
                  }}
                  muiProps="mx-2"
                />
                <ButtonComponent
                  variant="outlined"
                  label="Create Discounts"
                  onBtnClick={() => {
                    setShowCreateDiscount(true);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12} display="flex" justifyContent="end">
                <Typography className="h-5 text-primary cursor-pointer py-1 me-2">
                  Guidelines to Create
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <TableComponent
                tableRows={[...row]}
                columns={[...columns]}
                showCheckbox
                showSearchFilter={false}
                showSearchbar={false}
                handlePageEnd={(
                  searchText = "",
                  filterText = "ALL",
                  page = pageNumber,
                  filteredDates
                ) => {
                  getTableRows(page);
                }}
              />
            </Grid>
          </div>
        ) : (
          <CreateDiscount
            setShowCreateDiscount={setShowCreateDiscount}
            btnText="View Discount Product"
            user={user}
            getTableRows={getTableRows}
            setpageNumber={setpageNumber}
          />
        )}
      </div>
      {viewModalOpen && (
        <ViewModal
          open={viewModalOpen}
          data={viewModalData}
          modalClose={setViewModalOpen}
          modalTitle="Create Disount View"
        />
      )}
      {showChooseBanner && (
        <ChooseBannerModal
          open={showChooseBanner}
          closeModal={setShowChooseBanner}
          type="DISCOUNT_COUPON"
        />
      )}
    </Paper>
  );
};
export default CreateDiscountCoupons;
