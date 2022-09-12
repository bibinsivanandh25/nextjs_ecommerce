/* eslint-disable no-plusplus */
import { Paper } from "@mui/material";
import UnlockToolsForm from "components/forms/supplier/marketingtools/unlocktools/unlocktoolsform";
import { useState, useEffect } from "react";
import { getAllIndividualPricing } from "services/supplier/marketingtools/unlocktools/single";

const UnlockToolsSingle = () => {
  const [tableData, setTableData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const columns = [
    {
      label: "Tools / Subscription Period",
      id: "col1",
    },
    {
      label: "7 Days",
      id: "col2",
    },
    {
      label: "30 Days",
      id: "col3",
    },
    {
      label: "90 Days",
      id: "col4",
    },
    {
      label: "180 Days",
      id: "col5",
    },
    {
      label: "270 Days",
      id: "col6",
    },
    {
      label: "360 Days",
      id: "col7",
    },
    {
      label: "Action",
      id: "col8",
    },
  ];

  const getTableRows = async () => {
    const { data } = await getAllIndividualPricing();
    if (data) {
      const result = [];
      let count;
      data.forEach((ele) => {
        result.push({
          heading: ele.toolName,
          isRadioSelected: false,
        });
        count = 2;
        ele.adminMarketingTools.forEach((item) => {
          result[result.length - 1][`col${count++}`] = {
            label: item.price,
            isChecked: false,
            id: item.adminMarketingToolId,
          };
          result[result.length - 1].id = item.adminMarketingToolId;
        });
      });
      setTableRows([...result]);
    }
  };
  useEffect(() => {
    getTableRows();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      {tableRows.length ? (
        <UnlockToolsForm
          heading="Marketing tools - Get Subscribed and start Attracting your customers
        with Discount & Games"
          columns={columns}
          tableData={tableData}
          setTableData={setTableData}
          rows={tableRows}
        />
      ) : null}
    </Paper>
  );
};

export default UnlockToolsSingle;
