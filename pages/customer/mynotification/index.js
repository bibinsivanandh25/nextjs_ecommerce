import TableComponent from "@/atoms/TableComponent";
import { Box, Paper } from "@mui/material";
import SubTabComponent from "components/molecule/SubTabComponent";
import TabsCard from "components/molecule/TabsCard";
import { useEffect, useState } from "react";

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
  // const [myQueriesRows, setMyQueriesRows] = useState([]);
  // const [productQueriesRows, setProductQueriesRows] = useState([]);

  const [value, setValue] = useState(null);
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

  const getMyQueriesTableData = async () => {};
  // const getProductQueriesTableData = async (
  //   page = 0,
  //   keyword = "",
  //   dateFrom = "",
  //   dateTo = ""
  // ) => {
  //   const { data, error } = await getQuestionsAndAnswers(
  //     supplierId,
  //     {
  //       status: true,
  //       keyword,
  //       dateFrom,
  //       dateTo,
  //     },
  //     page
  //   );
  // };

  useEffect(() => {
    getMyQueriesTableData();
    // getProductQueriesTableData();
  }, [value]);

  return (
    <Box className="mnh-75vh">
      <TabsCard
        tabList={mianTabs}
        onSelect={(index) => {
          handleSelect(index);
        }}
      >
        <Box className="py-1">
          <SubTabComponent
            value={value}
            setValue={setValue}
            tabList={tabList}
          />
        </Box>
      </TabsCard>
      <Paper className="mt-3">
        {activeTab === 0 ? (
          <TableComponent columns={myQueriescolumns} />
        ) : (
          <TableComponent columns={productQueriescolumns} />
        )}
      </Paper>
    </Box>
  );
};
export default MyNotification;
