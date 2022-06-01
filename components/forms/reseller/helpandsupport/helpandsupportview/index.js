import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useRef, useState } from "react";

const HelpandsupportView = () => {
  const [type, setType] = useState("customer");
  const [formValue, setFormValue] = useState("");
  const [error, setError] = useState("");
  const inputField = useRef();

  const validateForm = () => {
    if (formValue.replace(/<[^>]*>/g, "").length === 0) {
      setError(validateMessage.field_required);
    } else if (formValue.replace(/<[^>]*>/g, "").length > 1000) {
      setError(validateMessage.alpha_numeric_max_1000);
    } else {
      setError(null);
    }
    return Boolean(error);
  };

  const handleCreateBtnClick = () => {
    if (validateForm()) {
      console.log(formValue);
    }
  };

  return (
    <>
      <p className="fs-16 fw-bold pb-2 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom p-2">
        <p className="mx-3">
          {" "}
          <span> Date & time</span> :{" "}
          <span className="fw-bold"> 25-06-2021, 12:12am</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Ticket Id</span> : <span className="fw-bold"> #1233434</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Subject</span> :{" "}
          <span className="fw-bold"> Request for refund has not apporoved</span>
        </p>
        <p className="mx-3">
          {" "}
          <span> Status</span> :{" "}
          <span className="fw-bold text-success"> Open</span>
        </p>
      </div>
      <div className="my-2 border-bottom">
        {type === "customer" ? (
          <>
            <TextEditor
              getContent={(text) => {
                setFormValue(text);
              }}
            />
            {error && (
              <p className="error" id="textbox-helper-text">
                {error}
              </p>
            )}
          </>
        ) : (
          <InputBox
            isMultiline
            value={formValue}
            onInputChange={(e) => {
              setFormValue(e.target.value);
            }}
            type="text"
            rows={6}
            error={Boolean(error)}
            helperText={error}
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
          </Grid>
          <Grid item className="d-flex justify-content-end">
            <ButtonComponent
              label="Send Reply"
              onBtnClick={handleCreateBtnClick}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default HelpandsupportView;
