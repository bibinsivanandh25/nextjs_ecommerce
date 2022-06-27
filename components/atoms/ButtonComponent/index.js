import { Button } from "@mui/material";
import CustomIcon from "services/iconUtils";

const ButtonComponent = ({
  label = "Button",
  variant = "contained",
  onBtnClick = () => {},
  size = "small",
  muiProps = "",
  showIcon = false,
  iconColorClass = "",
  iconSize = "20",
  iconName = "",
  iconOrintation = "start",
  borderColor = "border-orange",
  textColor = "color-orange",
  bgColor = "bg-orange",
  fullWidth = false,
}) => {
  const getIcon = () => {
    return (
      <CustomIcon type={iconName} className={iconColorClass} size={iconSize} />
    );
  };
  return (
    <Button
      variant={variant}
      onClick={onBtnClick}
      size={size}
      className={`${
        // eslint-disable-next-line no-nested-ternary
        variant === "contained"
          ? bgColor
          : variant === "outlined"
          ? `${borderColor} ${textColor}`
          : ""
      } ${muiProps}`}
      sx={{
        textTransform: "none",
      }}
      startIcon={(showIcon && iconOrintation) === "start" ? getIcon() : <></>}
      endIcon={(showIcon && iconOrintation) === "end" ? getIcon() : <></>}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
