import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useEffect, useState } from "react";
import {
  helpandsupportFileUpload,
  saveHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";

const HelpandsupportCreate = ({
  setShowCreateComponent = () => {},
  selectTab = {},
  user = {},
  getAllData = () => {},
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formValue, setFormValue] = useState({
    issueType: {},
    OrderID: "",
    subject: "",
    content: "",
  });
  const [contentFile, setContentFile] = useState({});
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
      OrderID: "",
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
    if (formValue.content.replace(/<[^>]*>/g, "").length === 0) {
      errObj.content = validateMessage.field_required;
      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length > 255) {
      errObj.content = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (!formValue.OrderID) {
      errObj.OrderID = validateMessage.field_required;
      flag = true;
    }

    setErrorObj({ ...errObj });
    // if (!flag) {
    //   // route.push("/supplier/helpandsupport");
    //   setShowCreateComponent(false);
    // }

    return flag;
  };
  const [ticketDetails, setTicketDetails] = useState({
    id: "",
    type: "",
  });
  useEffect(() => {
    if (selectTab == "tab1") {
      setTicketDetails({
        id: "ADM001",
        type: "ADMIN",
      });
    }
    if (selectTab === "tab2") {
      setTicketDetails({
        id: "1234",
        type: "CUSTOMER",
      });
    }
  }, [selectTab]);
  const handleFileUpload = async () => {
    if (contentFile?.multiPart?.length) {
      const fileFormData = new FormData();
      fileFormData.set("data", {});
      contentFile?.multiPart?.forEach((item) => {
        fileFormData.append("imageList", item);
      });
      fileFormData.append("ticketCreatedByType", ticketDetails.type);
      const { data, err } = await helpandsupportFileUpload(fileFormData);
      if (data) {
        const datas = data;
        return { datas };
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
    return [];
  };
  const handleCreateClick = async () => {
    if (!validateFields()) {
      const { datas } = await handleFileUpload();

      const payload = {
        issueType: formValue.issueType.value,
        orderId: formValue.OrderID,
        issueSubject: formValue.subject,
        userFromType: "SUPPLIER",
        userFromId: user.supplierId,
        userToType: "ADMIN",
        userToId: "ADM001",
        mediaUrl: datas || [],
        helpSupportMessagePojos: [
          {
            messageFromId: user.supplierId,
            messageFromType: "SUPPLIER",
            message: formValue.content,
          },
        ],
      };
      const { data, err } = await saveHelpandSupport(payload);
      if (data) {
        getAllData("", null, 0);
        setShowCreateComponent(false);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  return (
    <>
      <Paper className="w-100 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
        <Typography
          onClick={() => {
            setShowCreateComponent(false);
          }}
          className="fw-bold mb-2 fs-14 ms-3 cursor-pointer color-orange py-1"
        >
          {"<"}Back
        </Typography>
        <p className="fs-16 fw-bold pb-2 border-bottom py-3 px-4">
          Help & support{" "}
          <span className="fs-12 fw-normal text-secondary">
            (Any Issues Please Raise To Us Here)
          </span>
        </p>
        <div className="my-3 px-5">
          <Grid container className="d-flex align-items-center">
            <Grid item xs={2} className="fw-bold">
              Issue type :
            </Grid>
            <Grid item xs={8}>
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
          <Grid container className="d-flex align-items-center my-3">
            <Grid item xs={2} className="fw-bold">
              Order Id :
            </Grid>
            <Grid item xs={8}>
              <InputBox
                className="w-100"
                size="small"
                value={formValue.OrderID}
                onInputChange={(e) => {
                  setFormValue((pre) => ({
                    ...pre,
                    OrderID: e.target.value,
                  }));
                }}
                error={errorObj.OrderID !== ""}
                helperText={errorObj.OrderID}
              />
            </Grid>
          </Grid>
          <Grid container className="d-flex align-items-center">
            <Grid item xs={2} className="fw-bold">
              Subject :
            </Grid>
            <Grid item xs={8}>
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
        </div>
        <div className="my-2 ps-5">
          <Grid container className="">
            <Grid item lg={12} md={11.5} sm={10}>
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
            </Grid>
          </Grid>
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
            {/* <input
            type="file"
            className=""
            hidden
            ref={inputField}
            onChange={(e) => console.log(e.target.files[0])}
          /> */}
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
            setContentFile(value);
          }}
          showModal={showUploadModal}
          setShowModal={setShowUploadModal}
          type=""
        />
      </Paper>
    </>
  );
};
export default HelpandsupportCreate;
