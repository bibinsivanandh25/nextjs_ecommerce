/* eslint-disable no-shadow */
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import { useSelector } from "react-redux";
import {
  addANoteApi,
  convertFileToLink,
} from "services/admin/marketingtools/subscriptions";
import toastify from "services/utils/toastUtils";
import CustomIcon from "services/iconUtils";

let errObj = {
  addANote: false,
};

const AddNoteModal = ({
  openAddNoteModal,
  setOpenAddNoteModal,
  typeId,
  adminComments = { comment: "", commentAttachment: "" },
  getDealSubscription,
}) => {
  const [addANote, setAddANote] = useState(adminComments.comment);
  const [fileInput, setFileInput] = useState(null);
  const [errorFe, setErrorFe] = useState(errObj);
  const [sendFile, setSendFile] = useState("");
  const [previousFile, setPreviousFile] = useState("");

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

  useEffect(() => {
    if (adminComments.commentAttachment) {
      const x = adminComments.commentAttachment.split("-");
      setFileInput(x[x.length - 1]);
      setSendFile(adminComments.commentAttachment);
      setPreviousFile(adminComments.commentAttachment);
    }
  }, [adminComments]);

  const adminIde = useSelector((state) => state.user.userId);

  const handleCloseIconClick = () => {
    errObj = {
      addANote: false,
    };
    setAddANote("");
    setFileInput("");
    setOpenAddNoteModal(false);
    setErrorFe(errObj);
  };

  const addNote = async (payload) => {
    const { data, error, message } = await addANoteApi(payload);
    if (error) {
      if (message) {
        toastify(message, "error");
      } else if (error?.response?.data?.message) {
        toastify(error?.response?.data?.message, "error");
      }
    } else if (data) {
      toastify(message, "success");
      handleCloseIconClick();
      getDealSubscription(0);
    }
  };

  const handleSubmit = async () => {
    const [theError, err] = handleError();
    if (!theError) {
      if (fileInput && previousFile !== sendFile) {
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
          const payload = {
            type: "PURCHASE_HISTORY",
            typeId,
            comments: addANote,
            commentsAttachment: data,
          };
          addNote(payload);
        }
      } else {
        const payload = {
          type: "PURCHASE_HISTORY",
          typeId,
          comments: addANote,
          commentsAttachment: sendFile,
        };
        addNote(payload);
      }
      // await getDealSubscription(0);
    }
    setErrorFe(err);
  };

  const onInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileInput(event.target.files[0].name);
      setSendFile(event.target.files[0]);
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
            <Typography className="bg-orange w-50 h-5 fw-bold text-center color-white py-2 cursor-pointer rounded-1">
              Add Media
            </Typography>
          </label>
          <Box className="">
            <Box className="mt-2 d-flex align-items-center justify-content-start">
              <Typography className="h-5 ms-1 text-primary">
                {fileInput}{" "}
              </Typography>

              {fileInput && (
                <Box>
                  <CustomIcon
                    type="close"
                    className="h-4 text-danger"
                    onIconClick={() => {
                      setFileInput("");
                      setSendFile("");
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default AddNoteModal;
