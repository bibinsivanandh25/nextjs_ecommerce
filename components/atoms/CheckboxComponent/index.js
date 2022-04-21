import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { FormControlLabel } from "@mui/material";

const CheckBoxComponent = ({
  label = "",
  isChecked = false,
  isDisabled = false,
  indeterminate = false,
  checkBoxClick = () => {},
  size = "small",
  varient = "normal", //filled or normal
}) => {
  return (
    <div>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            label={label}
            checked={isChecked}
            icon={
              varient === "filled" ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )
            }
            checkedIcon={<CheckBoxIcon />}
            sx={{
              "&.Mui-checked": {
                color: "#e56700",
              },
            }}
            disabled={isDisabled}
            indeterminate={indeterminate}
            onChange={(e) => {
              checkBoxClick(e.target.checked);
            }}
            size={size}
          />
        }
      />
    </div>
  );
};

export default CheckBoxComponent;
