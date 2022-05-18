import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";

const InputFieldWithChip = ({
  label = "",
  placeholder = "",
  className = "",
  variant = "outlined",
  inputlabelshrink = "",
  id = "",
  name = "",
  fullWidth = true,
  size = "small",
  helperText = "",
  error = false,
  handleChange = () => {},
}) => {
  const [InputValue, setInputValue] = useState("");
  return (
    <div className="App">
      <Autocomplete
        multiple
        id="tags-filled"
        options={[]}
        freeSolo
        size={size}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            {...params}
            id={id}
            name={name}
            helperText={helperText}
            error={error}
            variant={variant}
            label={label}
            placeholder={placeholder}
            className={className}
            InputLabelProps={{
              shrink: InputValue,
            }}
          />
        )}
        onChange={handleChange}
        onInputChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default InputFieldWithChip;

//handleChange(event,dataArray)
