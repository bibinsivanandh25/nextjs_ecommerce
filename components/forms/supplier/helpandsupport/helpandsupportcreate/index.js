import { Grid } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import DropdownComponent from "components/atoms/DropdownComponent";
import InputBox from "components/atoms/InputBoxComponent";
import TextEditor from "components/atoms/TextEditor";
import { Fragment, useRef } from "react";

const HelpandsupportCreate = () => {
  const inputField = useRef();

  return (
    <div className="w-100">
      <p className="fs-16 fw-bold pb-2 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">
          (Any issues Please rise to us here)
        </span>
      </p>
      <div className="mb-3">
        <Grid container className="d-flex align-items-center">
          <Grid item xs={2} className="fw-bold">
            Issue type :
          </Grid>
          <Grid item xs={8}>
            <DropdownComponent size="small" />
          </Grid>
        </Grid>
        <Grid container className="d-flex align-items-center my-4">
          <Grid item xs={2} className="fw-bold">
            Enter Order Id :
          </Grid>
          <Grid item xs={8}>
            <InputBox className="w-100" size="small" />
          </Grid>
        </Grid>
        <Grid container className="d-flex align-items-center">
          <Grid item xs={2} className="fw-bold">
            Subject :
          </Grid>
          <Grid item xs={8}>
            <InputBox className="w-100" size="small" />
          </Grid>
        </Grid>
      </div>
      <div className="my-2 ">
        <div className="">
          <TextEditor />
        </div>
        <div className="my-3 ">
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
        <div className="d-flex flex-row-reverse">
          <ButtonComponent label="Create Ticket" />
        </div>
      </div>
    </div>
  );
};
export default HelpandsupportCreate;
