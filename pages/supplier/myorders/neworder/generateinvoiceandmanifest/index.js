import { Grid, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";
import logo from "../../../../../public/assets/logo.jpeg";
import ProgressBar from "../../../../../components/atoms/ProgressBar";
import styles from "./Generateinvoiceandmanifest.module.css";
import Image from "next/image";
import { useState } from "react";
import ShowPreviousInvoices from "components/forms/supplier/myorder/showpreviousorder";
const Generateinvoiceandmanifest = () => {
  const [showInvoices, setShowInvoices] = useState(false);
  const columns = [
    {
      id: "col1", //id value in column should be presented in row as key
      label: "Image",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col2",
      label: "Purchase ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
    },
    {
      id: "col3",
      label: "Order ID",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col4",
      label: "Style Code",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col5",
      label: "Size",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col6",
      label: "Weight",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col7",
      label: "Order Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col8",
      label: "Expected Dispatch Date",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
    {
      id: "col9",
      label: "Add weight in grams including packaging",
      minWidth: 100,
      align: "center",
      data_align: "center",
      data_classname: "",
      // data_style: { paddingLeft: "7%" },
    },
  ];
  let rows = [
    {
      id: "1",
      col1: <Image src={logo} height={50} width={50} />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "IN1234",
      col5: "UK34",
      col6: "600gms",
      col7: "28 May 2020",
      col8: "28 May 2020",
      col9: "500",
    },
    {
      id: "1",
      col1: <Image src={logo} height={50} width={50} />,
      col2: "#23234342",
      col3: "#23234342",
      col4: "SL1234",
      col5: "UK34",
      col6: "600gms",
      col7: "28 May 2020",
      col8: "28 May 2020",
      col9: "500",
    },
  ];
  return (
    <>
      {!showInvoices ? (
        <>
          <ProgressBar
            showHeader
            steps={[
              "Accept & confirm Adress",
              "Generate Invoice & Manifest ",
              "Upload Maifest",
            ]}
          />
          <Grid container className="" spacing={1}>
            <Grid
              item
              xs={4}
              className="d-flex flex-column justify-content-end"
            >
              <p
                className={`${styles.Previousinvoicelink} fs-14`}
                onClick={() => {
                  setShowInvoices(true);
                }}
              >
                Show Previous Invoice
              </p>
            </Grid>
            <Grid item xs={2} className="d-flex align-items-center">
              <p className="fs-11 fw-bold mt-2">Show Order with:</p>
              <div className="w-50">
                <SimpleDropdownComponent size="small" label="all" />
              </div>
            </Grid>
            <Grid item xs={2} className="d-flex align-items-center">
              <p className="fs-11 fw-bold mt-2">Shipping Partner:</p>
              <div className="w-50">
                <SimpleDropdownComponent label="all" size="small" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <ButtonComponent
                label="Download selected Invoice and Manifest"
                size="large"
                muiProps="fs-11"
                onBtnClick={() => {}}
              />
            </Grid>
          </Grid>
          <Paper className="mt-2 py-3">
            <TableComponent
              tableRows={[...rows]}
              table_heading="5 Orders Confirmed"
              columns={[...columns]}
            />
          </Paper>
        </>
      ) : (
        <ShowPreviousInvoices setShowInvoices={setShowInvoices} />
      )}
    </>
  );
};
export default Generateinvoiceandmanifest;
