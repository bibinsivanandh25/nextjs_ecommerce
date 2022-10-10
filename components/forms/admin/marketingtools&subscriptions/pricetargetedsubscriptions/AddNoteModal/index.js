import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import ButtonComponent from "@/atoms/ButtonComponent";
import toastify from "services/utils/toastUtils";
import { Close } from "@mui/icons-material";
import {
  addNoteDisCountSubscription,
  mediaDisCountSubscription,
} from "services/admin/discountsubscription";
import { useSelector } from "react-redux";

const AddNoteModal = ({
  openAddNoteModal,
  setOpenAddNoteModal = () => {},
  selectedData = {},
  getTableData = () => {},
}) => {
  const user = useSelector((state) => state.user);
  const [addANote, setAddANote] = useState("");
  const [error, setError] = useState({ addANote: "", document: "" });
  const [document, setDocument] = useState({});
  const fileRef = useRef(null);
  useEffect(() => {
    setAddANote(selectedData.comments || "");
    const x = selectedData?.commentsAttachment?.split("-");

    setDocument(
      selectedData?.commentsAttachment
        ? { name: x[x.length - 1], url: selectedData.commentsAttachment }
        : {}
    );
  }, [selectedData]);
  const validation = () => {
    const errorObj = {
      addANote: "",
      document: "",
    };
    if (addANote === "") {
      errorObj.addANote = validateMessage.field_required;
    }
    if (document.name === undefined) {
      errorObj.document = "No Document is Choosen";
    }
    setError(errorObj);
    const flag = Object.values(errorObj).some((val) => val !== "");
    return !flag;
  };

  const uploadMedia = async () => {
    if (document.type) {
      const formData = new FormData();
      formData.set("data", {});
      formData.append("file", document);
      formData.append("toolCommentType", "purchase_history");
      formData.append("adminId", user.userId);
      const { data, err } = await mediaDisCountSubscription(formData);
      if (data) {
        return data;
      }
      if (err) {
        toastify(err?.response?.data.message, "error");
        return "";
      }
    }
    return document.url;
  };
  const handleSubmit = async () => {
    const flag = validation();
    if (flag) {
      const media = await uploadMedia();
      if (media) {
        const payload = {
          type: "PURCHASE_HISTORY",
          typeId: selectedData.purchaseId,
          comments: addANote,
          commentsAttachment: media,
        };
        const { data, err } = await addNoteDisCountSubscription(payload);
        if (data) {
          toastify(data.message, "success");
          getTableData(0);
          setOpenAddNoteModal(false);
        }
        if (err) {
          toastify(err?.response?.data.message, "error");
        }
      }
    }
  };
  const handleCloseClick = () => {
    setAddANote("");
    setOpenAddNoteModal(false);
    setError({ addANote: "", document: "" });
  };
  return (
    <Box>
      <ModalComponent
        open={openAddNoteModal}
        onCloseIconClick={() => {
          handleCloseClick();
        }}
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        ModalTitle="Add Note"
        titleClassName="fw-bold fs-14 color-orange"
        onClearBtnClick={() => {
          handleCloseClick();
        }}
        onSaveBtnClick={() => {
          handleSubmit();
        }}
      >
        <Box className="w-75 m-auto py-2">
          <TextArea
            label="Enter"
            value={addANote}
            onInputChange={(e) => {
              setAddANote(e.target.value);
            }}
            className="mt-3 mb-5"
            variant="standard"
            error={error.addANote !== ""}
            helperText={error.addANote || ""}
          />
          <Grid item sm={12} display="flex" alignItems="center" marginTop={1}>
            <Box>
              <input
                hidden
                ref={fileRef}
                type="file"
                onChange={(e) => {
                  if (
                    e.target?.files.length &&
                    (e.target.files[0].type.includes("pdf") ||
                      e.target.files[0].type.includes("image"))
                  ) {
                    if (e.target.files[0].size < 2e6) {
                      setDocument(e.target?.files[0]);
                    } else {
                      toastify("File size should be less than 2 MB", "error");
                    }
                  } else {
                    toastify("Only PDF's and Images are accepted", "error");
                  }
                }}
              />
              <ButtonComponent
                label="Add Media"
                onBtnClick={() => {
                  fileRef.current.click();
                }}
              />
            </Box>
          </Grid>
          <Box>
            {document.name ? (
              <Typography className="color-blue text-break h-5 px-2">
                {document?.name}
                <Close
                  className="h-5 color-orange cursor-pointer"
                  onClick={() => {
                    setDocument({});
                  }}
                />
              </Typography>
            ) : null}
          </Box>
          {error.document ? (
            <FormHelperText className="ps-3" error={error.files !== ""}>
              {error.document}
            </FormHelperText>
          ) : null}
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default AddNoteModal;
