import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import TextEditor from "components/atoms/TextEditor";
import { useRef, useState } from "react";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";
import validateMessage from "constants/validateMessages";

const ResellerNotificationCreate = () => {
  const inputField = useRef();
  const [notificationData, setNotificationData] = useState({});
  const [editorContent, setEditorContent] = useState(null);
  const [type, setType] = useState("referral");
  const [error, setError] = useState({});

  const validateForm = () => {
    const errObj = { ...error };
    if (!notificationData.subject) {
      errObj.subject = validateMessage.field_required;
    } else {
      errObj.subject = null;
    }
    if (type !== "referral") {
      if (!notificationData.content) {
        errObj.content = validateMessage.field_required;
      } else if (!/^.{1,1000}$/.test(notificationData.content)) {
        errObj.content = validateMessage.field_required;
      } else {
        errObj.content = null;
      }
    } else if (!editorContent) {
      errObj.content = validateMessage.field_required;
    } else if (!/^.{1,1000}$/.test(editorContent)) {
      errObj.content = validateMessage.field_required;
    } else {
      errObj.content = null;
    }
    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleBtnClick = () => {
    if (validateForm()) {
      // console.log(notificationData);
    }
  };

  return (
    <>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        className="border-bottom"
      >
        <Grid item sx={{ px: 2 }} xs={2}>
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            Notification
          </Typography>
        </Grid>
        <Grid
          item
          className="d-flex justify-content-center w-75 px-2 fs-16 fw-600 align-items-center"
          xs={6}
        >
          <span>
            To Whom:
            <RadiobuttonComponent
              label="Referral"
              className="ms-2"
              isChecked={type === "referral"}
              onRadioChange={() => setType("referral")}
            />
            <RadiobuttonComponent
              label="Referre"
              isChecked={type === "referre"}
              onRadioChange={() => setType("referre")}
            />
            <RadiobuttonComponent
              label="Customer"
              isChecked={type === "customer"}
              onRadioChange={() => setType("customer")}
            />
          </span>
        </Grid>
        <Grid item className="d-flex justify-content-end w-100" xs={4}>
          <div className="w-100">
            {type !== "referral" && (
              <MultiSelectComponent label="Search" inputlabelshrink={false} />
            )}
          </div>
        </Grid>
      </Grid>
      <div className="my-2 px-5">
        <div className="my-2">
          <span className="fw-600 d-flex align-items-center">
            Subject:{" "}
            <InputBox
              className="w-75 ms-3 my-3"
              onInputChange={(e) =>
                setNotificationData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              error={Boolean(error.subject)}
              helperText={error.subject}
            />
          </span>
        </div>
        {type === "customer" ? (
          <>
            <TextEditor
              widthClassName="w-100"
              getContent={(val) => setEditorContent(val)}
            />
            <div>
              {error.content && (
                <p className="error" id="textbox-helper-text">
                  {error.content}
                </p>
              )}
            </div>
          </>
        ) : (
          <InputBox
            isMultiline
            rows={8}
            onInputChange={(e) =>
              setNotificationData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            error={Boolean(error.content)}
            helperText={error.content}
          />
        )}
        <Grid
          container
          className="my-2"
          item
          xs={12}
          justifyContent="space-between"
        >
          <Grid item>
            {type === "customer" && (
              <>
                <span className="me-2 fw-600">Attach File :</span>
                <input
                  type="file"
                  hidden
                  ref={inputField}
                  onChange={() => {}}
                />
                <ButtonComponent
                  label="choose file"
                  color="#e8e8e8"
                  onBtnClick={() => {
                    inputField.current.click();
                  }}
                />
              </>
            )}
          </Grid>
          <Grid
            item
            className={`d-flex justify-content-end ${
              type === "customer" && `mt-4`
            }`}
          >
            <ButtonComponent
              label="Create Notification"
              onBtnClick={handleBtnClick}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default ResellerNotificationCreate;
