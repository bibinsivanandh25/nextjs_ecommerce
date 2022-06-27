/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import TableComponent from "components/atoms/TableComponent";
import Image from "next/image";
import { useState } from "react";
import ShowPreviousInvoices from "components/forms/supplier/myorder/showpreviousorder";
import { useRouter } from "next/router";
import ProgressBar from "../../../../../components/atoms/ProgressBar";
import logo from "../../../../../public/assets/logo.jpeg";
import styles from "./Generateinvoiceandmanifest.module.css";

const Generateinvoiceandmanifest = () => {
  const [showInvoices, setShowInvoices] = useState(false);
  const route = useRouter();
  const columns = [
    {
      id: "col1", //  id value in column should be presented in row as key
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
  const rows = [
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
    <Paper sx={{ p: 2 }}>
      {!showInvoices ? (
        <>
          <ProgressBar showHeader />
          <Grid container className="" spacing={1}>
            <Grid
              item
              lg={5}
              className="d-flex flex-column justify-content-end"
            >
              <p
                className={`${styles.Previousinvoicelink} fs-14 cursor-pointer`}
                onClick={() => {
                  setShowInvoices(true);
                }}
              >
                Show Previous Invoice
              </p>
            </Grid>
            <Grid
              item
              lg={7}
              className="d-flex align-items-center justify-content-end"
            >
              <p className="fs-12 fw-bold">Shipping Partner:</p>
              <div className="w-25">
                <SimpleDropdownComponent label="All" size="small" />
              </div>

              <ButtonComponent
                label="Download Invoice"
                size="large"
                muiProps="fs-11 mx-3"
                // onBtnClick={() => {
                //   route.push("/supplier/myorders/neworder/uploadmanifest");
                // }}
              />
              <ButtonComponent
                label="Download Manifest"
                size="large"
                muiProps="fs-11"
                onBtnClick={() => {
                  route.push("/supplier/myorders/neworder/uploadmanifest");
                }}
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
    </Paper>
  );
};
export default Generateinvoiceandmanifest;
