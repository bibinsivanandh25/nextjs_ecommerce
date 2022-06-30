import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import { useRef, useState } from "react";

const ResellerNotificationView = ({ notificationDetails }) => {
  const inputField = useRef();
  const [editorContent, setEditorContent] = useState(null);
  return (
    <>
      <p className="fs-16 fw-bold pb-2 border-bottom">
        <span>Notification</span>
        <span className="fs-12 fw-normal text-secondary mx-4">
          (View & Reply)
        </span>
      </p>
      <div className="fs-12 border-bottom p-2">
        <p className="mx-3">
          {" "}
          <span> Date & time</span> :{" "}
          <span className="fw-bold"> {notificationDetails.dateandtime}</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Notification Id</span> :{" "}
          <span className="fw-bold"> {notificationDetails.notificationId}</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Subject</span> :{" "}
          <span className="fw-bold"> {notificationDetails.subject}</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Status</span> :{" "}
          <span className="fw-bold text-success">
            {" "}
            {notificationDetails.status}
          </span>
        </p>
      </div>
      <div className="my-2 border-bottom">
        {notificationDetails.type !== "referee" ? (
          <TextEditor
            widthClassName="w-100"
            getContent={(val) => setEditorContent(val)}
          />
        ) : (
          <InputBox isMultiline />
        )}
        <Grid
          container
          className="my-2"
          item
          xs={12}
          justifyContent="space-between"
        >
          <Grid item>
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
          </Grid>
          <Grid item className="d-flex justify-content-end">
            <ButtonComponent label="Send Reply" onBtnClick={() => {}} />
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
export default ResellerNotificationView;
