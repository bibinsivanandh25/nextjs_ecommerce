import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";

let errObj = {
  addANote: false,
};

const AddNoteModal = ({ openAddNoteModal, setOpenAddNoteModal }) => {
  const [addANote, setAddANote] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [error, setError] = useState(errObj);
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

  const handleSubmit = () => {
    const [errObjReturned] = handleError();
    // console.log(theError);
    setError(errObjReturned);
  };

  const onInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result.split(":")[1];
        setFileInput(data);
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
          setAddANote("");
          setOpenAddNoteModal(false);
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Create Discount"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          setAddANote("");
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
              error={error.addANote}
              helperText={error.addANote ? validateMessage.field_required : ""}
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
