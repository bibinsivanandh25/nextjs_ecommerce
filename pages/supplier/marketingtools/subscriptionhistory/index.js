import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getSubscriptionHistoryBasedonSupplier } from "services/supplier/marketingtools/subscriptionhistory";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TableComponent from "@/atoms/TableComponent";

const columns = [
  {
    id: "col1", //  id value in column should be presented in row as key
    label: "Subscription Title",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Amount",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Date & Time",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Subscription Period",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Status",
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];

const SubscriptionHistory = () => {
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);

  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.subscriptionTitle,
        col2: row.subscriptionAmount,
        col3: format(new Date(row.purchasedAt), "dd-MM-yyyy HH:mm:ss"),
        col4: `${format(
          new Date(row.activatedAt),
          "dd-MM-yyyy HH:mm:ss"
        )} to ${format(new Date(row.expirationDate), "dd-MM-yyyy HH:mm:ss")}`,
        col5: row.toolStatus,
      });
    });
    return result;
  };

  const supplierId = useSelector((state) => state?.user?.supplierId);

  const getTableData = async (page, date) => {
    console.log(date);
    // if (
    //   (date?.fromDate === "" && date?.toDate === "") ||
    //   (date?.fromDate.length && date?.toDate?.length)
    // ) {
    const payload = {
      userType: "SUPPLIER",
      userId: supplierId,
      fromDate:
        date?.fromDate && date?.toDate
          ? `${format(new Date(date?.fromDate), "MM-dd-yyyy")} 00:00:00`
          : "",
      toDate: date?.toDate
        ? `${format(new Date(date?.toDate), "MM-dd-yyyy")} 00:00:00`
        : "",
    };

    const { data } = await getSubscriptionHistoryBasedonSupplier(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows(mapRowsToTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        setpageNumber((pre) => pre + 1);
      }
    }
    // }
  };

  useEffect(() => {
    getTableData(0);
  }, []);
  return (
    <Paper className="mxh-80vh mnh-80vh overflow-auto hide-scrollbar p-2">
      <TableComponent
        tableRows={[...tableRows]}
        showCheckbox={false}
        columns={[...columns]}
        table_heading="Subscription History"
        showDateFilter
        showDateFilterSearch={false}
        showSearchbar={false}
        handlePageEnd={(
          searchText,
          filterText,
          page = pageNumber,
          filterDate = {}
        ) => {
          console.log({ searchText, filterText, page, filterDate });
          getTableData(page, filterDate);
        }}
        // getFilteredDates={(date) => {
        //   getTableData(0, date);
        // }}
      />
    </Paper>
  );
};
export default SubscriptionHistory;
