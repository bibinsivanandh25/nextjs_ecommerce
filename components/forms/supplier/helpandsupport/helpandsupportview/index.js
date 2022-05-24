import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { useRef } from "react";

const HelpandsupportView = () => {
  const inputField = useRef();
  return (
    <>
      <p className="fs-16 fw-bold pb-2 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom ">
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
        <TextEditor />
        <div className="my-2 ">
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
    </>
  );
};
export default HelpandsupportView;
