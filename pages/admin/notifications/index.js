/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import MultiselectWithPagination from "@/atoms/MultiselectWithPagination";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TableComponent from "@/atoms/TableWithSpan";
import TextEditor from "@/atoms/TextEditor";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
// import { styles } from "@material-ui/pickers/views/Clock/Clock";
// import TableComponent from "@/atoms/TableComponent";
import { Box, Grid, Paper, Typography } from "@mui/material";
import validateMessage from "constants/validateMessages";
import { format } from "date-fns";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  createNotificationApiCall,
  deleteNotificationApiCall,
  getAllNotification,
  getNotificationById,
  getSupplierDropdown,
  sendNotification,
  updateNotification,
  viewNotificationApiCall,
} from "services/admin/notification";
import { uploadSubCategoryImage } from "services/admin/products/productCategories/subcategory";
import CustomIcon from "services/iconUtils";
import { getBase64 } from "services/utils/functionUtils";
import toastify from "services/utils/toastUtils";

const column1 = [
  {
    id: "col1",
    label: "Notification Title",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 3,
    minWidth: 200,
  },
  {
    id: "col2",
    label: "Customer",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col3",
    label: "Supplier",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },

  {
    label: "Notification Status",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 2,
    minWidth: 120,
  },
  {
    label: "Email Status",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 2,
    minWidth: 120,
  },
  {
    label: "SMS Status",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 2,
    minWidth: 120,
  },
  {
    id: "col10",
    label: "Created Date & Time",
    minWidth: 120,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col11",
    label: "Schedule Date & Time",
    minWidth: 120,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col12",
    label: "Action",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
];

const column2 = [
  {
    id: "col4",
    label: "C",
    align: "center",
    data_align: "center",
  },

  {
    id: "col5",
    label: "S",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "C",
    align: "center",
    data_align: "center",
    data_classname: "",
  },

  {
    id: "col7",
    label: "S",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "C",
    align: "center",
    data_align: "center",
    data_classname: "",
  },

  {
    id: "col9",
    label: "S",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const Notifications = () => {
  const [createNotification, setcreateNotification] = useState({
    notificationTitle: "",
    textContent: "",
    attachmentFile: [],
    notificationType: [],
    notificationScheduledAtDate: "",
    notificationScheduledAtTime: "",
    userNotificationInfoList: [],
  });
  const [errorCreateNotification, seterrorCreateNotification] = useState({
    notificationTitle: "",
    textContent: "",
    attachmentFile: "",
    notificationType: "",
    notificationScheduledAtDate: "",
    notificationScheduledAtTime: "",
    userNotificationInfoList: "",
    userCheckboxType: "",
    notificationCheckboxType: "",
    contentRadioType: "",
    userDropdown: "",
  });
  const [customerName, setcustomerName] = useState([]);
  const [supplierName, setsupplierName] = useState([]);
  const [customerSearch, setcustomerSearch] = useState("");
  const [supplierSearch, setsupplierSearch] = useState("");
  const [showCreate, setshowCreate] = useState(false);
  const [modalType, setmodalType] = useState({ type: "" });
  const [selectedCustomers, setselectedCustomers] = useState([]);

  const [selectedSupplier, setselectedSupplier] = useState([]);
  const [selectAllCustomer, setselectAllCustomer] = useState(false);
  const [selectAllSupplier, setselectAllSupplier] = useState(false);
  const [showSchedule, setshowSchedule] = useState(false);
  const [contentType, setcontentType] = useState("");
  const [pageNumberState, setpageNumberState] = useState(0);
  const [supplierPage, setsupplierPage] = useState(0);
  const [imageState, setimageState] = useState(null);
  const [sendMessageToType, setsendMessageToType] = useState({
    customer: "",
    reseller: "",
    supplier: "",
  });
  const [showView, setshowView] = useState(false);
  const [viewNotificationData, setviewNotificationData] = useState({});
  const [notificationDetails, setnotificationDetails] = useState([]);
  const [tablePageNumber, settablePageNumber] = useState(0);
  const [supplierDropdownVal, setsupplierDropdownVal] = useState([]);
  const [customerDropdownData, setcustomerDropdownData] = useState([]);
  const [customerDropdownTemp, setcustomerDropdownTemp] = useState([]);
  const [supplierDropdownTemp, setsupplierDropdownTemp] = useState([]);
  const [userId, setuserId] = useState("");
  const profilePicRef = useRef();

  const getSupplierDropdownFun = async (page = pageNumberState) => {
    const payload = {
      userType: "Customer",
      searchKey: customerSearch,
      pageCount: page,
      pageSize: 10,
    };

    const { data, err } = await getSupplierDropdown(payload);
    if (data) {
      const temp = [...customerDropdownData];
      setcustomerDropdownTemp(data?.data);
      data.data.forEach((val) => {
        temp.push({
          userId: val?.userId,
          userType: val?.userType,
          userName: val?.userName,
          userMobileNumber: val?.userMobileNumber,
          userEmail: val?.userEmail,
          isSelected: false,
        });
      });
      setcustomerDropdownData([...temp]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getSupplierDropdownFunction = async (page = supplierPage) => {
    const payload = {
      userType: "Supplier",
      searchKey: supplierSearch,
      pageCount: page,
      pageSize: 50,
    };
    const { data, err } = await getSupplierDropdown(payload);
    if (data) {
      // console.log(data, "datadata");
      const temp = [...supplierDropdownVal];
      setsupplierDropdownTemp(data?.data);
      data.data.forEach((val) => {
        temp.push({
          userId: val?.userId,
          userType: val?.userType,
          userName: val?.userName,
          userMobileNumber: val?.userMobileNumber,
          userEmail: val?.userEmail,
          isSelected: false,
        });
      });

      // console.log(temp, "temp");
      setsupplierDropdownVal([...temp]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (showCreate) {
      getSupplierDropdownFun();
      getSupplierDropdownFunction();
    }
  }, [showCreate]);
  useEffect(() => {
    if (customerSearch.length) {
      const search = setTimeout(() => {
        getSupplierDropdownFun();
      }, 1000);
      return () => clearTimeout(search);
    }
  }, [customerSearch]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (supplierSearch.length) {
      const search = setTimeout(() => {
        getSupplierDropdownFunction();
      }, 1000);
      return () => clearTimeout(search);
    }
  }, [supplierSearch]);
  const closeModalFunction = () => {
    setcreateNotification({
      notificationTitle: "",
      textContent: "",
      attachmentFile: [],
      notificationType: [],
      notificationScheduledAtDate: "",
      notificationScheduledAtTime: "",
      userNotificationInfoList: [],
    });
    setcustomerName([]);
    setsupplierName([]);
    setuserId("");
    setselectAllSupplier(false);
    setselectAllCustomer(false);
    setselectedSupplier([]);
    setselectedCustomers([]);
    setshowSchedule(false);
    setcontentType("");
    setsendMessageToType({
      customer: "",
      reseller: "",
      supplier: "",
    });
    setmodalType({ type: "" });
    setshowCreate(false);
  };
  const updateNotificationFunction = async () => {
    let updateDate = `${createNotification.notificationScheduledAtDate} ${createNotification.notificationScheduledAtTime}`;
    if (!createNotification?.notificationScheduledAtDate.length) {
      updateDate = `${format(
        new Date(createNotification?.notificationScheduledAtDate),
        "MM-dd-yyyy"
      )} ${createNotification?.notificationScheduledAtTime}:00`;
    }
    const userNotificationInfoList = [
      ...selectedCustomers,
      ...selectedSupplier,
    ];
    userNotificationInfoList.forEach((ele) => {
      delete ele.isSelected;
    });
    const payload = {
      notificationDetailsId: userId,
      isSupplierSelectedAll: selectAllSupplier,
      isCustomerSelectedAll: selectAllCustomer,
      notificationTitle: createNotification.notificationTitle,
      textContent: createNotification.textContent,
      attachmentFile: createNotification.attachmentFile,
      notificationType: createNotification.notificationType,
      userNotificationInfoList,
      notificationScheduledAt: updateDate,
    };
    const { data, err } = await updateNotification(payload);
    if (data) {
      toastify(data.message, "success");
      closeModalFunction();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const modalValidation = () => {
    const tempErr = {
      notificationTitle: "",
      textContent: "",
      attachmentFile: "",
      notificationType: "",
      notificationScheduledAtDate: "",
      notificationScheduledAtTime: "",
      userNotificationInfoList: "",
      userCheckboxType: "",
      notificationCheckboxType: "",
      contentRadioType: "",
      userDropdown: "",
    };
    let flag = false;
    if (
      !sendMessageToType.customer.length &&
      !sendMessageToType.supplier.length
    ) {
      tempErr.userCheckboxType = validateMessage.selectOption;
      flag = true;
    }
    if (!contentType?.length) {
      tempErr.contentRadioType = validateMessage.selectOption;
      flag = true;
    }

    if (createNotification.notificationType.length < 1) {
      tempErr.notificationCheckboxType = validateMessage.selectOption;
      flag = true;
    }
    if (
      createNotification.notificationType.includes("email") ||
      createNotification.notificationType.includes("pushNotification")
    ) {
      if (!createNotification.notificationTitle.length) {
        tempErr.notificationTitle = validateMessage.field_required;
        flag = true;
      }
    }
    if (contentType === "text" || contentType === "textWithAttachment") {
      if (!createNotification.textContent.length) {
        tempErr.textContent = validateMessage.field_required;
        flag = true;
      }
    }
    if (
      contentType === "onlyAttachment" ||
      contentType === "textWithAttachment"
    ) {
      if (!createNotification.attachmentFile.length) {
        tempErr.attachmentFile = validateMessage.selectImage;
        flag = true;
      }
    }
    if (sendMessageToType.customer || sendMessageToType.supplier) {
      if (!selectedCustomers.length && !selectedSupplier.length) {
        tempErr.userDropdown = validateMessage.selectOption;
        flag = true;
      }
    }

    seterrorCreateNotification(tempErr);
    return flag;
  };
  const viewNotificationFunction = async (id) => {
    const { data, err } = await viewNotificationApiCall(id);
    if (data) {
      setviewNotificationData(data.data);
      setshowView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const deleteNotificationFunction = async (id) => {
    const { data, err } = await deleteNotificationApiCall(id);
    if (data) {
      toastify(data.data, "success");
      // eslint-disable-next-line no-use-before-define
      getAllNotificationFunction();
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getNotificationByIdFunction = async (id) => {
    const { data, err } = await getNotificationById(id);
    if (data) {
      const tempCustomer = data.data.userNotificationInfoList.some(
        (x) => x.userType == "CUSTOMER"
      );
      const tempSupplier = data.data.userNotificationInfoList.some(
        (x) => x.userType == "SUPPLIER"
      );
      if (tempCustomer) {
        setsendMessageToType((pre) => ({ ...pre, customer: "customer" }));
      }
      if (tempSupplier) {
        setsendMessageToType((pre) => ({ ...pre, supplier: "supplier" }));
      }
      const tempcustomer = [];
      data.data.userNotificationInfoList.forEach((val) => {
        if (val.userType == "CUSTOMER") {
          tempcustomer.push({
            isSelected: true,
            userEmail: val.userEmail,
            userId: val.userId,
            userMobileNumber: val.userMobileNumber,
            userName: val.userName,
            userType: val.userType,
          });
        }
      });
      setselectedCustomers([...tempcustomer]);
      const tempsupplier = [];
      data.data.userNotificationInfoList.forEach((val) => {
        if (val.userType == "SUPPLIER") {
          tempsupplier.push({
            isSelected: true,
            userEmail: val.userEmail,
            userId: val.userId,
            userMobileNumber: val.userMobileNumber,
            userName: val.userName,
            userType: val.userType,
          });
        }
      });
      setselectedSupplier([...tempsupplier]);
      // setselectedCustomers({ ...selectededitCustomer });
      // tempSupplier = data.data.userNotificationInfoList.filter((val) => {
      //   if (val.userType == "Supplier") {
      //     return val;
      //   }
      // });
      setcreateNotification({
        notificationTitle: data.data.notificationTitle,
        textContent: data.data.textContent,
        notificationType: data.data?.notificationType,
        attachmentFile: data.data.attachmentFile || [],
        notificationScheduledAtTime:
          data.data.notificationScheduledAt.split(" ")[1],
        notificationScheduledAtDate:
          data.data.notificationScheduledAt.split(" ")[0],
      });
      if (data.data.attachmentFile.length > 0) {
        setcontentType("onlyAttachment");
      } else if (data.data.textContent.length > 0) {
        setcontentType("text");
      } else if (
        data.data.textContent.length > 0 &&
        data.data.attachmentFile.length > 0
      ) {
        setcontentType("textWithAttachment");
      } else {
        setcontentType("");
      }
      if (data.data.notificationScheduledAt.length) {
        setshowSchedule(true);
      } else {
        setshowSchedule(false);
      }
      // setselectedCustomers(tempCustomer);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const sendNotificationFunction = async (id) => {
    const { data, err } = await sendNotification(id);
    if (data) {
      toastify(data.message, "success");
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item) => {
      temp.push({
        col1: item.notificationTitle,
        col2: item.customerCount,
        col3: item.supplierCount,
        col4: item.customerNotificationSentStatus,
        col5: item.supplierNotificationSentStatus,
        col6: item.customerMailSentStatus,
        col7: item.supplierMailSentStatus,
        col8: item.customerSmsSentStatus,
        col9: item.supplierSmsSentStatus,
        // col3: item.suppllierCount,
        col10: item.createdDateAndTime,
        col11: item.scheduledDateAndTime,
        col12: (
          <Grid container className="d-flex justify-content-around">
            {!item.isSend ? (
              <CustomIcon
                type="send"
                className="h-4"
                onIconClick={() => {
                  sendNotificationFunction(item.notificationDetailsId);
                }}
              />
            ) : (
              <Grid style={{ visibility: "hidden" }}>
                <CustomIcon type="send" className="h-4" />
              </Grid>
            )}
            <CustomIcon
              type="view"
              className="h-4"
              onIconClick={() => {
                viewNotificationFunction(item.notificationDetailsId);
              }}
            />
            <MenuOption
              getSelectedItem={(ele) => {
                // onClickOfMenuItem(ele, row.customerQuestionId);
                if (ele === "Delete") {
                  deleteNotificationFunction(item.notificationDetailsId);
                } else if (ele === "Edit") {
                  setmodalType({ type: "edit" });
                  setshowCreate(true);
                  setuserId(item.notificationDetailsId);

                  getNotificationByIdFunction(item.notificationDetailsId);
                } else if (ele == "Resend") {
                  sendNotificationFunction(item.notificationDetailsId);
                }
              }}
              options={["Edit", "Delete", item.isSend && "Resend"]}
              IconclassName="color-gray"
            />
          </Grid>
        ),
      });
    });
    return temp;
  };
  const getAllNotificationFunction = async (
    page = tablePageNumber,
    keyword = "",
    dates
  ) => {
    const payload = {
      fromDate: dates?.from || "",
      toDate: dates?.to || "",
      searchKey: keyword,
      pageSize: 50,
      pageCount: page,
    };
    const { data, err } = await getAllNotification(payload);
    if (data) {
      setnotificationDetails(mapStateToRow(data.data));
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const createNotificationFunction = async () => {
    const errorResult = modalValidation();
    if (!errorResult) {
      const imageUrl = [];
      if (createNotification.attachmentFile.length) {
        const file = new FormData();
        file.append("media", imageState);
        const datas = await uploadSubCategoryImage(file);
        if (datas) {
          imageUrl.push(datas.data);
        }
        // return imageUrl;
      }

      const userNotificationInfoList = [
        ...selectedCustomers,
        ...selectedSupplier,
      ];
      userNotificationInfoList.forEach((ele) => {
        delete ele.isSelected;
      });
      let dateTime = "";
      if (
        createNotification?.notificationScheduledAtDate !== "" &&
        createNotification?.notificationScheduledAtTime !== ""
      ) {
        dateTime = `${format(
          new Date(createNotification?.notificationScheduledAtDate),
          "MM-dd-yyyy"
        )} ${createNotification?.notificationScheduledAtTime}:00`;
      }

      // console.log(dateTime, "dateTime");

      const payload = {
        isSupplierSelectedAll: selectAllSupplier,
        isCustomerSelectedAll: selectAllCustomer,
        notificationTitle: createNotification.notificationTitle,
        textContent: createNotification.textContent,
        attachmentFile: imageUrl,
        notificationType: createNotification.notificationType,
        userNotificationInfoList,
        notificationScheduledAt: dateTime,
      };
      const { data, err } = await createNotificationApiCall(payload);
      if (data) {
        toastify(data.message, "success");
        setshowCreate(false);
        setmodalType({ type: "" });
        getAllNotificationFunction(0, "", { from: "", to: "" });
        setcreateNotification({
          notificationTitle: "",
          textContent: "",
          attachmentFile: [],
          notificationType: [],
          notificationScheduledAtDate: "",
          notificationScheduledAtTime: "",
          userNotificationInfoList: [],
        });
        setselectAllSupplier(false);
        setselectAllCustomer(false);
        setselectedSupplier([]);
        setselectedCustomers([]);
        setshowSchedule(false);
        setcontentType("onlyAttachment");
        setsendMessageToType({
          customer: "",
          reseller: "",
          supplier: "",
        });
        settablePageNumber(tablePageNumber + 1);
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  useEffect(() => {
    getAllNotificationFunction();
  }, []);

  const viewProductDataFormat = (key, value) => {
    return (
      <Grid container xs={12} md={12}>
        <Grid item xs={5} md={5}>
          <Typography className="fs-14 fw-500">{key}</Typography>
        </Grid>
        <Grid item xs={1} md={1}>
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography className="fs-14">{value}</Typography>
        </Grid>
      </Grid>
    );
  };
  // const handleCheckboxClick = (value) => {
  //   const temp = [...supplierDropdownData];

  //   temp.forEach((item) => {
  //     if (item?.id == value?.id) {
  //       item.isSelected = !item.isSelected;
  //     }
  //   });
  //   setsupplierDropdownData([...temp]);
  //   const selected = temp.filter((x) => x.isSelected === true);
  //   setselectedCustomers(selected);
  // };

  const clearFunction = () => {
    setcreateNotification({
      notificationTitle: "",
      textContent: "",
      attachmentFile: [],
      notificationType: [],
      notificationScheduledAtDate: "",
      notificationScheduledAtTime: "",
      userNotificationInfoList: [],
    });
  };
  return (
    <Box>
      <Paper>
        <Grid container>
          <Grid item xs={12} sx={{ my: 5, px: 2 }}>
            <Paper className="pt-3">
              <TableComponent
                showDateFilter
                showButton
                // tabChange={`${selectedList.length}`}
                table_heading="Notification"
                buttonLabel="Create Notification"
                columns={[...column2]}
                column2={[...column1]}
                tableRows={[...notificationDetails]}
                tHeadBgColor="bg-light-gray"
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
                stickyHeader
                handlePageEnd={(page = tablePageNumber, searchText, dates) => {
                  getAllNotificationFunction(page, searchText, dates);
                }}
                onBtnClick={() => {
                  setmodalType({ type: "create" });
                  setshowCreate(true);
                }}
                // handlePageEnd={(page = pageNumber) => {
                //   getTableData(page, null, router?.query?.Status);
                // }}
                // handleRowsPerPageChange={() => {
                //   setpageNumber(0);
                // }}
              />
            </Paper>
            {showCreate && (
              <ModalComponent
                ModalTitle="Notify"
                minWidth={700}
                open={showCreate}
                showFooter={false}
                onCloseIconClick={closeModalFunction}
              >
                <Grid className="p-2 ">
                  <Grid container item md={12} xs={12} className="">
                    <Grid item md={4} xs={4}>
                      <CheckBoxComponent
                        label="Customer"
                        checkBoxClick={() => {
                          if (sendMessageToType.customer.length > 0) {
                            setsendMessageToType({
                              ...sendMessageToType,
                              customer: "",
                            });
                            setselectedCustomers([]);
                            setcustomerName([]);
                          } else {
                            setsendMessageToType({
                              ...sendMessageToType,
                              customer: "customer",
                            });
                          }
                        }}
                        isChecked={sendMessageToType.customer === "customer"}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.userCheckboxType}
                      </Typography>
                    </Grid>
                    <Grid className="py-1" item md={8} xs={8}>
                      <MultiselectWithPagination
                        dowpdownLength={customerDropdownTemp}
                        getSupplierDropdownFun={getSupplierDropdownFun}
                        setpageNumberState={setpageNumberState}
                        pageNumberState={pageNumberState}
                        disable={sendMessageToType.customer !== "customer"}
                        setselectedSupplier={setselectedCustomers}
                        selectedSupplier={selectedCustomers}
                        label="Customer"
                        setsupplierDropdownVal={setcustomerDropdownData}
                        supplierDropdownVal={customerDropdownData}
                        allSelect={selectAllCustomer}
                        setallSelect={setselectAllCustomer}
                        personName={customerName}
                        setPersonName={setcustomerName}
                        searchDropdown={customerSearch}
                        setsearchDropdown={setcustomerSearch}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.userDropdown}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid container item md={12} xs={12} className="">
                    <Grid item md={4} xs={4}>
                      <CheckBoxComponent
                        label="Reseller"
                        isDisabled
                        checkBoxClick={() => {
                          sendMessageToType.reseller.length
                            ? setsendMessageToType({
                                ...sendMessageToType,
                                reseller: "",
                              })
                            : setsendMessageToType({
                                ...sendMessageToType,
                                reseller: "reseller",
                              });
                        }}
                        isChecked={sendMessageToType.reseller === "reseller"}
                      />
                    </Grid>
                    <Grid className="py-1" item md={8} xs={8}>
                      <MultiselectWithPagination disable label="Reseller" />
                    </Grid>
                  </Grid> */}
                  <Grid container item md={12} xs={12}>
                    <Grid item md={4} xs={4}>
                      <CheckBoxComponent
                        label="Supplier"
                        checkBoxClick={() => {
                          if (sendMessageToType.supplier.length > 0) {
                            setsendMessageToType({
                              ...sendMessageToType,
                              supplier: "",
                            });
                            setsupplierName([]);
                            setselectedSupplier([]);
                          } else {
                            setsendMessageToType({
                              ...sendMessageToType,
                              supplier: "supplier",
                            });
                          }
                        }}
                        isChecked={sendMessageToType.supplier === "supplier"}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.userCheckboxType}
                      </Typography>
                    </Grid>
                    <Grid className="py-1" item md={8} xs={8}>
                      <MultiselectWithPagination
                        getSupplierDropdownFun={getSupplierDropdownFunction}
                        setpageNumberState={setsupplierPage}
                        pageNumberState={supplierPage}
                        dowpdownLength={supplierDropdownTemp}
                        disable={sendMessageToType.supplier !== "supplier"}
                        setselectedSupplier={setselectedSupplier}
                        selectedSupplier={selectedSupplier}
                        label="Supplier"
                        setsupplierDropdownVal={setsupplierDropdownVal}
                        supplierDropdownVal={supplierDropdownVal}
                        allSelect={selectAllSupplier}
                        setallSelect={setselectAllSupplier}
                        personName={supplierName}
                        setPersonName={setsupplierName}
                        searchDropdown={supplierSearch}
                        setsearchDropdown={setsupplierSearch}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.userDropdown}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid className="py-2">
                    <Grid className="py-2">
                      <InputBox
                        placeholder="Add Title"
                        // fullWidth={false}
                        className="w-60"
                        onInputChange={(val) => {
                          setcreateNotification({
                            ...createNotification,
                            notificationTitle: val.target.value,
                          });
                        }}
                        error={errorCreateNotification.notificationTitle || ""}
                        helperText={
                          errorCreateNotification.notificationTitle || ""
                        }
                        value={createNotification?.notificationTitle}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className="d-flex justify-content-between border-bottom"
                  >
                    <Grid>
                      <CheckBoxComponent
                        label="Push Notification"
                        checkBoxClick={() => {
                          let temp = [];
                          temp = createNotification.notificationType;
                          const isPush = (element) =>
                            element === "pushNotification";
                          if (
                            createNotification.notificationType.includes(
                              "pushNotification"
                            )
                          ) {
                            const indexValue =
                              createNotification?.notificationType?.findIndex(
                                isPush
                              );
                            temp.splice(indexValue, 1);
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          } else {
                            temp.push("pushNotification");
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          }
                        }}
                        isChecked={createNotification?.notificationType?.includes(
                          "pushNotification"
                        )}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.notificationCheckboxType}
                      </Typography>
                    </Grid>
                    <Grid>
                      <CheckBoxComponent
                        label="Email"
                        checkBoxClick={() => {
                          let temp = [];
                          temp = createNotification.notificationType;
                          const isPush = (element) => element === "email";
                          if (
                            createNotification?.notificationType?.includes(
                              "email"
                            )
                          ) {
                            const indexValue =
                              createNotification?.notificationType?.findIndex(
                                isPush
                              );
                            temp.splice(indexValue, 1);
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          } else {
                            temp.push("email");
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          }
                        }}
                        isChecked={createNotification?.notificationType?.includes(
                          "email"
                        )}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.notificationCheckboxType}
                      </Typography>
                    </Grid>
                    <Grid>
                      <CheckBoxComponent
                        label="Message"
                        checkBoxClick={() => {
                          let temp = [];
                          temp = createNotification.notificationType;
                          const isPush = (element) => element === "sms";
                          if (
                            createNotification.notificationType.includes("sms")
                          ) {
                            const indexValue =
                              createNotification?.notificationType?.findIndex(
                                isPush
                              );
                            temp.splice(indexValue, 1);
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          } else {
                            temp.push("sms");
                            setcreateNotification({
                              ...createNotification,
                              notificationType: temp,
                            });
                          }
                        }}
                        isChecked={createNotification?.notificationType?.includes(
                          "sms"
                        )}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.notificationCheckboxType}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid className="d-flex justify-content-between p-2">
                    <Grid>
                      <RadiobuttonComponent
                        label="Only Attachment"
                        id="Only Attachment"
                        isChecked={
                          contentType === "onlyAttachment" ||
                          createNotification?.attachmentFile?.length
                        }
                        onRadioChange={() => {
                          setcontentType("onlyAttachment");
                        }}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.contentRadioType}
                      </Typography>
                    </Grid>
                    <Grid>
                      <RadiobuttonComponent
                        label="Only Text"
                        id="Only Text"
                        isChecked={
                          contentType === "text" ||
                          createNotification?.textContent?.length
                        }
                        onRadioChange={() => {
                          setcontentType("text");
                        }}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.contentRadioType}
                      </Typography>
                    </Grid>
                    <Grid>
                      <RadiobuttonComponent
                        label="Text with attachment"
                        id="Text with attachment"
                        isChecked={contentType === "textWithAttachment"}
                        onRadioChange={() => {
                          setcontentType("textWithAttachment");
                        }}
                      />
                      <Typography className="fs-12 fw-500 color-red">
                        {errorCreateNotification.contentRadioType}
                      </Typography>
                    </Grid>
                  </Grid>

                  {contentType === "textWithAttachment" ||
                  contentType === "text" ||
                  createNotification?.textContent?.length ? (
                    <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
                      <TextEditor
                        EditorHeight="90px"
                        className="w-95p"
                        placeholder="Email Text"
                        getContent={(val) => {
                          setcreateNotification({
                            ...createNotification,
                            textContent: val,
                          });
                        }}
                        content={createNotification?.textContent}
                        helpertext={errorCreateNotification.textContent || ""}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {showSchedule && (
                    <Grid container className="pb-1 d-flex justify-content-end">
                      <DatePickerComponent
                        disablePast
                        size="small"
                        fullWidth
                        className="w-50"
                        value={createNotification.notificationScheduledAtDate}
                        // error={error.scheduleDate}
                        // helperText={error.scheduleDate}
                        onDateChange={(val) => {
                          setcreateNotification((pre) => ({
                            ...pre,
                            notificationScheduledAtDate: val,
                          }));
                        }}
                      />
                      <input
                        type="time"
                        // value={scheduleDateTime.time}
                        placeholder="hh:mm"
                        className={styles.timepicker}
                        style={{
                          border: "none",
                          outline: "none",
                          display: "flex",
                          flexDirection: "row-reverse",
                        }}
                        onChange={(val) => {
                          setcreateNotification((pre) => ({
                            ...pre,
                            notificationScheduledAtTime: val.target.value,
                          }));
                        }}
                        value={createNotification.notificationScheduledAtTime}
                      />
                    </Grid>
                  )}

                  <Grid container xs={12} md={12}>
                    <Grid md={6} xs={6}>
                      {contentType === "onlyAttachment" ||
                      contentType === "textWithAttachment" ? (
                        <>
                          {createNotification?.attachmentFile?.length ? (
                            <Grid container>
                              <Image
                                src={createNotification?.attachmentFile[0]}
                                height={30}
                                width={80}
                              />
                              <CustomIcon
                                type="close"
                                size={6}
                                className="fs-14 mb-3 position-absolute bg-white me-2"
                                onIconClick={() => {
                                  setcreateNotification({
                                    ...createNotification,
                                    attachmentFile: [],
                                  });
                                }}
                              />
                            </Grid>
                          ) : (
                            // <></>
                            <Grid
                              container
                              className="d-flex align-items-center"
                            >
                              <ButtonComponent
                                variant="outlined"
                                label="Attach File"
                                muiProps="ms-3 "
                                onBtnClick={() => {
                                  profilePicRef.current.click();
                                }}
                              />
                              <Typography className="fs-12 fw-500 color-red">
                                {errorCreateNotification.attachmentFile}
                              </Typography>
                              <input
                                type="file"
                                hidden
                                ref={profilePicRef}
                                // onChange={async (e) => {
                                //   if (e.target.files[0]) {
                                //     const file = await getBase64(e.target.files[0]);
                                //     console.log(file, "file");
                                //     // setcustomerDetails({
                                //     //   ...customerDetails,
                                //     //   profileImage: file,
                                //     // });
                                //   }
                                // }}
                                onChange={async (e) => {
                                  if (
                                    e.target?.files.length &&
                                    e.target.files[0].type.includes("image")
                                  ) {
                                    const file = await getBase64(
                                      e.target.files[0]
                                    );
                                    const temp = [];
                                    temp.push(file);
                                    // console.log(file, "file");
                                    // setFiles([...files, e.target.files[0]]);
                                    setimageState(e.target.files[0]);
                                    setcreateNotification({
                                      ...createNotification,
                                      attachmentFile: temp,
                                    });
                                  } else {
                                    toastify(
                                      "Only Images file is accepted",
                                      "error"
                                    );
                                  }
                                }}
                              />
                            </Grid>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Grid
                      md={6}
                      xs={6}
                      className="d-flex justify-content-around"
                    >
                      <ButtonComponent
                        label="Clear"
                        onBtnClick={clearFunction}
                      />
                      {!showSchedule && (
                        <ButtonComponent
                          label="Schedule"
                          onBtnClick={() => {
                            setshowSchedule(true);
                          }}
                        />
                      )}
                      {showSchedule && (
                        <ButtonComponent
                          label="Cancel Schedule"
                          onBtnClick={() => {
                            setshowSchedule(false);
                          }}
                        />
                      )}
                      <ButtonComponent
                        label={`${
                          modalType.type == "create" ? "Submit" : "Update"
                        }`}
                        onBtnClick={() => {
                          modalType.type == "create"
                            ? createNotificationFunction()
                            : updateNotificationFunction();
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </ModalComponent>
            )}
            {showView && (
              <ModalComponent
                showFooter={false}
                open={showView}
                ModalTitle="View Notification"
                onCloseIconClick={() => {
                  setshowView(false);
                }}
              >
                <Grid className="p-2">
                  {viewProductDataFormat(
                    "Notification Title",
                    viewNotificationData.notificationTitle
                  )}
                  {viewProductDataFormat(
                    "Customer",
                    viewNotificationData.customerCount
                  )}
                  {viewProductDataFormat(
                    "Supplier",
                    viewNotificationData.supplierCount
                  )}
                  {viewProductDataFormat(
                    "Overall Status",
                    viewNotificationData.overAllStatus
                  )}
                  {viewProductDataFormat(
                    "Created Date and Time",
                    viewNotificationData?.createdDateAndTime?.replace(
                      "T",
                      " "
                    ) || "__"
                  )}
                  {viewProductDataFormat(
                    "Scheduled Date and Time",
                    viewNotificationData?.scheduledDateAndTime?.replace(
                      "T",
                      " "
                    ) || "__"
                  )}
                  <Grid className="d-flex justify-content-end">
                    <Typography className="fs-12 theme_color">
                      Click Here To Download Attachments
                    </Typography>
                  </Grid>
                </Grid>
              </ModalComponent>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Notifications;
