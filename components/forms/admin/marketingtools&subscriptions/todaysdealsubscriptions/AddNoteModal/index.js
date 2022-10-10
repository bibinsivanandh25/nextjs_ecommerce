/* eslint-disable no-shadow */
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import { useSelector } from "react-redux";
import {
  addANoteApi,
  convertFileToLink,
} from "services/admin/marketingtools/subscriptions";
import toastify from "services/utils/toastUtils";

let errObj = {
  addANote: false,
};

const AddNoteModal = ({
  openAddNoteModal,
  setOpenAddNoteModal,
  subsTypeId,
}) => {
  const [addANote, setAddANote] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [errorFe, setErrorFe] = useState(errObj);
  const [sendFile, setSendFile] = useState("");
  const handleError = () => {
    let theError = false;
    errObj = {
      addANote: false,
    };
    if (addANote === "") {
      errObj.addANote = true;
      theError = true;
    }
    return [theError, errObj];
  };

  const adminIde = useSelector((state) => state.user.userId);

  const addNote = async (payload) => {
    const { data, error, message } = await addANoteApi(payload);
    if (error) {
      console.log(error, "--- error");
      if (message) {
        toastify(message, "error");
      } else if (error?.response?.data?.message) {
        toastify(error?.response?.data?.message, "error");
      }
    } else if (data) {
      console.log(data);
      toastify(message, "success");
    }
  };

  const handleSubmit = async () => {
    const [theError, err] = handleError();
    // console.log(theError);
    if (!theError) {
      if (fileInput) {
        const formData = new FormData();
        formData.set("data", {});
        formData.append("file", sendFile);
        formData.append("toolCommentType", "purchase_history");
        formData.append("adminId", adminIde);
        const { data, error, message } = await convertFileToLink(formData);
        if (error) {
          if (message) {
            toastify(message, "error");
          } else if (error.response.data.message) {
            toastify(error.response.data.message, "error");
          }
        } else if (data) {
          console.log("data ", data);
          const payload = {
            type: "PURCHASE_HISTORY",
            typeId: subsTypeId,
            comments: addANote,
            commentsAttachment: data,
          };
          addNote(payload);
        }
      } else {
        const payload = {
          type: "PURCHASE_HISTORY",
          typeId: subsTypeId,
          comments: addANote,
          commentsAttachment: "",
        };
        addNote(payload);
      }
    }
    setErrorFe(err);
  };

  const handleCloseIconClick = () => {
    errObj = {
      addANote: false,
    };
    setAddANote("");
    setFileInput("");
    setOpenAddNoteModal(false);
    setErrorFe(errObj);
  };

  const onInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result.split(":")[1];
        setFileInput(data);
        setSendFile(event.target.files[0]);
        // const theImagesArray = [...imageArray];
        // theImagesArray.push(e.target.result);
        // setImageArray([...theImagesArray]);
        // setProductDetails({ ...productDetails, images: theImagesArray });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <Box>
      <ModalComponent
        open={openAddNoteModal}
        onCloseIconClick={() => {
          handleCloseIconClick();
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Add Note"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          handleCloseIconClick();
          setOpenAddNoteModal(false);
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="w-75 m-auto">
          <Box className="my-2">
            <TextArea
              placeholder="Add a Note"
              value={addANote}
              onInputChange={(e) => {
                setAddANote(e.target.value);
              }}
              error={errorFe.addANote}
              helperText={
                errorFe.addANote ? validateMessage.field_required : ""
              }
            />
          </Box>
          {/* <InputBox
            label="Enter"
            value={addANote}
            onInputChange={(e) => {
              setAddANote(e.target.value);
            }}
            className="mt-3 mb-5"
            variant="standard"
            error={error.addANote}
            helperText={error.addANote ? validateMessage.field_required : ""}
          /> */}
          <label
            htmlFor="addNoteForTodaysDealSubs"
            style={{ zIndex: 100 }}
            className="d-block"
          >
            <input
              type="file"
              id="addNoteForTodaysDealSubs"
              className="d-none"
              accept="image/*,.pdf"
              onChange={onInputChange}
            />
            <Box className="d-flex  align-items-center">
              <Typography className="bg-orange w-50 h-5 fw-bold text-center color-white py-2 cursor-pointer mb-2 rounded-1">
                Add Media
              </Typography>
              <Typography className="text-truncate h-5 ms-1 fw-bold w-25">
                {fileInput}
              </Typography>
            </Box>
          </label>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default AddNoteModal;
