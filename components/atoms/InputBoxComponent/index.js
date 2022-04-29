import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
}) => {
  const getIcons = () => {
    if (iconName === "visible") {
      return <Visibility />;
    } else if (iconName === "visibleOff") {
      return <VisibilityOff />;
    } else {
      return null;
    }
  };
  return (
    <TextField
      onChange={onInputChange}
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
    />
  );
};
export default InputBox;
