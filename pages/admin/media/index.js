import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Articles from "@/forms/admin/media/articles";
import styles from "./media.module.css";

const Media = () => {
  const [tabSelected, setTabSelected] = useState("Articles");
  const [activeTab, setActiveTab] = useState(0);

  const titles = ["Articles", "Products", "Logos"];

  const [rowsDataObjectsForArticles, setrowsDataObjectsForArticles] = useState([
    {
      id: 1,
      col1: "1",
      col2: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col3: "Jpeg",
      col4: "--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "nothing",
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
      <Box>
        <Box className="d-flex mt-3">{returnTabs()}</Box>
        <Paper sx={{ height: "78vh" }} className="overflow-auto hide-scrollbar">
          <Box className="px-1 pt-2">
            {tabSelected === "Articles" && (
              <Articles
                rowsDataObjectsForArticles={rowsDataObjectsForArticles}
                setrowsDataObjectsForArticles={setrowsDataObjectsForArticles}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Media;
