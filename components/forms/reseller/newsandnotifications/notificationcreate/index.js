import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import TextEditor from "components/atoms/TextEditor";
import { useRef, useState } from "react";
import MultiSelectComponent from "components/atoms/MultiSelectComponent";

const ResellerNotificationCreate = () => {
  const inputField = useRef();
  const [editorContent, setEditorContent] = useState(null);
  const [type, setType] = useState("referral");

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
            Subject: <InputBox className="w-75 ms-3 my-3" />
          </span>
        </div>
        {type === "customer" ? (
          <TextEditor
            widthClassName="w-100"
            getContent={(val) => setEditorContent(val)}
          />
        ) : (
          <InputBox isMultiline rows={8} />
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
                  onChange={(e) => console.log(e.target.files[0])}
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
          <Grid item className="d-flex justify-content-end">
            <ButtonComponent
              label="Create Notification"
              onBtnClick={() => {}}
            />
          </Grid>
        </Grid>
      </div>
      <div
        className="ms-4"
        dangerouslySetInnerHTML={{
          __html: editorContent,
        }}
      />
    </>
  );
};
export default ResellerNotificationCreate;
