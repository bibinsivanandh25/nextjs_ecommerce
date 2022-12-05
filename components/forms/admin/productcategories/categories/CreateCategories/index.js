/* eslint-disable no-use-before-define */
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomIcon from "services/iconUtils";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import DropDownWithAddNewOptions from "@/atoms/DropDownWithAddNewOptions";
import ButtonComponent from "@/atoms/ButtonComponent";
import {
  addVariationToSubCategory,
  getCategory,
  getOptions,
  getStandard,
} from "services/admin/products/productCategories/assignVariation";
import { getSetsList } from "services/admin/products/productCategories/subcategory";
import { getSubCategory } from "services/supplier/AddProducts";
import toastify from "services/utils/toastUtils";
import { VscChromeMinimize } from "react-icons/vsc";
import validateMessage from "constants/validateMessages";
import CreateCategoriesModal from "./CreateCategoriesModal";
import CreateVariationModal from "./CreateVariationModal";

const CreateCategories = () => {
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
  const [variationId, setVariationId] = useState(null);
  const [variationName, setVariationName] = useState("");

  const [openCreateCategoriesModal, setOpenCreateCategoriesModal] =
    useState(false);

  const [newVariationData, setNewVariationData] = useState({
    variationName: "",
    variationAttributes: [],
  });

  const [categoryList, setCategoryList] = useState([]);
  const [setsList, setSetsList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [variationList, setvariationList] = useState([]);
  const [primaryForm, setprimaryForm] = useState({
    category: {},
    set: {},
    subCategory: {},
  });
  const [openVariationModal, setOpenVariationModal] = useState(false);
  const [variationOptionList, setVariationOptionList] = useState([]);
  const [assignableVariation, setAssignableVariation] = useState({});
  const [errorObj, setErrorObj] = useState({
    category: "",
    set: "",
    subCategory: "",
  });

  const resetForm = async () => {
    setErrorObj({
      category: "",
      set: "",
      subCategory: "",
    });
    setprimaryForm({
      category: {},
      set: {},
      subCategory: {},
    });
    setvariationList([]);
    setAssignableVariation([]);
    setVariationOptionList([]);
    await getAllVariation();
  };

  const getOptionsList = async (val) => {
    const { data } = await getOptions(val.id);
    if (data) {
      setVariationOptionList((pre) => {
        return [
          ...pre,
          {
            id: val.id,
            label: val.label,
            options: data.map((item) => ({
              id: item.standardOptionId,
              label: item.optionName,
              isChecked: false,
            })),
          },
        ];
      });
    } else {
      setVariationOptionList((pre) => {
        return [
          ...pre,
          {
            id: val.id,
            label: val.label,
            options: [],
          },
        ];
      });
    }
  };

  const getVariations = () => {
    return variationList.map((val, ind) => {
      return (
        <Box
          className="d-flex justify-content-between align-items-center mt-2 border-bottom me-5 py-2"
          key={val.id}
        >
          <Typography className="ms-2">{val.label}</Typography>
          <Box className="">
            {val.selected ? (
              <VscChromeMinimize
                className=" fs-18 fw-bold me-1 cursor-pointer"
                fill="orange"
                onClick={() => {
                  setVariationOptionList((pre) =>
                    pre.filter((item) => item.id !== val.id)
                  );
                  setvariationList((pre) => {
                    const temp = JSON.parse(JSON.stringify(pre));
                    temp[ind].selected = false;
                    return temp;
                  });
                  const temp = JSON.parse(JSON.stringify(assignableVariation));
                  delete temp[val.label];
                  setAssignableVariation(temp);
                }}
              />
            ) : (
              <CustomIcon
                onIconClick={async () => {
                  setvariationList((pre) => {
                    const temp = JSON.parse(JSON.stringify(pre));
                    temp[ind].selected = true;
                    return temp;
                  });
                  await getOptionsList(val);
                }}
                type="add"
                className="color-orange ms-5"
              />
            )}
          </Box>
        </Box>
      );
    });
  };

  const getCategoriesList = async () => {
    const { data } = await getCategory();
    if (data) {
      setCategoryList(
        data.map((item) => ({
          label: item.mainCategoryName,
          id: item.mainCategoryId,
          commissionType: item.commissionType,
        }))
      );
    } else {
      setCategoryList([]);
    }
  };
  const getAllVariation = async () => {
    const { data, err } = await getStandard();
    if (data) {
      setvariationList(
        data.map((item) => ({
          id: item.standardVariationId,
          label: item.variationName,
          selected: false,
        }))
      );
      setVariationOptionList([]);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const renderOptions = (item, index) => {
    return item?.options?.length < 5 ? (
      <Box className="ms-4 my-3" key={item.id}>
        <Typography className="color-gray">{item.label}</Typography>
        <Box className="d-flex flex-wrap align-items-center">
          {item?.options?.map((val, ind) => {
            return (
              <CheckBoxComponent
                key={val.id}
                label={val.label}
                className="color-orange"
                lableFontSize="12px"
                isChecked={val.isChecked}
                checkBoxClick={(_, checked) => {
                  const temp = JSON.parse(JSON.stringify(variationOptionList));
                  temp[index].options[ind].isChecked = checked;
                  const temp1 = JSON.parse(JSON.stringify(assignableVariation));

                  const checkedOpt = temp[index].options.filter(
                    (ele) => ele.isChecked
                  );
                  if (checkedOpt.length) {
                    temp1[val.id] = checkedOpt;
                  } else {
                    delete temp1[val.id];
                  }
                  setAssignableVariation(temp1);
                  setVariationOptionList(temp);
                }}
              />
            );
          })}

          <Typography
            onClick={() => {}}
            className="color-orange cursor-pointer"
          >
            + Attribute
          </Typography>
        </Box>
      </Box>
    ) : (
      <DropDownWithAddNewOptions
        className="mb-3"
        label={item.label}
        createAttribute="Create New"
        options={item.options}
        onAddClick={() => {}}
        inputLabelShrink
        multiSelectValue={assignableVariation[item.id] ?? []}
        onSelectionChange={(val) => {
          const temp = JSON.parse(JSON.stringify(assignableVariation));
          if (val.length) {
            temp[item.id] = val;
          } else {
            delete temp[item.id];
          }
          setAssignableVariation(temp);
        }}
        multiSelect
      />
    );
  };

  useEffect(() => {
    getCategoriesList();
    getAllVariation();
  }, [variations]);

  const getSetsData = async (id) => {
    const { data } = await getSetsList(id);
    if (data) {
      setSetsList(
        data.map((item) => ({
          label: item.setName,
          id: item.categorySetId,
        }))
      );
    } else {
      setSetsList([]);
    }
  };
  const getSubCategoryData = async (id) => {
    const { data } = await getSubCategory(id);
    if (data) {
      setSubCategoryList(
        data.data.map((item) => ({
          label: item.subCategoryName,
          id: item.subCategoryId,
        }))
      );
    } else {
      setSubCategoryList([]);
    }
  };

  useEffect(() => {
    if (primaryForm.category?.id) getSetsData(primaryForm.category?.id);
  }, [primaryForm.category]);
  useEffect(() => {
    if (primaryForm.set?.id) getSubCategoryData(primaryForm.set?.id);
  }, [primaryForm.set]);

  const validate = () => {
    let flag = false;
    const errObj = {
      category: "",
      set: "",
      subCategory: "",
    };
    if (!primaryForm.category?.id) {
      errObj.category = validateMessage.field_required;
      flag = true;
    }
    if (!primaryForm.set?.id) {
      errObj.set = validateMessage.field_required;
      flag = true;
    }
    if (!primaryForm.subCategory?.id) {
      errObj.subCategory = validateMessage.field_required;
      flag = true;
    }
    setErrorObj(errObj);
    return flag;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      const payload = {
        subCategoryId: primaryForm.subCategory.id,
        standardVariationList: Object.entries(assignableVariation).map(
          ([key, val]) => {
            return {
              variationId: key,
              optionList: val.map((item) => ({ optionId: item.id })),
            };
          }
        ),
        otherVariationList: [],
      };
      const { data, err } = await addVariationToSubCategory(payload);
      if (data) {
        toastify(data.message, "success");
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    }
  };

  return (
    <>
      <Box>
        <Paper className="overflow-auto hide-scrollbar">
          <Grid container className="">
            <Grid
              item
              lg={4}
              md={6}
              sx={{ minHeight: "84vh" }}
              className="border-end "
            >
              <Box className="px-5 mt-3  mb-3  pb-5">
                <DropDownWithAddNewOptions
                  className="mb-3"
                  label="Category"
                  createAttribute="Create New"
                  options={categoryList}
                  onAddClick={() => {}}
                  inputLabelShrink
                  value={primaryForm.category}
                  onSelectionChange={(val) => {
                    setprimaryForm((pre) => ({
                      ...pre,
                      category: val,
                    }));
                  }}
                  helperText={errorObj.category}
                  error={errorObj.category !== ""}
                />

                <DropDownWithAddNewOptions
                  className="mb-3"
                  label="Set"
                  createAttribute="Create New"
                  options={setsList}
                  onAddClick={() => {}}
                  inputLabelShrink
                  value={primaryForm.set}
                  onSelectionChange={(val) => {
                    setprimaryForm((pre) => ({
                      ...pre,
                      set: val,
                    }));
                  }}
                  helperText={errorObj.set}
                  error={errorObj.set !== ""}
                />
                <DropDownWithAddNewOptions
                  label="Sub-Category"
                  createAttribute="Create New"
                  options={subCategoryList}
                  onAddClick={() => {}}
                  inputLabelShrink
                  value={primaryForm.subCategory}
                  onSelectionChange={(val) => {
                    setprimaryForm((pre) => ({
                      ...pre,
                      subCategory: val,
                    }));
                  }}
                  helperText={errorObj.subCategory}
                  error={errorObj.subCategory !== ""}
                />
              </Box>
              <Box className="border-top p-5">
                {variationOptionList.length
                  ? variationOptionList.map((item, index) => {
                      return renderOptions(item, index);
                    })
                  : null}
              </Box>
            </Grid>
            <Grid item lg={8} md={6}>
              <Box
                sx={{ height: "84vh" }}
                className="h-100 d-flex flex-column justify-content-between "
              >
                <Box className="ms-4 mt-5 me-4 mnw-600">
                  <Typography className="h-5 fw-bold color-orange">
                    Variation lists
                  </Typography>
                  <Box className="mxh-50vh overflow-auto">
                    {getVariations()}
                  </Box>
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
                <Box className="d-flex justify-content-end me-2 mb-1">
                  <ButtonComponent
                    label="Reset"
                    variant="outlined"
                    onBtnClick={resetForm}
                  />
                  <ButtonComponent
                    label="Submit"
                    muiProps="ms-2"
                    onBtnClick={handleSubmit}
                  />
                </Box>
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
