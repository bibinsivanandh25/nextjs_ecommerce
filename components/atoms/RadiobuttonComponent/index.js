import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function RadiobuttonComponent({
  label = "",
  value = null,
  onRadioChange = () => {},
  id = null,
  isChecked = false,
  muiProps = {},
  disabled = false,
  className = "",
}) {
  return (
    <FormControlLabel
      value={value}
      label={label}
      disabled={disabled}
      className={className}
      control={
        <Radio
          onClick={onRadioChange}
          id={id}
          checked={isChecked}
          sx={{
            color: "gray",
            "&.Mui-checked": {
              color: "#e56700",
            },
          }}
          {...muiProps}
        />
      }
    />
  );
}
