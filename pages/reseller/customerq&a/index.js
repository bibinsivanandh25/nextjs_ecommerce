import { Reply, RemoveRedEye } from "@mui/icons-material";
import { Paper, Tooltip } from "@mui/material";
import MenuOption from "components/atoms/MenuOptions";
import ModalComponent from "components/atoms/ModalComponent";
import TableComponent from "components/atoms/TableComponent";
import SubTabComponent from "components/molecule/SubTabComponent";
import { useState } from "react";
import styles from "./customerqna.module.css";
const UnansweredColumns = [
  {
    id: "col1", //id value in column should be presented in row as key
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
let UnansweredRows = [
  {
    id: "1",
    col1: 1,
    col2: "1836268",
    col3: "1",
    col4: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    // col5: (
    //   <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
    //     <div className="w-50 mx-auto">
    //       <p className=" text-truncate  text-align-center">
    //         lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
    //       </p>
    //     </div>
    //   </Tooltip>
    // ),
    // col6: "Rakesh",
    col5: "25 may 2021, 21:22",
    col6: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        <Reply className="fs-5" />
        <RemoveRedEye className="fs-5" />
        <MenuOption
          IconclassName="fs-5"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
  {
    id: "2",
    col1: 1,
    col2: "1836268",
    col3: "1",
    col4: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    // col5: (
    //   <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
    //     <div className="w-50 mx-auto">
    //       <p className=" text-truncate  text-align-center">
    //         lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
    //       </p>
    //     </div>
    //   </Tooltip>
    // ),
    // col6: "Rakesh",
    col5: "25 may 2021, 21:22",
    col6: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        <Reply className="fs-5" />
        <RemoveRedEye className="fs-5" />
        <MenuOption
          IconclassName="fs-5"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
];

const answeredColumns = [
  {
    id: "col1", //id value in column should be presented in row as key
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
let answeredRows = [
  {
    id: "1",
    col1: 1,
    col2: "1836268",
    col3: "1",
    col4: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    col5: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    col6: "Rakesh",
    col7: "25 may 2021, 21:22",
    col8: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        {/* <Reply className="fs-5" /> */}
        <RemoveRedEye className="fs-5" />
        <MenuOption
          IconclassName="fs-5"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
  {
    id: "2",
    col1: 1,
    col2: "1836268",
    col3: "1",
    col4: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    col5: (
      <Tooltip title="lorem asdsdnjk sdfkjb jshdfkj lksdhgj " placement="top">
        <div className="w-50 mx-auto">
          <p className=" text-truncate  text-align-center">
            lorem asdsdnjk sdfkjb jshdfkj lksdhgj{" "}
          </p>
        </div>
      </Tooltip>
    ),
    col6: "Rakesh",
    col7: "25 may 2021, 21:22",
    col8: (
      <div className="d-flex justify-content-center align-items-center text-secondary">
        {/* <Reply className="fs-5" /> */}
        <RemoveRedEye className="fs-5" />
        <MenuOption
          IconclassName="fs-5"
          getSelectedItem={(ele) => console.log(ele)}
        />
      </div>
    ),
  },
];
const CustomerQnA = () => {
  const [tabType, setTabType] = useState("tab1");
  console.log(tabType);
  return (
    <div>
      <div className="d-flex tabcontainer">
        <div
          className={`px-4 py-1 border fs-14 ${
            tabType === "tab1" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => setTabType("tab1")}
        >
          Unanswered
        </div>
        <div
          className={`px-4 py-1 border fs-14 ${
            tabType === "tab2" ? styles.activeTab : styles.inActivetab
          }`}
          onClick={() => setTabType("tab2")}
        >
          Answered
        </div>
      </div>
      <Paper>
        {
          <TableComponent
            tableRows={
              tabType === "tab1" ? [...UnansweredRows] : [...answeredRows]
            }
            columns={
              tabType === "tab1" ? [...UnansweredColumns] : [...answeredColumns]
            }
          />
        }
      </Paper>
    </div>
  );
};
export default CustomerQnA;
