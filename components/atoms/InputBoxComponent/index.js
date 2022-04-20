import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
      InputProps={{
        endAdornment: (
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
      }}
    />
  );
};
export default InputBox;
