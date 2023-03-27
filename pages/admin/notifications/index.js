/* eslint-disable no-unused-expressions */
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import MultiSelectWithPagination from "@/atoms/MultiselectWithPagination";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TableComponent from "@/atoms/TableWithSpan";
import TextEditor from "@/atoms/TextEditor";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
// import { styles } from "@material-ui/pickers/views/Clock/Clock";
// import TableComponent from "@/atoms/TableComponent";
import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { getSupplierDropdown } from "services/admin/notification";
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
    minWidth: 130,
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
  const [selectedCustomers, setselectedCustomers] = useState([]);
  const [showSchedule, setshowSchedule] = useState(false);
  const [contentType, setcontentType] = useState("onlyAttachment");
  const [pageNumberState, setpageNumberState] = useState(0);
  const [sendMessageToType, setsendMessageToType] = useState({
    customer: "",
    reseller: "",
    supplier: "",
  });
  const [supplierDropdownData, setsupplierDropdownData] = useState([]);

  const [sendType, setsendType] = useState("pushNotification");
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
      setsupplierDropdownData([...temp]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    getSupplierDropdownFun();
  }, []);
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
                // tableRows={[...rows]}
                tHeadBgColor="bg-light-gray"
                showSearchFilter={false}
                showSearchbar={false}
                showCheckbox={false}
                stickyHeader
                onBtnClick={() => {
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
                onCloseIconClick={() => {
                  setshowCreate(false);
                }}
                showFooter={false}
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
                      <MultiSelectComponent
                        list={supplierDropdownData}
                        fullWidth
                        value={selectedCustomers.title}
                        onSelectionChange={(e, val) => {
                          setselectedCustomers((pre) => [...pre, ...val]);
                        }}
                        disabled={sendMessageToType.customer !== "customer"}
                        label="Customers"
                        // error={error?.customerList?.length}
                        // helperText={error.customerList}
                        inputlabelshrink
                        placeholder="Customers"
                        size="small"
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
                      <MultiSelectComponent
                        fullWidth
                        label="Reseller"
                        disabled={sendMessageToType.reseller !== "reseller"}
                        inputlabelshrink
                        placeholder="Reseller"
                        size="small"
                      />
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
                      // list={supplierDropdownData}
                      // fullWidth
                      // // value={selectedCustomers}
                      // // onSelectionChange={(val) => {
                      // //   setselectedCustomers(val);
                      // // }}
                      // label="Supplier"
                      // disabled={sendMessageToType.supplier !== "supplier"}
                      // // error={error?.customerList?.length}
                      // // helperText={error.customerList}
                      // inputlabelshrink
                      // placeholder="Supplier"
                      // size="small"
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
                        const isPush = (element) => element === "push";
                        if (
                          createNotification.notificationType.includes("push")
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
                          temp.push("push");
                          setcreateNotification({
                            ...createNotification,
                            notificationType: temp,
                          });
                        }
                      }}
                      isChecked={createNotification.notificationType.includes(
                        "push"
                      )}
                    />
                    <CheckBoxComponent
                      label="Email"
                      checkBoxClick={() => {
                        let temp = [];
                        temp = createNotification.notificationType;
                        const isPush = (element) => element === "email";
                        if (
                          createNotification.notificationType.includes("email")
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
                      isChecked={createNotification.notificationType.includes(
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
                      isChecked={createNotification.notificationType.includes(
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
                      isChecked={contentType === "text"}
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
                  contentType === "text" ? (
                    <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
                      <TextEditor
                        EditorHeight="90px"
                        className="w-95p"
                        placeholder="Email Text"
                        getContent={(val) => {
                          setcreateNotification({
                            ...createNotification,
                            notificationType: [val],
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
                      <ButtonComponent label="Submit" />
                    </Grid>
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
