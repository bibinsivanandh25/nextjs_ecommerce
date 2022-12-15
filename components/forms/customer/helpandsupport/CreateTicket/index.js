import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  helpandsupportFileUpload,
  saveHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";

const HelpandsupportCreate = ({
  setShowCreateComponent = () => {},
  getTabledata = () => {},
}) => {
  // const inputField = useRef();

  const issueTypes = [
    {
      label: "ORDER RELATED ISSUE",
      value: "ORDER_RELATED_ISSUE",
    },
    {
      label: "RETURN AND REFUND",
      value: "RETURN_AND_REFUND",
    },
    {
      label: "LOGISTICS RELATED ISSUE",
      value: "LOGISTICS_RELATED_ISSUE",
    },
    {
      label: "CANCELLATION AND REFUND",
      value: "CANCELLATION_AND_REFUND",
    },
    {
      label: "PROFILE RELATED ISSUE",
      value: "PROFILE_RELATED_ISSUE",
    },
    {
      label: "PAYMENT SETTLEMENT ISSUE",
      value: "PAYMENT_SETTLEMENT_ISSUE",
    },
    {
      label: "OTHERS",
      value: "OTHERS",
    },
  ];
  // const route = useRouter();
  const user = useSelector((state) => state.customer);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userToType, setuserToType] = useState("SUPPLIER");
  const [formValue, setFormValue] = useState({
    issueType: {},
    OrderID: "",
    subject: "",
    content: "",
  });
  const [contentFile, setContentFile] = useState([]);

  const [errorObj, setErrorObj] = useState({
    issueType: "",
    subject: "",
    content: "",
    OrderID: "",
  });
  const validateFields = () => {
    let flag = false;
    const errObj = {
      issueType: "",
      subject: "",
      content: "",
    };
    if (!formValue.issueType?.value?.length) {
      errObj.issueType = validateMessage.field_required;
      flag = true;
    }
    if (!formValue.subject) {
      errObj.subject = validateMessage.field_required;
      flag = true;
    }
    if (formValue.subject.length > 50) {
      errObj.subject = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    if (
      formValue.issueType?.label === "ORDER RELATED ISSUE" &&
      !formValue.OrderID?.length
    ) {
      errObj.OrderID = validateMessage.field_required;
      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length === 0) {
      errObj.content = validateMessage.field_required;
      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length > 255) {
      errObj.content = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    setErrorObj({ ...errObj });
    if (!flag) {
      // route.push("/supplier/helpandsupport");
      setShowCreateComponent(false);
    }
    return flag;
  };
  const handleFileUpload = async () => {
    if (contentFile?.length) {
      const fileFormData = new FormData();
      fileFormData.set("data", {});
      contentFile?.forEach((item) => {
        fileFormData.append("imageList", item);
      });
      fileFormData.append("ticketCreatedByType", "CUSTOMER");
      const { data, err } = await helpandsupportFileUpload(fileFormData);
      if (data) {
        const datas = data;
        return datas;
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
    return [];
  };
  const handleCreateClick = async () => {
    if (!validateFields()) {
      const datas = await handleFileUpload();
      const payload = {
        issueType: formValue.issueType.value,
        orderId: formValue.OrderID,
        issueSubject: formValue.subject,
        userFromType: "CUSTOMER",
        userFromId: user.userId,
        userToType,
        userToId: userToType === "SUPPLIER" ? user.supplierId : null,
        mediaUrl: datas || [],
        helpSupportMessagePojos: [
          {
            messageFromId: user.userId,
            messageFromType: "CUSTOMER",
            message: formValue.content,
          },
        ],
      };

      const { message, data, err } = await saveHelpandSupport(payload);
      if (data) {
        toastify(message, "success");
        setShowCreateComponent(false);
        getTabledata(0, null, "");
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  return (
    <Paper className="w-100 mnh-80vh">
      {/* <Box className="d-flex align-items-center">
        <Typography
          className="color-orange cursor-pointer fw-bold"
          onClick={() => setShowCreateComponent(false)}
        >
          <ArrowBack />
        </Typography>
        <Typography className="m-1 color-orange fw-bold">Back</Typography>
      </Box> */}
      <Box
        className="d-inline-block cursor-pointer d-flex ms-4 align-items-center"
        onClick={() => setShowCreateComponent(false)}
      >
        <Typography className="color-orange cursor-pointer fw-bold">
          <ArrowBack className="h-4" />
        </Typography>
        <Typography className="color-orange cursor-pointer fw-bold">
          Back
        </Typography>
      </Box>
      <p className="fs-16 fw-bold pb-2 border-bottom py-3 px-4">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">
          (Any issues Please raise to us here)
        </span>
      </p>
      <div className="my-3 px-5">
        <Grid container rowSpacing={1} alignItems="center">
          <Grid container item display="flex" alignItems="center">
            <Grid item xs={1} justifyContent="end" className="fw-bold">
              Issue type
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={10}>
              <SimpleDropdownComponent
                size="small"
                value={formValue.issueType}
                helperText={errorObj.issueType}
                error={errorObj.issueType.length}
                list={[...issueTypes]}
                onDropdownSelect={(value) => {
                  // setSelectedIssue({ ...value });
                  setFormValue((pre) => ({
                    ...pre,
                    issueType: { ...value },
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            display="flex"
            alignItems="center"
            className={
              formValue.issueType?.label !== "ORDER RELATED ISSUE"
                ? "d-none"
                : ""
            }
          >
            <Grid item xs={1} justifyContent="end" className="fw-bold">
              Order Id
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={10}>
              <InputBox
                className="w-100"
                size="small"
                value={formValue.OrderID}
                helperText={errorObj?.OrderID}
                error={errorObj?.OrderID?.length}
                onInputChange={(e) => {
                  setFormValue((pre) => ({
                    ...pre,
                    OrderID: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            display="flex"
            alignItems="center"
            className="d-flex align-items-center"
          >
            <Grid item xs={1} justifyContent="end" className="fw-bold">
              Subject
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={10}>
              <InputBox
                helperText={errorObj.subject}
                error={errorObj.subject.length}
                className="w-100"
                size="small"
                value={formValue.subject}
                onInputChange={(e) => {
                  setFormValue((pre) => ({
                    ...pre,
                    subject: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Grid container item display="flex" alignItems="center">
            <Grid item xs={1} justifyContent="end" className="fw-bold">
              Issue To
            </Grid>

            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={10}>
              <RadiobuttonComponent
                label="Supplier"
                onRadioChange={() => {
                  setuserToType("SUPPLIER");
                }}
                isChecked={userToType === "SUPPLIER"}
              />
              <RadiobuttonComponent
                label="Multistore"
                onRadioChange={() => {
                  setuserToType("ADMIN");
                }}
                isChecked={userToType === "ADMIN"}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="my-2 ps-5">
        <div className="">
          <TextEditor
            getContent={(text) => {
              setFormValue((pre) => ({
                ...pre,
                content: text,
              }));
            }}
          />
          {errorObj.content && (
            <p className="error" id="textbox-helper-text">
              {errorObj.content}
            </p>
          )}
        </div>
        <Grid container className="my-3">
          <Grid item xs={6}>
            <span className="me-2 fw-bold">Attach File :</span>
            <ButtonComponent
              label="Choose File"
              color="#e8e8e8"
              onBtnClick={() => {
                // inputField.current.click();
                setShowUploadModal(true);
              }}
            />
          </Grid>

          <Grid item xs={6} className="d-flex flex-row-reverse pe-5">
            <ButtonComponent
              label="Create Ticket"
              onBtnClick={handleCreateClick}
            />
          </Grid>
        </Grid>
      </div>
      <FileUploadModal
        getUploadedFiles={(value) => {
          setContentFile(value?.multiPart);
        }}
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
      />
    </Paper>
  );
};
export default HelpandsupportCreate;
