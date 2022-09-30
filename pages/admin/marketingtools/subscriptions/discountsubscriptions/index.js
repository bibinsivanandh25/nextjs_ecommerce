/* eslint-disable no-use-before-define */
import { Box, Paper, Typography } from "@mui/material";
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
const DiscountSubscriptions = () => {
  // const user = useSelector((state) => state.user);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [viewData, setViewData] = useState({});

  const onClickOfMenuItem = (ele) => {
    if (ele === "Add Note") {
      setOpenAddNoteModal(true);
    }
  };
  const handleViewClick = (data) => {
    if (data) {
      setViewData(data);
      setOpenViewModal(true);
    }
  };
  const getTableRows = (data) => {
    const result = [];
    if (data) {
      data.forEach((item, index) => {
        result.push({
          id: "col1",
          col1: index + 1,
          col2: item.purchasedById,
          col3: item.days == 7 ? item.activatedAt - item.expirationDate : "--",
          col4: item.days == 30 ? item.activatedAt - item.expirationDate : "--",
          col5: item.days == 90 ? item.activatedAt - item.expirationDate : "--",
          col6:
            item.days == 180 ? item.activatedAt - item.expirationDate : "--",
          col7:
            item.days == 270 ? item.activatedAt - item.expirationDate : "--",
          col8:
            item.days == 360 ? item.activatedAt - item.expirationDate : "--",
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
                  onClickOfMenuItem(ele);
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
      getTableData();
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getTableData = async () => {
    const payload = {
      marketingTool: "DISCOUNT_COUPON",
      toolStatus: "ACTIVE",
      userType: "SUPPLIER",
    };
    const { data, err } = await adminDiscountSubscription(payload);
    if (data) {
      setRows(getTableRows(data));
    }
    if (err) {
      toastify(err.response.data.message, "error");
      setRows([]);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  return (
    <>
      <Box>
        <Paper className="mxh-85vh mnh-85vh p-3 overflow-auto hide-scrollbar">
          <Typography className="fw-bold color-orange">
            Discount Subscriptions
          </Typography>
          <TableComponent
            columns={[...column2]}
            column2={[...column1]}
            tableRows={[...rows]}
            tHeadBgColor="bg-light-gray"
            showSearchFilter={false}
            showSearchbar={false}
            showCheckbox={false}
            onCustomButtonClick={() => {
              // setOpenAddDaysCounterModal(true);
            }}
            stickyHeader
          />
        </Paper>
      </Box>
      <ViewModal
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewData={viewData}
      />
      <AddNoteModal
        openAddNoteModal={openAddNoteModal}
        setOpenAddNoteModal={setOpenAddNoteModal}
      />
    </>
  );
};

export default DiscountSubscriptions;
