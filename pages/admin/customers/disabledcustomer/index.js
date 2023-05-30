/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomIcon from "services/iconUtils";
import TableComponent from "@/atoms/TableComponent";
import MenuOption from "@/atoms/MenuOptions";
import SwitchComponent from "@/atoms/SwitchComponent";
import ModalComponent from "@/atoms/ModalComponent";
import TextEditor from "@/atoms/TextEditor";
import {
  deleteCustomer,
  enableDisableCustomer,
  getCustomerData,
} from "services/admin/customers";
import toastify from "services/utils/toastUtils";
import ActiveCustomerViewModal from "@/forms/admin/customers/activecustomersmodal";
import { format } from "date-fns";

const disabledCustomer = [
  {
    id: "col1",
    label: "S.NO",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col2",
    label: "Customer ID",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col3",
    label: "Name",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
  {
    id: "col4",
    label: "Email & Mobile",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
  },
  {
    id: "col5",
    label: "DOB",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Refered Reseller",
    minWidth: 150,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Linked also as Vendor",
    minWidth: 200,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Total Orders",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Total Amount Spend",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "Recent Order",
    minWidth: 150,
    align: "start",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "Login Status",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "Reason",
    minWidth: 150,
    align: "start",
    data_align: "start",
    data_classname: "",
  },
  {
    id: "col13",
    label: "Browsing History",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col14",
    label: "Comments",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col15",
    label: "Action",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
    position: "sticky",
  },
];

const DisabledCustomer = () => {
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [addNotesModalOpen, setAddNotesModalOpen] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const inputRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleDeleteClick = async (id) => {
    const { data, err } = await deleteCustomer(id);
    if (!data.error) {
      setPageNumber(0);
      getAllCustomerData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const disableCustomer = async (id) => {
    const { data, err } = await enableDisableCustomer(id, false);
    if (!data.error) {
      setPageNumber(0);
      getAllCustomerData(0);
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: (
          <Typography className="cursor-pointer text-decoration-underline color-light-blue h-5 d-inline text-start">
            {item.customerId}
          </Typography>
        ),
        col3: item.customerName,
        col4: (
          <Box className="text-start">
            <Typography className="h-5">
              {item?.mobileNumberAndEmail?.email}
            </Typography>
            <Typography className="h-5">
              {item?.mobileNumberAndEmail?.mobileNumber}
            </Typography>
          </Box>
        ),
        col5: item.dob,
        col6: (
          <Box className="text-decoration-underline color-light-blue text-center">
            <Typography className="h-5 cursor-pointer fit-content">
              {item?.referedReseller}
            </Typography>
            <Typography className="h-5 cursor-pointer fit-content">
              {item?.referedReseller}
            </Typography>
          </Box>
        ),
        col7:
          item?.linkedAlsoAsVendor !== null &&
          Object.keys(item?.linkedAlsoAsVendor)?.length ? (
            <Box className="text-decoration-underline color-light-blue text-center">
              <Typography className="h-5 cursor-pointer ">
                {item?.linkedAlsoAsVendor?.bussinessName || "--"}
              </Typography>
              <Typography className="h-5 cursor-pointer ">
                {item?.linkedAlsoAsVendor?.linkedAs || "--"}
              </Typography>
            </Box>
          ) : (
            "--"
          ),
        // col7: (
        //   <Box className="text-decoration-underline color-light-blue text-center">
        //     <Typography className="h-5 cursor-pointer fit-content">
        //       {item?.linkedAlsoAsVendor || "--"}
        //     </Typography>
        //     <Typography className="h-5 cursor-pointer fit-content">
        //       {item?.linkedAlsoAsVendor || "--"}
        //     </Typography>
        //   </Box>
        // ),
        col8: item.totalOrders,
        col9: item.totalAmountSpend,
        col10: Object.keys(item.recentOrder || {}).length ? (
          <Box className="text-center">
            <Typography className="h-5 cursor-pointer fit-content">
              {item?.recentOrder?.orderId}
            </Typography>
            <Typography className="h-5 cursor-pointer fit-content">
              {item?.recentOrder?.orderedAt
                ? new Date(item?.recentOrder?.orderedAt).toLocaleString()
                : null}
            </Typography>
          </Box>
        ) : (
          "--"
        ),
        col11: item.loginStatus,
        col12: item.reason,
        col13: (
          <Tooltip title={item.browsingHistory}>
            <Box className="mxh-100 overflow-y-scroll">
              <Typography>{item.browsingHistory}</Typography>
            </Box>
          </Tooltip>
        ),
        col14: item.comments,
        col15: (
          <Box>
            <CustomIcon
              type="view"
              className="fs-18 me-2"
              onIconClick={() => {
                setSelectedData(item);
                setViewModalOpen(true);
              }}
            />
            <MenuOption
              options={[
                "Delete",
                <>
                  Enable{" "}
                  <Box className="ms-4">
                    <SwitchComponent
                      label=""
                      defaultChecked={!item.disabled}
                      ontoggle={() => {
                        disableCustomer(item.customerId);
                      }}
                    />
                  </Box>
                </>,
                "Create Disc.",
                "Notify",
                "Add Note",
              ]}
              IconclassName="fs-5 cursor-pointer"
              getSelectedItem={(ele) => {
                if (ele === "Create Disc.") {
                  setDiscountModalOpen(true);
                } else if (ele === "Notify") {
                  setNotifyModalOpen(true);
                } else if (ele === "Add Note") {
                  setAddNotesModalOpen(true);
                } else if (ele === "Delete") {
                  handleDeleteClick(item.customerId);
                }
              }}
            />
          </Box>
        ),
      });
    });
    return temp;
  };
  const getAllCustomerData = async (
    page = pageNumber,
    searchText = "",
    filteredDates
  ) => {
    const payload = {
      status: "DISABLED",
      keyword: searchText || null,
      fromDate: filteredDates?.fromDate
        ? `${format(new Date(filteredDates?.fromDate), "MM-dd-yyyy")} 00:00:00`
        : "",
      toDate: filteredDates?.toDate
        ? `${format(new Date(filteredDates?.toDate), "MM-dd-yyyy")} 00:00:00`
        : "",
      pageSize: 10,
      pageNumber: page,
    };
    const { data, err } = await getCustomerData(payload);
    if (data && page === 0) {
      setPageNumber(1);
      setMasterData([...mapStateToRow(data)]);
    } else if (data && page !== 0) {
      setPageNumber((pre) => pre + 1);
      setMasterData((pre) => [...pre, ...mapStateToRow(data)]);
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getAllCustomerData(0);
  }, []);
  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar">
      <Box className="mt-1">
        <TableComponent
          showDateFilter
          stickyCheckBox
          columns={disabledCustomer}
          tHeadBgColor="bg-white"
          // showCheckbox
          tableRows={masterData}
          draggableHeader={false}
          handlePageEnd={(
            searchText = "",
            filterText = "ALL",
            page = pageNumber,
            filteredDates
          ) => {
            getAllCustomerData(page, searchText, filteredDates);
          }}
        />
      </Box>
      {discountModalOpen && (
        <ModalComponent
          open={discountModalOpen}
          onCloseIconClick={() => {
            setDiscountModalOpen(false);
          }}
          ModalTitle="Create discount"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setDiscountModalOpen(false);
          }}
        >
          <Box className="pb-5 pt-4 px-4">
            <TextField label="Enter" variant="standard" fullWidth />
          </Box>
        </ModalComponent>
      )}
      {notifyModalOpen && (
        <ModalComponent
          open={notifyModalOpen}
          onCloseIconClick={() => {
            setNotifyModalOpen(false);
          }}
          ModalTitle="Notify"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setNotifyModalOpen(false);
          }}
          ModalWidth={750}
        >
          <Box className="py-3">
            <TextEditor />
          </Box>
        </ModalComponent>
      )}
      {addNotesModalOpen && (
        <ModalComponent
          open={addNotesModalOpen}
          onCloseIconClick={() => {
            setAddNotesModalOpen(false);
          }}
          ModalTitle="Notify"
          titleClassName="color-orange h-4"
          footerClassName="justify-content-end border-top"
          ClearBtnText="Cancel"
          saveBtnText="Submit"
          onClearBtnClick={() => {
            setAddNotesModalOpen(false);
          }}
          ModalWidth={550}
        >
          <Box className="pb-5 pt-4 px-4">
            <TextField
              label="Enter the percentage of discount"
              variant="standard"
              fullWidth
            />
            <div
              className="d-flex border-light-orange justify-content-center align-items-center mnh-150 mt-2 bg-light-orange2 rounded cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <p className="color-orange h-5">+ Add document</p>
            </div>
            <input type="file" className="d-none" ref={inputRef} />
          </Box>
        </ModalComponent>
      )}
      {viewModalOpen && (
        <ActiveCustomerViewModal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          selectedData={selectedData}
        />
      )}
    </Paper>
  );
};

export default DisabledCustomer;
