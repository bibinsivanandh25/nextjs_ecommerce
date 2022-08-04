import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxComponent from "../CheckboxComponent";

const MultiSelectComponent = ({
  list = [],
  size = "small",
  inputlabelshrink = false,
  fullWidth = true,
  value = [],
  label = "abc",
  onSelectionChange = () => {},
  id = "tags-outlined",
  disabled = false,
  helperText = "",
  error = false,
  freeSolo = false,
}) => {
  return (
    <Autocomplete
      multiple
      freeSolo={freeSolo}
      disabled={disabled}
      id={id}
      options={list}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      value={value}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      renderOption={(props, option, obj) => (
        <div className="d-flex" {...props}>
          <CheckBoxComponent isChecked={obj.selected} />
          {option.title}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          // endAdornment={{ display: "none" }}
          label={label}
          size={size}
          helperText={helperText}
          error={error}
          InputLabelProps={{
            shrink: inputlabelshrink || value,
          }}
          fullWidth={fullWidth}
        />
      )}
      onChange={(e, val) => {
        onSelectionChange(e, val, id);
      }}
    />
  );
};

export default MultiSelectComponent;
