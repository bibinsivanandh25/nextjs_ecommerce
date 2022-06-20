import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import { FileCopy, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomIcon = ({
  title = "",
  onIconClick = () => {},
  type = "",
  color = "text-secondary",
  className = "",
  size = "",
  placement = "top",
  muiProps = {},
  showColorOnHover = true,
}) => {
  const Map = {
    view: VisibilityIcon,
    arrowforward: ArrowForwardIosIcon,
    download: DownloadIcon,
    home: HomeIcon,
    search: SearchIcon,
    add: AddIcon,
    filter: FilterListIcon,
    delete: DeleteIcon,
    upload: FileUploadIcon,
    fileDownload: FileDownloadIcon,
    share: ShareIcon,
    edit: Edit,
    remove: RemoveRedEyeIcon,
    more: MoreVert,
    filecopy: FileCopy,
    notification: NotificationsNoneOutlinedIcon,
    close: CloseIcon,
    lineArrowIcon: ArrowForwardIcon,
  };

  const [hover, setHover] = useState(false);

  const getIcon = () => {
    const Component = Map[type];
    return (
      <Component
        className={`${color} ${className} ${
          hover && showColorOnHover && "color-orange"
        }`}
        size={size}
        {...muiProps}
      />
    );
  };

  return (
    <Tooltip title={title} placement={placement}>
      <IconButton
        disableFocusRipple
        disableRipple
        onClick={onIconClick}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        sx={{ p: 0 }}
      >
        {getIcon() || <></>}
      </IconButton>
    </Tooltip>
  );
};

export default CustomIcon;
