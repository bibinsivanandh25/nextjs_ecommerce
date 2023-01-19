/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
import ButtonComponent from "components/atoms/ButtonComponent";
import TextEditor from "components/atoms/TextEditor";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import validateMessage from "constants/validateMessages";
import { ArrowBack } from "@mui/icons-material";
import {
  getMessages,
  helpandsupportFileUpload,
  replyHelpandSupport,
} from "services/supplier/helpandsupport";
import toastify from "services/utils/toastUtils";
import { useSelector } from "react-redux";
import Image from "next/image";

const HelpandsupportView = ({
  selectedData,
  setShowView = {},
  acceptedTypes = ["png", "jpg", "pdf"],
}) => {
  const user = useSelector((state) => state.customer);
  const inputField = useRef();
  const [formValue, setFormValue] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState("");

  const getContent = (label, value, className) => {
    return (
      <p className="mx-3 my-2">
        <span>{label}</span> :{" "}
        <span className={`fw-bold ${className}`}>{value}</span>
      </p>
    );
  };

  const getClassName = () => {
    if (selectedData?.status?.toLowerCase() === "open") return "text-success";
    if (selectedData?.status?.toLowerCase() === "pending")
      return "text-warning";
    if (selectedData?.status?.toLowerCase() === "rejected")
      return "text-danger";
  };

  const validateForm = () => {
    if (formValue.replace(/<[^>]*>/g, "").length === 0) {
      setError(validateMessage.field_required);
    } else if (formValue.replace(/<[^>]*>/g, "").length > 1000) {
      setError(validateMessage.alpha_numeric_max_1000);
    } else {
      setError(null);
    }
    return Boolean(error);
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
      fileFormData.append("ticketCreatedByType", "CUSTOMER");

      fileFormData.append("ticketCreatedById", user.userid);
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
    if (!validateForm()) {
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
        messageFromType: "CUSTOMER",
        message: formValue,
        imageUrlList: media || [],
      };
      const { data, err, message } = await replyHelpandSupport(payload);
      if (data) {
        setShowView(false);
        toastify(message, "success");
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const [messageData, setMessageData] = useState([]);
  const getTicketMessage = async () => {
    const { data, err } = await getMessages(selectedData.ticketId);
    if (data) {
      setMessageData(data?.data);
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
                    src={item?.imageUrl}
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
  return (
    <Paper className="mnh-80vh">
      <Box
        className="d-flex align-items-center ms-3"
        onClick={() =>
          setShowView({
            show: false,
            id: null,
          })
        }
      >
        <Box
          className="d-inline-block cursor-pointer d-flex ms-2 align-items-center"
          onClick={() =>
            setShowView({
              show: false,
              id: null,
            })
          }
        >
          <Typography className="theme_color cursor-pointer fw-bold">
            <ArrowBack className="h-4" />
          </Typography>
          <Typography className="theme_color cursor-pointer fw-bold">
            Back
          </Typography>
        </Box>
      </Box>
      <p className="fs-16 fw-bold p-3 border-bottom">
        Help & support{" "}
        <span className="fs-12 fw-normal text-secondary">(View & Reply)</span>
      </p>
      <div className="fs-12 border-bottom px-4 py-1">
        {getContent("Date & Time", selectedData.createdDate)}
        {getContent("Ticket ID", selectedData.ticketId)}
        {getContent("Subject", selectedData.issueSubject)}
        {getContent("Status", selectedData.ticketStatus, getClassName())}
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
                {/* <input type="file" hidden ref={inputField} onChange={() => {}} /> */}
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
        </div>
      )}
      <Box>{messageData ? getSupplierTicketMessage() : null}</Box>
    </Paper>
  );
};
export default HelpandsupportView;
