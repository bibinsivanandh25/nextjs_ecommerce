/* eslint-disable no-shadow */
import {
  Autocomplete,
  Chip,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
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
  required,
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    setText("");
  }, [value]);
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red", fontWeight: 700, fontSize: 22 },
        },
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          value={value}
          disableClearable
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
              {...params}
              InputLabelProps={{
                shrink: inputlabelshrink,
              }}
              id={id}
              name={name}
              helperText={helperText}
              error={Boolean(error)}
              variant={variant}
              label={label}
              placeholder={placeholder}
              className={className}
              // onBlur={(e) => {
              //   if (e.target.value !== "") {
              //     handleChange("", [...value, e.target.value]);
              //   }
              // }}
              required={required}
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
      </ThemeProvider>
    </div>
  );
};

export default InputFieldWithChip;
