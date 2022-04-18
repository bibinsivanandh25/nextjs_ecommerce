import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { orange } from "@mui/material/colors";

export default function RadiobuttonComponent(props) {
  const {
    label = "",
    value = null,
    onRadioChange = () => {},
    id = null,
    isChecked = false,
    muiProps = {},
    disabled = false,
  } = props;

  return (
    <FormControlLabel
      value={value}
      label={label}
      disabled={disabled}
      control={
        <Radio
          onClick={onRadioChange}
          id={id}
          checked={isChecked}
          sx={{
            color: 'gray',
            "&.Mui-checked": {
              color: orange[600],
            },
          }}
          {...muiProps}
        />
      }
    />
  );
}
