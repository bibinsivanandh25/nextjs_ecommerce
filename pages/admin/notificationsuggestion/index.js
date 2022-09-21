import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";

const listData = [
  {
    id: 1,
    title: " Flat Cash Discount",
  },
  {
    id: 2,
    title: "Spin Cash DiscountFlat Cash Discount",
  },
  {
    id: 3,
    title: "Discount",
  },
  {
    id: 1,
    title: " Flat Cash Discount",
  },
  {
    id: 2,
    title: "Spin Cash Discount",
  },
  {
    id: 3,
    title: "Discount",
  },
  {
    id: 1,
    title: " Flat Cash Discount",
  },
  {
    id: 2,
    title: "Spin Cash Discount",
  },
  {
    id: 3,
    title: "Discount",
  },
  {
    id: 1,
    title: " Flat Cash Discount",
  },
  {
    id: 2,
    title: "Spin Cash Discount",
  },
  {
    id: 3,
    title: "Discount",
  },
  {
    id: 1,
    title: " Flat Cash Discount",
  },
  {
    id: 2,
    title: "Spin Cash Discount",
  },
  {
    id: 3,
    title: "Discount",
  },
];
const NotificationSuggestion = () => {
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [keyData, setKeyData] = useState([]);
  const [error, setError] = useState(false);
  return (
    <Paper className="mnh-85vh mxh-85vh p-3 overflow-auto hide-scrollbar">
      <Box
        display="flex"
        justifyContent="space-between"
        paddingX={2}
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
            setShowModal(true);
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
                <Delete className="cursor-pointer delete-icon-color fs-20 me-1" />
              </Box>
              <Box>
                <Edit className="cursor-pointer delete-icon-color fs-20 me-1" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {showModal && (
        <ModalComponent
          open={showModal}
          onCloseIconClick={() => {
            setShowModal(false);
            setInputValue("");
            setKeyData([]);
            setError(false);
          }}
          footerClassName="justify-content-end border-top"
          ModalTitle="Notification Suggestion"
          titleClassName="h-5 fw-bold color-orange"
        >
          <Box className="m-4">
            <Box
              className="border d-flex align-items-center"
              sx={{
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                position: "relative",
                borderBottomLeftRadius: keyData.length == 0 ? "5px" : "0px",
                borderBottomRightRadius: keyData.length == 0 ? "5px" : "0px",
              }}
            >
              <Typography
                className="h-6 fw-bold bg-white"
                sx={{ position: "absolute", top: -9, left: 20 }}
              >
                &nbsp; Key Word &nbsp;
              </Typography>
              <input
                value={inputValue}
                className="w-100 px-2"
                style={{
                  outline: "none",
                  border: "none",
                  height: "35px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Box
                className="border-start"
                sx={{ borderColor: "black !important" }}
              >
                <Add
                  className="mx-1 cursor-pointer"
                  onClick={() => {
                    if (inputValue.length > 0) {
                      setKeyData((pre) => [inputValue, ...pre]);
                      setInputValue("");
                      setError(false);
                    } else {
                      setError(true);
                    }
                  }}
                />
              </Box>
            </Box>
            {keyData.length > 0 ? (
              <Box className="border border-top-0  mxh-40vh overflow-auto">
                {keyData.map((item, index) => (
                  <Typography
                    className={`color-black fw-bold h-5 py-1 px-2 ${
                      keyData.length > index + 1
                        ? `border-bottom`
                        : `border-bottom-0`
                    }`}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            ) : null}
            {error ? (
              <Typography className="h-6 color-red ">
                This field is required
              </Typography>
            ) : null}
          </Box>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default NotificationSuggestion;
