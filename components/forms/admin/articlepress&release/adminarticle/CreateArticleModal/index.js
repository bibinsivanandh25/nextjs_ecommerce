/* eslint-disable jsx-a11y/label-has-associated-control */
import { AddCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import InputBox from "@/atoms/InputBoxComponent";
import TextEditor from "@/atoms/TextEditor";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";

let errObj = {
  articleTitle: false,
  externalLink: false,
  image: false,
  longDescription: false,
  shortDescription: false,
  category: false,
};

const CreateArticleModal = ({
  openCreateArticleModal,
  setOpenCreateArticleModal,
}) => {
  const [image, setImage] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [shortDescription, setShortDescription] = useState(null);
  const [longDescription, setLongDescription] = useState(null);
  const [category, setCategory] = useState("");
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
      image: false,
      longDescription: false,
      shortDescription: false,
      categoryList: false,
    };
    if (articleTitle === "") {
      errObj.articleTitle = true;
    }
    if (externalLink === "") {
      errObj.externalLink = true;
    }
    if (image === null) {
      errObj.image = true;
    }
    if (longDescription === null) {
      errObj.longDescription = true;
    }
    if (shortDescription === null) {
      errObj.shortDescription = true;
    }
    if (category === "") {
      errObj.category = true;
    }
    return errObj;
  };

  const onClose = () => {
    errObj = {
      articleTitle: false,
      externalLink: false,
      image: false,
      longDescription: false,
      shortDescription: false,
      category: false,
    };
    setError(errObj);
    setOpenCreateArticleModal(false);
    setArticleTitle("");
    setExternalLink("");
    setCategory("");
    setShortDescription(null);
    setLongDescription(null);
    setImage(null);
  };

  const handleSaveBtnClick = () => {
    const theErrObj = handleError();
    setError(theErrObj);
  };

  return (
    <Box>
      <ModalComponent
        open={openCreateArticleModal}
        ModalTitle="New Article"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Draft"
        saveBtnText="Publish"
        saveBtnClassName="ms-1"
        ModalWidth={890}
        onCloseIconClick={() => {
          onClose();
        }}
        onSaveBtnClick={() => {
          handleSaveBtnClick();
        }}
        onClearBtnClick={() => {
          // handleClearAll();
        }}
      >
        <Box className="d-flex my-5">
          <Box>
            {image === null ? (
              <label htmlFor="image-upload" className="d-block">
                <Box>
                  <Box
                    width={130}
                    height={130}
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
          <Box className="ms-3">
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
                list={categoryList}
                onDropdownSelect={(value) => {
                  setCategory(value);
                }}
                helperText={
                  error.category ? validateMessage.field_required : ""
                }
                inputlabelshrink
              />
            </Box>
            <Box className="mt-3">
              <SimpleDropdownComponent
                placeholder="eg. Simple Product"
                label="Applicable For"
                size="small"
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
          <Box className="ms-3">
            <Box className="border border-2 p-3 rounded position-relative">
              <Typography
                sx={{ bottom: "95%" }}
                className="fs-14 position-absolute bg-white fw-bold text-secondary"
              >
                Short Description
              </Typography>
              <TextEditor
                getContent={(content) => {
                  // console.log(content);
                  setShortDescription(content);
                }}
                content={shortDescription}
                className="w-100"
              />
              <Typography className="h-5">
                {error.shortDescription ? (
                  <span className="text-danger">
                    {validateMessage.field_required}
                  </span>
                ) : (
                  ""
                )}
              </Typography>
            </Box>
            <Box className="border border-2 p-3 rounded mt-4 position-relative">
              <Typography
                sx={{ bottom: "95%" }}
                className="fs-14 position-absolute bg-white fw-bold text-secondary"
              >
                Long Description
              </Typography>
              <TextEditor
                content={longDescription}
                getContent={(content) => {
                  setLongDescription(content);
                }}
                className="w-100"
              />
              <Typography className="h-5">
                {error.longDescription ? (
                  <span className="text-danger">
                    {validateMessage.field_required}
                  </span>
                ) : (
                  ""
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default CreateArticleModal;
