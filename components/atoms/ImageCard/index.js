import { Box, Card, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRef } from "react";

const ImageCard = ({
  height = 100,
  width = 100,
  handleCloseClick = () => {},
  imgSrc = "",
  showClose = true,
  handleImageUpload = () => {},
  showCursorPointer = false,
  className = "",
  imageRef = null,
  onLoad = () => {},
  preventChooseFile = false,
  handleCardClick = () => {},
  id = "",
  elevation = 4,
}) => {
  const inputRef = useRef(null);
  return (
    <div className={`mt-2 mb-2 d-flex position-relative ${className}`}>
      {showClose && (
        <div
          className="bg-light-gray cursor-pointer rounded-circle fit-content float-right px-1"
          style={{
            position: "absolute",
            top: "-10px",
            left: `${width - 25}px`,
          }}
        >
          <CloseIcon fontSize="15px" onClick={handleCloseClick} />
        </div>
      )}
      <Card
        id={id}
        elevation={elevation}
        sx={{ width: `${width}px`, height: `${height}px` }}
        className="p-0 d-flex align-items-center justify-content-center "
        onClick={() => {
          if (imgSrc === "" && !preventChooseFile) inputRef.current.click();
          else handleCardClick(id);
        }}
      >
        {imgSrc !== "" ? (
          <CardMedia
            ref={imageRef}
            component="img"
            height={`${height}px`}
            width={`${width}px`}
            image={imgSrc}
            alt=""
            className={showCursorPointer ? "cursor-pointer" : ""}
            onLoad={onLoad}
            sx={{
              objectFit: "fill",
            }}
          />
        ) : (
          <Box className="rounded-circle p-1 bg-gray ">
            <input
              type="file"
              className="d-none"
              ref={inputRef}
              accept="image/*"
              onChange={handleImageUpload}
            />
            <AddOutlinedIcon className="color-light-gray cursor-pointer" />
          </Box>
        )}
      </Card>
    </div>
  );
};
export default ImageCard;
