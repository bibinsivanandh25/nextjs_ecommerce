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
import Edit from "@mui/icons-material/Edit";
import { FileCopy, MoreVert } from "@mui/icons-material";
import { useState } from "react";

const CustomIcon = ({
  title = "",
  onIconClick = () => {},
  type = "",
  color = "text-secondary",
  className = "",
  size = "",
  placement = "",
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
  };

  const [hover, setHover] = useState(false);

  const getIcon = () => {
    let Component = Map[type];
    return (
      <Component
        className={`${color} ${className} ${
          hover && showColorOnHover && "color-orange"
        }`}
        size={size}
        {...muiProps}
      />
    );
    // if (type === "view" || type === "visibility")
    //   return (
    //     <Component
    //       Name="VisibilityIcon"
    //       className={`${color} ${className}`}
    //       size={size}
    //     />
    //   );
    // if (type === "arrowforward")
    //   return (
    //     <ArrowForwardIosIcon
    //       className={`${color} ${className} fs-12`}
    //       size={size}
    //     />
    //   );
    // if (type === "download")
    //   return <DownloadIcon className={`${color} ${className}`} size={size} />;
    // if (type === "home")
    //   return <HomeIcon className={`${color} ${className}`} size={size} />;
    // if (type === "search")
    //   return <SearchIcon className={`${color} ${className}`} size={size} />;
    // if (type === "add")
    //   return <AddIcon className={`${color} ${className}`} size={size} />;
    // if (type === "filter")
    //   return <FilterListIcon className={`${color} ${className}`} size={size} />;
    // if (type === "delete")
    //   return <DeleteIcon className={`${color} ${className}`} size={size} />;
    // if (type === "upload")
    //   return <FileUploadIcon className={`${color} ${className}`} size={size} />;
    // if (type === "download")
    //   return (
    //     <FileDownloadIcon className={`${color} ${className}`} size={size} />
    //   );
    // if (type === "share")
    //   return <ShareIcon className={`${color} ${className}`} size={size} />;
    // if (type === "edit")
    //   return <Edit className={`${color} ${className}`} size={size} />;
    // if (type === "remove")
    //   return (
    //     <RemoveRedEyeIcon className={`${color} ${className}`} size={size} />
    //   );
    // if (type === "more")
    //   return <MoreVert className={`${color} ${className}`} size={size} />;
  };

  return (
    // <Tooltip title={title} placement={placement}>
    <span title={title} data-bs-toggle="tooltip" data-bs-placement="top">
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
    </span>
    // </Tooltip>
  );
};

export default CustomIcon;
