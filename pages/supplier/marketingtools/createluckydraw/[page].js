/* eslint-disable no-use-before-define */
import { Box, Grid, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import GenericForm from "components/forms/supplier/marketingtools/createluckydraw";
import ModalComponent from "components/atoms/ModalComponent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ViewPage from "components/forms/supplier/marketingtools/createluckydraw/ViewPage";
import CustomIcon from "services/iconUtils";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";
import {
  getUserMarketingTool,
  deleteMarketingTool,
} from "services/supplier/marketingtools";

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
      label: "Tool Status",
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

  const [genericForm, setShowGenericForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const [masterData, setMasterData] = useState({});
  const [row, setRow] = useState([]);

  const deleteTool = async (id) => {
    const { data, err, message } = await deleteMarketingTool(id);
    if (data) {
      toastify(message, "success");
      const pagename = getPageName();
      getTableRows(pagename);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const handleTableRows = (data) => {
    const temp = [];
    if (data) {
      data?.forEach((item) => {
        temp.push({
          id: item.marketingToolId,
          col1: item.campaignTitle,
          col2: item.marginType,
          col3: item.category,
          col4: item.subCategory,
          col5: new Date(item.startDateTime).toLocaleString(),
          col6: new Date(item.endDateTime).toLocaleString(),
          col7: new Date(item.createdDate).toLocaleString(),
          col8: item.customerType,
          col9: item.adminApprovalStatus || "--",
          col10:
            item.adminApprovalStatus !== "REJECTED" ? item.toolStatus : "--",
          col11: (
            <div className="d-flex justify-content-center">
              <CustomIcon
                type="remove"
                className="fs-16"
                onIconClick={() => {
                  setshowViewModal({ ...item });
                }}
              />
              <CustomIcon type="share" className="fs-16 mx-1" />
              <CustomIcon
                type="delete"
                className="fs-16"
                onIconClick={() => {
                  deleteTool(item.marketingToolId);
                }}
              />
            </div>
          ),
        });
      });
    }
    return temp;
  };
  const getTableRows = async (pagename) => {
    const { data, err } = await getUserMarketingTool(
      user.supplierId,
      pagename,
      0
    );
    if (data) {
      setMasterData(data);
      if (data.marketingToolResponsePojo) {
        setRow(handleTableRows(data.marketingToolResponsePojo));
      }
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getPageName = () => {
    if (pageName == "createquiz") {
      return "QUIZ";
    }
    if (pageName == "spinwheel") {
      return "SPIN_WHEEL";
    }
    if (pageName == "scratchcard") {
      return "SCRATCH_CARD";
    }
    return null;
  };
  useEffect(() => {
    const pagename = getPageName();
    getTableRows(pagename);
  }, [pageName]);

  return (
    <Paper className="mnh-80vh w-100 p-3">
      {!genericForm ? (
        <div>
          <Grid className="d-flex justify-content-between align-items-center my-2">
            <Grid>
              <Typography className="fs-12 fw-bold">
                Subscription Start Date & time :{" "}
                {masterData.subscriptionStartDateTime
                  ? new Date(
                      masterData.subscriptionStartDateTime
                    ).toLocaleString()
                  : "--"}
              </Typography>
            </Grid>
            <Grid>
              <Typography className="fs-12 fw-bold">
                Subscription End Date & time :{" "}
                {masterData.subscriptionEndDateTime
                  ? new Date(
                      masterData.subscriptionEndDateTime
                    ).toLocaleString()
                  : "--"}
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
                className="h-5 text-primary cursor-pointer py-1"
              >
                Guidelines to Create
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <TableComponent
              tableRows={[...row]}
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

                <Typography className="h-4 text-center">
                  Be cautious that creating quiz does not create any loss to you
                </Typography>
                <ButtonComponent
                  label="Proceed"
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
            open={!!Object.keys(showViewModal).length}
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
          getTableRows={getTableRows}
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
