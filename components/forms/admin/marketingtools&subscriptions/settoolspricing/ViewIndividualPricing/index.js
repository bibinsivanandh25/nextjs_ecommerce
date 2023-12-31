import TableComponent from "@/atoms/TableComponent";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getPriceChangeHistory } from "services/admin/marketingtools/settoolpricing";

const columns = [
  {
    id: "col1",
    align: "center",
    label: "Sl.No.",
    data_align: "center",
    position: "sticky",
    minWidth: 150,
  },
  {
    id: "col2",
    align: "center",
    label: "Tool Type",
    data_align: "center",
    minWidth: 150,
    position: "sticky",
  },
  {
    id: "col4",
    align: "center",
    label: "Description",
    data_align: "center",
    minWidth: 150,
  },
  {
    id: "col5",
    align: "center",
    label: "Updated By",
    data_align: "center",
    minWidth: 150,
  },
  {
    id: "col6",
    align: "center",
    label: "Updated Date & Time",
    data_align: "center",
    minWidth: 150,
  },
];

const tableFilters = [
  {
    id: 1,
    label: "ALL",
    value: "All",
  },
  {
    id: 1,
    label: "DISCOUNT COUPON",
    value: "DISCOUNT_COUPON",
  },
  {
    id: 2,
    label: "TODAYS DEAL",
    value: "TODAYS_DEAL",
  },
  {
    id: 3,
    label: "SPIN WHEEL",
    value: "SPIN_WHEEL",
  },
  {
    id: 4,
    label: "SCRATCH CARD",
    value: "SCRATCH_CARD",
  },
  {
    id: 5,
    label: "QUIZ",
    value: "QUIZ",
  },
  {
    id: 6,
    label: "PRICE TARGETED",
    value: "PRICE_TARGETED",
  },
  {
    id: 7,
    label: "NOTIFICATIONS",
    value: "NOTIFICATIONS",
  },
  {
    id: 7,
    label: "FLAGS",
    value: "FLAGS",
  },
];
const ViewIndividualPricing = ({
  setShowViewTableType = () => {},
  toolIDs = [],
  showViewTableType = "",
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRows, setTableRows] = useState([]);

  const mapTableRows = (data) => {
    const result = [];
    data.forEach((ele, ind) => {
      result.push({
        col1: ind + 1,
        col2: ele.toolType.replaceAll("_", " "),
        col4: ele.description,
        col5: ele.lastModifiedBy,
        col6: ele.lastModifiedDate,
      });
    });
    return result;
  };

  const getTableRows = async (page, toolName) => {
    const payload = {
      toolId: toolIDs,
      type: showViewTableType,
      toolName: toolName === "All" ? null : toolName,
    };
    const { data } = await getPriceChangeHistory(page, payload);
    if (data) {
      if (page === 0) {
        setTableRows([...mapTableRows(data)]);
        setPageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapTableRows(data)]);
        setPageNumber((pre) => pre + 1);
      }
    } else setTableRows([]);
  };

  useEffect(() => {
    getTableRows(0, null);
  }, [showViewTableType]);
  return (
    <div>
      <Typography
        onClick={() => {
          setShowViewTableType("");
        }}
        className="mb-2  ms-3 h-5  cursor-pointer color-orange py-1"
      >
        {"<"} Back
      </Typography>
      <div className="py-2">
        <TableComponent
          showCheckbox={false}
          columns={[...columns]}
          tableRows={[...tableRows]}
          filterList={tableFilters}
          showSearchFilter={toolIDs.length !== 1}
          showSearchbar={false}
          handlePageEnd={(searchText, searchFilter, page = pageNumber) => {
            getTableRows(page, searchFilter.value ?? null);
          }}
        />
      </div>
    </div>
  );
};
export default ViewIndividualPricing;
