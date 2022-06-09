/* eslint-disable no-shadow */
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const InputFieldWithChip = ({
  label = "",
  placeholder = "",
  className = "",
  variant = "outlined",
  inputlabelshrink = false,
  id = "",
  name = "",
  fullWidth = true,
  size = "small",
  helperText = "",
  error = false,
  handleChange = () => {},
  value = [],
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    setText("");
  }, [value]);

  return (
    <div className="App">
      <Autocomplete
        multiple
        id="tags-filled"
        options={[]}
        freeSolo
        value={value}
        inputValue={text}
        onInputChange={(e) => {
          setText(e.target.value);
        }}
        size={size}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            InputLabelProps={{
              shrink: inputlabelshrink,
            }}
            {...params}
            id={id}
            name={name}
            helperText={helperText}
            error={error}
            variant={variant}
            label={label}
            placeholder={placeholder}
            className={className}
            // onBlur={(e) => {
            //   if (e.target.value !== "") {
            //     handleChange("", [...value, e.target.value]);
            //   }
            // }}
          />
        )}
        onBlur={(e) => {
          if (e.target.value !== "") {
            console.log(e.target.value, "ppp");
            handleChange("", [...value, e.target.value]);
            setText("");
          }
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFieldWithChip;
