import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";

const CheckBoxComponent = ({
  label = "",
  isDefaultChecked = false,
  isDisabled = false,
  indeterminate = false,
  checkBoxClick = () => {},
  size = "small",
}) => {
  return (
    <div>
      <Checkbox
        label={label}
        defaultChecked={isDefaultChecked}
        icon={<CheckBoxIcon />}
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
