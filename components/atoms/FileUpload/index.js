import UploadIcon from "@mui/icons-material/Upload";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import ModalComponent from "../ModalComponent";
import ButtonComponent from "../ButtonComponent";
import Image from "next/image";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FileUploadModal = ({}) => {
  const fileUploadRef = useRef(null);
  const [binaryStr, setbinaryStr] = useState([]);

  const handlefileDrop = (acceptedFiles) => {
    let arr = [...binaryStr];
    const reader = new FileReader();
    if (acceptedFiles[0]) {
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = () => {
        const bitStr = reader.result;
        console.log(bitStr);
        arr.push(bitStr);
        setbinaryStr([...arr]);
      };
    }
  };
  console.log(binaryStr);

  return (
    <ModalComponent
      ModalTitle=""
      showClearBtn={false}
      saveBtnText="Upload"
      open
      headerClassName="border-bottom-0"
      showCloseIcon={true}
    >
      <>
        {/* <div
          className="d-flex flex-column rounded-3 flex-grow-1 mx-5 mt-2 pt-4 justify-content-center align-items-center"
          style={{ border: "0.4px dashed #e56700", height: "180px" }}
        > */}
        <Dropzone onDrop={handlefileDrop} noClick={true}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{ border: "0.4px dashed #e56700", height: "180px" }}
              className="d-flex flex-column rounded-3 flex-grow-1 mx-5 mt-2 pt-4 justify-content-center align-items-center color-orange"
            >
              <UploadIcon size={35} />
              <span className="fs-12 mt-1">Drag and Drop your file here.</span>
              <span className="fs-12 mb-2">or</span>
              <ButtonComponent
                variant="outlined"
                label="Browse file"
                muiProps="px-2 fs-10"
                onBtnClick={() => {
                  fileUploadRef.current.click();
                }}
              />
              <input
                type="file"
                name="file"
                ref={fileUploadRef}
                className="d-none"
                onChange={(e) => handlefileDrop(e.target.files)}
              />
            </div>
          )}
        </Dropzone>
        {/* </div> */}
        <div className="d-flex mt-3">
          {binaryStr?.map((ele, ind) => {
            return (
              <div className="position-relative">
                <div className="mx-2">
                  <Image src={ele} width={60} height={60} />
                </div>
                <CloseIcon
                  onClick={() => {
                    let temp = [...binaryStr];
                    temp.splice(ind, 1);
                    setbinaryStr([...temp]);
                  }}
                  className="position-absolute bottom-0 end-0 p-1 rounded-circle bg-secondary text-white"
                />
              </div>
            );
          })}
        </div>
      </>
    </ModalComponent>
  );
};
export default FileUploadModal;
