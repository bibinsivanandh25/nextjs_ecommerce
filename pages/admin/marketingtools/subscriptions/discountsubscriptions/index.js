/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableWithSpan";
import ViewModal from "@/forms/admin/marketingtools&subscriptions/discountsubscriptions/ViewModal";
import AddNoteModal from "@/forms/admin/marketingtools&subscriptions/discountsubscriptions/AddNoteModal";
import {
  adminDiscountSubscription,
  adminDiscountSubscriptionDisable,
} from "services/admin/discountsubscription";
import toastify from "services/utils/toastUtils";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { useSelector } from "react-redux";
import NotifyModal from "@/forms/admin/marketingtools&subscriptions/discountsubscriptions/notifymodal";
// import { useSelector } from "react-redux";

const column1 = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "S.No.",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
    position: "sticky",
  },

  {
    id: "col2",
    label: "Reseller Id/Supplier ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
    position: "sticky",
  },
  {
    label: "Subscription Period (Start Date & Time - End Date & Time)",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 6,
  },
  {
    id: "col9",
    label: "Tool Status (Live or Not)",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col10",
    label: "Subscription Amount Paid",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col11",
    label: "Comments",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col12",
    label: "Action",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
    position: "sticky",
  },
];

const column2 = [
  {
    id: "col3",
    label: "7 Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col4",
    label: "30Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col5",
    label: "90Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col6",
    label: "180Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col7",
    label: "270Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
  {
    id: "col8",
    label: "360Days",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    // data_style: { paddingLeft: "7%" },
  },
];
const listData = [
  {
    id: "1",
    value: "SUPPLIER",
    title: "SUPPLIER",
  },
  {
    id: "2",
    value: "RESELLER",
    title: "RESELLER",
  },
];
const DiscountSubscriptions = () => {
  const user = useSelector((state) => state.user);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [viewData, setViewData] = useState({});
  const [selectedList, setSelectedList] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [openNotifyModal, setOpenNotifyModal] = useState(false);

  const onClickOfMenuItem = (ele, item) => {
    if (ele === "Add Note") {
      setSelectedData(item);
      setOpenAddNoteModal(true);
    }
    if (ele === "Notify") {
      setSelectedData(item);
      setOpenNotifyModal(true);
    }
  };
  const handleViewClick = async (value) => {
    if (value) {
      setViewData(value);
      setOpenViewModal(true);
    }
  };
  // const getSubscriptionDate = (item,dat) => {

  // }
  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item, index) => {
        result.push({
          id: index + 1,
          col1: index + 1,
          col2: item.purchasedById,
          col3:
            item.days == "7 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "PENDING"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col4:
            item.days == "30 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "PENDING"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col5:
            item.days == "90 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "Pending"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col6:
            item.days == "180 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "Pending"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col7:
            item.days == "270 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "Pending"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col8:
            item.days == "360 days"
              ? item.activatedAt === null || item.expirationDate === null
                ? "Pending"
                : `${item.activatedAt} - ${item.expirationDate}`
              : "--",
          col9: item.toolStatus,
          col10: item.subscriptionAmount,
          col11: item.comments || "--",
          col12: (
            <Box className="d-flex justify-content-evenly align-items-center">
              <CustomIcon
                type="view"
                className="fs-18"
                onIconClick={() => handleViewClick(item)}
              />
              <MenuOption
                getSelectedItem={(ele) => {
                  onClickOfMenuItem(ele, item);
                }}
                options={[
                  "Notify",
                  "Add Note",
                  <Box className="d-flex align-items-center">
                    <Typography>
                      {item.disabled ? "Disabled" : "Enabled"}
                    </Typography>
                    <Box className="ms-4">
                      <SwitchComponent
                        label=""
                        defaultChecked={item.disabled}
                        ontoggle={(val) => {
                          handleSwitchClick(item.purchaseId, val);
                        }}
                      />
                    </Box>
                  </Box>,
                ]}
                IconclassName="fs-18 color-gray"
              />
            </Box>
          ),
        });
      });
    }
    return result;
  };
  const handleSwitchClick = async (id, value) => {
    const { data, err } = await adminDiscountSubscriptionDisable(
      id,
      value,
      "DISCOUNT_COUPON"
    );
    if (data) {
      toastify(data.message, "success");
      getTableData(pageNumber);
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getTableData = async (page) => {
    const selectedListData = [];
    selectedList.forEach((item) => {
      if (item.value) {
        selectedListData.push(item.value);
      }
    });
    const payload = {
      marketingTool: "DISCOUNT_COUPON",
      userType: selectedListData,
    };
    const { data, err } = await adminDiscountSubscription(payload, page);
    if (data) {
      if (page == 0) {
        setRows(getTableRows(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getTableRows(data)]);
      }
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setRows([]);
    }
  };

  useEffect(() => {
    getTableData(0);
    setpageNumber(0);
  }, [selectedList]);
  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Grid container>
            <Grid item xs={8.5}>
              <Typography className="fw-bold color-orange">
                Discount Subscriptions
              </Typography>
            </Grid>
            <Grid item xs={3.5}>
              <MultiSelectComponent
                label="FILTER"
                placeholder=""
                list={listData}
                onSelectionChange={(e, value) => {
                  setSelectedList(value);
                  setpageNumber(0);
                }}
                value={selectedList}
              />
            </Grid>
          </Grid>
          <TableComponent
            columns={[...column2]}
            column2={[...column1]}
            tableRows={[...rows]}
            tHeadBgColor="bg-light-gray"
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            stickyHeader
            handlePageEnd={(page = pageNumber) => {
              getTableRows(page);
            }}
            handleRowsPerPageChange={() => {
              setpageNumber(0);
            }}
          />
        </Paper>
      </Box>
      {openViewModal ? (
        <ViewModal
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          viewData={viewData}
          user={user}
        />
      ) : null}
      {openAddNoteModal ? (
        <AddNoteModal
          openAddNoteModal={openAddNoteModal}
          setOpenAddNoteModal={setOpenAddNoteModal}
          selectedData={selectedData}
          getTableData={getTableData}
        />
      ) : null}
      {openNotifyModal ? (
        <NotifyModal
          open={openNotifyModal}
          closeModal={setOpenNotifyModal}
          selectedData={selectedData}
        />
      ) : null}
    </>
  );
};

export default DiscountSubscriptions;
