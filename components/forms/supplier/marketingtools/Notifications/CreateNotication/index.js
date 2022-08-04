import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import ModalComponent from "@/atoms/ModalComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import InputBox from "@/atoms/InputBoxComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import TextEditor from "@/atoms/TextEditor";
import ButtonComponent from "@/atoms/ButtonComponent";

const CreateNotification = ({ showModal = false, setShowModal = () => {} }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const list = [
    {
      id: 1,
      title: "customer 1",
      value: "Customer 1",
    },
    {
      id: 2,
      title: "customer 2",
      value: "Customer 2",
    },
    {
      id: 3,
      title: "customer 3",
      value: "Customer 3",
    },
    {
      id: 4,
      title: "customer 4",
      value: "Customer 4",
    },
    {
      id: 5,
      title: "customer 5",
      value: "Customer 5",
    },
  ];
  const [checkedRadioId, setCheckedRadioId] = useState(null);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showText, setShowText] = useState(false);
  const [files, setFiles] = useState([]);

  const fileRef = useRef(null);
  console.log(files, "asljh");

  return (
    <ModalComponent
      ModalTitle="Notify"
      showFooter={false}
      open={showModal}
      ModalWidth={600}
      onCloseIconClick={() => {
        setShowModal(false);
      }}
    >
      <Box className="py-2">
        <MultiSelectComponent
          freeSolo
          list={[...list]}
          fullWidth
          value={selectedCustomers}
          onSelectionChange={(e, val) => {
            setSelectedCustomers([...val]);
          }}
        />
      </Box>
      {/* <Divider variant="fullWidth" /> */}
      <Box className="my-2 d-flex align-items-center justify-content-between">
        <Box>
          {" "}
          <Typography className="pe-3">Title</Typography>
        </Box>
        <Box className="w-100">
          <InputBox fullWidth size="small" />
        </Box>
      </Box>
      <Box className="d-flex justify-content-around">
        <RadiobuttonComponent
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(true);
            setShowText(false);
          }}
          label="Only Attachments"
          id="Only Attachments"
          isChecked={checkedRadioId === "Only Attachments"}
        />
        <RadiobuttonComponent
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(false);
            setShowText(true);
          }}
          label="Only Text"
          id="Only Text"
          isChecked={checkedRadioId === "Only Text"}
        />
        <RadiobuttonComponent
          onRadioChange={(e) => {
            setCheckedRadioId(e.target.id);
            setShowAttachment(true);
            setShowText(true);
          }}
          label="Text With Attachments"
          id="Text With Attachments"
          isChecked={checkedRadioId === "Text With Attachments"}
        />
      </Box>
      {!showAttachment && showText ? (
        <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
          <TextEditor />
        </div>
      ) : null}
      {showAttachment && !showText ? (
        <div className="d-flex align-items-center my-2">
          <ButtonComponent
            onBtnClick={() => {
              fileRef.current.click();
            }}
            variant="outlined"
            label="Attach File"
            muiProps="ms-3 "
          />
          <div className="d-flex">
            {files.map((ele, ind) => {
              return (
                <Typography key={ele} className="color-blue h-5 ms-2">
                  {ele}
                  <CloseOutlined
                    className="h-5 mx-2"
                    onClick={() => {
                      const temp = [...files];
                      temp.splice(ind, 1);
                      setFiles(temp);
                    }}
                  />
                </Typography>
              );
            })}
          </div>
        </div>
      ) : null}
      {showAttachment && showText ? (
        <div>
          <div className="my-2 d-flex justify-content-center w-100 overflow-hidden">
            <TextEditor />
          </div>
          <ButtonComponent
            onBtnClick={() => {
              fileRef.current.click();
            }}
            variant="outlined"
            label="Attach File"
            muiProps="ms-3 mb-3"
          />
        </div>
      ) : null}
      <input
        multiple
        type="file"
        ref={fileRef}
        hidden
        onChange={(e) => {
          console.log(e.target.files);
          setFiles([...files, e.target.files[0].name]);
        }}
      />
      <Box className="d-flex justify-content-end my-2">
        <ButtonComponent
          variant="text"
          muiProps="text-secondary"
          label="Schedule"
        />
        <ButtonComponent
          variant="text"
          muiProps="text-secondary mx-2"
          label="Cancel"
        />
        <ButtonComponent label="Submit" />
      </Box>
    </ModalComponent>
  );
};
export default CreateNotification;
