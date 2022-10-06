/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import TableComponent from "@/atoms/TableWithSpan";
import ViewModal from "@/forms/admin/marketingtools&subscriptions/flags/ViewModal";
import AddNoteModal from "@/forms/admin/marketingtools&subscriptions/flags/AddNoteModal";
import {
  enableOrDisableSubscriptions,
  getSubscriptions,
} from "services/admin/marketingtools/subscriptions";
import toastify from "services/utils/toastUtils";
import CreateNotification from "@/forms/admin/marketingtools&subscriptions/flags/CreateNotificationModal";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";

const FlagsSubscription = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [dataOfSingleSupplierOrReseller, setDataOfSingleSupplierOrReseller] =
    useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [rowsForFlags, setRowsForFlags] = useState([]);
  const [purchaseIde, setPurchaseIde] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const [dropdownValue, setDropdownValue] = useState([]);
  const [typeId, setTypeId] = useState("");
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

  const handleEnableOrDisable = async (purchaseId, status, marketingTool) => {
    const { error, message } = await enableOrDisableSubscriptions(
      purchaseId,
      status,
      marketingTool
    );
    if (!error) {
      toastify(`${status ? "Disabled" : "Enabled"} successfully`, "success");
      getFlagsSubscription(0);
    } else if (message) toastify(message, "error");
    else if (error?.response?.data?.message)
      toastify(error?.response?.data?.message, "error");
  };

  const returnTableData = (data) => {
    const mappedArray = data.map((val, index) => {
      const dateOne = new Date(val.activatedAt);
      const dateTwo = new Date(val.expirationDate);
      const timeDifference = dateTwo.getTime() - dateOne.getTime();
      const divisor = 1000 * 60 * 60 * 24;
      const numberOfDays = timeDifference / divisor;
      return {
        id: val.purchaseId,
        col1: index >= 9 ? index + 1 : `0${index + 1}`,
        col2: val.purchasedById,
        col3:
          numberOfDays === 7
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col4:
          numberOfDays === 30
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col5:
          numberOfDays === 90
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col6:
          numberOfDays === 180
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col7:
          numberOfDays === 270
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col8:
          numberOfDays === 360
            ? `${val.activatedAt}-${val.expirationDate}`
            : "--",
        col9: val.toolStatus,
        col10: val.subscriptionAmount,
        col11: val.comments ? val.comments : "0",
        col12: (
          <Box className="d-flex justify-content-evenly align-items-center">
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => {
                setPurchaseIde(val.purchaseId);
                // handleViewClick(val.purchaseId, 0);
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

  const getFlagsSubscription = async (page) => {
    const selectedListData = dropdownValue.map((value) => value.title);
    const payload = {
      marketingTool: "FLAGS",
      userType: selectedListData,
    };
    const { data, error, message } = await getSubscriptions(payload, page);

    if (error) {
      if (message) toastify(message, "error");
      if (error?.response?.data?.message)
        toastify(error?.response?.data?.message, "error");
      if (page === 0) {
        setRowsForFlags([]);
      }
    } else if (data) {
      if (page === 0) {
        setRowsForFlags(returnTableData(data));
        setPageNumber((pre) => pre + 1);
      } else {
        setRowsForFlags((pre) => [...pre, ...returnTableData(data)]);
        setPageNumber((pre) => pre + 1);
      }
    }
  };

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

  useEffect(() => {
    getFlagsSubscription(0);
    setPageNumber(0);
  }, [dropdownValue]);

  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Box className="d-flex align-items-center justify-content-between">
            <Typography className="fw-bold color-orange">Flags</Typography>
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
            tableRows={[...rowsForFlags]}
            tHeadBgColor="bg-light-gray"
            showPagination={false}
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            handlePageEnd={(page = pageNumber) => {
              getFlagsSubscription(page);
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
        />
      )}
      {openAddNoteModal && (
        <AddNoteModal
          openAddNoteModal={openAddNoteModal}
          setOpenAddNoteModal={setOpenAddNoteModal}
          typeId={typeId}
          adminComments={adminComments}
          getFlagsSubscription={getFlagsSubscription}
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

export default FlagsSubscription;
