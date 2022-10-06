/* eslint-disable no-unused-vars */
import { Box, FormHelperText, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { CloseOutlined } from "@mui/icons-material";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TextEditor from "@/atoms/TextEditor";
import ButtonComponent from "@/atoms/ButtonComponent";
import {
  getFavouriteCustomers,
  getNotificationbyId,
  getNotificationMediaURL,
  getPushNotifationTitleSuggestion,
  sendMarketingToolNotification,
} from "services/supplier/notifications";
import validateMessage from "constants/validateMessages";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import toastify from "services/utils/toastUtils";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import styles from "./createnotication.module.css";

const CreateNotification = ({
  showNotificationModal = false,
  setShowNotificationModal = () => {},
  getTableData = () => {},
  type = "edit",
  notificationID = null,
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [checkedRadioId, setCheckedRadioId] = useState("Only Attachments");
  const [showAttachment, setShowAttachment] = useState(true);
  const [showText, setShowText] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const fileRef = useRef(null);
  // const [notificationMediaURL, setNotificationMediaURL] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [title, setTitle] = useState({});
  const [titleSugestionList, setTitleSuggestionList] = useState([]);
  const [showScheduleDate, setShowScheduleDate] = useState(false);
  const [description, setDescription] = useState("");
  const [scheduleDateTime, setScheduleDateTime] = useState({
    date: null,
    time: null,
  });
  const [error, setError] = useState({
    customerList: null,
    title: null,
    attachments: null,
    description: null,
    scheduleDate: null,
    scheduleTime: null,
  });

  const supplierId = useSelector((state) => state.user?.supplierId);
  const getNotificationData = async () => {
    const { data } = await getNotificationbyId(notificationID);
    if (data) {
      if (data.notificationType === "TEXT_WITH_ATTACHMENTS") {
        setCheckedRadioId("Text With Attachments");
        setShowAttachment(true);
        setShowText(true);
      }
      if (data.notificationType === "TEXT") {
        setCheckedRadioId("Only Text");
        setShowAttachment(false);
        setShowText(true);
      }
      if (data.notificationType === "ATTACHMENTS") {
        setCheckedRadioId("Only Attachments");
        setShowAttachment(true);
        setShowText(false);
      }
      const temp = [];
      customerList.forEach((ele) => {
        data.customerIds.forEach((item) => {
          if (ele.id === item) {
            temp.push(ele);
          }
        });
      });
      setSelectedCustomers([...temp]);
      titleSugestionList.forEach((ele) => {
        if (ele.label === data.notificationTitle) {
          setTitle(ele);
        }
      });
    }
    setDescription(data.notificationMessage);
    setShowScheduleDate(true);
    const temp = [];
    data.attachmentUrl.forEach((ele) => {
      temp.push(ele.slice(ele.lastIndexOf("/") + 1));
    });
    setFileNames([...temp]);
    setScheduleDateTime((pre) => ({
      ...pre,
      date: data.scheduledDateTime.split(" ")[0],
      time: data.scheduledDateTime.split(" ")[1],
    }));
  };

  useEffect(() => {
    if (
      notificationID &&
      customerList.length &&
      titleSugestionList.length &&
      type === "edit"
    ) {
      getNotificationData();
    }
  }, [notificationID, customerList, titleSugestionList]);
  const getCustomerList = async () => {
    const { data } = await getFavouriteCustomers(supplierId);
    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          id: ele.id,
          title: ele.name,
          value: ele.name,
        });
      });
      setCustomerList([...result]);
    }
  };
  const getTitleSuggestions = async () => {
    const { data } = await getPushNotifationTitleSuggestion(supplierId);
    if (data) {
      const result = [];
      data.forEach((ele) => {
        result.push({
          id: ele.pushNotificationSuggestionId,
          label: ele.title,
          value: ele.title,
        });
      });
      setTitleSuggestionList([...result]);
    }
  };

  useEffect(() => {
    getCustomerList();
    getTitleSuggestions();
  }, []);

  const validateForm = () => {
    const errObj = {
      customerList: null,
      title: null,
      attachments: null,
      description: null,
    };
    let flag = false;
    if (!selectedCustomers.length) {
      errObj.customerList = validateMessage.field_required;
      flag = true;
    }
    // if (!Object.values(title)[0].length) {
    //   flag = true;
    //   errObj.title = validateMessage.field_required;
    // }
    if (!title?.value) {
      flag = true;
      errObj.title = validateMessage.field_required;
    }
    if (!showAttachment && showText) {
      if (!description.length) {
        flag = true;
        errObj.description = validateMessage.field_required;
      }
    }
    if (showAttachment && !showText) {
      if (!files.length && type === "add") {
        flag = true;
        errObj.attachments = validateMessage.field_required;
        toastify("A minimum of one attachment is required", "error");
      }
    }
    if (showAttachment && showText) {
      if (!description.length) {
        flag = true;
        errObj.description = validateMessage.field_required;
      }
      if (!files.length && type === "add") {
        flag = true;
        errObj.attachments = validateMessage.field_required;
        toastify("A minimum of one attachment is required", "error");
      }
    }
    if (showScheduleDate) {
      if (scheduleDateTime.date === null) {
        flag = true;
        errObj.scheduleDate = validateMessage.field_required;
      }
      if (scheduleDateTime.time === null) {
        flag = true;
        errObj.scheduleTime = validateMessage.field_required;
      }
    }
    setError(errObj);
    return flag;
  };

  const getStatus = () => {
    if (showAttachment && !showText) {
      return "ATTACHMENTS";
    }
    if (showText && !showAttachment) {
      return "TEXT";
    }
    if (showText && showAttachment) {
      return "TEXT_WITH_ATTACHMENTS";
    }
    return null;
  };
  const sendNotification = async (assets) => {
    const payload = {
      supplierId,
      notificationTitle: title.value,
      notificationMessage: description,
      attachmentUrl: assets,
      notificationType: getStatus(),
      scheduledDateTime: showScheduleDate
        ? `${format(new Date(scheduleDateTime.date), "MM-dd-yyyy")} ${
            scheduleDateTime.time.split(":")[0]
          }:00:00`
        : null,
      customerIds: selectedCustomers.map((ele) => ele.id),
      type: selectedCustomers.length === customerList.length ? "ALL" : "CUSTOM",
    };
    if (type === "edit") {
      payload.marketingToolNotificationId = notificationID;
    }
    const { data, err } = await sendMarketingToolNotification(payload);
    if (data) {
      toastify(data?.message, "success");
      getTableData(null, 0, "");
      setShowNotificationModal(false);
    }
    if (err) {
      toastify(err?.response?.data?.message);
    }
  };
  const formdata = new FormData();
  const getMediaURL = async () => {
    files.forEach((ele) => {
      formdata.append("file", ele);
    });
    formdata.append("supplierId", supplierId);
    const { data } = await getNotificationMediaURL(formdata);
    if (data) {
      // setNotificationMediaURL([...data]);
      sendNotification(data);
    }
  };

  const handleSubmit = () => {
    const flag = validateForm();
    if (!flag) {
      if (type === "add") {
        if (!showAttachment && showText) sendNotification([]);
        else getMediaURL();
      } else sendNotification([]);
    }
  };

  const getFileNames = () => {
    if (type === "add") {
      return files.map((ele, ind) => {
        return (
          <Typography key={ele.name} className="color-blue h-5 ms-2">
            {ele.name}
            <CloseOutlined
              className="h-5 mx-2 cursor-pointer"
              onClick={() => {
                const temp = [...files];
                temp.splice(ind, 1);
                setFiles(temp);
              }}
            />
          </Typography>
        );
      });
    }

    return fileNames.map((item, ind) => {
      return (
        <Typography key={item} className="color-blue h-5 ms-2">
          {item}
          {type === "add" ? (
            <CloseOutlined
              className="h-5 mx-2 cursor-pointer"
              onClick={() => {
                const temp = [...files];
                temp.splice(ind, 1);
                setFiles(temp);
              }}
            />
          ) : null}
        </Typography>
      );
    });
  };

  return (
    <ModalComponent
      ModalTitle="Notify"
      showFooter={false}
      open={showNotificationModal}
      ModalWidth={650}
      onCloseIconClick={() => {
        setShowNotificationModal(false);
        setShowScheduleDate(false);
      }}
    >
      <Box className="py-2">
        <Typography className="h-4 fw-bold border-bottom py-2 ps-1">
          Send To: SP4200020023
        </Typography>
        {/* <MultiSelectComponent
          disabled={type === "edit"}
          list={[...customerList]}
          fullWidth
          value={selectedCustomers}
          onSelectionChange={(e, val) => {
            setSelectedCustomers([...val]);
          }}
          label="Customers"
          error={error?.customerList?.length}
          helperText={error.customerList}
          inputlabelshrink
          placeholder="Customers"
          size="small"
        /> */}
      </Box>
      {/* <Divider variant="fullWidth" /> */}
      <Box className="my-1 py-2 border-bottom">
        <Box className="w-100">
          <CheckBoxComponent
            className="ms-2"
            isChecked
            label="Push Notification"
          />
        </Box>
      </Box>
      <Box className="d-flex justify-content-around">
        <RadiobuttonComponent
          disabled={type === "edit"}
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(true);
            setShowText(false);
            setFiles([]);
          }}
          label="Only Attachments"
          id="Only Attachments"
          isChecked={checkedRadioId === "Only Attachments"}
        />
        <RadiobuttonComponent
          disabled={type === "edit"}
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(false);
            setShowText(true);
            setFiles([]);
          }}
          label="Only Text"
          id="Only Text"
          isChecked={checkedRadioId === "Only Text"}
        />
        <RadiobuttonComponent
          disabled={type === "edit"}
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(true);
            setShowText(true);
            setFiles([]);
          }}
          label="Text With Attachments"
          id="Text With Attachments"
          isChecked={checkedRadioId === "Text With Attachments"}
        />
      </Box>
      {!showAttachment && showText ? (
        <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
          <TextEditor
            content={description}
            getContent={(val) => {
              setDescription(val);
            }}
          />
          {error.description ? (
            <FormHelperText error>{error.description}</FormHelperText>
          ) : null}
        </div>
      ) : null}
      {showAttachment && !showText ? (
        <div className="d-flex align-items-center my-2">
          <ButtonComponent
            disabled={type === "edit"}
            textColor={type === "edit" ? "text-secondary" : "color-orange"}
            borderColor={type === "edit" ? "bg-gray" : "border-orange"}
            onBtnClick={() => {
              fileRef.current.click();
            }}
            variant="outlined"
            label="Attach File"
            muiProps="ms-3 "
          />
          <div className="d-flex">{getFileNames()}</div>
        </div>
      ) : null}
      {showAttachment && showText ? (
        <div>
          <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
            <TextEditor
              content={description}
              getContent={(val) => setDescription(val)}
            />
            {error.description ? (
              <FormHelperText error>{error.description}</FormHelperText>
            ) : null}
          </div>
          <div className="d-flex">
            <ButtonComponent
              disabled={type === "edit"}
              textColor={type === "edit" ? "text-secondary" : "color-orange"}
              borderColor={type === "edit" ? "bg-gray" : "border-orange"}
              onBtnClick={() => {
                fileRef.current.click();
              }}
              variant="outlined"
              label="Attach File"
              muiProps="ms-3 mb-3"
            />
            <div className="d-flex align-items-center">{getFileNames()}</div>
          </div>
        </div>
      ) : null}
      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={(e) => {
          if (e.target.files?.length) {
            setFiles([...files, e.target.files[0]]);
          }
        }}
      />
      <Box
        className={
          showScheduleDate
            ? "d-flex justify-content-between align-items-center px-2"
            : "d-none"
        }
      >
        <Box className="w-90p">
          <DatePickerComponent
            size="small"
            fullWidth
            className="w-100"
            value={scheduleDateTime.date}
            error={error.scheduleDate}
            helperText={error.scheduleDate}
            onDateChange={(val) => {
              setScheduleDateTime((pre) => ({
                ...pre,
                date: val,
              }));
            }}
          />
        </Box>
        <Box>
          <input
            type="time"
            value={scheduleDateTime.time}
            placeholder="hh:mm"
            className={styles.timepicker}
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
            onChange={(e) => {
              setScheduleDateTime((pre) => ({
                ...pre,
                time: e.target.value,
              }));
            }}
            // value={startTime}
          />
        </Box>
      </Box>
      <Box className="d-flex justify-content-end my-2">
        <ButtonComponent
          variant="text"
          muiProps="text-secondary mx-2"
          label="Cancel"
        />
        <ButtonComponent label="Submit" />
      </Box>
    </ModalComponent>
  );
};
export default CreateNotification;
