/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

let errObj = {
  articleTitle: false,
  externalLink: false,
  category: false,
  image: false,
};

const CreateArticleExternalLinkModal = ({
  openCreateExternalLinkModal,
  setOpenCreateExternalLinkModal,
}) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(errObj);

  const categoryList = [{ label: "Category One" }, { label: "Category Two" }];

  const onImgeChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleError = () => {
    errObj = {
      articleTitle: false,
      externalLink: false,
      category: false,
      image: false,
    };
    if (articleTitle === "") {
      errObj.articleTitle = true;
    }
    if (externalLink === "") {
      errObj.externalLink = true;
    }
    if (category === "") {
      errObj.category = true;
    }
    if (image === null) {
      errObj.image = true;
    }
    return errObj;
  };

  const handleSaveBtnClick = () => {
    const theErrObj = handleError();
    setError(theErrObj);
  };

  const onClose = () => {
    errObj = {
      articleTitle: false,
      externalLink: false,
      category: false,
      image: false,
    };
    setOpenCreateExternalLinkModal(false);
    setArticleTitle("");
    setExternalLink("");
    setCategory("");
    setImage(null);
    setError(errObj);
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateExternalLinkModal}
        ModalTitle="Edit Article"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Draft"
        saveBtnText="Publish"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={onClose}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
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
                  {error.image ? (
                    <Typography className="fs-12 mt-1 text-danger">
                      Image Required
                    </Typography>
                  ) : (
                    ""
                  )}
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
              error={error.articleTitle}
              helperText={
                error.articleTitle ? validateMessage.field_required : ""
              }
            />
            <Box className="mt-3">
              <SimpleDropdownComponent
                placeholder="eg. Simple Product"
                label="Category"
                size="small"
                onDropdownSelect={(value) => {
                  setCategory(value);
                }}
                list={categoryList}
                helperText={
                  error.category ? validateMessage.field_required : ""
                }
                className="mb-3"
                inputlabelshrink
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
              error={error.externalLink}
              helperText={
                error.externalLink ? validateMessage.field_required : ""
              }
            />
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default CreateArticleExternalLinkModal;
