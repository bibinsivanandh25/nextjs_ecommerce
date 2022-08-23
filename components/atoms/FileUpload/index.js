/* eslint-disable no-nested-ternary */

import UploadIcon from "@mui/icons-material/Upload";
import { useRef, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import toastify from "services/utils/toastUtils";
import Image from "next/image";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getBase64 } from "services/utils/functionUtils";
import { FcDocument, FcVideoFile } from "react-icons/fc";
import ButtonComponent from "../ButtonComponent";
import ModalComponent from "../ModalComponent";

const FileUploadModal = ({
  showModal = false,
  setShowModal = () => {},
  getUploadedFiles = () => {},
  maxFileSize = 2e6,
  maxNoofFiles = 5,
  type = "base64",
  value = {},
}) => {
  const fileUploadRef = useRef(null);
  const [binaryStr, setbinaryStr] = useState([]);
  const [multiPart, setMultiPart] = useState([]);

  useEffect(() => {
    if (Object.keys(value).length) {
      setbinaryStr(value.binaryStr);
      if (type !== "base64") {
        setMultiPart(value.multiPart);
      }
    }
  }, []);

  const handlefileDrop = async (acceptedFiles) => {
    if (type !== "base64") {
      setMultiPart((pre) => {
        return [...pre, ...acceptedFiles];
      });
    }
    const arr = [...binaryStr];
    const reader = new FileReader();

    if (acceptedFiles.length !== 0 && acceptedFiles.length <= 5) {
      if (Array.isArray(acceptedFiles)) {
        const promiseArr = [];
        acceptedFiles.forEach((item) => {
          if (item.size <= maxFileSize) {
            promiseArr.push(getBase64(item));
          } else {
            toastify("File size should be less than 2 MB", "error");
          }
        });
        const filePaths = await Promise.all(promiseArr);
        const temp = filePaths.map((ele) => ele);
        arr.push(...temp);
        if (arr.length <= maxNoofFiles) {
          setbinaryStr([...arr]);
        } else {
          toastify("Maximum 5 files can be uploaded", "error");
        }
      } else {
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadend = () => {
          const bitStr = reader.result;
          arr.push(bitStr);
          if (arr.length <= maxNoofFiles) {
            setbinaryStr([...arr]);
          } else {
            toastify("Maximum 5 files can be uploaded", "error");
          }
        };
      }
    } else {
      toastify("Maximum 5 files can be uploaded", "error");
    }
  };
  const onSubmitClick = () => {
    getUploadedFiles({ binaryStr, multiPart });
    setShowModal("");
  };

  return (
    <ModalComponent
      ModalTitle=""
      showClearBtn={false}
      saveBtnText="Submit"
      open={showModal}
      headerClassName="border-bottom-0"
      showCloseIcon
      onCloseIconClick={() => setShowModal("")}
      onSaveBtnClick={onSubmitClick}
    >
      <>
        <Dropzone onDrop={handlefileDrop} noClick>
          {({ getRootProps }) => (
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
                onChange={(e) => {
                  if (e.target.files[0]?.size <= maxFileSize) {
                    handlefileDrop(e.target.files);
                  } else {
                    toastify("File size should be less than 2 MB", "error");
                  }
                }}
              />
            </div>
          )}
        </Dropzone>
        {/* </div> */}
        <div className="d-flex mt-3">
          {binaryStr?.map((ele, ind) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className="position-relative" key={ind}>
                <div className="me-2">
                  {ele.includes("image") ? (
                    <Image src={ele} width={60} height={60} alt="" />
                  ) : ele.includes("video") ? (
                    <FcVideoFile
                      style={{
                        fontSize: "65px",
                      }}
                    />
                  ) : (
                    <FcDocument
                      style={{
                        fontSize: "65px",
                      }}
                    />
                  )}
                </div>
                <CloseIcon
                  onClick={() => {
                    const temp = [...binaryStr];
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
