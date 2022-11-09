import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import {
  deleteNotificationSuggestion,
  getNotificationSuggestion,
  saveNotificationSuggestion,
  updateNotificationSuggestion,
} from "services/admin/admin/adminconfiguration/notificationsuggestion";
import toastify from "services/utils/toastUtils";
import InputFieldWithChip from "@/atoms/InputWithChip";
import validateMessage from "constants/validateMessages";
import InputBox from "@/atoms/InputBoxComponent";

const NotificationSuggestion = () => {
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [keyData, setKeyData] = useState([]);
  const [listData, setlistData] = useState([]);
  const [error, setError] = useState("");
  const [notificationSuggestion, setnotificationSuggestion] = useState(null);

  const getSuggestion = async () => {
    const { data, err } = await getNotificationSuggestion();
    if (data) {
      setlistData(data);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getSuggestion();
  }, []);

  const handleSave = async () => {
    if (showModal === "Create" ? !keyData.length : inputValue === "") {
      setError(validateMessage.field_required);
      return;
    }
    setError("");
    if (!notificationSuggestion) {
      const { data, message, err } = await saveNotificationSuggestion([
        ...keyData,
      ]);
      if (data) {
        toastify(message, "success");
        setShowModal("");
        getSuggestion();
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    } else {
      const { data, message, err } = await updateNotificationSuggestion({
        pushNotificationSuggestionId:
          notificationSuggestion.pushNotificationSuggestionId,
        title: inputValue,
      });
      if (data) {
        toastify(message, "success");
        setShowModal("");
        setKeyData([]);
        setnotificationSuggestion(null);
        getSuggestion();
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  const deleteSuggestion = async (id) => {
    const { data, message, err } = await deleteNotificationSuggestion(id);
    if (data) {
      toastify(message, "success");
      getSuggestion();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box
        display="flex"
        justifyContent="space-between"
        paddingStart={2}
        marginBottom={2}
        className="border-bottom"
      >
        <Typography className="h-4 color-orange fw-bold mb-2">
          Notification Suggestion
        </Typography>
        <ButtonComponent
          label="Create"
          muiProps="mb-2"
          onBtnClick={() => {
            setShowModal("Create");
          }}
        />
      </Box>
      <Grid container className="my-2" gap={2} marginLeft={2}>
        {listData.map((item, ind) => (
          <Grid
            item
            md={2.2}
            sm={3.5}
            xs={12}
            className="border rounded"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onMouseOver={() => {
              setHoverId(ind + 1);
            }}
            onMouseLeave={() => {
              setHoverId("");
            }}
            key={item.pushNotificationSuggestionId}
            sx={{ position: "relative", boxShadow: " 0px 0px 8px #00000014" }}
          >
            <Typography className="h-5 p-2 text-truncate">
              {item.title}
            </Typography>
            <Box
              className={
                hoverId == ind + 1
                  ? "d-block h-100 ps-2 d-flex justify-content-center align-items-center"
                  : "d-none"
              }
              sx={{
                background: "linear-gradient(to right, #fafafa, #d7d7d7)",
                position: "absolute",
                right: 0,
              }}
            >
              <Box>
                <Delete
                  onClick={() => {
                    deleteSuggestion(item.pushNotificationSuggestionId);
                  }}
                  className="hover-class cursor-pointer delete-icon-color fs-20 me-1"
                />
              </Box>
              <Box>
                <Edit
                  onClick={() => {
                    setnotificationSuggestion({ ...item });
                    setInputValue(item.title);
                    setShowModal("Edit");
                  }}
                  className="hover-class cursor-pointer delete-icon-color fs-20 me-1"
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {showModal && (
        <ModalComponent
          open={showModal !== ""}
          onCloseIconClick={() => {
            setShowModal("");
            setKeyData([]);
            setError("");
            setInputValue("");
          }}
          footerClassName="justify-content-end border-top"
          ModalTitle="Notification Suggestion"
          titleClassName="h-5 fw-bold color-orange"
          onClearBtnClick={() => {
            setKeyData([]);
            setInputValue("");
          }}
          onSaveBtnClick={handleSave}
        >
          <Box className="m-4">
            {showModal === "Create" ? (
              <InputFieldWithChip
                label="Key Word"
                inputlabelshrink
                id="keyword"
                handleChange={(e, val) => {
                  setKeyData(val);
                }}
                value={keyData}
                required
                helperText={error}
                error={error !== ""}
              />
            ) : (
              <InputBox
                label="Key Word"
                value={inputValue}
                onInputChange={(e) => {
                  setInputValue(e.target.value);
                }}
                helperText={error}
                error={error !== ""}
              />
            )}
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default NotificationSuggestion;
