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
import { FileCopy, MoreVert, Reply } from "@mui/icons-material";
import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import BalanceIcon from "@mui/icons-material/Balance";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import Remove from "@mui/icons-material/Remove";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomIcon = ({
  title = "",
  onIconClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
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
    gridview: GridViewIcon,
    tablerows: TableRowsIcon,
    reply: Reply,
    lineArrowIcon: ArrowForwardIcon,
    favoriteBorderIcon: FavoriteBorderIcon,
    viewCarouselIcon: ViewCarouselIcon,
    viewCarouselOutlinedIcon: ViewCarouselOutlinedIcon,
    localMallIcon: LocalMallOutlinedIcon,
    balanceIcon: BalanceIcon,
    visibilityOutlinedIcon: VisibilityOutlinedIcon,
    airportShuttleOutlinedIcon: AirportShuttleOutlinedIcon,
    removeIcon: Remove,
    checkCircleIcon: CheckCircleIcon,
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
          onMouseEnter();
        }}
        onMouseLeave={() => {
          setHover(false);
          onMouseLeave();
        }}
        sx={{ p: 0 }}
      >
        {getIcon() || <></>}
      </IconButton>
    </Tooltip>
  );
};

export default CustomIcon;
