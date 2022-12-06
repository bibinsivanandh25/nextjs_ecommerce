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
import { TbMessageCircle2 } from "react-icons/tb";
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { RiShareForwardFill } from "react-icons/ri";
import DoneIcon from "@mui/icons-material/Done";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SendIcon from "@mui/icons-material/Send";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MessageIcon from "@mui/icons-material/Message";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LockIcon from "@mui/icons-material/Lock";
import BlockIcon from "@mui/icons-material/Block";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    send: SendIcon,
    sendMessage: TbMessageCircle2,
    dot: FiberManualRecordIcon,
    flag: FlagIcon,
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
    lock: LockIcon,
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
    keyboardBackspaceIcon: KeyboardBackspaceIcon,
    riShareForwardFill: RiShareForwardFill,
    doneIcon: DoneIcon,
    viewInArIcon: ViewInArIcon,
    arrowBackIcon: ArrowBackIcon,
    whatsAppIcon: WhatsAppIcon,
    trendingDownOutlinedIcon: TrendingDownOutlinedIcon,
    trendingUpOutlinedIcon: TrendingUpOutlinedIcon,
    arrowBackIosNewIcon: ArrowBackIosNewIcon,
    notificationsIcon: NotificationsIcon,
    confirmationNumberOutlinedIcon: ConfirmationNumberOutlinedIcon,
    flagIcon: FlagIcon,
    addNote: NoteAddIcon,
    arrowUpward: ArrowUpwardIcon,
    expandMore: ExpandMoreIcon,
    arrowDropIcon: ArrowDropDownIcon,
    calendar: CalendarMonthIcon,
    message: MessageIcon,
    block: BlockIcon,
    heart: FavoriteIcon,
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
