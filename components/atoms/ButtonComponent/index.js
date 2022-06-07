import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";

const ButtonComponent = ({
  label = "Button",
  variant = "contained",
  onBtnClick = () => {},
  size = "small",
  muiProps = "",
  color = "primary",
  showIcon = false,
  iconColorClass = "",
  iconSize = "20",
  iconName = "",
  iconOrintation = "start",
  borderColor = "border-orange",
  textColor = "color-orange",
  bgColor = "bg-orange",
}) => {
  const getIcon = () => {
    if (iconName === "search") {
      return <SearchIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "add") {
      return <AddIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "filter") {
      return <FilterListIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "delete") {
      return <DeleteIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "upload") {
      return <FileUploadIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "download") {
      return <FileDownloadIcon className={iconColorClass} size={iconSize} />;
    } else if (iconName === "share") {
      return <ShareIcon className={iconColorClass} size={iconSize} />;
    }
  };
  return (
    <Button
      variant={variant}
      onClick={onBtnClick}
      size={size}
      className={`${
        variant === "contained"
          ? bgColor
          : variant === "outlined"
          ? `${borderColor} ${textColor}`
          : ""
      } ${muiProps}`}
      sx={{
        textTransform: "none",
      }}
      startIcon={showIcon && iconOrintation === "start" ? getIcon() : <></>}
      endIcon={showIcon && iconOrintation === "end" ? getIcon() : <></>}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
