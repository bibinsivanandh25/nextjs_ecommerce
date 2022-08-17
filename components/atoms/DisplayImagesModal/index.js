import { Box, Modal } from "@mui/material";
import Image from "next/image";
import React from "react";
import CustomIcon from "services/iconUtils";

const DisplayImagesModal = ({
  openImagesArrayModal = false,
  setOpenImagesArrayModal = () => {},
  imageIndexForImageModal = 0,
  setImageIndexForImageModal = () => {},
  images,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    p: 4,
    height: "60%",
  };

  return (
    <div>
      <Modal
        open={openImagesArrayModal}
        onClose={() => {
          setOpenImagesArrayModal(false);
        }}
      >
        <Box sx={style}>
          <Box
            sx={{ top: -12, right: -10, zIndex: 1000 }}
            className="position-absolute"
          >
            <CustomIcon
              onIconClick={() => {
                setOpenImagesArrayModal(false);
              }}
              type="close"
              color="text-white"
            />
          </Box>
          <Box className="d-flex justify-content-center align-items-center">
            <Box
              sx={{
                position: "absolute",
                left: "-50px",
                top: "41%",
              }}
              className={` rounded-circle p-2 ${
                imageIndexForImageModal === 0 ? "bg-gray" : "bg-white"
              }`}
              onClick={() => {
                if (imageIndexForImageModal > 0) {
                  setImageIndexForImageModal((index) => {
                    const theIndex = index - 1;
                    return theIndex;
                  });
                }
              }}
            >
              <CustomIcon showColorOnHover={false} type="arrowBackIosNewIcon" />
            </Box>
            {openImagesArrayModal && (
              <Image src={images[imageIndexForImageModal]} layout="fill" />
            )}
            <Box
              sx={{
                position: "absolute",
                right: "-50px",
                top: "41%",
              }}
              className={` rounded-circle p-2 ${
                images.length - 1 === imageIndexForImageModal
                  ? "bg-gray"
                  : "bg-white"
              }`}
              onClick={() => {
                if (imageIndexForImageModal < images.length - 1) {
                  const nextIndex = imageIndexForImageModal + 1;
                  setImageIndexForImageModal(nextIndex);
                }
              }}
            >
              <CustomIcon showColorOnHover={false} type="arrowforward" />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DisplayImagesModal;
