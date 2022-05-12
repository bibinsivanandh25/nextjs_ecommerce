import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxComponent from "../CheckboxComponent";
import { Checkbox } from "@mui/material";

const MultiSelectComponent = ({
  list = [],
  size = "small",
  inputlabelshrink = false,
  variant = "contained",
  fullWidth = true,
  value = [],
  label = "abc",
  onSelectionChange = () => {},
}) => {
  //list
  // [
  //     { id: 3, title: "The Godfather: Part II", year: 1974 },
  // { id: 13, title: "Forrest Gump", year: 1994, checked: false },
  // ]
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
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
          InputLabelProps={{
            shrink: inputlabelshrink || value,
          }}
          fullWidth={fullWidth}
          error={false}
        />
      )}
      onChange={onSelectionChange}
    />
  );
};

export default MultiSelectComponent;
