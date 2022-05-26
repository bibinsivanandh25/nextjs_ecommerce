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
  const handleRadio = (row, val, radioId) => {
    const res = tableData.map((i) => {
      if (i.id === row) {
        const ob = { ...i, [radioId]: { ...i[radioId], isChecked: val } };
        return ob;
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
          label={label}
          isChecked={isChecked}
          onRadioChange={(val) => handleRadio(id, val.target.checked, radioId)}
        />
      );
    };

    const result = [];
    data.forEach((row) => {
      result.push({
        col1: row.heading,
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
          <Button variant="outlined" size="small">
            Add to Cart
          </Button>
        ),
        col8: (
          <Button variant="contained" className="bg-orange" size="small">
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
      <Typography className="color-orange fw-600 fs-18">{heading}</Typography>
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
