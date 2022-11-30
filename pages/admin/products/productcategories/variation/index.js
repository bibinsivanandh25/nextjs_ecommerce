/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { Box, Grid, Paper, Typography } from "@mui/material";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import ListGroupComponentCopy from "components/molecule/ListGroupComponentCopy";
import CustomDatePickerComponent from "@/atoms/CustomDatePickerComponent";
import CreateSetModal from "@/forms/admin/productcategories/sets/CreateSetModal";
import { useEffect, useState } from "react";
import {
  getAllCategory,
  getAllSetDataById,
  getAllSubCategory,
  getAllVariationData,
} from "services/admin/products/productCategories/variation";
import CreateCategoriesModal from "@/forms/admin/productcategories/categories/CreateCategories/CreateCategoriesModal";

const Variation = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // my state
  const [selectedId, setSelectedId] = useState({
    categoryid: "",
    setid: "",
    subCategoryid: "",
  });
  const [showSetAddModal, setShowSetAddModal] = useState(false);
  const [parentCategory, setParentCategory] = useState([]);
  const [setData, setSetData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [masterVariation, setMasterVariation] = useState([]);
  const [variationTitleData, setVariationTitleData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [catagoryDetails, setCategoryDetails] = useState({});

  const getAllSetById = async (id) => {
    if (id) {
      const { data, err } = await getAllSetDataById(id);
      if (data?.length) {
        const temp = [];
        data.forEach((item) => {
          temp.push({
            label: item.setName,
            id: item.categorySetId,
            isSelected: false,
          });
        });
        setSetData(temp);
      } else if (err) {
        setSetData([]);
      } else {
        setSetData([]);
      }
    } else {
      setSetData([]);
    }
    setSubCategoryData([]);
    setOptionsData([]);
    setVariationTitleData([]);
    setMasterVariation([]);
  };

  const handleParentCategoryChange = (selectedItem) => {
    const temp = [...parentCategory];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setSelectedId((pre) => ({
      categoryid: selectedItem[0]?.id ? selectedItem[0]?.id : "",
      setid: "",
      subCategoryid: "",
    }));
    setParentCategory(temp);
    getAllSetById(selectedItem[0]?.id);
  };
  const getSubCategory = async (id) => {
    if (id) {
      const { data, err } = await getAllSubCategory(id);
      if (data?.length) {
        const temp = [];
        data.forEach((item) => {
          temp.push({
            label: item.subCategoryName,
            id: item.subCategoryId,
            isSelected: false,
          });
        });
        setSubCategoryData(temp);
      } else if (err) {
        setSubCategoryData([]);
      } else {
        setSubCategoryData([]);
      }
    } else {
      setSubCategoryData([]);
    }
  };
  const handleSetChange = (selectedItem) => {
    const temp = [...setData];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setSelectedId((pre) => ({
      ...pre,
      setid: selectedItem[0]?.id ? selectedItem[0]?.id : "",
      subCategoryid: "",
    }));
    setSetData(temp);
    setOptionsData([]);
    setVariationTitleData([]);
    setMasterVariation([]);
    getSubCategory(selectedItem[0]?.id);
  };
  const getAllVariation = async (id) => {
    if (id) {
      const { data, err } = await getAllVariationData(id);
      if (data) {
        const temp = [];
        const variationlist = [];
        if (data?.standardVariationList?.length) {
          variationlist.push(...data.standardVariationList);
          data.standardVariationList.forEach((item) => {
            temp.push({
              label: item.variationName,
              id: item.variationId,
              isSelected: false,
              disable: !item.disable,
            });
          });
        }
        if (data?.othersVariationList?.length) {
          variationlist.push(...data.othersVariationList);
          data.othersVariationList.forEach((item) => {
            temp.push({
              label: item.variationName,
              id: item.otherVariationId,
              isSelected: false,
              disable: !item.disable,
            });
          });
        }
        setVariationTitleData(temp);
        setMasterVariation(variationlist);
      } else if (err) {
        setVariationTitleData([]);
        setMasterVariation([]);
      }
    } else {
      setVariationTitleData([]);
      setMasterVariation([]);
    }
  };

  const handleSubCategoryChange = (selectedItem) => {
    const temp = [...subCategoryData];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setSelectedId((pre) => ({
      ...pre,
      subCategoryid: selectedItem[0]?.id ? selectedItem[0]?.id : "",
    }));
    setSubCategoryData(temp);
    setOptionsData([]);
    getAllVariation(selectedItem[0]?.id);
  };
  console.log(selectedId);
  const getAllOptionData = (id) => {
    const temp = [];
    if (id) {
      masterVariation.forEach((item) => {
        if (item.otherVariationId === id || item.variationId === id) {
          item.optionList?.length &&
            item.optionList.forEach((val) => {
              temp.push({
                label: val.optionName,
                id: val.optionId,
                isSelected: false,
                disable: !item.disable,
              });
            });
        }
      });
    }
    setOptionsData(temp);
  };
  const handleVariationTitleDataChange = (selectedItem) => {
    const temp = [...variationTitleData];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setVariationTitleData(temp);
    getAllOptionData(selectedItem[0]?.id);
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
  // my code
  const handleSetAddClick = () => {
    setShowSetAddModal(true);
  };
  const getAllCategoryData = async () => {
    const { data, err } = await getAllCategory([]);
    if (data?.length) {
      const temp = [];
      data.forEach((item) => {
        temp.push({
          label: item.name,
          id: item.id,
          isSelected: false,
        });
      });
      setParentCategory(temp);
    } else if (err) {
      setParentCategory([]);
    }
  };
  useEffect(() => {
    getAllCategoryData();
  }, []);
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
          <Grid container spacing={1}>
            <Grid item xs={2.4}>
              <ListGroupComponent
                title="Parent Category"
                titleClassName="fw-bold"
                data={parentCategory}
                onSelectionChange={(selectedItem) => {
                  handleParentCategoryChange(selectedItem);
                }}
                addBtnClick={() => {
                  setOpenCategoryModal(true);
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
                  addBtnClick={() => {
                    handleSetAddClick();
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
                  // showRadioBtn
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
                  // showCheckBox
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
      {showSetAddModal && (
        <CreateSetModal
          openCreateSetModal={showSetAddModal}
          setOpenCreateSetModal={setShowSetAddModal}
          type="add"
          getAllSetById={getAllSetById}
          selectedId={selectedId}
        />
      )}
      {openCategoryModal && (
        <CreateCategoriesModal
          modalType="Add"
          openCreateNewCategories={openCategoryModal}
          setOpenCreateCategoriesModal={setOpenCategoryModal}
          getAllCategoryVariation={getAllCategoryData}
          categoryFormData={catagoryDetails}
        />
      )}
    </Box>
  );
};

export default Variation;
