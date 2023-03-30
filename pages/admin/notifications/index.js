/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import MultiselectWithPagination from "@/atoms/MultiselectWithPagination";
import MultiSelectWithPagination from "@/atoms/MultiselectWithPagination";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TableComponent from "@/atoms/TableWithSpan";
import TextEditor from "@/atoms/TextEditor";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
// import { styles } from "@material-ui/pickers/views/Clock/Clock";
// import TableComponent from "@/atoms/TableComponent";
import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  createNotificationApiCall,
  deleteNotificationApiCall,
  getAllNotification,
  getNotificationById,
  getSupplierDropdown,
  viewNotificationApiCall,
} from "services/admin/notification";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";

const column1 = [
  {
    id: "col1",
    label: "Notification Title",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
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
    label: "Reseller",
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col4",
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
    colSpan: 3,
    minWidth: 120,
  },
  {
    label: "Email Status",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 3,
    minWidth: 120,
  },
  {
    label: "SMS Status",
    align: "center",
    data_align: "center",
    data_classname: "",
    colSpan: 3,
    minWidth: 120,
  },
  {
    id: "col14",
    label: "Created Date & Time",
    minWidth: 120,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col15",
    label: "Schedule Date & Time",
    minWidth: 120,
    align: "center",
    data_align: "center",
    data_classname: "",
    rowSpan: 2,
  },
  {
    id: "col16",
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
    id: "col5",
    label: "C",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "R",
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
    label: "R",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col10",
    label: "S",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col11",
    label: "C",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col12",
    label: "R",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col13",
    label: "S",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const customerList = [
  {
    id: "CST0922000010",
    title: "Suhil",
  },
  {
    id: "CST0123000114",
    title: "Suhil",
  },
  {
    id: "CST1222000052",
    title: "Tanmoy sen",
  },
];
const Notifications = () => {
  //create related states
  const [createNotification, setcreateNotification] = useState({
    notificationTitle: "",
    textContent: "",
    attachmentFile: [],
    notificationType: [],
    notificationScheduledAtDate: "",
    notificationScheduledAtTime: "",
    userNotificationInfoList: [],
  });
  const [showCreate, setshowCreate] = useState(false);
  const [modalType, setmodalType] = useState({ type: "" });
  const [selectedCustomers, setselectedCustomers] = useState([]);
  const [selectedSupplier, setselectedSupplier] = useState([]);

  const [selectAllCustomer, setselectAllCustomer] = useState(false);
  const [selectAllSupplier, setselectAllSupplier] = useState(false);
  const [showSchedule, setshowSchedule] = useState(false);
  const [contentType, setcontentType] = useState("");
  const [pageNumberState, setpageNumberState] = useState(0);
  const [sendMessageToType, setsendMessageToType] = useState({
    customer: "",
    reseller: "",
    supplier: "",
  });
  //get and view notification related state
  const [showView, setshowView] = useState(false);
  const [viewNotificationData, setviewNotificationData] = useState({});
  const [notificationDetails, setnotificationDetails] = useState([]);
  const [tablePageNumber, settablePageNumber] = useState(0);
  const [supplierDropdownVal, setsupplierDropdownVal] = useState([]);
  const [customerDropdownData, setcustomerDropdownData] = useState([]);
  //update related state

  const getSupplierDropdownFun = async (page = pageNumberState) => {
    const payload = {
      userType: "Customer",
      searchKey: "",
      pageNumber: page,
      pageSize: 10,
    };
    const { data, err } = await getSupplierDropdown(payload);
    if (data) {
      const temp = [];
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
  useEffect(() => {
    if (showCreate) {
      getSupplierDropdownFun();
      getSupplierDropdownFunction();
    }
  }, [showCreate]);
  const getSupplierDropdownFunction = async () => {
    const payload = {
      userType: "Supplier",
      searchKey: "",
      pageNumber: 0,
      pageSize: 10,
    };
    const { data, err } = await getSupplierDropdown(payload);
    if (data) {
      // console.log(data, "datadata");
      const temp = [];
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

  const createNotificationFunction = async () => {
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
      attachmentFile: [],
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
  useEffect(() => {
    getAllNotificationFunction();
  }, []);
  const viewNotificationFunction = async (id) => {
    const { data, err } = await viewNotificationApiCall(id);
    if (data) {
      setviewNotificationData(data.data);
      setshowView(true);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getNotificationByIdFunction = async (id) => {
    const { data, err } = await getNotificationById(id);
    if (data) {
      const tempCustomer = data.data.userNotificationInfoList.some(
        (x) => x.userType == "Customer"
      );
      const tempSupplier = data.data.userNotificationInfoList.some(
        (x) => x.userType == "Supplier"
      );
      if (tempCustomer) {
        setsendMessageToType((pre) => ({ ...pre, customer: "customer" }));
      }
      if (tempSupplier) {
        setsendMessageToType((pre) => ({ ...pre, supplier: "supplier" }));
      }
      let temp = [];
      const selectededitCustomer = data.data.userNotificationInfoList.filter(
        (val) => {
          if (val.userType == "Customer") {
            temp.push({
              isSelected: true,
              userEmail: val.userEmail,
              userId: val.userId,
              userMobileNumber: val.userMobileNumber,
              userName: val.userName,
              userType: val.userType,
            });

            return val;
          }
          console.log(
            selectededitCustomer,
            "[eahe[0eg8ue[ortjnw[teugjqer]ohe[gqjrg[quehreouhgqroig"
          );
          setselectedCustomers({ ...selectededitCustomer });
        }
      );

      // tempSupplier = data.data.userNotificationInfoList.filter((val) => {
      //   if (val.userType == "Supplier") {
      //     return val;
      //   }
      // });
      setcreateNotification({
        notificationTitle: data.data.notificationTitle,
        textContent: data.data.textContent,
        notificationType: data.data?.notificationType,
      });
      setselectedCustomers(tempCustomer);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const deleteNotificationFunction = async (id) => {
    const { data, err } = await deleteNotificationApiCall(id);
    if (data) {
      toastify(data.data, "success");
      getAllNotificationFunction();
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
        col3: "__",
        col4: item.suppllierCount,
        col14: item.createdDateAndTime,
        col15: item.scheduledDateAndTime,
        col16: (
          <Grid container className="d-flex justify-content-around">
            <CustomIcon type="send" className="h-4" />
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
                  getNotificationByIdFunction(item.notificationDetailsId);
                }
              }}
              options={["Edit", "Delete", "Resend"]}
              IconclassName="color-gray"
            />
          </Grid>
        ),
      });
    });
    return temp;
  };
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
                          sendMessageToType.customer.length
                            ? setsendMessageToType({
                                ...sendMessageToType,
                                customer: "",
                              })
                            : setsendMessageToType({
                                ...sendMessageToType,
                                customer: "customer",
                              });
                        }}
                        isChecked={sendMessageToType.customer === "customer"}
                      />
                    </Grid>
                    <Grid className="py-1" item md={8} xs={8}>
                      {/* <MultiSelectComponent
                        list={supplierDropdownData}
                        fullWidth
                        value={selectedCustomers}
                        onSelectionChange={(e, val) => {
                          handleCheckboxClick(val);
                          // setselectedCustomers((pre) => [...pre, ...val]);
                        }}
                        disabled={sendMessageToType.customer !== "customer"}
                        label="Customers"
                        // error={error?.customerList?.length}
                        // helperText={error.customerList}
                        inputlabelshrink
                        placeholder=""
                        size="small"
                      /> */}
                      <MultiselectWithPagination
                        disable={sendMessageToType.customer !== "customer"}
                        setselectedSupplier={setselectedCustomers}
                        selectedSupplier={selectedCustomers}
                        label="Customer"
                        setsupplierDropdownVal={setcustomerDropdownData}
                        supplierDropdownVal={customerDropdownData}
                        allSelect={selectAllCustomer}
                        setallSelect={setselectAllCustomer}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item md={12} xs={12} className="">
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
                      <MultiSelectWithPagination disable label="Reseller" />
                    </Grid>
                  </Grid>
                  <Grid container item md={12} xs={12}>
                    <Grid item md={4} xs={4}>
                      <CheckBoxComponent
                        label="Supplier"
                        checkBoxClick={() => {
                          sendMessageToType.supplier.length
                            ? setsendMessageToType({
                                ...sendMessageToType,
                                supplier: "",
                              })
                            : setsendMessageToType({
                                ...sendMessageToType,
                                supplier: "supplier",
                              });
                        }}
                        isChecked={sendMessageToType.supplier === "supplier"}
                      />
                    </Grid>
                    <Grid className="py-1" item md={8} xs={8}>
                      <MultiSelectWithPagination
                        disable={sendMessageToType.supplier !== "supplier"}
                        setselectedSupplier={setselectedSupplier}
                        selectedSupplier={selectedSupplier}
                        label="Supplier"
                        setsupplierDropdownVal={setsupplierDropdownVal}
                        supplierDropdownVal={supplierDropdownVal}
                        allSelect={selectAllSupplier}
                        setallSelect={setselectAllSupplier}
                      />
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
                        value={createNotification?.notificationTitle}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className="d-flex justify-content-between border-bottom"
                  >
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
                  </Grid>
                  <Grid className="d-flex justify-content-between ">
                    <RadiobuttonComponent
                      label="Only Attachment"
                      id="Only Attachment"
                      isChecked={contentType === "onlyAttachment"}
                      onRadioChange={() => {
                        setcontentType("onlyAttachment");
                      }}
                    />
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
                    <RadiobuttonComponent
                      label="Text with attachment"
                      id="Text with attachment"
                      isChecked={contentType === "textWithAttachment"}
                      onRadioChange={() => {
                        setcontentType("textWithAttachment");
                      }}
                    />
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
                        <ButtonComponent
                          variant="outlined"
                          label="Attach File"
                          muiProps="ms-3 "
                        />
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Grid
                      md={6}
                      xs={6}
                      className="d-flex justify-content-around"
                    >
                      <ButtonComponent label="Clear" />
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
                        label="Submit"
                        onBtnClick={createNotificationFunction}
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
