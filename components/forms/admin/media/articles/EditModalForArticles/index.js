/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from "@mui/material";
import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import Image from "next/image";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import DropdownComponent from "@/atoms/DropdownComponent";

const EditModalForArticles = ({ openEditModal, setOpenEditModal }) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [image, setImage] = useState(null);

  const onImgeChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onClose = () => {
    setOpenEditModal(false);
    setArticleTitle("");
    setExternalLink("");
    setImage(null);
  };

  return (
    <Box>
      <ModalComponent
        open={openEditModal}
        ModalTitle="Edit Article"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Draft"
        saveBtnText="Publish"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={onClose}
        onSaveBtnClick={() => {
          // handleSaveBtnClickOfEditModal();
        }}
        onClearBtnClick={() => {
          // handleClearAll();
        }}
      >
        <Box className="d-flex my-4">
          <Box>
            {image === null ? (
              <label htmlFor="image-upload" className="d-block">
                <Box>
                  <Box
                    width={200}
                    height={200}
                    className="rounded d-flex justify-content-center align-items-center border cursor-pointer bg-light-gray"
                  >
                    <AddCircle className="color-gray" fontSize="large" />

                    <input
                      type="file"
                      id="image-upload"
                      accept="image/png, image/jpeg"
                      className="d-none"
                      onChange={onImgeChange}
                    />
                  </Box>
                  {/* {error.images ? (
                  <Typography className="fs-12 mt-1 text-danger">
                    Image Required
                  </Typography>
                ) : (
                  ""
                )} */}
                </Box>
              </label>
            ) : (
              <Box>
                <label htmlFor="image-upload" className="d-block">
                  <Image src={image} width={200} height={200} />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/png, image/jpeg"
                  className="d-none"
                  onChange={onImgeChange}
                />
              </Box>
            )}
          </Box>
          <Box className="pt-1 ms-4 w-50">
            <InputBox
              inputlabelshrink
              placeholder="eg. Simple Product"
              label="Article Title"
              className=""
              value={articleTitle}
              onInputChange={(e) => {
                setArticleTitle(e.target.value);
              }}
            />
            <Box className="mt-3">
              <DropdownComponent
                placeholder="eg. Simple Product"
                label="Category"
                size="small"
              />
            </Box>
            <InputBox
              inputlabelshrink
              label="External Link"
              className="mt-1"
              value={externalLink}
              onInputChange={(e) => {
                setExternalLink(e.target.value);
              }}
            />
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default EditModalForArticles;
