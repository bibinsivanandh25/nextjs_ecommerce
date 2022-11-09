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
import { useRouter } from "next/router";
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
    id: "Supplier",
    value: "Supplier",
    title: "Supplier",
  },
  {
    id: "Reseller",
    value: "Reseller",
    title: "Reseller",
  },
];
const DiscountSubscriptions = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [viewData, setViewData] = useState({});
  const [selectedList, setSelectedList] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [openNotifyModal, setOpenNotifyModal] = useState(false);
  const [selectedListData, setSelectedListData] = useState([]);
  const [queryStatus, setQueryStatus] = useState(null);

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
  const getSubscriptionDate = (item, date) => {
    return item.days == date
      ? item.activatedAt === null || item.expirationDate === null
        ? "PENDING"
        : `${item.activatedAt} - ${item.expirationDate}`
      : "--";
  };
  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data?.forEach((item, index) => {
        result.push({
          id: index + 1,
          col1: index + 1,
          col2: item.purchasedById,
          col3: getSubscriptionDate(item, "7 days"),
          col4: getSubscriptionDate(item, "30 days"),
          col5: getSubscriptionDate(item, "90 days"),
          col6: getSubscriptionDate(item, "180 days"),
          col7: getSubscriptionDate(item, "270 days"),
          col8: getSubscriptionDate(item, "360 days"),
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
  const getTableData = async (page, userType, Status) => {
    const temp = [];
    selectedList.forEach((item) => {
      if (item.value) {
        temp.push(item.value);
      }
    });
    const payload = {
      marketingTool: "DISCOUNT_COUPON",
      userType: userType ?? temp,
      status: Status || queryStatus,
    };
    const { data, err } = await adminDiscountSubscription(payload, page);
    if (data?.length) {
      if (page == 0) {
        setRows(getTableRows(data));
        setpageNumber(1);
      } else {
        setpageNumber((pre) => pre + 1);
        setRows((pre) => [...pre, ...getTableRows(data)]);
      }
    } else if (data.length == 0 && page == 0) {
      setRows([]);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
      setRows([]);
    }
  };
  useEffect(() => {
    if (router?.query?.userType?.length) {
      setSelectedListData([
        {
          id: router.query.userType,
          value: router.query.userType,
          title: router.query.userType,
        },
      ]);
      setSelectedList([
        {
          id: router.query.userType,
          value: router.query.userType,
          title: router.query.userType,
        },
      ]);
      setQueryStatus(router?.query?.Status);
      getTableData(0, [router?.query?.userType], router?.query?.Status);
      setpageNumber(0);
    }
  }, [router?.query]);

  useEffect(() => {
      getTableData(0);
      setpageNumber(0);
  }, [router?.query]);
 

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
                  setSelectedListData([]);
                  setSelectedList(value);
                  setpageNumber(0);
                  if (value?.length) {
                    const temp = [];
                    value.forEach((ele) => {
                      temp.push(ele.value);
                    });
                    getTableData(0, [...temp]);
                    setpageNumber(0);
                  } else {
                    getTableData(0, []);
                    setpageNumber(0);
                  }
                }}
                value={selectedList?.length ? selectedList : selectedListData}
              />
            </Grid>
          </Grid>
          <TableComponent
            tabChange={`${selectedList.length}`}
            columns={[...column2]}
            column2={[...column1]}
            tableRows={[...rows]}
            tHeadBgColor="bg-light-gray"
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            stickyHeader
            handlePageEnd={(page = pageNumber) => {
              getTableData(page, null, router?.query?.status);
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
