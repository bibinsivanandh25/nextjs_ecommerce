/* eslint-disable no-nested-ternary */
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
import ChooseBannerModal from "@/forms/supplier/marketingtools/choosebanner";

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
  const [showChooseBanner, setShowChooseBanner] = useState(false);

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
      getTableRows(pagename, 0);
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
  const getTableRows = async (pagename, pageNumber) => {
    const { data, err } = await getUserMarketingTool(
      user.supplierId,
      pagename,
      pageNumber
    );
    if (data) {
      setMasterData(data);
      if (data.marketingToolResponsePojo) {
        setRow(handleTableRows(data.marketingToolResponsePojo));
      }
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
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
    getTableRows(pagename, 0);
  }, [pageName]);

  return (
    <Paper className="mnh-80vh w-100 p-3">
      {!genericForm ? (
        <Box>
          <div>
            <Grid container>
              <Grid item sm={4}>
                <Typography className="fs-12 fw-bold">
                  Subscription Start Date & time :{" "}
                  {masterData.subscriptionStartDateTime
                    ? new Date(
                        masterData.subscriptionStartDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography className="fs-12 fw-bold">
                  Subscription End Date & time :{" "}
                  {masterData.subscriptionEndDateTime
                    ? new Date(
                        masterData.subscriptionEndDateTime
                      ).toLocaleString()
                    : "--"}
                </Typography>
              </Grid>
              <Grid item sm={4} display="flex" justifyContent="end">
                <ButtonComponent
                  variant="outlined"
                  label="Choose Banner"
                  onBtnClick={() => {
                    setShowChooseBanner(true);
                  }}
                  muiProps="mx-2"
                />
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
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12} display="flex" justifyContent="end">
                <Typography className="h-5 text-primary cursor-pointer py-1 me-2">
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
                handlePageEnd={(searchText, searchFilter, page) => {
                  const pagename = getPageName();
                  getTableRows(pagename, page);
                }}
                handleRowsPerPageChange={() => {
                  const pagename = getPageName();
                  getTableRows(pagename, 0);
                }}
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
                    {`Be cautious that creating ${
                      pageName === "createquiz"
                        ? "Quiz"
                        : pageName === "spinwheel"
                        ? "Spin Wheel"
                        : "Scratch Card"
                    } does not create any loss to you`}
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
          {showChooseBanner && (
            <ChooseBannerModal
              open={showChooseBanner}
              closeModal={setShowChooseBanner}
              type={
                pageName === "createquiz"
                  ? "QUIZ"
                  : pageName === "spinwheel"
                  ? "SPIN_WHEEL"
                  : "SCRATCH_CARD"
              }
            />
          )}
        </Box>
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
