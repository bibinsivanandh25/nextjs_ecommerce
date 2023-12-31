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
  showAutoCompleteOff = "on",
  labelColorWhite = null,
  onFocus = () => {},
  onEnter = () => {},
  onBlur = () => {},
  readOnly = false,
  showAutoFill = "off",
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
          asterisk: { color: "#dd5e5e", fontWeight: 700, fontSize: 22 },
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
          sx: labelColorWhite,
        }}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
        variant={variant}
        type={type}
        id={id}
        name={name}
        multiline={isMultiline}
        rows={rows}
        fullWidth={fullWidth}
        onFocus={onFocus}
        onBlur={onBlur}
        InputProps={{
          endAdornment: iconName !== "" && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  onIconClick();
                }}
                aria-label="icon"
              >
                {getIcons()}
              </IconButton>
            </InputAdornment>
          ),
          readOnly,
          ...InputProps,
        }}
        helperText={helperText}
        error={error}
        autoComplete={showAutoCompleteOff}
        // inputProps={textInputProps}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...textInputProps,
          autoComplete: showAutoFill,
          form: {
            autoComplete: showAutoFill,
          },
        }}
        required={required}
      />
    </ThemeProvider>
  );
};
export default InputBox;
