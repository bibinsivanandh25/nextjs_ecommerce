import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import TabsCard from "components/molecule/TabsCard";
import Articles from "@/forms/admin/media/articles";
import Products from "@/forms/admin/media/products";
import Logos from "@/forms/admin/media/logos";

const Media = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [tabList, setTabList] = useState([
    { label: "Articles", isSelected: true },
    { label: "Products", isSelected: false },
    { label: "Logos", isSelected: false },
  ]);

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

  const [rowsDataObjectsForProducts, setRowsDataObjectsForProducts] = useState([
    {
      id: 1,
      col1: "1",
      col2: "12123",
      col3: {
        imgSrc: [
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
          "https://mrmrscart.s3.ap-south-1.amazonaws.com/APPLICATION-ASSETS/assets/img/Printed+Dress.png",
        ],
        imgCount: 10,
      },
      col4: "#213412323",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
      col11: "--",
      col12: "nothing",
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

  const [rowsDataObjectsForLogos, setRowsDataObjectsForLogos] = useState([
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
      col3: "Show 20 Words Max",
      col4: "#--",
      col5: "--",
      col6: "--",
      col7: "--",
      col8: "--",
      col9: "--",
      col10: "--",
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

  const handleSelect = (index) => {
    setTabList((list) => {
      const theList = list;
      theList.forEach((val, forEachIndex) => {
        if (forEachIndex === index) {
          const theVal = val;
          theVal.isSelected = true;
        } else {
          const theVal = val;
          theVal.isSelected = false;
        }
      });
      return theList;
    });
    setActiveTab(index);
  };

  return (
    <>
      <Box>
        <TabsCard
          tabList={tabList}
          onSelect={(index) => {
            handleSelect(index);
          }}
        >
          <Paper
            sx={{ height: "78vh" }}
            className="overflow-auto hide-scrollbar"
          >
            <Box className="px-1 pt-2">
              {activeTab === 0 && (
                <Articles
                  rowsDataObjectsForArticles={rowsDataObjectsForArticles}
                  setrowsDataObjectsForArticles={setrowsDataObjectsForArticles}
                />
              )}
              {activeTab === 1 && (
                <Products
                  rowsDataObjectsForProducts={rowsDataObjectsForProducts}
                  setrowsDataObjectsForProducts={setRowsDataObjectsForProducts}
                />
              )}

              {activeTab === 2 && (
                <Logos
                  rowsDataObjectsForLogos={rowsDataObjectsForLogos}
                  setRowsDataObjectsForLogos={setRowsDataObjectsForLogos}
                />
              )}
            </Box>
          </Paper>
        </TabsCard>
      </Box>
    </>
  );
};

export default Media;
