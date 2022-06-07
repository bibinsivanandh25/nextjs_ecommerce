import { Box, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
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
  className = "",
}) => {
  const inputRef = useRef(null);
  return (
    <div className={`mt-2 mb-2 d-flex position-relative ${className}`}>
      {showClose && (
        <div
          className="bg-light-gray rounded-circle fit-content float-right px-1"
          style={{
            position: "absolute",
            top: "-10px",
            left: `${width - 15}px`,
          }}
        >
          <CloseIcon fontSize="15px" onClick={handleCloseClick} />
        </div>
      )}
      <Card
        sx={{ width: `${width}px`, height: `${height}px` }}
        className="p-0 d-flex align-items-center justify-content-center "
      >
        {imgSrc !== "" ? (
          <CardMedia
            component="img"
            height={`${height}px`}
            width={`${width}px`}
            image={imgSrc}
            alt=""
          />
        ) : (
          <Box className="rounded-circle p-1 bg-gray ">
            <input
              type={"file"}
              className="d-none"
              ref={inputRef}
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e);
              }}
            />
            <AddOutlinedIcon
              className="color-light-gray cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            />
          </Box>
        )}
      </Card>
    </div>
  );
};
export default ImageCard;
