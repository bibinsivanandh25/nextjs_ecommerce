import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ButtonComponent from "@/atoms/ButtonComponent";
import FileUploadModal from "@/atoms/FileUpload";
import InputBox from "@/atoms/InputBoxComponent";
import TextEditor from "@/atoms/TextEditor";
import { useState, useEffect } from "react";
import toastify from "services/utils/toastUtils";
import { getMediaUrl } from "services/admin/help&support";
import { useSelector } from "react-redux";
import { saveHelpandSupport } from "services/supplier/helpandsupport";

const QueryModal = ({ selectedData, setShowQueryModal = () => {} }) => {
  const [defaultFormData, setDefaultFormData] = useState({
    issuetype: "",
    to: "",
    subject: "",
    content: "",
  });
  const user = useSelector((state) => state.user);
  const [contentFile, setContentFile] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleFileUpload = async () => {
    if (contentFile?.multiPart?.length) {
      const fileFormData = new FormData();
      fileFormData.set("data", {});
      contentFile?.multiPart?.forEach((item) => {
        fileFormData.append("imageList", item);
      });
      fileFormData.append("ticketCreatedByType", "ADMIN");
      const { data, err } = await getMediaUrl(fileFormData);
      if (data) {
        const datas = data;
        return { datas };
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
    return [];
  };
  const handleCreateClick = async () => {
    if (true) {
      const { datas } = await handleFileUpload();
      const payload = {
        issueType: defaultFormData.issuetype,
        orderId: defaultFormData.to,
        issueSubject: defaultFormData.subject,
        userFromType: "ADMIN",
        userFromId: user.userId,
        userToType: "SUPPLIER",
        userToId: selectedData.supplierId,
        mediaUrl: datas || [],
        helpSupportMessagePojos: [
          {
            messageFromId: user.userId,
            messageFromType: "ADMIN",
            message: defaultFormData.content,
          },
        ],
      };
      const { data, err } = await saveHelpandSupport(payload);
      if (data) {
        setShowQueryModal(false);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  useEffect(() => {
    setDefaultFormData((pre) => ({
      ...pre,
      issuetype: "ACCOUNT_MANAGEMENT_ISSUE",
      to: selectedData.supplierId,
    }));
  }, [selectedData]);
  return (
    <Box className="p-2">
      <Box
        onClick={() => setShowQueryModal(false)}
        className="d-flex border-bottom pb-2"
      >
        <Typography className="h-5 d-flex align-items-center cursor-pointer me-3 fit-content">
          <ArrowBackIosIcon className="fs-14" />
          Back
        </Typography>
        <Typography className="h-4 fw-bold">
          Help & support{" "}
          <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
        </Typography>
      </Box>
      <div className="my-3 px-5">
        <Grid container className="d-flex align-items-center">
          <Grid item xs={2} className="fw-bold">
            Issue type :
          </Grid>
          <Grid item xs={8}>
            <InputBox
              size="small"
              value={defaultFormData.issuetype}
              // helperText={errorObj.issueType}
              // error={errorObj.issueType.length}
              // list={[...issueTypes]}
              // onDropdownSelect={(value) => {
              //   // setSelectedIssue({ ...value });
              //   setFormValue((pre) => ({
              //     ...pre,
              //     issueType: { ...value },
              //   }));
              // }}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container className="d-flex align-items-center my-3">
          <Grid item xs={2} className="fw-bold">
            To:
          </Grid>
          <Grid item xs={8}>
            <InputBox
              className="w-100"
              size="small"
              value={defaultFormData.to}
              // value={formValue.OrderID}
              // onInputChange={(e) => {
              //   setFormValue((pre) => ({
              //     ...pre,
              //     OrderID: e.target.value,
              //   }));
              // }}
              // error={errorObj.OrderID !== ""}
              // helperText={errorObj.OrderID}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container className="d-flex align-items-center">
          <Grid item xs={2} className="fw-bold">
            Subject :
          </Grid>
          <Grid item xs={8}>
            <InputBox
              // helperText={errorObj.subject}
              // error={errorObj.subject.length}
              className="w-100"
              size="small"
              value={defaultFormData.subject}
              onInputChange={(e) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  subject: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div className="my-2 ps-5">
        <Grid container className="">
          <Grid item md={11.8} sm={10}>
            <TextEditor
              getContent={(text) => {
                setDefaultFormData((pre) => ({
                  ...pre,
                  content: text,
                }));
              }}
            />
            {/* {errorObj.content && (
                <p className="error" id="textbox-helper-text">
                  {errorObj.content}
                </p>
              )} */}
          </Grid>
        </Grid>
        <Grid container className="my-3">
          <Grid item xs={6}>
            <span className="me-2 fw-bold">Attach File :</span>
            <ButtonComponent
              label="Choose File"
              color="#e8e8e8"
              onBtnClick={() => {
                // inputField.current.click();
                setShowUploadModal(true);
              }}
            />
          </Grid>
          <Grid item xs={5.2} display="flex" justifyContent="end">
            <ButtonComponent
              label="Create Ticket"
              onBtnClick={handleCreateClick}
            />
          </Grid>
        </Grid>
      </div>
      <FileUploadModal
        getUploadedFiles={(value) => {
          setContentFile(value);
        }}
        showModal={showUploadModal}
        setShowModal={setShowUploadModal}
        type=""
      />
    </Box>
  );
};

export default QueryModal;
