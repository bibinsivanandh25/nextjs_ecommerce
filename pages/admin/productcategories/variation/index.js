import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import ListGroupComponentCopy from "components/molecule/ListGroupComponentCopy";
import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";

const Variation = () => {
  const [setData, setSetData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [variationTitleData, setVariationTitleData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [parentCategory /* , setParentCategory */] = useState([
    { label: "Apparel - Sarees and Dress Materials", id: 1, isSelected: false },
    { label: "Kitchen Items", id: 2, isSelected: false },
    { label: "Groceries", id: 2.4, isSelected: false },
    { label: "Daily use", id: 4, isSelected: false },
    { label: "Crockery", id: 5, isSelected: false },
    { label: "Fun snacks", id: 6, isSelected: false },
  ]);

  const setApparel = [
    { label: "Saree", id: 1, isSelected: false },
    { label: "Woman Jeans", id: 2, isSelected: false },
    { label: "Tops", id: 2.4, isSelected: false },
    { label: "Slim fit jeans", id: 4, isSelected: false },
    { label: "Skirts", id: 5, isSelected: false },
    { label: "Gym wear", id: 5, isSelected: false },
  ];
  const subCatSaree = [
    { label: "Red Saree", id: 1, isSelected: false },
    { label: "Yellow Saree", id: 2, isSelected: false },
  ];

  const variationTitle = [
    {
      label: "Material 1",
      id: 1,
      isSelected: false,
    },
    {
      label: "Material 2",
      id: 2,
      isSelected: false,
    },
    {
      label: "Material 3",
      id: 2.4,
      isSelected: false,
    },
  ];

  const options = [
    {
      label: "Material 1",
      id: 1,
      isSelected: false,
    },
    {
      label: "Material 2",
      id: 2,
      isSelected: false,
    },
    {
      label: "Material 3",
      id: 3,
      isSelected: false,
    },
  ];

  const subCatJeans = [
    { label: "Levis Jeans", id: 1, isSelected: false },
    { label: "Net Play Jeans", id: 2, isSelected: false },
    { label: "Peter England Jeans", id: 2, isSelected: false },
  ];
  const subCatTops = [
    { label: "Black Top", id: 1, isSelected: false },
    { label: "Yellow Tops", id: 2, isSelected: false },
    { label: "Red Top", id: 2, isSelected: false },
    { label: "Voilet Top", id: 2, isSelected: false },
    { label: "Blue Top", id: 2, isSelected: false },
  ];
  const subCatSkirt = [
    { label: "Skirt One", id: 1, isSelected: false },
    { label: "Skirt Two", id: 2, isSelected: false },
    { label: "Skirt Three", id: 2, isSelected: false },
    { label: "Skirt Four", id: 2, isSelected: false },
    { label: "Skirt Five", id: 2, isSelected: false },
  ];
  const subCatGymWear = [
    { label: "Wear One", id: 1, isSelected: false },
    { label: "Wear Two", id: 2, isSelected: false },
  ];

  const setGroceries = [
    { label: "Milk Products", id: 1, isSelected: false },
    { label: "Vegetables", id: 2, isSelected: false },
    { label: "Breads", id: 2.4, isSelected: false },
    { label: "Fruits", id: 4, isSelected: false },
    { label: "Edible oils", id: 5, isSelected: false },
    { label: "Creams", id: 5, isSelected: false },
  ];

  const setCrockery = [
    { label: "Plates", id: 1, isSelected: false },
    { label: "Glasses", id: 2, isSelected: false },
    { label: "Bowls", id: 2.4, isSelected: false },
    { label: "Spoons", id: 4, isSelected: false },
  ];

  const setFunSnacks = [
    { label: "Bingo", id: 1, isSelected: false },
    { label: "Kukure", id: 2, isSelected: false },
    { label: "Cheetos", id: 2.4, isSelected: false },
    { label: "Cornitos", id: 4, isSelected: false },
  ];

  const handleParentCategoryChange = (selectedItem) => {
    if (selectedItem[0]?.id === 1) {
      setSetData(setApparel);
    }
    if (selectedItem[0]?.id === 2) {
      setSetData(setGroceries);
    }
    if (selectedItem[0]?.id === 2.4) {
      setSetData(setGroceries);
    }
    if (selectedItem[0]?.id === 4) {
      setSetData(setGroceries);
    }
    if (selectedItem[0]?.id === 5) {
      setSetData(setCrockery);
    }
    if (selectedItem[0]?.id === 6) {
      setSetData(setFunSnacks);
    }
  };

  const handleSetChange = (selectedItem) => {
    if (selectedItem[0]?.id === 1) {
      setSubCategoryData(subCatSaree);
    }
    if (selectedItem[0]?.id === 2) {
      setSubCategoryData(subCatJeans);
    }
    if (selectedItem[0]?.id === 2.4) {
      setSubCategoryData(subCatTops);
    }
    if (selectedItem[0]?.id === 4) {
      setSubCategoryData(subCatSkirt);
    }
    if (selectedItem[0]?.id === 4) {
      setSubCategoryData(subCatGymWear);
    }
  };

  const handleSubCategoryChange = (selectedItem) => {
    if (selectedItem[0]?.id === 1) {
      setVariationTitleData(variationTitle);
    }
    if (selectedItem[0]?.id === 2) {
      setVariationTitleData(variationTitle);
    }
  };

  const handleVariationTitleDataChange = (selectedItem) => {
    if (selectedItem[0]?.id === 1) {
      setOptionsData(options);
    }
    if (selectedItem[0]?.id === 2) {
      setOptionsData(options);
    }
    if (selectedItem[0]?.id === 2.4) {
      setOptionsData(options);
    }
  };

  const handleStartDate = (val) => {
    const theStartDateValue = new Date(val);
    if (endDate) {
      const startDateTime = theStartDateValue.getTime();
      const endDateTime = new Date(endDate).getTime();
      if (startDateTime > endDateTime) {
        setStartDate("");
      } else {
        setStartDate(val);
      }
    } else {
      setStartDate(val);
    }
  };

  const handleEndDate = (val) => {
    const theEndDateValue = new Date(val);
    if (startDate) {
      const endDateTime = theEndDateValue.getTime();
      const startDateTime = new Date(startDate).getTime();
      if (startDateTime > endDateTime) {
        setEndDate("");
      } else {
        setEndDate(val);
      }
    } else {
      setEndDate(val);
    }
  };

  return (
    <Box>
      <Paper className="overflow-auto hide-scrollbar p-3 mnh-85vh mxh-85vh">
        <Box className="d-flex justify-content-between align-items-center px-4">
          <Typography className="color-orange h-4 fw-bold">
            Variation
          </Typography>
          <Box className="d-flex">
            <Box className="d-flex align-items-center">
              <Typography className="h-5 fw-bold">From Date: </Typography>
              <CustomDatePickerComponent
                onDateChange={(val) => {
                  handleStartDate(val);
                }}
                value={startDate}
              />
            </Box>
            <Box className="d-flex ms-4 align-items-center">
              <Typography className="h-5 fw-bold">To Date: </Typography>
              <CustomDatePickerComponent
                onDateChange={(val) => {
                  handleEndDate(val);
                }}
                value={endDate}
              />
            </Box>
          </Box>
        </Box>
        <Box className="mt-4 ms-2.4">
          <Grid container spacing={2}>
            <Grid item xs={2.4}>
              <ListGroupComponent
                title="Parent Category"
                titleClassName="fw-bold"
                data={parentCategory}
                onSelectionChange={(selectedItem) => {
                  handleParentCategoryChange(selectedItem);
                }}
              />
            </Grid>
            {setData.length !== 0 && (
              <Grid item xs={2.4}>
                <ListGroupComponent
                  title="Sets"
                  titleClassName="fw-bold"
                  data={setData}
                  onSelectionChange={(selectedItem) => {
                    handleSetChange(selectedItem);
                  }}
                />
              </Grid>
            )}
            {subCategoryData.length !== 0 && (
              <Grid item xs={2.4}>
                <ListGroupComponent
                  title="Sub Category"
                  titleClassName="fw-bold"
                  data={subCategoryData}
                  onSelectionChange={(selectedItem) => {
                    handleSubCategoryChange(selectedItem);
                  }}
                />
              </Grid>
            )}
            {variationTitleData.length !== 0 && (
              <Grid item xs={2.4}>
                <ListGroupComponentCopy
                  title="Variation Title"
                  titleClassName="fw-bold"
                  data={variationTitleData}
                  onSelectionChange={(selectedItem) => {
                    handleVariationTitleDataChange(selectedItem);
                  }}
                  showSwitchComponent
                  showDeleteButton
                  showRadioBtn
                />
              </Grid>
            )}
            {optionsData.length !== 0 && (
              <Grid item xs={2.4}>
                <ListGroupComponentCopy
                  title="Options"
                  titleClassName="fw-bold"
                  data={optionsData}
                  showSwitchComponent
                  showDeleteButton
                  showCheckBox
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Variation;
