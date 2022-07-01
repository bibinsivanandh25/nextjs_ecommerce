/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useState } from "react";
import toastify from "services/utils/toastUtils";

const HelpandsupportCreate = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [type, setType] = useState("customer");
  const [formValue, setFormValue] = useState({
    issueType: {},
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
    const errObj = {
      subject: "",
      content: "",
    };
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
          (Any issues Please raise to us here)
        </span>
      </p>
      <div className="my-3">
        <Grid container className="d-flex align-items-center">
          <Grid item lg={1} xs={4} className="fw-bold">
            Subject :
          </Grid>
          <Grid item lg={8} xs={12}>
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
      <div className="my-2">
        <div className="">
          {type === "customer" ? (
            <TextEditor
              getContent={(text) => {
                setFormValue((pre) => ({
                  ...pre,
                  content: text,
                }));
              }}
            />
          ) : (
            <InputBox
              isMultiline
              value={formValue.content}
              onInputChange={(text) => {
                setFormValue((pre) => ({
                  ...pre,
                  content: text,
                }));
              }}
              rows={6}
            />
          )}
        </div>
        <div className="my-3 ">
          <span className="me-2 fw-bold">Attach File :</span>
          <ButtonComponent
            label="choose file"
            color="#e8e8e8"
            onBtnClick={() => {
              setShowUploadModal(true);
            }}
          />
        </div>
        <div className="d-flex flex-row-reverse">
          <ButtonComponent label="Create Ticket" onBtnClick={validateFields} />
        </div>
      </div>
      <FileUploadModal
        getUploadedFiles={(files) => {}}
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
      />
    </div>
  );
};
export default HelpandsupportCreate;
