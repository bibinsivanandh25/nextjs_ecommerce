/* eslint-disable consistent-return */
import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import validateMessage from "constants/validateMessages";
import { ArrowBack } from "@mui/icons-material";

const HelpandsupportView = ({ selectedData, setShowView }) => {
  const inputField = useRef();
  const [formValue, setFormValue] = useState("");
  const [error, setError] = useState("");

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
    <Paper className="mnh-80vh">
      <Box className="d-flex align-items-center">
        <Typography
          className="color-orange cursor-pointer fw-bold"
          onClick={() =>
            setShowView({
              show: false,
              id: null,
            })
          }
        >
          <ArrowBack />
        </Typography>
        <Typography className="m-1 color-orange fw-bold">Back</Typography>
      </Box>
      <p className="fs-16 fw-bold p-3 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom px-4 py-1">
        {getContent("Date & Time", selectedData.lastUpdateDateAndTime)}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.subject)}
        {getContent("Status", selectedData.status, getClassName())}
      </div>
      <div className="my-2 border-bottom">
        <div className="px-4 pt-2">
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
        </div>
        <Grid
          container
          className="my-3 px-4"
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
                label="Choose File"
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
