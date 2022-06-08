import { Autocomplete, Chip, TextField } from "@mui/material";

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
}) => {
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
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFieldWithChip;

