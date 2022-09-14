import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DropDownWithAddNewOptions from "@/atoms/DropDownWithAddNewOptions";
import ButtonComponent from "@/atoms/ButtonComponent";
import CreateCategoriesModal from "./CreateCategoriesModal";
import CreateVariationModal from "./CreateVariationModal";

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
  const [variationId, setVariationId] = useState(null);
  const [variationName, setVariationName] = useState("");

  const [openCreateCategoriesModal, setOpenCreateCategoriesModal] =
    useState(false);

  const [openCategoryDropDown, setOpenCategoryDropDown] = useState(false);
  const [openSetDropDown, setOpenSetDropDown] = useState(false);
  const [openSubCategoryDropDown, setOpenSubCategoryDropDown] = useState(false);
  const [openVariationDropDown, setOpenVariationDropDown] = useState(false);
  const [newVariationData, setNewVariationData] = useState({
    variationName: "",
    variationAttributes: [],
  });

  const categories = ["Category 1", "Category 2", "Category 3"];
  const sets = ["Set 1", "Set 2", "Set 3"];
  const subCategories = ["Sub category 1", "Sub category 2", "Sub category 3"];

  const [openVariationModal, setOpenVariationModal] = useState(false);

  const getVariations = () => {
    return variations.map((val, index) => {
      return (
        <Box className="d-flex justify-content-between align-items-center mt-2 border-bottom me-5 py-2">
          <Typography className="ms-2">{val.variationName}</Typography>
          <Box className="">
            <CustomIcon
              onIconClick={() => {
                setVariationId(index);
                setVariationName(val.variationName);
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

  useEffect(() => {
    getVariations();
  }, [variations]);

  const ReturnAttribute = ({ attributeName }) => {
    const [isChecked, setIsChecked] = useState(true);
    return (
      <CheckBoxComponent
        label={attributeName}
        className="color-orange"
        lableFontSize="12px"
        isChecked={isChecked}
        checkBoxClick={() => {
          setIsChecked(!isChecked);
        }}
      />
    );
  };

  return (
    <>
      <Box>
        <Paper className="overflow-auto hide-scrollbar">
          <Grid container className="">
            <Grid
              item
              xs={6}
              sx={{ minHeight: "84vh" }}
              className="border-end "
            >
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
                  inputLabelShrink
                  showOptions={openCategoryDropDown}
                  setshowOptions={() => {
                    setOpenCategoryDropDown(!openCategoryDropDown);
                    setOpenSetDropDown(false);
                    setOpenSubCategoryDropDown(false);
                    setOpenVariationDropDown(false);
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
                  inputLabelShrink
                  showOptions={openSetDropDown}
                  setshowOptions={() => {
                    setOpenSetDropDown(!openSetDropDown);
                    setOpenSubCategoryDropDown(false);
                    setOpenVariationDropDown(false);
                    setOpenCategoryDropDown(false);
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
                  inputLabelShrink
                  showOptions={openSubCategoryDropDown}
                  setshowOptions={() => {
                    setOpenSubCategoryDropDown(!openSubCategoryDropDown);
                    setOpenVariationDropDown(false);
                    setOpenCategoryDropDown(false);
                    setOpenSetDropDown(false);
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

                    <Typography
                      onClick={() => {
                        setOpenVariationModal(true);
                      }}
                      className="color-orange cursor-pointer"
                    >
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
                    width="w-60p"
                    onAddClick={() => {
                      setOpenVariationModal(true);
                    }}
                    showOptions={openVariationDropDown}
                    setshowOptions={() => {
                      setOpenVariationDropDown(!openVariationDropDown);
                      setOpenCategoryDropDown(false);
                      setOpenSetDropDown(false);
                      setOpenSubCategoryDropDown(false);
                    }}
                    inputLabelShrink={false}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={6} sx={{ minHeight: "84vh" }} className="h-100">
              <Box className="ms-4 mt-5 me-4">
                <Typography className="h-5 fw-bold color-orange">
                  Variation lists
                </Typography>
                <Box className="mxh-50vh overflow-auto">{getVariations()}</Box>
                <Typography
                  sx={{ border: "1px dashed #e56700" }}
                  className="color-orange cursor-pointer w-50 m-auto text-center mt-4 border-orange py-2"
                  onClick={() => {
                    setAttributesArray([]);
                    setVariationName("");
                    setOpenVariationModal(true);
                    setVariationId(null);
                  }}
                >
                  Add New Variations
                </Typography>
              </Box>
              <Box
                sx={{ top: "90%", left: { md: "80%", lg: "84%" } }}
                className="position-fixed"
              >
                <ButtonComponent label="Reset" variant="outlined" />
                <ButtonComponent label="Submit" muiProps="ms-2" />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <CreateCategoriesModal
        openCreateNewCategories={openCreateCategoriesModal}
        setOpenCreateCategoriesModal={setOpenCreateCategoriesModal}
      />
      <CreateVariationModal
        openVariationModal={openVariationModal}
        setOpenVariationModal={setOpenVariationModal}
        attributesArray={attributesArray}
        variationId={variationId}
        variations={variations}
        setVariations={setVariations}
        variationName={variationName}
        setVariationName={(e) => {
          setVariationName(e?.target?.value);
        }}
        newVariationData={newVariationData}
        setNewVariationData={setNewVariationData}
      />
    </>
  );
};

export default CreateCategories;
