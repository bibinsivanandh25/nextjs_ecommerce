/* eslint-disable no-use-before-define */
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import validateMessage from "constants/validateMessages";
import { useSelector } from "react-redux";
import {
  editInvoiceTradeMark,
  saveInvoiceTradeMark,
  uploadMediaForInvoice,
} from "services/supplier/invoiceandtrademark";
import toastify from "services/utils/toastUtils";
import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
// import TextArea from "@/atoms/SimpleTextArea";
import ButtonComponent from "@/atoms/ButtonComponent";

const UploadDocumentModal = ({
  showModal = true,
  setShowModal = () => {},
  setDefaultFormData = () => {},
  defaultFormData,
  documents,
  setDocument = () => {},
  getAllTableData = () => {},
  modalTitle = {},
}) => {
  const user = useSelector((store) => store.user);
  const [error, setError] = useState({
    filetype: "",
    filename: "",
    description: "",
    files: "",
  });
  const fileRef = useRef(null);
  const handleDeleteImage = (id) => {
    const temp = [...documents];
    temp.splice(id, 1);
    setDocument([...temp]);
  };
  const validation = () => {
    const errorObj = {
      filetype: "",
      filename: "",
      description: "",
      files: "",
    };
    let flag = true;
    const { filetype, filename, description } = defaultFormData;
    if (filetype == null) {
      flag = false;
      errorObj.filetype = validateMessage.field_required;
    }
    if (filename.length === 0) {
      flag = false;
      errorObj.filename = validateMessage.field_required;
    } else if (filename.length > 100) {
      flag = false;
      errorObj.filename = validateMessage.alpha_numeric_max_100;
    }
    if (description.length === 0) {
      flag = false;
      errorObj.description = validateMessage.field_required;
    } else if (description.length > 255) {
      flag = false;
      errorObj.description = validateMessage.alpha_numeric_max_255;
    }
    if (documents.length === 0) {
      flag = false;
      errorObj.files = validateMessage.field_required;
    }
    setError(errorObj);
    return flag;
  };
  const handleSaveFiles = async () => {
    const mediaFormData = new FormData();
    mediaFormData.set("data", {});
    documents.forEach((item) => {
      mediaFormData.append("medias", item);
    });
    mediaFormData.append("documentType", defaultFormData.filetype.value);
    const { data, err } = await uploadMediaForInvoice(
      user.supplierId,
      mediaFormData
    );
    if (data) {
      return data;
    }
    if (err) {
      toastify(err.response.data.message, "err");
    }
    return null;
  };
  const editMediaSaveFile = async () => {
    const editDocumentData = new FormData();
    const oldUrl = [];
    const newDoc = [];
    editDocumentData.set("data", {});
    documents.forEach((item) => {
      if (typeof item !== "string") {
        newDoc.push(item);
        editDocumentData.append("medias", item);
      } else if (typeof item == "string") {
        oldUrl.push(item);
      }
    });
    editDocumentData.append("documentType", defaultFormData.filetype.value);
    if (newDoc.length > 0) {
      const { data, err } = await uploadMediaForInvoice(
        user.supplierId,
        editDocumentData
      );
      if (data) {
        const datas = [...data, ...oldUrl];
        return datas;
      }
      if (err) {
        toastify(err.response.data.message, "err");
      }
    }

    return null;
  };
  const handleSaveClick = async (title) => {
    if (validation() && title === "add") {
      const imageUrl = await handleSaveFiles();
      if (imageUrl?.length > 0) {
        const payload = {
          supplierId: user.supplierId,
          documentName: defaultFormData.filename,
          documentType: defaultFormData.filetype.value,
          description: defaultFormData.description,
          documentUrl: imageUrl,
        };
        const { data, err } = await saveInvoiceTradeMark(payload);
        if (data) {
          getAllTableData();
          handleCloseClick();
        } else if (err) {
          toastify(err.response.data.message, "err");
        }
      }
    }

    if (validation() && title === "edit") {
      const datas = await editMediaSaveFile();
      const payload = {
        documentType: defaultFormData.filetype.value,
        trademarkInvoiceId: defaultFormData.trademarkInvoiceId,
        supplierId: user.supplierId,
        documentName: defaultFormData.filename,
        description: defaultFormData.description,
        documentUrl: datas ? [...datas] : documents,
      };
      const { data, err } = await editInvoiceTradeMark(payload);
      if (data) {
        getAllTableData();
        handleCloseClick();
      } else if (err) {
        toastify(err.response.data.message, "err");
      }
    }
  };

  const handleCloseClick = () => {
    setError({
      filetype: "",
      filename: "",
      description: "",
      files: "",
    });
    setDefaultFormData({
      filetype: null,
      filename: "",
      description: "",
    });
    setDocument([]);
    setShowModal(false);
  };
  const showFileNames = () => {
    const data = [];
    documents.forEach((item) => {
      if (typeof item == "string") {
        const x = item.split("-");
        data.push({ url: item, filename: x[x.length - 1] });
      } else {
        data.push({ url: "", filename: item.name });
      }
    });
    return data;
  };

  return (
    <ModalComponent
      open={showModal}
      onCloseIconClick={() => {
        handleCloseClick();
      }}
      ModalTitle={modalTitle == "add" ? "Upload Document" : "Edit Document"}
      footerClassName="justify-content-end"
      onSaveBtnClick={() => {
        handleSaveClick(modalTitle);
      }}
      onClearBtnClick={handleCloseClick}
      ClearBtnText="Cancel"
      saveBtnText={modalTitle == "add" ? "Save" : "Edit"}
    >
      <Grid container className="mt-2">
        <Grid item sm={12}>
          <SimpleDropdownComponent
            value={defaultFormData.filetype}
            fullWidth
            inputlabelshrink
            label="File Type"
            placeholder="File Type"
            size="small"
            list={[
              {
                id: 1,
                label: "B2B Invoice",
                value: "B2B_INVOICE",
              },
              {
                id: 2,
                label: "Trademark Letter",
                value: "TRADEMARK_LETTER",
              },
            ]}
            onDropdownSelect={(value) => {
              setDefaultFormData((pre) => ({ ...pre, filetype: value }));
            }}
            required
            error={error.filetype !== ""}
            helperText={error.filetype}
            disabled={modalTitle === "edit"}
          />
        </Grid>
        <Grid item sm={12} className="my-2">
          <InputBox
            value={defaultFormData.filename}
            inputlabelshrink
            label="File Name"
            placeholder="File Name"
            required
            onInputChange={(e) => {
              setDefaultFormData((pre) => ({
                ...pre,
                filename: e.target.value,
              }));
            }}
            error={error.filename !== ""}
            helperText={error.filename}
          />
        </Grid>
        <Grid item sm={12}>
          {/* <TextArea
            value={defaultFormData.description}
            rows={3}
            onInputChange={(e) => {
              setDefaultFormData((pre) => ({
                ...pre,
                description: e.target.value,
              }));
            }}
            required
            error={error.description !== ""}
            helperText={error.description}
            placeholder="Description"
          /> */}
          <InputBox
            value={defaultFormData.description}
            isMultiline
            onInputChange={(e) => {
              setDefaultFormData((pre) => ({
                ...pre,
                description: e.target.value,
              }));
            }}
            required
            error={error.description !== ""}
            helperText={error.description}
            placeholder="Description"
            inputlabelshrink
            label="Description"
          />
        </Grid>
        <Grid item sm={12} display="flex" alignItems="center" marginTop={1}>
          <Box>
            <input
              hidden
              ref={fileRef}
              type="file"
              onChange={(e) => {
                if (e.target?.files.length) {
                  const temp = [...documents];
                  temp.push(e.target?.files[0]);
                  setDocument([...temp]);
                }
              }}
            />
            <ButtonComponent
              bgColor="bg-dark-gray1"
              label="Upload Document"
              onBtnClick={() => {
                fileRef.current.click();
              }}
            />
          </Box>
          <Box>
            {/* {documents.map((ele, index) => {
              return (
                <Typography
                  className="color-blue text-break h-5 px-2"
                  key={ele}
                >
                  {ele?.name || ele}
                  <Close
                    className="h-5 color-orange cursor-pointer"
                    onClick={() => {
                      handleDeleteImage(index);
                    }}
                  />
                </Typography>
              );
            })} */}
            {showFileNames().map((item, index) => (
              <Typography
                className="color-blue text-break h-5 px-2"
                key={item?.filename}
              >
                {item?.filename}
                <Close
                  className="h-5 color-orange cursor-pointer"
                  onClick={() => {
                    handleDeleteImage(index);
                  }}
                />
              </Typography>
            ))}
          </Box>
        </Grid>
        {error.files ? (
          <FormHelperText className="ps-3" error={error.files !== ""}>
            {error.files}
          </FormHelperText>
        ) : null}
      </Grid>
    </ModalComponent>
  );
};
export default UploadDocumentModal;
