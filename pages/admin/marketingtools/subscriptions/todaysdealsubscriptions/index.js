/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableWithSpan";
import ViewModal from "@/forms/admin/marketingtools&subscriptions/todaysdealsubscriptions/ViewModal";
import AddNoteModal from "@/forms/admin/marketingtools&subscriptions/todaysdealsubscriptions/AddNoteModal";
import {
  enableOrDisableSubscriptions,
  getSubscriptions,
  // viewAllSubsOfSingleUser,
} from "services/admin/marketingtools/subscriptions";
import toastify from "services/utils/toastUtils";
import CreateNotification from "@/forms/admin/marketingtools&subscriptions/todaysdealsubscriptions/CreateNotificationModal";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";

const TodaysDealSubscription = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [tableRowsTodaysDealSubs, setTableRowsTodaysDealSubs] = useState([]);
  const [dataOfSingleSupplierOrReseller, setDataOfSingleSupplierOrReseller] =
    useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [dropdownValue, setDropdownValue] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [purchaseIde, setPurchaseIde] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const [adminComments, setAdminComments] = useState({
    comment: "",
    commentAttachment: "",
  });

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
      label: "Subscription Period (Start Date & Time – End Date & Time)",
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
      label: "30 Days",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "90 Days",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "180 Days",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "270 Days",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "360 Days",
      minWidth: 150,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  const onClickOfMenuItem = (ele, theTypeId, comments, attachment) => {
    if (ele === "Add Note") {
      setTypeId(theTypeId);
      setAdminComments({
        comment: comments,
        commentAttachment: attachment,
      });
      setOpenAddNoteModal(true);
    }
    if (ele === "Notify") {
      setShowNotificationModal(true);
    }
  };

  const handleEnableOrDisable = async (purchaseId, status, marketingTool) => {
    const { error, message } = await enableOrDisableSubscriptions(
      purchaseId,
      status,
      marketingTool
    );
    if (!error) {
      toastify(`${status ? "Disabled" : "Enabled"} successfully`, "success");
      getSubscriptions(0);
    } else if (message) toastify(message, "error");
    else if (error?.response?.data?.message)
      toastify(error?.response?.data?.message, "error");
  };
  const getSubscriptionDate = (item, date) => {
    return item.days == date
      ? item.activatedAt === null || item.expirationDate === null
        ? "PENDING"
        : `${item.activatedAt} - ${item.expirationDate}`
      : "--";
  };
  const returnTableData = (data) => {
    const mappedArray = data.map((val, index) => {
      return {
        id: val.purchaseId,
        col1: index >= 9 ? index + 1 : `0${index + 1}`,
        col2: val.purchasedById,
        col3: getSubscriptionDate(val, "7 days"),
        col4: getSubscriptionDate(val, "30 days"),
        col5: getSubscriptionDate(val, "90 days"),
        col6: getSubscriptionDate(val, "180 days"),
        col7: getSubscriptionDate(val, "270 days"),
        col8: getSubscriptionDate(val, "360 days"),
        col9: val.toolStatus,
        col10: val.subscriptionAmount,
        col11: val.comments ? val.comments : "--",
        col12: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => {
                setPurchaseIde(val.purchaseId);
                setSubscriptionStatus(val.toolStatus);
                setSubscriptionPeriod(
                  `${val.activatedAt ? val.activatedAt : "--"} - ${
                    val.expirationDate ? val.expirationDate : "--"
                  }`
                );
                setOpenViewModal(true);
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                onClickOfMenuItem(
                  ele,
                  val.purchaseId,
                  val.comments,
                  val.commentsAttachment
                );
              }}
              options={[
                "Notify",
                "Add Note",
                <Box className="d-flex align-items-center">
                  <Typography>
                    {val.disabled ? "Disabled" : "Enabled"}
                  </Typography>
                  <Box className="ms-4">
                    <SwitchComponent
                      defaultChecked={!val.disabled}
                      label=""
                      ontoggle={() => {
                        handleEnableOrDisable(
                          val.purchaseId,
                          !val.disabled,
                          "TODAYS_DEAL"
                        );
                      }}
                    />
                  </Box>
                </Box>,
              ]}
              IconclassName="fs-18 color-gray"
            />
          </Box>
        ),
      };
    });
    return mappedArray;
  };

  const getDealSubscription = async (page) => {
    const selectedListData = dropdownValue.map((value) => value.title);
    const payload = {
      marketingTool: "TODAYS_DEAL",
      userType: selectedListData,
    };
    const { data, error } = await getSubscriptions(payload, page);

    if (error?.response?.data?.message) {
      if (error?.response?.data?.message)
        toastify(error?.response?.data?.message, "error");
      if (page === 0) {
        setTableRowsTodaysDealSubs([]);
      }
    } else if (data?.length) {
      if (page === 0) {
        setTableRowsTodaysDealSubs(returnTableData(data));
        setPageNumber(1);
      } else {
        setTableRowsTodaysDealSubs((pre) => [...pre, ...returnTableData(data)]);
        setPageNumber((pre) => pre + 1);
      }
    } else if (!data?.length) {
      if (page === 0) {
        setTableRowsTodaysDealSubs([]);
      }
    }
  };

  useEffect(() => {
    getDealSubscription(0);
  }, [dropdownValue]);

  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Box className="d-flex align-items-center justify-content-between">
            <Typography className="fw-bold color-orange">
              Todays Deal Subscription
            </Typography>
            <Box className="w-25 me-2">
              <MultiSelectComponent
                list={[
                  { title: "Supplier", id: 1 },
                  { title: "Reseller", id: 2 },
                ]}
                label="Select Subscriber"
                onSelectionChange={(_e, val) => {
                  setDropdownValue(val);
                }}
                value={dropdownValue}
                inputlabelshrink={false}
              />
            </Box>
          </Box>
          <TableComponent
            columns={[...column2]}
            column2={[...column1]}
            tableRows={[...tableRowsTodaysDealSubs]}
            tHeadBgColor="bg-light-gray"
            showPagination
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            onCustomButtonClick={() => {
              // setOpenAddDaysCounterModal(true);
            }}
            handlePageEnd={(page = pageNumber) => {
              getDealSubscription(page);
            }}
          />
        </Paper>
      </Box>
      {openViewModal && (
        <ViewModal
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          dataOfSingleSupplierOrReseller={dataOfSingleSupplierOrReseller}
          setDataOfSingleSupplierOrReseller={setDataOfSingleSupplierOrReseller}
          purchaseIde={purchaseIde}
          subscriptionStatus={subscriptionStatus}
          subscriptionPeriod={subscriptionPeriod}
        />
      )}
      {openAddNoteModal && (
        <AddNoteModal
          openAddNoteModal={openAddNoteModal}
          setOpenAddNoteModal={setOpenAddNoteModal}
          typeId={typeId}
          adminComments={adminComments}
          getDealSubscription={getDealSubscription}
        />
      )}
      {showNotificationModal && (
        <CreateNotification
          showNotificationModal={showNotificationModal}
          setShowNotificationModal={setShowNotificationModal}
          type="add"
        />
      )}
    </>
  );
};

export default TodaysDealSubscription;
