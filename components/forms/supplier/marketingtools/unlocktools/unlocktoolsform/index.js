import { Button, Typography } from "@mui/material";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchaseMarketingTool } from "services/supplier/marketingtools/unlocktools/single";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import toastify from "services/utils/toastUtils";
import { useRouter } from "next/router";
import { updateUnlockedTools } from "features/userSlice";
import { getmarketingToolStatus } from "services/supplier";

const UnlockToolsForm = ({
  heading = "",
  rows = [],
  columns = [],
  tableData = [],
  setTableData = () => {},
}) => {
  const [tableRows, setTableRows] = useState([]);

  const route = useRouter();

  const handleRadio = (row, radioId) => {
    const res = tableData.map((i) => {
      if (i[radioId]?.id === row) {
        const result = {};
        Object.entries(i).forEach(([key, value]) => {
          if (key === radioId) {
            result[key] = { ...value, isChecked: true };
          } else if (key.includes("col")) {
            result[key] = { ...value, isChecked: false };
          } else {
            result[key] = value;
          }
        });
        result.isRadioSelected = true;
        return result;
      }
      return i;
    });
    setTableData(res);
  };

  const supplierId = useSelector((state) => state?.user?.supplierId);
  const dispatch = useDispatch();

  const handleBuyNow = async (row) => {
    const price = Object.values(row).filter((value) => value.isChecked);
    const payload = {
      purchasedByType: "SUPPLIER",
      purchasedById: supplierId,
      // subscriptionAmount: price[0].label,
      subscriptionType: "INDIVIDUAL_PRICING",
      subscriptionTypeId: price[0].id,
    };
    const { data, err } = await purchaseMarketingTool(payload);
    if (data) {
      toastify(data.message, "success");
      getmarketingToolStatus(supplierId).then((res) => {
        if (res.data) dispatch(updateUnlockedTools(res.data.unlockedTools));
      });
      route.push("/supplier/marketingtools/subscriptionhistory");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const mapRowsToTable = (data) => {
    const getRadioComponent = (id, label, isChecked, radioId) => {
      return (
        <RadiobuttonComponent
          id={radioId}
          label={<span className="fw-600 fs-14">{label}</span>}
          isChecked={isChecked}
          onRadioChange={() => handleRadio(id, radioId)}
          muiProps={{ size: "small" }}
        />
      );
    };

    const result = [];
    data.forEach((row) => {
      result.push({
        col1: <span className="fw-600">{row.heading}</span>,
        col2: row?.col2?.label?.toString().length
          ? getRadioComponent(
              row?.col2?.id,
              row?.col2?.label,
              row?.col2?.isChecked,
              "col2"
            )
          : "--",
        col3: row?.col3?.label?.toString().length
          ? getRadioComponent(
              row?.col3?.id,
              row?.col3?.label,
              row?.col3?.isChecked,
              "col3"
            )
          : "--",
        col4: row?.col4?.label?.toString().length
          ? getRadioComponent(
              row?.col4?.id,
              row?.col4?.label,
              row?.col4?.isChecked,
              "col4"
            )
          : "--",
        col5: row?.col5?.label?.toString().length
          ? getRadioComponent(
              row?.col5?.id,
              row?.col5?.label,
              row?.col5?.isChecked,
              "col5"
            )
          : "--",
        col6: row?.col6?.label?.toString().length
          ? getRadioComponent(
              row?.col6?.id,
              row?.col6?.label,
              row?.col6?.isChecked,
              "col6"
            )
          : "--",
        col7: row?.col7?.label?.toString().length
          ? getRadioComponent(
              row.col7?.id,
              row.col7?.label,
              row?.col7?.isChecked,
              "col7"
            )
          : "--",
        col8: (
          <Button
            variant="contained"
            className="bg-orange"
            size="small"
            disabled={!row.isRadioSelected}
            onClick={() => {
              handleBuyNow(row);
            }}
            sx={{ textTransform: "none" }}
          >
            Buy Now
          </Button>
        ),
      });
    });
    return result;
  };

  useEffect(() => {
    setTableData(rows);
  }, []);

  useEffect(() => {
    if (tableData.length) {
      setTableRows(mapRowsToTable(tableData));
    }
  }, [tableData]);

  return (
    <>
      <Typography className="color-orange h-4 fw-bold ps-3 mb-1">
        {heading}
      </Typography>
      <Typography className="fs-14 px-3">
        Generate sample content from the upload wizard. The samples generator
        automatically generated a suit of analytic content based on upload work
        book
      </Typography>
      <TableComponent
        tableRows={tableRows}
        columns={columns}
        showCheckbox={false}
        showSearchbar={false}
        showCellBorders={false}
        showPagination={false}
        showSearchFilter={false}
        tHeadBgColor="bg-light-gray"
      />
    </>
  );
};

export default UnlockToolsForm;
