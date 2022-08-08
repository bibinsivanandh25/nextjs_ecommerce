import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomIcon from "services/iconUtils";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DropDownWithAddNewOptions from "@/atoms/DropDownWithAddNewOptions";
import CreateCategoriesModal from "./CreateCategoriesModal";

const CreateCategories = ({ setShowCreateCategories }) => {
  const [variations, setVariations] = useState([
    {
      variationName: "Variation 1",
      variationAttributes: ["Attribute 1", "Attribute 2", "Attribute 3"],
    },
    {
      variationName: "Variation 2",
      variationAttributes: ["Attribute 1", "Attribute 2", "Attribute 3"],
    },
    {
      variationName: "Variation 3",
      variationAttributes: [
        "Attribute 1",
        "Attribute 2",
        "Attribute 3",
        "Attribute 4",
        "Attribute 4",
        "Attribute 4",
      ],
    },
  ]);

  const [attributesArray, setAttributesArray] = useState([]);
  const [currentVariationName, setcurrentVariationName] = useState("");

  const [openCreateCategoriesModal, setOpenCreateCategoriesModal] =
    useState(false);

  const categories = ["Category 1", "Category 2", "Category 3"];
  const sets = ["Set 1", "Set 2", "Set 3"];
  const subCategories = ["Sub category 1", "Sub category 2", "Sub category 3"];

  const getVariations = () => {
    return variations.map((val) => {
      return (
        <Box className="d-flex justify-content-between align-items-center mt-2 border-bottom me-5 py-2">
          <Typography className="ms-2">{val.variationName}</Typography>
          <Box className="">
            <CustomIcon
              onIconClick={() => {
                setcurrentVariationName(val.variationName);
                setAttributesArray([...val.variationAttributes]);
              }}
              type="add"
              className="color-orange ms-5"
            />
          </Box>
        </Box>
      );
    });
  };

  const ReturnAttribute = ({ attributeName }) => {
    return (
      <CheckBoxComponent
        label={attributeName}
        className="color-gray"
        lableFontSize="12px"
      />
    );
  };

  //   const returnAttribute = () => {
  //     return;
  //   };

  return (
    <>
      <Box>
        <Paper className="overflow-auto hide-scrollbar">
          <Grid container sx={{ height: "84vh" }}>
            <Grid item xs={6} className="border-end">
              <Typography
                onClick={() => {
                  setShowCreateCategories(false);
                }}
                className="h-5 cursor-pointer color-orange py-2 ps-3"
              >
                {"<"}Back
              </Typography>
              <Box className="w-50 mt-3 ms-5">
                <DropDownWithAddNewOptions
                  label="Category"
                  createAttribute="Create New"
                  options={categories}
                  onAddClick={() => {
                    setOpenCreateCategoriesModal(true);
                  }}
                />
                <DropDownWithAddNewOptions
                  label="Set"
                  createAttribute="Create New"
                  options={sets}
                  margin="mt-4"
                  onAddClick={() => {
                    setOpenCreateCategoriesModal(true);
                  }}
                />
                <DropDownWithAddNewOptions
                  label="Sub Category"
                  createAttribute="Create New"
                  options={subCategories}
                  margin="mt-4"
                  onAddClick={() => {
                    setOpenCreateCategoriesModal(true);
                  }}
                />
              </Box>
              {attributesArray.length > 0 && attributesArray.length <= 4 && (
                <Box className="ms-4 mt-4">
                  <Typography className="color-gray">
                    {currentVariationName}
                  </Typography>
                  <Box className="d-flex flex-wrap align-items-center">
                    {attributesArray?.map((val) => {
                      return <ReturnAttribute attributeName={val} />;
                    })}

                    <Typography className="color-orange cursor-pointer">
                      + Attribute
                    </Typography>
                  </Box>
                </Box>
              )}
              {attributesArray.length > 4 && (
                <Box className="ms-5 mt-5">
                  <DropDownWithAddNewOptions
                    label={currentVariationName}
                    options={attributesArray}
                    showCheckBox
                    margin="mt-4"
                    createAttribute="Attribute"
                    width="w-50"
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              <Box className="ms-4 mt-5 me-4">
                <Typography className="h-5 fw-bold color-orange">
                  Variation lists
                </Typography>
                {getVariations()}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <CreateCategoriesModal
        openCreateNewCategories={openCreateCategoriesModal}
        setOpenCreateCategoriesModal={setOpenCreateCategoriesModal}
      />
    </>
  );
};

export default CreateCategories;
