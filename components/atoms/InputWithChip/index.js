import { Autocomplete, Chip, TextField } from "@mui/material";

const InputFieldWithChip = ({
  label = "",
  placeholder = "",
  className = "",
  variant = "outlined",
  inputlabelshrink = "",
  id = "",
  name = "",
  fullWidth = true,
  handleChange = () => {},
}) => {
  return (
    <div className="App">
      <Autocomplete
        multiple
        id="tags-filled"
        options={[]}
        freeSolo
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
            variant={variant}
            label={label}
            placeholder={placeholder}
            className={className}
            InputLabelProps={{
              shrink: inputlabelshrink || "",
            }}
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFieldWithChip;

//handleChange(event,dataArray)
