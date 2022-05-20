import { Upload } from "@mui/icons-material";
import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import DropdownComponent from "components/atoms/DropdownComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { Fragment, useRef, useState } from "react";
import toastify from "services/utils/toastUtils";

const HelpandsupportCreate = () => {
  const inputField = useRef();

  const issueTypes = [
    {
      label: "Order",
      value: "Order",
    },
    {
      label: "Return and Refund",
      value: "Return and Refund",
    },
    {
      label: "Logistic",
      value: "Logistic",
    },
    {
      label: "Cancellation and Refund",
      value: "Cancellation and Refund",
    },
    {
      label: "Profile",
      value: "Profile",
    },
    {
      label: "Payment Settlement",
      value: "Payment Settlement",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formValue, setFormValue] = useState({
    issueType: {},
    OrderID: "",
    subject: "",
    content: "",
  });
  const [errorObj, setErrorObj] = useState({
    issueType: "",
    subject: "",
    content: "",
  });
  const validateFields = () => {
    let flag = false;
    let errObj = {
      issueType: "",
      subject: "",
      content: "",
    };
    console.log(formValue.issueType);
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
      toastify("Content cannot be empty", "error");

      flag = true;
    }
    if (formValue.content.replace(/<[^>]*>/g, "").length > 255) {
      errObj.content = validateMessage.alpha_numeric_max_255;
      toastify(validateMessage.alpha_numeric_max_255, "error");
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  return (
    <div className="w-100">
      <p className="fs-16 fw-bold pb-2 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">
          (Any issues Please rise to us here)
        </span>
      </p>
      <div className="my-3">
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
      <div className="my-2 ">
        <div className="">
          <TextEditor
            getContent={(text) => {
              setFormValue((pre) => ({
                ...pre,
                content: text,
              }));
            }}
          />
        </div>
        <div className="my-3 ">
          <span className="me-2">Attach File :</span>
          {/* <input
            type="file"
            className=""
            hidden
            ref={inputField}
            onChange={(e) => console.log(e.target.files[0])}
          /> */}
          <ButtonComponent
            label="choose file"
            color="#e8e8e8"
            onBtnClick={() => {
              // inputField.current.click();
              setShowUploadModal(true);
            }}
          />
        </div>
        <div className="d-flex flex-row-reverse">
          <ButtonComponent label="Create Ticket" onBtnClick={validateFields} />
        </div>
      </div>
      <FileUploadModal
        getUploadedFiles={(files) => {
          console.log(files);
        }}
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
      />
    </div>
  );
};
export default HelpandsupportCreate;
