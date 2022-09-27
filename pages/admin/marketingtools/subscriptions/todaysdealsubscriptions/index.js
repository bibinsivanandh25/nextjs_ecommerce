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
  getTodaysDealSubsscriptions,
} from "services/admin/marketingtools/subscriptions/todaysdealsubscriptions";
import toastify from "services/utils/toastUtils";
import CreateNotification from "@/forms/admin/marketingtools&subscriptions/todaysdealsubscriptions/CreateNotificationModal";

const TodaysDealSubscription = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [tableRowsTodaysDealSubs, setTableRowsTodaysDealSubs] = useState([]);
  const [dataOfSingleSupplierOrReseller, setDataOfSingleSupplierOrReseller] =
    useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

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

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add Note") {
      setOpenAddNoteModal(true);
    }
    if (ele === "Notify") {
      console.log("hi");
      setShowNotificationModal(true);
    }
  };

  const handleEnableOrDisable = async (purchaseId, status, marketingTool) => {
    const { error } = await enableOrDisableSubscriptions(
      purchaseId,
      status,
      marketingTool
    );
    if (!error) {
      toastify(`${status ? "Disabled" : "Enabled"} successfully`, "success");
      getDealSubscription();
    } else {
      toastify(`Unable to change the status`, "error");
    }
  };

  async function getDealSubscription() {
    const { data, error } = await getTodaysDealSubsscriptions({
      marketingTool: "TODAYS_DEAL",
      toolStatus: "ACTIVE",
      userType: "SUPPLIER",
    });
    if (data) {
      console.log(data);
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
                  console.log(
                    "val.userMarketingTools ",
                    val.userMarketingTools
                  );
                  setDataOfSingleSupplierOrReseller(val.userMarketingTools);
                  setOpenViewModal(true);
                }}
              />
              <MenuOption
                getSelectedItem={(ele) => {
                  console.log("Hey");
                  onClickOfMenuItem(ele);
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

      setTableRowsTodaysDealSubs(mappedArray);
    }
    if (error) {
      console.log("error hey", error);
    }
  }

  useEffect(() => {
    getDealSubscription();
  }, []);

  // const rows = [
  //   {
  //     id: 1,
  //     col1: "01",
  //     col2: "#827342",
  //     col3: "--",
  //     col4: "1/12/2021 - 12.25 to 30/12/2021 - 12.25",
  //     col5: "--",
  //     col6: "--",
  //     col7: "--",
  //     col8: "--",
  //     col9: "sdasdasd",
  //     col10: "Active",
  //     col11: 25,
  //     col12: (
  //       <Box className="d-flex justify-content-evenly align-items-center">
  //         <CustomIcon
  //           type="view"
  //           className="fs-18"
  //           onIconClick={() => setOpenViewModal(true)}
  //         />
  //         <MenuOption
  //           getSelectedItem={(ele) => {
  //             onClickOfMenuItem(ele);
  //           }}
  //           options={[
  //             "Notify",
  //             "Add Note",
  //             <Box className="d-flex align-items-center">
  //               <Typography>Disable</Typography>
  //               <Box className="ms-4">
  //                 <SwitchComponent label="" />
  //               </Box>
  //             </Box>,
  //           ]}
  //           IconclassName="fs-18 color-gray"
  //         />
  //       </Box>
  //     ),
  //   },
  // ];

  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Typography className="fw-bold color-orange">
            Todays Deal Subscription
          </Typography>
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
          />
        </Paper>
      </Box>
      <ViewModal
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        dataOfSingleSupplierOrReseller={dataOfSingleSupplierOrReseller}
      />
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
      <CreateNotification
        showNotificationModal={showNotificationModal}
        setShowNotificationModal={setShowNotificationModal}
        type="add"
      />
    </>
  );
};

export default TodaysDealSubscription;
