import { createTheme, TextField, ThemeProvider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const InputBox = ({
  id = "textbox",
  name = "textbox",
  placeholder = "",
  inputlabelshrink = false,
  value = "",
  label = "",
  className = "",
  size = "small",
  onInputChange = () => {},
  iconName = "",
  onIconClick = () => {},
  variant = "outlined",
  InputProps = {},
  onKeyDown = () => {},
  inputRef = null,
  type = "text",
  isMultiline = false,
  rows = 3,
  fullWidth = true,
  disabled = false,
  error = false,
  helperText = "",
  required = false,
  textInputProps = {},
  showAutoCompleteOff = true,
}) => {
  const getIcons = () => {
    if (iconName === "visible") {
      return <Visibility />;
    }
    if (iconName === "visibleOff") {
      return <VisibilityOff />;
    }
    if (iconName === "arrowDown") {
      return <KeyboardArrowDownIcon />;
    }
    if (iconName === "arrowUp") {
      return <KeyboardArrowUpIcon />;
    }
    return null;
  };

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
    <ThemeProvider theme={theme}>
      <TextField
        onChange={onInputChange}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        value={value}
        size={size}
        className={className}
        InputLabelProps={{
          shrink: inputlabelshrink || value,
        }}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        variant={variant}
        type={type}
        id={id}
        name={name}
        multiline={isMultiline}
        rows={rows}
        fullWidth={fullWidth}
        InputProps={{
          endAdornment: iconName !== "" && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  onIconClick();
                }}
              >
                {getIcons()}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        helperText={helperText}
        error={error}
        autoComplete={!showAutoCompleteOff && "off"}
        inputProps={textInputProps}
        required={required}
      />
    </ThemeProvider>
  );
};
export default InputBox;
