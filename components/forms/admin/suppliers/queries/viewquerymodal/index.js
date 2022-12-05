/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import ButtonComponent from "@/atoms/ButtonComponent";
import TextEditor from "@/atoms/TextEditor";
import { useRef, useState, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import { Close } from "@mui/icons-material";
import {
  replyqueries,
  saveQueriesMedia,
} from "services/admin/supplier/queries";
import { useSelector } from "react-redux";
import { getMessages } from "services/supplier/helpandsupport";

const ViewModalQueries = ({
  selectedData,
  setShowModal = () => {},
  acceptedTypes = ["png", "jpg", "pdf"],
  getTabledata,
  setPageNumber = () => {},
}) => {
  const user = useSelector((state) => state.user);
  const inputField = useRef();
  const [formValue, setFormValue] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const getTicketMessage = async () => {
    const { data, err } = await getMessages(selectedData.ticketId);
    if (data) {
      setMessageData(data.data);
    }
    if (err) {
      setMessageData([]);
    }
  };
  useEffect(() => {
    getTicketMessage();
  }, []);
  const getSupplierTicketMessage = () => {
    return (
      <Box className="mx-2 overflow-auto hide-scrollbar">
        {messageData?.helpSupportMessages?.map((item) => (
          <Box className="mt-2">
            <Box className="d-flex">
              <Box>
                {item?.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt="UserImage"
                    height={50}
                    width={50}
                    style={{ borderRadius: "5px" }}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{ height: "50px", width: "50px" }}
                  />
                )}
              </Box>
              <Box className="ps-2">
                <Typography className="h-5 fw-bold">
                  {item.messageFromName}
                </Typography>
                <Typography className="h-5">{item.messageFromId}</Typography>
                <Typography className="h-5">{item.messagedAt}</Typography>
              </Box>
            </Box>
            <Box marginLeft={7}>
              <div className="d-flex align-items-center">
                <Typography className="h-5 fw-bold">Description : </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.message,
                  }}
                />
              </div>
              {item?.helpSupportMessageMedias[0]?.mediaUrl ? (
                <Typography className="h-5 d-flex">
                  <span className="fw-bold me-1 h-5"> Attached File :</span>
                  <Box className="d-flex">
                    {item?.helpSupportMessageMedias?.map((val, ind) => (
                      <Box>
                        <a
                          href={val?.mediaUrl}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="ms-1 cursor-pointer text-decoration-none "
                        >
                          {item.helpSupportMessageMedias?.length === ind + 1
                            ? `file${ind + 1}${val?.mediaUrl?.slice(
                                val.mediaUrl?.lastIndexOf(".")
                              )}`
                            : `file${ind + 1}${val?.mediaUrl?.slice(
                                val.mediaUrl?.lastIndexOf(".")
                              )},`}
                        </a>
                      </Box>
                    ))}
                  </Box>
                </Typography>
              ) : null}
            </Box>
            <Divider color="black" />
          </Box>
        ))}
      </Box>
    );
  };
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
      fileFormData.append("ticketCreatedById", user.userId);
      if (newDoc.length) {
        const { data, err } = await saveQueriesMedia(fileFormData);
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
      const { data, err } = await replyqueries(payload);
      if (data) {
        setShowModal(false);
        setPageNumber(0);
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
    <Paper className="mnh-85vh mxh-85vh overflow-auto hide-scrollbar d-flex flex-column">
      <Typography
        className="h-5 color-orange cursor-pointer ms-2 mt-1"
        onClick={() => {
          setShowModal(false);
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
      <Box>{messageData ? getSupplierTicketMessage() : null}</Box>
    </Paper>
  );
};

export default ViewModalQueries;
