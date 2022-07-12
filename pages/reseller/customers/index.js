/* eslint-disable no-use-before-define */
import { Paper, Box, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import ModalComponent from "components/atoms/ModalComponent";
import InputBox from "components/atoms/InputBoxComponent";
import Image from "next/image";
import { assetsJson } from "public/assets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import TextEditor from "components/atoms/TextEditor";
import ButtonComponent from "components/atoms/ButtonComponent";
import FileUploadModal from "components/atoms/FileUpload";
import validateMessage from "constants/validateMessages";

const Customer = () => {
  const columns = [
    {
      id: "col1",
      label: "SlNo.",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer ID",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Profile",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Name",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Mobile Number",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "Last month purchase",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Current year purchase",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Total purchase",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Action",
      minWidth: 170,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const rows = [
    {
      id: "1",
      col1: "1",
      col2: "1234",
      col3: (
        <Paper elevation={4} sx={{ width: "fit-content" }} className="mx-auto">
          <Image width={40} height={40} src={assetsJson.person} alt="alt" />
        </Paper>
      ),
      col4: "ABC",
      col5: "1234567890",
      col6: "400 rs",
      col7: "1000 rs",
      col8: "6000 rs",
      col9: (
        <div className="d-flex justify-content-evenly">
          <NotificationsIcon
            className="color-blue cursor-pointer"
            onClick={() => {
              setshowNotifyModal(true);
              setselectedRow({ id: 1, name: "ABC" });
            }}
          />
          <Image
            width={20}
            height={20}
            src={assetsJson["whatsapp-icon"]}
            alt="alt"
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      id: "2",
      col1: "2",
      col2: "1234",
      col3: (
        <Paper elevation={4} sx={{ width: "fit-content" }} className="mx-auto">
          <Image width={40} height={40} src={assetsJson.person} alt="alt" />
        </Paper>
      ),
      col4: "Suhil",
      col5: "1234567890",
      col6: "400 rs",
      col7: "1000 rs",
      col8: "6000 rs",
      col9: (
        <div className="d-flex justify-content-evenly">
          <NotificationsIcon
            className="color-blue cursor-pointer"
            onClick={() => {
              setshowNotifyModal(true);
              setselectedRow({ id: 2, name: "suhil" });
            }}
          />
          <Image
            width={20}
            height={20}
            src={assetsJson["whatsapp-icon"]}
            alt="alt"
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const [showNotifyModal, setshowNotifyModal] = useState(false);
  const [showFileUpload, setshowFileUpload] = useState(false);
  const [selectedRow, setselectedRow] = useState({});
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    files: [],
  });
  const [errorObj, setErrorObj] = useState({
    subject: "",
    content: "",
  });

  const validate = () => {
    const errObj = {
      subject: "",
      content: "",
    };
    let flag = false;
    if (formData.subject === "") {
      errObj.subject = validateMessage.field_required;
      flag = true;
    } else if (formData.subject.length > 20) {
      errObj.subject = validateMessage.alpha_numeric_20;
      flag = true;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    if (!validate()) {
      console.log({ formData });
      setFormData({
        subject: "",
        content: "",
        files: [],
      });
      setshowNotifyModal(false);
      setErrorObj({
        subject: "",
        content: "",
        files: "",
      });
    }
  };

  return (
    <Paper className="w-100 d-flex flex-column">
      <Box className="border-bottom border-bottom-dark w-100 p-3 pb-0 mb-3">
        <Typography className="h-3">Customer</Typography>
      </Box>
      <Box className="w-100">
        <TableComponent
          columns={columns}
          showCheckbox={false}
          tableRows={[...rows]}
          searchBarPlaceHolderText="Search by anything"
        />
      </Box>

      <ModalComponent
        ModalTitle={`Notification (${selectedRow.name})`}
        ModalWidth={800}
        onCloseIconClick={() => {
          setshowNotifyModal(false);
          setErrorObj({
            subject: "",
            content: "",
            files: "",
          });
        }}
        open={showNotifyModal}
        showFooter={false}
        minHeightClassName="p-4"
      >
        <Box className="w-100 d-flex flex-column">
          <Box className="d-flex align-items-center">
            <Typography className="h-4 fw-bold">Subject:</Typography>
            <InputBox
              value={formData.subject}
              label=""
              className="ms-2"
              onInputChange={(e) => {
                setFormData((pre) => ({ ...pre, subject: e.target.value }));
              }}
              error={errorObj.subject !== ""}
              helperText={errorObj.subject}
            />
          </Box>
          <Box className="W-100 mt-3 overflow-hidden">
            <TextEditor
              getContent={(val) => {
                setFormData((pre) => ({
                  ...pre,
                  content: val,
                }));
              }}
              content={formData.content}
              className="w-100"
            />
          </Box>
          <Box className="d-flex align-items-center mt-3">
            <Typography className="fw-bold me-3">Attach file:</Typography>
            <ButtonComponent
              label="Choose file"
              onBtnClick={() => {
                setshowFileUpload(true);
              }}
              variant="outlined"
            />
            <FileUploadModal
              showModal={showFileUpload}
              setShowModal={setshowFileUpload}
              getUploadedFiles={(val) => {
                setFormData((pre) => ({
                  ...pre,
                  files: [...val],
                }));
              }}
            />
          </Box>
          <Box className="d-flex flex-row-reverse mt-3">
            <ButtonComponent
              label="Create Notification"
              onBtnClick={handleSubmit}
            />
          </Box>
        </Box>
      </ModalComponent>
    </Paper>
  );
};
export default Customer;
