/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import ViewModal from "@/forms/supplier/marketingtools/viewmodal";
import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import CreateDiscount from "components/forms/supplier/marketingtools/creatediscount";
import { useEffect, useState } from "react";
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
const CreateTodaysDeals = () => {
  const user = useSelector((state) => state.user);
  const [showCreateDiscount, setShowCreateDiscount] = useState(false);
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
                type="delete"
                className="fs-16"
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
      "TODAYS_DEAL",
      page
    );
    if (data) {
      setMasterData(data);
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

  return (
    <div>
      {!showCreateDiscount ? (
        <Paper className="p-2 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
          <div>
            <Grid className="d-flex justify-content-between align-items-center my-2">
              <Grid>
                <Typography className="fs-12 fw-bold">
                  Subscription Start Date & time:{" "}
                  {masterData.subscriptionStartDateTime
                    ? new Date(
                        masterData.subscriptionStartDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid>
                <Typography className="fs-12 fw-bold">
                  Subscription End Date & time:{" "}
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
                  label="Create Today's Deal"
                  onBtnClick={() => {
                    setShowCreateDiscount(true);
                  }}
                />
                <Typography
                  sx={{
                    width: "fit-content",
                    mx: "auto",
                  }}
                  className="h-5 text-primary cursor-pointer py-1"
                >
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
          {viewModalOpen && (
            <ViewModal
              open={viewModalOpen}
              data={viewModalData}
              modalClose={setViewModalOpen}
              modalTitle="Today's Deal View"
            />
          )}
        </Paper>
      ) : (
        <Paper className="p-2 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
          <CreateDiscount
            setShowCreateDiscount={setShowCreateDiscount}
            btnText="View Today's Deal"
            user={user}
            getTableRows={getTableRows}
            setpageNumber={setpageNumber}
          />
        </Paper>
      )}
    </div>
  );
};
export default CreateTodaysDeals;
