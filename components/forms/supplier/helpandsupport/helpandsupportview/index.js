/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { Grid, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import validateMessage from "constants/validateMessages";
import {
  helpandsupportFileUpload,
  replyHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";
import { Close } from "@mui/icons-material";

const HelpandsupportView = ({
  selectedData,
  setShowModal = () => {},
  user = {},
  getAllData = () => {},
  selectTab = {},
}) => {
  const inputField = useRef();
  const [formValue, setFormValue] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  const getContent = (label, value, className) => {
    return (
      <p className="mx-3 my-2">
        <span>{label}</span> :{" "}
        <span className={`fw-bold ${className}`}>{value}</span>
      </p>
    );
  };

  const getClassName = () => {
    if (selectedData.ticketStatus.toLowerCase() === "open")
      return "text-success";
    if (selectedData.ticketStatus.toLowerCase() === "pending")
      return "text-warning";
    if (selectedData.ticketStatus.toLowerCase() === "rejected")
      return "text-danger";
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
  const handleFileUpload = async () => {
    if (selectedFile.length) {
      const fileFormData = new FormData();
      fileFormData.set("data", {});
      selectedFile.forEach((item) => {
        fileFormData.append("imageList", item);
      });
      fileFormData.append(
        "ticketCreatedByType",
        selectTab == "tab1" ? "ADMIN" : "CUSTOMER"
      );
      fileFormData.append(
        "ticketCreatedById",
        selectTab == "tab1" ? "ADM001" : ""
      );
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

  const handleCreateBtnClick = async () => {
    if (!validateForm()) {
      const { datas } = await handleFileUpload();
      const media = [];
      datas?.forEach((item) => {
        media.push({
          mediaUrl: item,
        });
      });

      const payload = {
        ticketId: selectedData.ticketId,
        messageFromId: user.supplierId,
        messageFromType: "SUPPLIER",
        message: formValue,
        imageUrlList: media || [],
      };
      const { data, err } = await replyHelpandSupport(payload);
      if (data) {
        getAllData("", null, 0);
        setShowModal(false);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  const handleFileDelete = (index) => {
    const temp = [...selectedFile];
    temp.splice(index, 1);
    setSelectedFile([...temp]);
  };
  return (
    <Paper className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
      <Typography
        className="h-5 color-orange cursor-pointer ms-2 mt-1"
        onClick={() => {
          setShowModal({ show: false, id: null });
        }}
      >
        {"<"} Back
      </Typography>
      <p className="fs-16 fw-bold p-3 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom px-4 py-1">
        {getContent(
          "Date & Time",
          new Date(selectedData.lastModifiedDate).toLocaleString()
        )}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.issueSubject)}
        {getContent("Status", selectedData.ticketStatus, getClassName())}
        <p className="mx-3 my-2 d-flex">
          <span>Reply</span> :{" "}
          <div
            className="fw-bold"
            dangerouslySetInnerHTML={{
              __html: selectedData.helpSupportMessages[0].message,
            }}
          />
        </p>
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
                onChange={(e) =>
                  setSelectedFile((prev) => [...prev, e.target.files[0]])
                }
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
        {selectedFile &&
          selectedFile.map((item, index) => (
            <Typography className="h-5 ms-5">
              {item.name}
              <Close
                onClick={() => {
                  handleFileDelete(index);
                }}
                className="h-5 color-orange cursor-pointer ms-1"
              />
            </Typography>
          ))}
      </div>
    </Paper>
  );
};
export default HelpandsupportView;
