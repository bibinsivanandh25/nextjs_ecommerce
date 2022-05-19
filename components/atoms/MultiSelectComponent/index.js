import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxComponent from "../CheckboxComponent";
import { Checkbox } from "@mui/material";

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
}) => {
  //list
  // [
  //     { id: 3, title: "The Godfather: Part II", year: 1974 },
  // { id: 13, title: "Forrest Gump", year: 1994, checked: false },
  // ]
  return (
    <Autocomplete
      multiple
      disabled={disabled}
      id={id}
      options={list}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, obj) => (
        <div className="d-flex" {...props}>
          <CheckBoxComponent isChecked={obj.selected} />
          {option.title}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
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
