import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { Paper } from "@mui/material";
import { useRef } from "react";

const HelpandsupportView = ({ selectedData }) => {
  const inputField = useRef();

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
        {getContent("Date & Time", selectedData.lastUpdateDateAndTime)}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.subject)}
        {getContent("Status", selectedData.status, getClassName())}
      </div>
      <div className="my-2 border-bottom">
        <div className="px-4 py-2">
          <TextEditor />
        </div>
        <div className="my-2 px-4">
          <span className="me-2">Attach File :</span>
          <input
            type="file"
            className=""
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
        </div>
      </div>
    </Paper>
  );
};
export default HelpandsupportView;
