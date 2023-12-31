/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */

import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import validateMessage from "constants/validateMessages";
import {
  helpandsupportFileUpload,
  replyHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";
import { Close } from "@mui/icons-material";
import Image from "next/image";

const HelpandsupportView = ({
  selectedData,
  setShowModal = () => {},
  user = {},
  acceptedTypes = ["png", "jpg", "pdf"],
  getTabledata = () => {},
}) => {
  const inputField = useRef();
  const [formValue, setFormValue] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  const getContent = (label, value, className) => {
    return (
      <p className="mx-3 my-2">
        <span>{label}</span> :{" "}
        <span className={`fw-bold ${className}`}>{value}</span>
      </p>
    );
  };

  const validateForm = () => {
    let errorText = true;
    if (formValue.replace(/<[^>]*>/g, "").length === 0) {
      errorText = false;
      setError(validateMessage.field_required);
    } else if (formValue.replace(/<[^>]*>/g, "").length > 1000) {
      errorText = false;
      setError(validateMessage.alpha_numeric_max_1000);
    } else {
      errorText = true;
      setError(null);
    }
    return errorText;
  };
  const handleFileUpload = async () => {
    if (selectedFile.length) {
      const fileFormData = new FormData();
      const oldUrl = [];
      const newDoc = [];
      fileFormData.set("data", {});
      selectedFile.forEach((item) => {
        if (typeof item !== "string") {
          newDoc.push(item);
          fileFormData.append("imageList", item);
        } else if (typeof item == "string") {
          oldUrl.push(item);
        }
      });

      fileFormData.append("ticketCreatedByType", "ADMIN");

      fileFormData.append("ticketCreatedById", "ADM09220001");
      if (newDoc.length) {
        const { data, err } = await helpandsupportFileUpload(fileFormData);
        if (data) {
          const datas = [...data, ...oldUrl];
          return { datas };
        }
        if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        const datas = [...oldUrl];
        return { datas };
      }
    }
    return [];
  };

  const handleCreateBtnClick = async () => {
    if (validateForm()) {
      const { datas } = await handleFileUpload();
      const media = [];
      datas?.forEach((item) => {
        media.push({
          mediaUrl: item,
        });
      });

      const payload = {
        ticketId: selectedData.ticketId,
        messageFromId: user.userId,
        messageFromType: "ADMIN",
        message: formValue,
        imageUrlList: media || [],
      };
      const { data, err } = await replyHelpandSupport(payload);
      if (data) {
        setShowModal(false);
        getTabledata(0);
      }
      if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  const showFileNames = () => {
    const data = [];
    selectedFile.forEach((item) => {
      if (typeof item == "string") {
        const x = item.split("-");
        data.push({ url: item, filename: x[x.length - 1] });
      } else {
        data.push({ url: "", filename: item.name });
      }
    });
    return data;
  };
  const handleFileDelete = (index) => {
    const temp = [...selectedFile];
    temp.splice(index, 1);
    setSelectedFile([...temp]);
  };

  return (
    <Paper className="mnh-87vh mxh-87vh overflow-auto hide-scrollbar d-flex flex-column">
      <Typography
        className="h-5 color-orange cursor-pointer ms-2 mt-1"
        onClick={() => {
          setShowModal({ show: false, id: null });
        }}
      >
        {"<"} Back
      </Typography>
      <p className="fs-16 fw-bold p-3 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom px-4 py-1">
        {getContent(
          "Date & Time",
          new Date(selectedData.lastModifiedDate).toLocaleString()
        )}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.issueSubject)}
        {getContent("Status", selectedData.ticketStatus)}
      </div>
      {selectedData?.ticketStatus == "CLOSED" ? null : (
        <div className="my-2 border-bottom">
          <div className="px-4 pt-2">
            <TextEditor
              getContent={(text) => {
                setFormValue(text);
              }}
            />
            {error && (
              <p className="error" id="textbox-helper-text">
                {error}
              </p>
            )}
          </div>
          <Grid
            container
            className="my-3 px-4"
            item
            xs={12}
            justifyContent="space-between"
          >
            <Grid item>
              <>
                <span className="me-2 fw-600">Attach File :</span>
                <input
                  type="file"
                  hidden
                  ref={inputField}
                  onChange={(e) => {
                    if (
                      e.target?.files.length &&
                      acceptedTypes.includes(
                        e.target.files[0].type.split("/")[1]
                      )
                    ) {
                      setSelectedFile((prev) => [...prev, e.target.files[0]]);
                    } else {
                      toastify("This files Type are not accepted", "error");
                    }
                  }}
                />
                <ButtonComponent
                  label="Choose File"
                  color="#e8e8e8"
                  onBtnClick={() => {
                    inputField.current.click();
                  }}
                />
              </>
            </Grid>
            <Grid item className="d-flex justify-content-end me-5">
              <ButtonComponent
                label="Send Reply"
                onBtnClick={handleCreateBtnClick}
              />
            </Grid>
          </Grid>
          {showFileNames().map((item, index) => (
            <Typography className="h-5 ms-5">
              {item.filename}
              <Close
                onClick={() => {
                  handleFileDelete(index);
                }}
                className="h-5 color-orange cursor-pointer ms-1"
              />
            </Typography>
          ))}
        </div>
      )}
      <div className="mx-4">
        <div className="p-0">
          {selectedData.helpSupportMessages.map((val) => {
            return (
              <>
                <div className="d-flex mt-2">
                  <div className="px-3">
                    {val.imageUrl ? (
                      <Image
                        alt="UserImage"
                        height={50}
                        width={50}
                        style={{ borderRadius: "5px" }}
                        src={val.imageUrl}
                      />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{ height: "50px", width: "50px" }}
                      />
                    )}
                  </div>
                  <div>
                    <Typography className="fw-bold">
                      {val.messageFromName}
                    </Typography>
                    <p className="h-5">{val.messageFromId}</p>
                    <p className="h-5">{val.messagedAt}</p>
                    <div className="d-flex align-items-center">
                      <Typography className="h-5 fw-bold">
                        Description :{" "}
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: val.message,
                        }}
                      />
                    </div>
                    <div className="d-flex align-item-center">
                      <span className="fw-bold h-5 me-1">Attached File :</span>
                      {val.helpSupportMessageMedias.map((media, ind) => {
                        return (
                          <div>
                            <a
                              className="fs-12 mb-3 me-1 text-primary text-decoration-none"
                              href={media.mediaUrl}
                              target="_blank"
                            >
                              {val.helpSupportMessageMedias?.length === ind + 1
                                ? `file${ind + 1}${media?.mediaUrl?.slice(
                                    media.mediaUrl?.lastIndexOf(".")
                                  )}`
                                : `file${ind + 1}${media?.mediaUrl?.slice(
                                    media.mediaUrl?.lastIndexOf(".")
                                  )},`}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <Divider color="black" />
              </>
            );
          })}
        </div>
      </div>
    </Paper>
  );
};
export default HelpandsupportView;
