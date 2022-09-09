/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import { Reply, RemoveRedEye } from "@mui/icons-material";
import { Paper, Tooltip, Typography } from "@mui/material";
import MenuOption from "components/atoms/MenuOptions";
import TableComponent from "components/atoms/TableComponent";
import ReplyModal from "components/forms/reseller/customerq&A/ReplyModal";
import ViewModal from "components/forms/reseller/customerq&A/ViewModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuestionsAndAnswers } from "services/supplier/customerq&a";
import toastify from "services/utils/toastUtils";
import styles from "./customerqna.module.css";

const CustomerQnA = () => {
  const UnansweredColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer Id",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Product Image ",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Question",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    // {
    //   id: "col5",
    //   label: "Reply",
    //   // minWidth: 50,
    //   align: "center",
    //   data_align: "center",
    //   data_classname: "",
    //   // data_style: { paddingLeft: "7%" },
    // },
    // {
    //   id: "col6",
    //   label: "Replied By",
    //   // minWidth: 50,
    //   align: "center",
    //   data_align: "center",
    //   data_classname: "",
    //   // data_style: { paddingLeft: "7%" },
    // },
    {
      id: "col5",
      label: "Date and time",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Action",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  // const UnansweredRows = [
  //   {
  //     id: "1",
  //     col1: 1,
  //     col2: "1836268",
  //     col3: (
  //       <div className="d-flex justify-content-center">
  //         <ImageCard
  //           className="d-inline me-1 my-0"
  //           imgSrc={assetsJson.flower}
  //           showClose={false}
  //           height={30}
  //           width={30}
  //         />
  //         <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
  //           /5
  //         </Typography>
  //       </div>
  //     ),
  //     col4: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     // col5: (
  //     //   <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //     //     <div className="w-50 mx-auto">
  //     //       <p className=" text-truncate  text-align-center">
  //     //         lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //     //       </p>
  //     //     </div>
  //     //   </Tooltip>
  //     // ),
  //     // col6: "Rakesh",
  //     col5: "25 may 2021, 21:22",
  //     col6: (
  //       <div className="d-flex justify-content-center align-items-center text-secondary">
  //         <Reply
  //           className="fs-5 cursor-pointer"
  //           onClick={() => setShowReplyModal(true)}
  //         />
  //         <RemoveRedEye
  //           className="fs-5 cursor-pointer"
  //           onClick={() => setShowViewModal(true)}
  //         />
  //         <MenuOption
  //           IconclassName="fs-5"
  //           getSelectedItem={(ele) => console.log(ele)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "2",
  //     col1: 1,
  //     col2: "1836268",
  //     col3: (
  //       <div className="d-flex justify-content-center">
  //         <ImageCard
  //           className="d-inline me-1 my-0"
  //           imgSrc={assetsJson.flower}
  //           showClose={false}
  //           height={30}
  //           width={30}
  //         />
  //         <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
  //           /5
  //         </Typography>
  //       </div>
  //     ),
  //     col4: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     // col5: (
  //     //   <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //     //     <div className="w-50 mx-auto">
  //     //       <p className=" text-truncate  text-align-center">
  //     //         lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //     //       </p>
  //     //     </div>
  //     //   </Tooltip>
  //     // ),
  //     // col6: "Rakesh",
  //     col5: "25 may 2022, 21:22",
  //     col6: (
  //       <div className="d-flex justify-content-center align-items-center text-secondary">
  //         <Reply className="fs-5 cursor-pointer" />
  //         <RemoveRedEye className="fs-5 cursor-pointer" />
  //         <MenuOption
  //           IconclassName="fs-5"
  //           getSelectedItem={(ele) => console.log(ele)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const answeredColumns = [
    {
      id: "col1", //  id value in column should be presented in row as key
      label: "Sl No",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Customer Id",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Product Image ",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Question",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Reply",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Replied By",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Date and time",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Action",
      // minWidth: 50,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];

  // const answeredRows = [
  //   {
  //     id: "1",
  //     col1: 1,
  //     col2: "1836268",
  //     col3: (
  //       <div className="d-flex justify-content-center">
  //         <ImageCard
  //           className="d-inline me-1 my-0"
  //           imgSrc={assetsJson.flower}
  //           showClose={false}
  //           height={30}
  //           width={30}
  //         />
  //         <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
  //           /5
  //         </Typography>
  //       </div>
  //     ),
  //     col4: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     col5: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     col6: "Rakesh",
  //     col7: "25 may 2021, 21:22",
  //     col8: (
  //       <div className="d-flex justify-content-center align-items-center text-secondary">
  //         {/* <Reply className="fs-5" /> */}
  //         <RemoveRedEye
  //           className="fs-5"
  //           onClick={() => setShowViewModal(true)}
  //         />
  //         <MenuOption
  //           IconclassName="fs-5"
  //           getSelectedItem={(ele) => console.log(ele)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "2",
  //     col1: 1,
  //     col2: "1836268",
  //     col3: (
  //       <div className="d-flex justify-content-center">
  //         <ImageCard
  //           className="d-inline me-1 my-0"
  //           imgSrc={assetsJson.flower}
  //           showClose={false}
  //           height={30}
  //           width={30}
  //         />
  //         <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
  //           /5
  //         </Typography>
  //       </div>
  //     ),
  //     col4: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     col5: (
  //       <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
  //         <div className="w-50 mx-auto">
  //           <p className=" text-truncate  text-align-center">
  //             lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
  //           </p>
  //         </div>
  //       </Tooltip>
  //     ),
  //     col6: "Rakesh",
  //     col7: "25 may 2021, 21:22",
  //     col8: (
  //       <div className="d-flex justify-content-center align-items-center text-secondary">
  //         {/* <Reply className="fs-5" /> */}
  //         <RemoveRedEye className="fs-5" />
  //         <MenuOption
  //           IconclassName="fs-5"
  //           getSelectedItem={(ele) => console.log(ele)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const [tabType, setTabType] = useState("tab1");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [questioncount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [dataForSendingReply, setDataForSendingReply] = useState({
    customerQuestionId: "",
    answerFromTypeId: "",
    variationId: "",
  });
  const [reply, setReply] = useState("");
  const [dataForViewModal, setdataForViewModal] = useState({
    customerQId: "",
    productImages: [],
    question: "",
    dateAndTime: "",
    answer: "",
    varId: "",
  });

  const [pageNoForQuestions, setPageNoForQuestions] = useState(0);
  const [pageNoForAnswers, setPageNoForAnswers] = useState(0);
  const [fromDate] = useState("");
  const [toDate] = useState("");

  const handleOpenReplyModal = (questionId, varId) => {
    setReply("");
    setDataForSendingReply({
      customerQuestionId: questionId,
      variationId: varId,
    });
    setShowReplyModal(true);
  };

  const handleMenuSelecteItemsForAnswers = (ele, answer, questionId, varId) => {
    if (ele === "Edit") {
      console.log("Answer ", answer);
      setReply(answer);
      setDataForSendingReply({
        customerQuestionId: questionId,
        variationId: varId,
      });
      setShowReplyModal(true);
    }
  };

  const handleViewModal = (
    questionId,
    images,
    customerQuestion,
    createdAt,
    userAnswer,
    variationId
  ) => {
    if (userAnswer === "") {
      setdataForViewModal({
        customerQId: questionId,
        productImages: images,
        question: customerQuestion,
        dateAndTime: createdAt,
        answer: "",
        varId: variationId,
      });
    } else {
      setdataForViewModal({
        customerQId: questionId,
        productImages: images,
        question: customerQuestion,
        dateAndTime: createdAt,
        answer: userAnswer,
        varId: variationId,
      });
    }

    setShowViewModal(true);
  };

  const setAnsweredQuestionsRows = (data) => {
    const tempArray = [];
    data.questionAnswerViewPojo.forEach((val, index) => {
      tempArray.push({
        id: val.customerQuestionId,
        col1: index < 9 ? `0${index + 1}` : index + 1,
        col2: val.createdBy,
        col3: (
          <div className="d-flex justify-content-center">
            <Image src={val.productImages[0]} height={40} width={40} />
            <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
              /{val.productImages.length}
            </Typography>
          </div>
        ),
        col4: (
          <Tooltip title={val.customerQuestion} placement="top">
            <div className="w-50 mx-auto">
              <p className=" text-truncate  text-align-center">
                {val.customerQuestion}
              </p>
            </div>
          </Tooltip>
        ),
        col5: (
          <Tooltip title={val.userAnswer} placement="top">
            <div className="w-50 mx-auto">
              <p className=" text-truncate  text-align-center">
                {val.userAnswer}
              </p>
            </div>
          </Tooltip>
        ),
        col6: val.answerFromTypeId,
        col7: val.lastModifiedAt,
        col8: (
          <div className="d-flex justify-content-center align-items-center text-secondary">
            <RemoveRedEye
              className="fs-5"
              onClick={() => {
                handleViewModal(
                  val.customerQuestionId,
                  val.productImages,
                  val.customerQuestion,
                  val.createdAt,
                  val.userAnswer,
                  val.variationId
                );
              }}
            />
            <MenuOption
              IconclassName="fs-5"
              getSelectedItem={(ele) => {
                handleMenuSelecteItemsForAnswers(
                  ele,
                  val.userAnswer,
                  val.customerQuestionId,
                  val.variationId
                );
              }}
            />
          </div>
        ),
      });
    });
    return tempArray;
  };

  const setUnansweredQuestionsRows = (data) => {
    const tempArray = [];
    data.questionAnswerViewPojo.forEach((val, index) => {
      tempArray.push({
        id: val.customerQuestionId,
        col1: index < 9 ? `0${index + 1}` : index + 1,
        col2: val.createdBy,
        col3: (
          <div className="d-flex justify-content-center">
            <Image src={val.productImages[0]} height={40} width={40} />
            <Typography className="d-flex align-items-end justify-content-end flex-column py-1 h-5">
              /{val.productImages.length}
            </Typography>
          </div>
        ),
        col4: (
          <Tooltip title={val.customerQuestion} placement="top">
            <div className="w-50 mx-auto">
              <p className=" text-truncate  text-align-center">
                {val.customerQuestion}{" "}
              </p>
            </div>
          </Tooltip>
        ),
        col5: val.createdAt,
        col6: (
          <div className="d-flex justify-content-center align-items-center text-secondary">
            <Reply
              className="fs-5 cursor-pointer"
              onClick={() => {
                handleOpenReplyModal(val.customerQuestionId, val.variationId);
              }}
            />
            <RemoveRedEye
              className="fs-5 cursor-pointer"
              onClick={() =>
                handleViewModal(
                  val.customerQuestionId,
                  val.productImages,
                  val.customerQuestion,
                  val.createdAt,
                  "",
                  val.variationId
                )
              }
            />
            <MenuOption
              IconclassName="fs-5"
              getSelectedItem={(ele) => console.log(ele)}
              options={["Delete"]}
            />
          </div>
        ),
      });
    });
    return tempArray;
  };

  const supplierId = useSelector((state) => state?.user?.supplierId);
  const getQuestionsOrAnsweredQuestions = async (
    check,
    pageNum = 0,
    keyword = "",
    dateFrom = "",
    dateTo = ""
  ) => {
    const { data, error } = await getQuestionsAndAnswers(
      supplierId,
      {
        status: check,
        keyword,
        dateFrom,
        dateTo,
      },
      pageNum
    );

    console.log(data);

    if (data) {
      if (!check) {
        const tempArray = setUnansweredQuestionsRows(data);
        setQuestionCount(data.count);
        setQuestions([...tempArray]);
      } else if (check) {
        const tempArray = setAnsweredQuestionsRows(data);
        setAnswerCount(data.count);
        setAnswers([...tempArray]);
      }
    }
    if (error) {
      if (tabType === "tab1" && !check) {
        toastify(error?.response?.data?.message, "error");
        setQuestions([]);
      } else if (tabType === "tab2" && check) {
        toastify(error?.response?.data?.message, "error");
        setAnswers([]);
      }
    }
  };

  const getQuestionsOrAnsweredQuestionsForSearch = async (
    check,
    pageNum = tabType === "tab1" ? pageNoForQuestions : pageNoForAnswers,
    keyword = "",
    dateFrom = fromDate,
    dateTo = toDate
  ) => {
    const { data, error } = await getQuestionsAndAnswers(
      supplierId,
      {
        status: check,
        keyword,
        dateFrom,
        dateTo,
      },
      pageNum
    );

    console.log(data);

    if (data) {
      if (!check) {
        const tempArray = setUnansweredQuestionsRows(data);
        if (pageNoForQuestions < Math.floor(data.count / 50))
          setPageNoForQuestions((pre) => pre + 1);
        setQuestionCount(data.count);
        if (pageNoForQuestions === 0) {
          setQuestions([...tempArray]);
        } else {
          setQuestions((pre) => [...pre, ...tempArray]);
        }
      } else if (check) {
        const tempArray = setAnsweredQuestionsRows(data);
        setAnswerCount(data.count);
        if (pageNoForAnswers < Math.floor(data.count / 50))
          setPageNoForAnswers((pre) => pre + 1);
        if (pageNoForAnswers === 0) {
          setAnswers([...tempArray]);
        } else {
          setAnswers((pre) => [...pre, ...tempArray]);
        }
      }
    }
    if (error) {
      if (tabType === "tab1" && !check) {
        setQuestions([]);
      } else if (tabType === "tab2" && check) {
        setAnswers([]);
      }
    }
  };

  useEffect(() => {
    getQuestionsOrAnsweredQuestions(true, 0);
    getQuestionsOrAnsweredQuestions(false, 0);
  }, [tabType]);

  console.log("page number for answers ", pageNoForAnswers);
  const handleSearchClick = (searchText) => {
    console.log(searchText);
    if (!searchText) {
      if (tabType === "tab1") {
        getQuestionsOrAnsweredQuestionsForSearch(false, pageNoForQuestions);
      } else if (tabType === "tab2") {
        getQuestionsOrAnsweredQuestionsForSearch(true, pageNoForAnswers);
      }
      return;
    }
    if (tabType === "tab1") {
      getQuestionsOrAnsweredQuestions(
        false,
        pageNoForQuestions,
        searchText.toUpperCase()
      );
    } else if (tabType === "tab2") {
      getQuestionsOrAnsweredQuestions(
        true,
        pageNoForAnswers,
        searchText.toUpperCase()
      );
    }
  };

  return (
    <div>
      <div className="d-flex tabcontainer">
        <div
          className={`px-4 py-1 border fs-14 ${
            tabType === "tab1" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => setTabType("tab1")}
        >
          {`Unanswered (${questioncount})`}
        </div>
        <div
          className={`px-4 py-1 border fs-14 ${
            tabType === "tab2" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => setTabType("tab2")}
        >
          {`Answered (${answerCount})`}
        </div>
      </div>
      <Paper className="py-2 mnh-80vh mxh-80vh overflow-auto hide-scrollbar">
        <TableComponent
          table_heading=""
          tableRows={tabType === "tab1" ? [...questions] : [...answers]}
          columns={
            tabType === "tab1" ? [...UnansweredColumns] : [...answeredColumns]
          }
          showDateFilter
          showDateFilterBtn={false}
          dateFilterColName={["col5"]}
          searchBarPlaceHolderText="Search By Customer"
          handlePageEnd={(searchText) => {
            handleSearchClick(searchText);
          }}
          handleRowsPerPageChange={() => {
            setPageNoForQuestions(0);
            setPageNoForAnswers(0);
          }}
        />
      </Paper>
      <ViewModal
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        dataForViewModal={dataForViewModal}
        setShowReplyModal={setShowReplyModal}
        tabType={tabType}
        handleOpenReplyModal={handleOpenReplyModal}
        handleMenuSelecteItemsForAnswers={handleMenuSelecteItemsForAnswers}
      />
      <ReplyModal
        showReplyModal={showReplyModal}
        setShowReplyModal={setShowReplyModal}
        dataForSendingReply={dataForSendingReply}
        getQuestionsOrAnsweredQuestions={getQuestionsOrAnsweredQuestions}
        reply={reply}
        setReply={setReply}
        tabType={tabType}
      />
    </div>
  );
};
export default CustomerQnA;
