import { Paper } from "@mui/material";
import UnlockToolsForm from "components/forms/reseller/marketingtools/unlocktools/unlocktoolsform";
import { useState } from "react";

const UnlockToolsCombo = () => {
  const [tableData, setTableData] = useState([]);
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
      label: "360 Days",
      id: "col6",
    },
    {
      label: "Action",
      id: "col7",
    },
    {
      label: "",
      id: "col8",
    },
  ];

  const rows = [
    {
      id: 1,
      heading: "Spin Wheels & Scratch Card",
      col2: { label: "₹10", isChecked: false },
      col3: { label: "₹10", isChecked: false },
      col4: { label: "₹10", isChecked: false },
      col5: { label: "₹10", isChecked: false },
      col6: { label: "₹10", isChecked: false },
      col7: { label: "₹10", isChecked: false },
      isRadioSelected: false,
    },
    {
      id: 2,
      heading: "Discount & Todays Deal",
      col2: { label: "₹10", isChecked: false },
      col3: { label: "₹10", isChecked: false },
      col4: { label: "₹10", isChecked: false },
      col5: { label: "₹10", isChecked: false },
      col6: { label: "₹10", isChecked: false },
      col7: { label: "₹10", isChecked: false },
      isRadioSelected: false,
    },
    {
      id: 3,
      heading: "Discounts, Todays Deal, Spin Wheel, Scratch Card & Quiz",
      col2: { label: "₹10", isChecked: false },
      col3: { label: "₹10", isChecked: false },
      col4: { label: "₹10", isChecked: false },
      col5: { label: "₹10", isChecked: false },
      col6: { label: "₹10", isChecked: false },
      col7: { label: "₹10", isChecked: false },
      isRadioSelected: false,
    },
  ];

  return (
    <Paper
      sx={{ p: 3 }}
      className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar"
    >
      <UnlockToolsForm
        heading="Marketing tools - Get Subscribed and start Attracting your customers
        with Discount & Games"
        columns={columns}
        tableData={tableData}
        setTableData={setTableData}
        rows={rows}
      />
    </Paper>
  );
};

export default UnlockToolsCombo;
