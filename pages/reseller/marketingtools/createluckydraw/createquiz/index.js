import { Delete, RemoveRedEye, Share, WhatsApp } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { format, parse } from "date-fns";
import { useState } from "react";
import CreatequizForm from "components/forms/reseller/marketingtools/createluckydraw/createquiz";
import ModalComponent from "components/atoms/ModalComponent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const CreateQuiz = () => {
  const columns = [
    {
      id: "col1", //id value in column should be presented in row as key
      label: "Campaign Title",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Margin Type",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Category",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4",
      label: "Sub Category",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5",
      label: "Start Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6",
      label: "End Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7",
      label: "Created Date",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8",
      label: "Customer Type",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col9",
      label: "Admin Approval",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col10",
      label: "Status",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col11",
      label: "Action",
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  let rows = [
    {
      id: "1",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col9: "Approved",
      col10: "Active",
      col11: (
        <div className="d-flex justify-content-between">
          <RemoveRedEye className="fs-18" />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
        </div>
      ),
    },
    {
      id: "1",
      col1: "Quiz",
      col2: "Fixed",
      col3: "Shirts",
      col4: "Formal",
      col5: "12/12/2020",
      col6: "12/02/2021",
      col7: "08/12/2020",
      col8: "Regular",
      col9: "Approved",
      col10: "Active",
      col11: (
        <div className="d-flex justify-content-between">
          <RemoveRedEye className="fs-18" />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
        </div>
      ),
    },
  ];

  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Paper className="mnh-80vh w-100 p-3">
      {!showCreateQuiz ? (
        <div>
          <Grid className="d-flex justify-content-between align-items-center my-2">
            <Grid>
              <Typography className="h-6 fw-bold">
                Subscription Start Date & time:
                {format(new Date(), "dd/mm/yyyy")}
              </Typography>
            </Grid>
            <Grid>
              <Typography className="h-6 fw-bold">
                Subscription End Date & time:{format(new Date(), "dd/mm/yyyy")}
              </Typography>
            </Grid>
            <Grid>
              <ButtonComponent
                variant="outlined"
                label="Create Quiz"
                onBtnClick={() => {
                  setShowModal(true);
                  // setShowCreateQuiz(true);
                }}
              />
              <Typography
                sx={{
                  width: "fit-content",
                  mx: "auto",
                }}
                className="h-6 text-primary cursor-pointer py-1"
              >
                Guidelines to Create
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <TableComponent
              tableRows={[...rows]}
              columns={[...columns]}
              showCheckbox
              showSearchFilter={false}
              showSearchbar={false}
            />
          </Grid>
          <ModalComponent
            ModalTitle="Warning"
            titleClassName="color-orange"
            onCloseIconClick={() => {
              setShowModal(false);
            }}
            showFooter={false}
            showClearBtn={false}
            showSaveBtn={false}
            open={showModal}
          >
            <Box className="w-100 d-flex  justify-content-center">
              <Box className="w-60p mb-4 d-flex flex-column align-items-center m-3">
                <Box>
                  <WarningAmberIcon sx={{ fontSize: "5rem", color: "red" }} />
                </Box>

                <Typography className="h-4">
                  Be cautious that creating quiz does not create any loss to you
                </Typography>
                <ButtonComponent
                  label="Proced"
                  onBtnClick={() => {
                    setShowModal(false);
                    setShowCreateQuiz(true);
                  }}
                  muiProps="mx-auto mt-3"
                />
              </Box>
            </Box>
          </ModalComponent>
        </div>
      ) : (
        <CreatequizForm setShowCreateQuiz={setShowCreateQuiz} />
      )}
    </Paper>
  );
};
export default CreateQuiz;
