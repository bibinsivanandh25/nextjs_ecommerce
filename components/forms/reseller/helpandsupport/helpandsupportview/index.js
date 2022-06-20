/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Grid, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import validateMessage from "constants/validateMessages";
import { useRef, useState } from "react";

const HelpandsupportView = ({ selectedData }) => {
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

  const getContent = (label, value, className) => {
    return (
      <p className="mx-3 my-2">
        <span>{label}</span> :{" "}
        <span className={`fw-bold ${className}`}>{value}</span>
      </p>
    );
  };

  const getClassName = () => {
    if (selectedData.status.toLowerCase() === "open") return "text-success";
    if (selectedData.status.toLowerCase() === "pending") return "text-warning";
    if (selectedData.status.toLowerCase() === "rejected") return "text-danger";
  };

  return (
    <Paper className="mnh-80vh">
      <p className="fs-16 fw-bold p-3 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom px-4 py-1">
        {getContent("Date & Time", selectedData.dateAndTime)}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.subject)}
        {getContent("Status", selectedData.status, getClassName())}
      </div>
      <div className="my-2 border-bottom">
        <div className="px-4 py-2">
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
        </div>

        <Grid
          container
          className="my-2 px-4"
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
          <Grid item className="d-flex justify-content-end me-5">
            <ButtonComponent
              label="Send Reply"
              onBtnClick={handleCreateBtnClick}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default HelpandsupportView;
