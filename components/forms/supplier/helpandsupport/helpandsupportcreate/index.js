import { Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useState } from "react";

const HelpandsupportCreate = ({ setShowCreateComponent = () => {} }) => {
  // const inputField = useRef();

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
  // const route = useRouter();
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
                onBtnClick={validateFields}
              />
            </Grid>
          </Grid>
        </div>
        <FileUploadModal
          getUploadedFiles={() => {}}
          showModal={showUploadModal}
          setShowModal={setShowUploadModal}
        />
      </Paper>
    </>
  );
};
export default HelpandsupportCreate;
