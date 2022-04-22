import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputBox = ({
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
      defaultValue={value}
      size={size}
      className={className}
      InputLabelProps={{
        shrink: { inputlabelshrink },
      }}
      inputRef={inputRef}
      onKeyDown={onKeyDown}
      variant={variant}
      type={type}
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
