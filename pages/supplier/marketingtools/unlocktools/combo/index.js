import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { getToolCampaignByDaysAndStoreType } from "services/supplier/marketingtools/unlocktools/combo";
import toastify from "services/utils/toastUtils";
import { purchaseMarketingTool } from "services/supplier/marketingtools/unlocktools/single";
import { useSelector } from "react-redux";
import ButtonComponent from "@/atoms/ButtonComponent";
import TableComponent from "@/atoms/TableComponent";

const UnlockToolsCombo = () => {
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const columns = [
    {
      align: "center",
      data_align: "center",
      label: "Campaign Title",
      id: "col1",
    },
    {
      align: "center",
      data_align: "center",
      label: "Tools",
      id: "col2",
    },
    {
      align: "center",
      data_align: "center",
      label: "Subscription Period",
      id: "col3",
    },
    {
      align: "center",
      data_align: "center",
      label: "Price",
      id: "col4",
    },
    {
      align: "center",
      data_align: "center",
      label: "Expiry Date",
      id: "col5",
    },
    {
      align: "center",
      data_align: "center",
      label: "Actions",
      id: "col6",
    },
  ];
  const supplierId = useSelector((state) => state?.user?.supplierId);

  const handleBuyNow = async (row) => {
    const payload = {
      purchasedByType: "SUPPLIER",
      purchasedById: supplierId,
      // subscriptionAmount: row.price,
      subscriptionType: "TOOL_CAMPAIGN",
      subscriptionTypeId: row.adminMarketingToolsCampaignId,
    };
    const { data, err } = await purchaseMarketingTool(payload);
    if (data) {
      toastify(data.message, "success");
    } else if (err) {
      toastify(err?.response?.data?.message);
    }
  };
  const mapRowsToTable = (data) => {
    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.title,
        col2: row.adminMarketingTools.map((ele) => {
          const str = ele.replace("_", " ");
          return `${str},   `;
        }),
        col3: row.days,
        col4: row.price,
        col5: row.expiryDuration,
        col6: (
          <ButtonComponent
            label="Buy Now"
            variant="outlined"
            size="small"
            sx={{ fontSize: 8 }}
            className="bg-orange"
            onBtnClick={() => {
              handleBuyNow(row);
            }}
          />
        ),
      });
    });
    return result;
  };
  const getAllTableData = async (page) => {
    const { data } = await getToolCampaignByDaysAndStoreType(page);
    if (data) {
      if (page === 0) {
        setTableRows(mapRowsToTable(data));
        setpageNumber((pre) => pre + 1);
      } else {
        setTableRows((pre) => [...pre, ...mapRowsToTable(data)]);
        setpageNumber((pre) => pre + 1);
      }
    }
  };

  useEffect(() => {
    getAllTableData();
  }, []);

  return (
    <Paper
      sx={{ p: 3 }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <TableComponent
        columns={columns}
        tableRows={tableRows}
        showCheckbox={false}
        showSearchFilter={false}
        searchBarSizeMd={4}
        showSearchbar={false}
        handlePageEnd={(searchText, filterText, page = pageNumber) => {
          getAllTableData(page);
        }}
      />
    </Paper>
  );
};

export default UnlockToolsCombo;
