/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import ButtonComponent from "@/atoms/ButtonComponent";
import DrawerComponent from "@/atoms/DrawerComponent";
import MenuOption from "@/atoms/MenuOptions";
import ModalComponent from "@/atoms/ModalComponent";
import TextArea from "@/atoms/SimpleTextArea";
import TableComponent from "@/atoms/TableComponent";
import {
  EditQuestion,
  ReplyQuestion,
  ViewQuestions,
} from "@/forms/customer/helpandsupport/AddandEditModal";
import Notification from "@/forms/customer/mynotification/notification";
import { Box, Grid, Paper, Typography } from "@mui/material";
import SubTabComponent from "components/molecule/SubTabComponent";
import TabsCard from "components/molecule/TabsCard";
import validateMessage from "constants/validateMessages";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteQuary,
  editQuestion,
  getCustomerquary,
  getProductquary,
  replyProductQuery,
  viewProductQuery,
  viewQuery,
} from "services/customer/notification";
import CustomIcon from "services/iconUtils";
import toastify from "services/utils/toastUtils";

const MyNotification = () => {
  const myQueriescolumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "SI. No.",
      minWidth: 40,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2", //  id value in column should be presented in row as key
      label: "Product image",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3", //  id value in column should be presented in row as key
      label: "Question",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4", //  id value in column should be presented in row as key
      label: "Reply",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5", //  id value in column should be presented in row as key
      label: "Replied By",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6", //  id value in column should be presented in row as key
      label: "Date & Time",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7", //  id value in column should be presented in row as key
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const productQueriescolumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "SI. No.",
      minWidth: 40,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2", //  id value in column should be presented in row as key
      label: "Customer ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3", //  id value in column should be presented in row as key
      label: "Product image",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col4", //  id value in column should be presented in row as key
      label: "Question",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col5", //  id value in column should be presented in row as key
      label: "Reply",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col6", //  id value in column should be presented in row as key
      label: "Replied By",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col7", //  id value in column should be presented in row as key
      label: "Date & Time",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col8", //  id value in column should be presented in row as key
      label: "Action",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
  ];
  const tabList = [
    {
      label: "My Queries",
    },
    {
      label: "Product Queries",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [mianTabs, setMainTabs] = useState([
    {
      label: "My Notification",
      isSelected: true,
    },
    { label: "Queries & Replies", isSelected: false },
  ]);
  const [myQueriesRows, setMyQueriesRows] = useState([]);
  const [productQueriesRows, setProductQueriesRows] = useState([]);
  const storeDetails = useSelector((state) => state.customer);
  const [dateState, setdateState] = useState({ fromDate: "", toDate: "" });
  const [ProductDate, setProductDate] = useState({ fromDate: "", toDate: "" });
  const [pageNumber, setpageNumber] = useState(0);

  const [pageNumberProduct, setpageNumberProduct] = useState(0);

  const [value, setValue] = useState(0);

  const [openEdit, setopenEdit] = useState({
    open: false,
    qid: "",
    type: "",
    vid: "",
  });
  const userName = useSelector((state) => state.customer.customerName);
  const [selectedQuestion, setselectedQuestion] = useState([]);
  const [viewQuertData, setviewQuertData] = useState({});
  const [viewProductQueryData, setviewProductQueryData] = useState([]);
  const [openView, setopenView] = useState({ open: false, type: "", qid: "" });
  const [replyInput, setreplyInput] = useState("");
  const [productReplyInput, setproductReplyInput] = useState("");
  const [errEditMessage, seterrEditMessage] = useState("");
  const [errProductReply, seterrProductReply] = useState("");
  const onClickOfMenuItem = async (ele, id) => {
    if (ele === "Delete") {
      const { message, errRes } = await deleteQuary(id);
      if (message) {
        toastify(message, "success");
        getMyQueriesTableData(0);
      } else if (errRes) {
        toastify(errRes.message, "error");
      }
    } else if (ele === "Edit") {
      setopenEdit({ open: true, qid: id, type: "edit" });
      const payload = {
        questionId: id,
        userid: storeDetails.userId,
      };
      const { data, errRes } = await viewQuery(payload);
      if (data) {
        setreplyInput(data.customerQuestion);
      } else if (errRes) {
        toastify(errRes, "error");
      }
    }
  };
  const handleSelect = (index) => {
    setMainTabs((list) => {
      const theList = list;
      theList.forEach((val, forEachIndex) => {
        if (forEachIndex === index) {
          const theVal = val;
          theVal.isSelected = true;
        } else {
          const theVal = val;
          theVal.isSelected = false;
        }
      });
      return theList;
    });
    setActiveTab(index);
  };
  const getProductQueryData = async (id) => {
    const { data, errRes } = await viewProductQuery(id);
    if (data) {
      setviewProductQueryData(data);
      toastify(data.message, "success");
    } else if (errRes) {
      toastify(errRes, "error");
    }
  };
  const getQuaryData = async (id) => {
    const payload = {
      questionId: id,
      userid: storeDetails.userId,
    };
    const { data, errRes } = await viewQuery(payload);
    if (data) {
      setviewQuertData(data);
      toastify(data.message, "success");
    } else if (errRes) {
      toastify(errRes, "error");
    }
  };
  const mapRowsToTable = (data) => {
    const result = [];

    data?.forEach((row, ind) => {
      result.push({
        id: row.customerQuestionId,
        col1: ind + 1,
        col2: (
          <div className="d-flex justify-content-center">
            {row?.productImages && (
              <Image
                src={row?.productImages[0] || ""}
                showClose={false}
                height={50}
                width={50}
                layout="intrinsic"
              />
            )}
            {row?.productImages?.length && (
              <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
                / {row?.productImages?.length}
              </Typography>
            )}
          </div>
        ),
        col3: row.customerQuestion,
        col4: row.userAnswer ? row.userAnswer : "__",
        col5: row.answerFromType ? row.answerFromType : "__",
        col6: row.createdAt,
        col7: (
          <Grid className="d-flex justify-content-center">
            <Grid>
              <CustomIcon
                type="view"
                title="View"
                onIconClick={() => {
                  // handleViewClick(row, "view");
                  getQuaryData(row.customerQuestionId);
                  setopenView({ open: true, type: "myview" });
                }}
                className="fs-18 me-2 fit-content"
              />
              <MenuOption
                getSelectedItem={(ele) => {
                  onClickOfMenuItem(ele, row.customerQuestionId);
                }}
                options={["Edit", "Delete"]}
                IconclassName="color-gray"
              />
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };
  const mapProductQueryToTable = (data) => {
    const result = [];

    data?.forEach((row, ind) => {
      result.push({
        id: row.customerQuestionId,
        col1: ind + 1,
        col2: row.profileId,
        col3: (
          <div className="d-flex justify-content-center">
            {row?.productImages && (
              <Image
                src={row?.productImages[0] || ""}
                showClose={false}
                height={50}
                width={50}
                layout="intrinsic"
              />
            )}
            {row?.productImages?.length && (
              <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
                / {row?.productImages?.length}
              </Typography>
            )}
          </div>
        ),
        col4: row.customerQuestion,
        col5: row.userAnswer,
        col6: row.answerFromType,
        col7: row.createdAt,
        col8: (
          <Grid className="d-flex justify-content-center">
            <Grid>
              {row.customerQuestionId && (
                <CustomIcon
                  type="view"
                  title="View "
                  onIconClick={() => {
                    setopenView({
                      open: true,
                      type: "productview",
                      qid: row.customerQuestionId,
                    });
                    getProductQueryData(row.variationId);
                    setselectedQuestion({
                      productName: row.productName,
                      productImage: row.productImages,
                    });
                  }}
                  className="fs-18 me-2 fit-content"
                />
              )}
            </Grid>
          </Grid>
        ),
      });
    });
    return result;
  };

  const getMyQueriesTableData = async (
    page = pageNumber,
    keyword = "",
    dates
  ) => {
    const payload = {
      createdBy: storeDetails.userId,
      keyword,
      pageSize: 50,
      pageNumber: page,
      dateFrom: dates?.fromDate,
      dateTo: dates?.toDate,
    };
    const { data, errRes } = await getCustomerquary(payload);
    if (data) {
      if (page === 0) {
        setMyQueriesRows(mapRowsToTable(data?.data?.questionAnswerViewPojo));
        setpageNumber((pre) => pre + 1);
      } else {
        setMyQueriesRows((pre) => [
          ...pre,
          ...mapRowsToTable(data?.data?.questionAnswerViewPojo),
        ]);
        setpageNumber((pre) => pre + 1);
      }
    } else if (errRes) {
      toastify(errRes.message, "error");
      // setTableRows([]);
    }
  };
  useEffect(() => {
    if (value == 0) {
      getMyQueriesTableData(0);
      setpageNumber(0);
      setpageNumberProduct(0);
    }
  }, [value]);
  // product query
  const getProductData = async (
    page = pageNumberProduct,
    keyword = "",
    dates
  ) => {
    const payload = {
      createdBy: storeDetails.userId,
      keyword,
      pageSize: 50,
      pageNumber: page,
      dateFrom: dates?.fromDate,
      dateTo: dates?.toDate,
    };
    const { data, errRes } = await getProductquary(payload);
    if (data) {
      if (page === 0) {
        setProductQueriesRows(
          mapProductQueryToTable(data?.questionAnswerViewPojo)
        );
        setpageNumberProduct((pre) => pre + 1);
      } else {
        setProductQueriesRows((pre) => [
          ...pre,
          ...mapProductQueryToTable(data?.questionAnswerViewPojo),
        ]);
        setpageNumberProduct((pre) => pre + 1);
      }
    } else if (errRes) {
      toastify(errRes, "error");
      // setTableRows([]);
    }
  };
  useEffect(() => {
    if (value == 1) {
      getProductData();
      setpageNumber(0);
      setpageNumberProduct(0);
    }
  }, [value]);
  const replyMsgCloseIcon = () => {
    setopenEdit({ open: false, qid: "", type: "" });
    setproductReplyInput("");
    seterrProductReply("");
  };
  const submitReply = async () => {
    if (productReplyInput === "") {
      seterrProductReply(validateMessage.field_required);
      return false;
    }
    const payload = {
      customerQuestionId: openEdit.qid,
      answerFromType: "CUSTOMER",
      answer: productReplyInput,
    };
    const { data, errRes } = await replyProductQuery(payload);
    if (data) {
      toastify(data, "success");
    } else if (errRes) {
      toastify(errRes, "error");
    }
    seterrProductReply("");
  };
  const editQuestionSave = async () => {
    if (replyInput === "") {
      seterrEditMessage(validateMessage.field_required);
      return false;
    }
    const payload = {
      question: replyInput,
      customerQuestionId: openEdit.qid,
      createdBy: storeDetails.userId,
    };
    const { data, errRes } = await editQuestion(payload);
    if (data) {
      toastify(data, "success");
      getMyQueriesTableData(0);
      setopenEdit({ open: false, qid: "", type: "" });
    } else if (errRes) {
      toastify(errRes, "error");
    }
    seterrEditMessage("");

    return null;
  };
  const getParagraph = (param1, param2) => {
    return (
      <Grid container my={1}>
        <Grid item xs={4}>
          {param1}
        </Grid>
        <Grid item xs={1}>
          :
        </Grid>
        <Grid item xs={7}>
          {param2}
        </Grid>
      </Grid>
    );
  };
  const getParagraphForDrawer = (param1, param2) => {
    return (
      <Grid container my={1}>
        <Grid item xs={3} className="h-5">
          {param1} :
        </Grid>

        <Grid item xs={8} className="h-5">
          {param2}
        </Grid>
      </Grid>
    );
  };
  const editMsgCloseIcon = () => {
    setopenEdit({ open: false, qid: "", type: "" });
    setreplyInput("");
    seterrEditMessage("");
  };

  const closeDrawer = () => {
    setopenView({ open: false, type: "" });
    setselectedQuestion([]);
  };
  return (
    <Box className="mnh-75vh">
      <TabsCard
        tabList={mianTabs}
        onSelect={(index) => {
          handleSelect(index);
        }}
      >
        {activeTab === 0 ? (
          <></>
        ) : (
          <Box className="py-1">
            <SubTabComponent
              value={value}
              setValue={setValue}
              tabList={tabList}
            />
          </Box>
        )}
      </TabsCard>
      <Paper className="mt-3">
        {activeTab === 0 ? (
          <Notification />
        ) : value === 0 ? (
          <TableComponent
            columns={myQueriescolumns}
            showDateFilter
            handlePageEnd={(searchText, _, page = pageNumber, dates) => {
              getMyQueriesTableData(page, searchText, dates);
            }}
            tableRows={myQueriesRows}
            tabChange={value}
            // tableRows={mapRowsToTable}
          />
        ) : (
          <TableComponent
            columns={productQueriescolumns}
            showDateFilter
            tableRows={productQueriesRows}
            // tableRows={mapProductQueryToTable}
            handlePageEnd={(searchText, _, page = pageNumberProduct, dates) => {
              getProductData(page, searchText, dates);
            }}
            tabChange={value}
          />
        )}
      </Paper>
      <DrawerComponent
        openDrawer={openView.open && openView.type === "productview"}
        modalTitle="Questions and Reply"
        onClose={closeDrawer}
        showCloseIcon
        closeIconClick={closeDrawer}
      >
        <Grid container spacing={3} className="px-2">
          <Grid xs={12} item className="fs-15 fw-500">
            {getParagraphForDrawer(
              "Product name",
              selectedQuestion.productName
            )}
            {getParagraphForDrawer(
              "Product Image",

              <Grid className="d-flex justify-content-between">
                {selectedQuestion?.productImage?.map((item) => {
                  return (
                    <Paper>
                      <Image
                        src={item?.toString()}
                        height={60}
                        width={60}
                        alt="img"
                        layout="intrinsic"
                        className="d-flex justify-content-center align-items-center"
                      />
                    </Paper>
                  );
                })}
              </Grid>
              //  </Grid>
            )}
            <Typography className="d-flex justify-content-center align-items-center fw-600">
              Questions related to this product
            </Typography>
            <Grid
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
              className="px-2"
            >
              {viewProductQueryData?.map((item) => {
                return (
                  item.createdBy,
                  (
                    <Grid>
                      {getParagraphForDrawer(
                        `Question`,
                        <Grid>{item.customerQuestion}</Grid>
                      )}
                      {getParagraphForDrawer(
                        item.userAnswer === null ? (
                          <>Reply here</>
                        ) : (
                          <>Answer</>
                        ),
                        <Grid>
                          {item.createdBy === storeDetails.userId ? (
                            <>
                              {item.userAnswer === null ? (
                                <ButtonComponent
                                  variant="outlined"
                                  label="Reply"
                                  onBtnClick={() => {
                                    setopenEdit({
                                      open: true,
                                      qid: item.customerQuestionId,
                                      type: "reply",
                                    });
                                  }}
                                />
                              ) : (
                                <>
                                  <Typography className="fs-15">
                                    {item.userAnswer}
                                    <CustomIcon
                                      type="edit"
                                      title="Edit Answer"
                                      className="fs-14 mx-2 mb-1"
                                      onIconClick={() => {
                                        setopenEdit({
                                          open: true,
                                          qid: item.customerQuestionId,
                                          type: "reply",
                                          vid: item.variationId,
                                        });
                                        setproductReplyInput(item.userAnswer);
                                      }}
                                    />
                                  </Typography>
                                  <Typography className="d-flex justify-content-start fs-12 f-5 ">
                                    <Typography className="color-blue fs-12">
                                      Replied by
                                    </Typography>
                                    &nbsp;
                                    {item.answerFromType.replace("_", " ")}
                                    ,&nbsp;
                                    <>{item.questionAnsweredAt}</>
                                  </Typography>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {item.userAnswer === null ? (
                                <ButtonComponent
                                  variant="outlined"
                                  label="Reply"
                                  onBtnClick={() => {
                                    setopenEdit({
                                      open: true,
                                      qid: item.customerQuestionId,
                                      type: "reply",
                                    });
                                  }}
                                />
                              ) : (
                                <>
                                  <Typography className="fs-15">
                                    {item.userAnswer}
                                  </Typography>
                                  <Typography className="d-flex justify-content-start fs-12 f-5 ">
                                    <Typography className="color-blue fs-12">
                                      Replied by
                                    </Typography>
                                    &nbsp;
                                    {item.answerFromType.replace("_", " ")}
                                    ,&nbsp;
                                    <>{item.questionAnsweredAt}</>
                                  </Typography>
                                </>
                              )}
                            </>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DrawerComponent>

      {openView.open && openView.type === "myview" && (
        <ModalComponent
          titleClassName="fs-16"
          open={openView.open}
          ModalTitle="View"
          showSaveBtn={false}
          showClearBtn={false}
          onCloseIconClick={() => setopenView({ open: false, type: "" })}
          ModalWidth="800px"
        >
          {/* <Grid>This is view modal</Grid> */}
          <ViewQuestions
            getParagraph={getParagraph}
            viewQuertData={viewQuertData}
          />
        </ModalComponent>
      )}
      {openEdit.open && openEdit.type === "edit" && (
        <ModalComponent
          ModalTitle="Edit Your Query"
          open={openEdit.open}
          saveBtnText="Update"
          onCloseIconClick={() => editMsgCloseIcon()}
          onClearBtnClick={() => {
            setreplyInput("");
          }}
          onSaveBtnClick={() => {
            editQuestionSave();
          }}
          footerClassName="f-flex justify-content-end"
        >
          <EditQuestion
            setreplyInput={setreplyInput}
            replyInput={replyInput}
            errEditMessage={errEditMessage}
          />
        </ModalComponent>
      )}
      {openEdit.open && openEdit.type === "reply" && (
        <ModalComponent
          ModalTitle="Reply to customer"
          open={openEdit.open}
          saveBtnText="Submit"
          onCloseIconClick={() => replyMsgCloseIcon()}
          onClearBtnClick={() => {
            setproductReplyInput("");
          }}
          onSaveBtnClick={() => {
            submitReply();
            replyMsgCloseIcon();
            getProductQueryData(openEdit.vid);
          }}
          footerClassName="f-flex justify-content-end"
        >
          <ReplyQuestion
            setproductReplyInput={setproductReplyInput}
            productReplyInput={productReplyInput}
            errProductReply={errProductReply}
          />
        </ModalComponent>
      )}
    </Box>
  );
};
export default MyNotification;
