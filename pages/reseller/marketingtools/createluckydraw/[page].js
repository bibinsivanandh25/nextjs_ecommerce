import { Delete, RemoveRedEye, Share, WhatsApp } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { format } from "date-fns";
import { useState } from "react";
import GenericForm from "components/forms/reseller/marketingtools/createluckydraw";
import ModalComponent from "components/atoms/ModalComponent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ViewPage from "components/forms/reseller/marketingtools/createluckydraw/ViewPage";

const CreateQuiz = ({ pageName }) => {
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
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
  const [showViewModal, setshowViewModal] = useState({});
  const rows = [
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
          <RemoveRedEye
            className="fs-18"
            onClick={() => {
              setshowViewModal(rows.filter((item) => item.id === "1")[0]);
            }}
          />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
        </div>
      ),
    },
    {
      id: "10",
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
          <RemoveRedEye
            className="fs-18"
            onClick={() => {
              setshowViewModal(rows.filter((item) => item.id === "10")[0]);
            }}
          />
          <WhatsApp className="fs-16" />
          <Share className="fs-16" />
          <Delete className="fs-16" />
        </div>
      ),
    },
  ];

  const [genericForm, setShowGenericForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Paper className="mnh-80vh w-100 p-3">
      {!genericForm ? (
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
                label={`Create ${
                  // eslint-disable-next-line no-nested-ternary
                  pageName === "createquiz"
                    ? "Quiz"
                    : pageName === "spinwheel"
                    ? "Spin Wheel"
                    : "Scratch Card"
                }`}
                onBtnClick={() => {
                  setShowModal(true);
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
                    setShowGenericForm(true);
                  }}
                  muiProps="mx-auto mt-3"
                />
              </Box>
            </Box>
          </ModalComponent>
          <ModalComponent
            open={Object.keys(showViewModal).length}
            ModalTitle="View campain name"
            onCloseIconClick={() => {
              setshowViewModal({});
            }}
            showFooter={false}
            ModalWidth={800}
            titleClassName="color-orange h-4"
          >
            <ViewPage data={showViewModal} pageName={pageName} />
          </ModalComponent>
        </div>
      ) : (
        <GenericForm
          setShowGenericForm={setShowGenericForm}
          pageName={pageName}
        />
      )}
    </Paper>
  );
};
export default CreateQuiz;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: "createquiz" } },
      { params: { page: "spinwheel" } },
      { params: { page: "scratchcard" } },
    ],
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  return { props: { pageName: params.page } };
}
