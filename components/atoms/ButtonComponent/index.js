import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonComponent = ({
  label = "Button",
  variant = "contained",
  onBtnClick = () => {},
  size = "small",
  muiProps = "",
  color = "primary",
  showIcon = false,
  iconColor = "#fff",
  iconSize = "20",
  iconName = "",
  iconOrintation = "start",
}) => {
  const getIcon = () => {
    if (iconName === "search") {
      return <SearchIcon color={iconColor} size={iconSize} />;
    } else if (iconName === "add") {
      return <AddIcon color={iconColor} size={iconSize} />;
    } else if (iconName === "filter") {
      return <FilterListIcon color={iconColor} size={iconSize} />;
    } else if (iconName === "delete") {
      return <DeleteIcon color={iconColor} size={iconSize} />;
    }
  };
  return (
    <Button
      variant={variant}
      onClick={onBtnClick}
      size={size}
      className={`${
        variant === "contained"
          ? "bg-orange"
          : variant === "outlined"
          ? "border-orange color-orange"
          : ""
      } ${muiProps}`}
      startIcon={showIcon && iconOrintation === "start" ? getIcon() : <></>}
      endIcon={showIcon && iconOrintation === "end" ? getIcon() : <></>}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
