import { Box, Typography } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const NewArticleModal = ({
  openNewArticleModal,
  setOpenNewArticleModal,
  setOpenCreateExternalLinkModal,
  setOpenCreateArticleModal,
}) => {
  const onClickOfExternalLink = () => {
    setOpenNewArticleModal(false);
    setOpenCreateExternalLinkModal(true);
  };

  const onClickCreateArticles = () => {
    setOpenNewArticleModal(false);
    setOpenCreateArticleModal(true);
  };

  return (
    <Box>
      <ModalComponent
        open={openNewArticleModal}
        ModalTitle="New Article"
        titleClassName="fw-bold fs-14 color-orange"
        ModalWidth={650}
        onCloseIconClick={() => {
          setOpenNewArticleModal(false);
        }}
        showClearBtn={false}
        showSaveBtn={false}
      >
        <Box className="d-flex justify-content-around my-5">
          <Typography
            onClick={() => {
              onClickOfExternalLink();
            }}
            width={300}
            className="border cursor-pointer me-3 text-center px-4 py-3"
          >
            Add external article Link
          </Typography>
          <Typography
            onClick={() => {
              onClickCreateArticles();
            }}
            width={300}
            className="border cursor-pointer ms-3 text-center px-4 py-3"
          >
            Create Articles
          </Typography>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default NewArticleModal;
