/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./fixedmargin.module.css";
import ProductsToApprove from "@/forms/admin/products/fixedmargin/ProductsToApprove/index";
import Active from "@/forms/admin/products/fixedmargin/ActiveProducts";
import Updated from "@/forms/admin/products/fixedmargin/Updated";
import Queries from "@/forms/admin/products/fixedmargin/Queries";
import Rejected from "@/forms/admin/products/fixedmargin/Rejected";

const FixedMargin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [tabSelected, setTabSelected] = useState("Products to approve");

  const titles = [
    "Products to approve",
    "Queries",
    "Active",
    "Update",
    "Rejected",
  ];

  const [rowsDataObjectsForApproval, setrowsDataObjectsForApproval] = useState([
    {
      id: 1,
      col1: "#345345 SKM Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1200, mrpPrice: 1500 },
      col9: "PUMA",
      col10: "nothing",
    },
    // {
    //   id: 2,
    //   col1: "#345345 SKM hi Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 100, mrpPrice: 200 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
    // {
    //   id: 3,
    //   col1: "#345345 SKM hello Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 1300, mrpPrice: 2000 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
  ]);

  const [rowsDataObjectsForActive, setRowsDataObjectsForActive] = useState([
    {
      id: 1,
      col1: "01",
      col2: "#ADJHAF",
      col3: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col4: "20 Words Max",
      col5: "#7817823ajhsd/ Some Buisness Name",
      col6: "#8749289",
      col7: 150,
      col8: "150gm",
      col9: "Levis",
      col10: { salePrice: 1200, mrpPrice: 1500 },
      col11: "Gym Equipments",
      col12: "Latest Product",
      col13: "10/11/2021",
      col14: "10/11/2021",
      col15: "nothing",
    },
  ]);

  const [rowsDataObjectsForUpdated, setRowsDataObjectsForUpdated] = useState([
    {
      id: 1,
      col1: "#FGAUJH",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "#FDHJHAB / Some Buisness Name",
      col4: "Category/Subcategory",
      col5: "Changed the Flag to Top Deal",
      col6: "10/11/2021-23:42",
      clo7: "Nothing",
    },
  ]);

  const [rowsDataObjectsForQueries, setRowsDataObjectsForQueries] = useState([
    {
      id: 1,
      col1: "#345345 SKM Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1200, mrpPrice: 1500 },
      col9: "PUMA",
      col10: "nothing",
    },
    // {
    //   id: 2,
    //   col1: "#345345 SKM hi Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 100, mrpPrice: 200 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
    // {
    //   id: 3,
    //   col1: "#345345 SKM hello Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 1300, mrpPrice: 2000 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
  ]);

  const [rowsDataObjectsForRejected, setRowsDataObjectsForRejected] = useState([
    {
      id: 1,
      col1: "#345345 SKM Tex",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Show 20 words max",
      col4: "--",
      col5: "Gym Eqipment (10%) - Rowing Belt",
      col6: "0.500gms/0.720gms",
      col7: 150,
      col8: { salePrice: 1200, mrpPrice: 1500 },
      col9: "PUMA",
      col10: "nothing",
    },
    // {
    //   id: 2,
    //   col1: "#345345 SKM hi Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 100, mrpPrice: 200 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
    // {
    //   id: 3,
    //   col1: "#345345 SKM hello Tex",
    //   col2: {
    //     imgSrc: [
    //       "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
    //     ],
    //     imgCount: 10,
    //   },
    //   col3: "Show 20 words max",
    //   col4: "--",
    //   col5: "Gym Eqipment (10%) - Rowing Belt",
    //   col6: "0.500gms/0.720gms",
    //   col7: 150,
    //   col8: { salePrice: 1300, mrpPrice: 2000 },
    //   col9: "PUMA",
    //   col10: "nothing",
    // },
  ]);

  const returnTabs = () => {
    return titles.map((val, index) => {
      return (
        <Box
          onClick={() => {
            setActiveTab(index);
            setTabSelected(val);
          }}
          className={`px-4 py-1 border fs-14 cursor-pointer 
          ${activeTab === index ? styles.activeTab : styles.inActivetab}
          `}
          key={val}
        >
          <Typography className="cursor-pointer fs-14">{val}</Typography>
        </Box>
      );
    });
  };

  return (
    <>
      {" "}
      <Box>
        <Box className="d-flex mt-3">{returnTabs()}</Box>
        <Paper sx={{ height: "78vh" }} className="overflow-auto hide-scrollbar">
          <Box className="px-1 pt-2">
            {tabSelected === "Products to approve" && (
              <ProductsToApprove
                rowsDataObjectsForApproval={rowsDataObjectsForApproval}
                setrowsDataObjectsForApproval={setrowsDataObjectsForApproval}
              />
            )}

            {tabSelected === "Rejected" && (
              <Rejected
                rowsDataObjectsForRejected={rowsDataObjectsForRejected}
                setrowsDataObjectsForRejected={setRowsDataObjectsForRejected}
              />
            )}

            {tabSelected === "Queries" && (
              <Queries
                rowsDataObjectsForQueries={rowsDataObjectsForQueries}
                setrowsDataObjectsForQueries={setRowsDataObjectsForQueries}
              />
            )}

            {tabSelected === "Active" && (
              <Active
                rowsDataObjectsForActive={rowsDataObjectsForActive}
                setRowsDataObjectsForActive={setRowsDataObjectsForActive}
              />
            )}

            {tabSelected === "Update" && (
              <Updated
                rowsDataObjectsForUpdated={rowsDataObjectsForUpdated}
                setRowsDataObjectsForUpdated={setRowsDataObjectsForUpdated}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default FixedMargin;
