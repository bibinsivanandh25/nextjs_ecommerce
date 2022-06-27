import { Button, Typography } from "@mui/material";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import TableComponent from "components/atoms/TableComponent";
import { useEffect, useState } from "react";

const UnlockToolsForm = ({
  heading = "",
  rows = [],
  columns = [],
  tableData = [],
  setTableData = () => {},
}) => {
  const [tableRows, setTableRows] = useState([]);
  const handleRadio = (row, radioId) => {
    const res = tableData.map((i) => {
      if (i.id === row) {
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
        col2: getRadioComponent(
          row.id,
          row.col2.label,
          row.col2.isChecked,
          "col2"
        ),
        col3: getRadioComponent(
          row.id,
          row.col3.label,
          row.col3.isChecked,
          "col3"
        ),
        col4: getRadioComponent(
          row.id,
          row.col4.label,
          row.col4.isChecked,
          "col4"
        ),
        col5: getRadioComponent(
          row.id,
          row.col5.label,
          row.col5.isChecked,
          "col5"
        ),
        col6: getRadioComponent(
          row.id,
          row.col6.label,
          row.col6.isChecked,
          "col6"
        ),
        col7: (
          <Button
            variant="outlined"
            size="small"
            disabled={!row.isRadioSelected}
            sx={{ textTransform: "none" }}
          >
            Add to Cart
          </Button>
        ),
        col8: (
          <Button
            variant="contained"
            className="bg-orange"
            size="small"
            disabled={!row.isRadioSelected}
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
    setTableRows(mapRowsToTable(tableData));
  }, [tableData]);

  return (
    <>
      <Typography className="color-orange h-4 fw-bold">{heading}</Typography>
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
        tHeadBgColor="bg-light-gray"
      />
    </>
  );
};

export default UnlockToolsForm;
