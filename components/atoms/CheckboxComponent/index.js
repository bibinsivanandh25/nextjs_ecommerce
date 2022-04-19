import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const CheckBoxComponent = ({
  label = "",
  isDefaultChecked = false,
  isDisabled = false,
  indeterminate = false,
  checkBoxClick = () => {},
  size = "small",
  varient = "normal", //filled or normal
}) => {
  return (
    <div>
      <Checkbox
        label={label}
        defaultChecked={isDefaultChecked}
        icon={
          varient === "filled" ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
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
    </div>
  );
};

export default CheckBoxComponent;
