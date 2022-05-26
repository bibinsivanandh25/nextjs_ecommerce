import { ArrowBack, ArrowBackIos, ArrowLeft } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CustomDatePickerComponent from "components/atoms/CustomDatePickerComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TextEditor from "components/atoms/TextEditor";

const CreateDiscount = ({ setShowCreateDiscount = () => {} }) => {
  return (
    <div>
      <span
        className="h-5 color-orange cursor-pointer"
        onClick={() => {
          setShowCreateDiscount(false);
        }}
      >
        {"< "}Back
      </span>
      <Grid container spacing={1} alignItems="center">
        <Grid item sm={2}>
          <SimpleDropdownComponent size="small" label="Margin type" />
        </Grid>
        <Grid item sm={5}>
          <SimpleDropdownComponent size="small" />
        </Grid>
        <Grid item sm={2}>
          <InputBox size="small" placeholder="Enter Discount %" />
        </Grid>
        <Grid
          item
          sm={3}
          className="d-flex align-items-between align-items-center"
        >
          <div>
            <ButtonComponent
              muiProps="me-1 fs-12 py-2 "
              label="Create"
              size="medium"
            />
          </div>
          <div>
            <ButtonComponent
              muiProps="py-2 fs-12"
              size="medium"
              label="View Discount Product"
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      <Typography className="text-danger h-5 fw-bold my-2">
        Discount starts from 5% to 30%
      </Typography>
      <div className="d-flex w-75 justify-content-between mt-2">
        <div className="d-flex align-items-center h-5">
          start date:
          <input
            type="date"
            value={"2021-12-01"}
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          End Date:
          <input
            type="date"
            value={"2021-12-01"}
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          Start time:
          <input
            type="time"
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
        <div className="d-flex align-items-center h-5">
          End time:
          <input
            type="time"
            style={{
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          />
        </div>
      </div>
      <div className="w-25 my-3">
        <InputBox placeholder="Enter the campaign title" />
      </div>
      <div className="mt-2">
        <TextEditor />
      </div>
    </div>
  );
};
export default CreateDiscount;
