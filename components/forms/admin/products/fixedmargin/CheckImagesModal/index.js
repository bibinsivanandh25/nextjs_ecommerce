import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import CustomIcon from "services/iconUtils";
import ModalComponent from "@/atoms/ModalComponent";

const CheckImagesModal = ({
  openImagesArrayModal = false,
  setOpenImagesArrayModal = () => {},
  imageIndexForImageModal = 0,
  setImageIndexForImageModal = () => {},
  images,
}) => {
  // console.log("Product details", productDetails);

  return (
    <div>
      <ModalComponent
        open={openImagesArrayModal}
        showHeader={false}
        showFooter={false}
      >
        <Box className="position-absolute end-0">
          <CustomIcon
            onIconClick={() => {
              setOpenImagesArrayModal(false);
            }}
            type="close"
          />
        </Box>
        <Box className="d-flex justify-content-center align-items-center">
          <Box
            sx={{
              position: "absolute",
              left: "-50px",
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
            <Image
              src={images[imageIndexForImageModal]}
              width={400}
              height={400}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              right: "-50px",
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
      </ModalComponent>
    </div>
  );
};

export default CheckImagesModal;
