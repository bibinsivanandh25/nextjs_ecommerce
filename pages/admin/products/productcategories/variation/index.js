/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { Box, Grid, Paper, Typography } from "@mui/material";
import ListGroupComponent from "components/molecule/ListGroupComponent";
import ListGroupComponentCopy from "components/molecule/ListGroupComponentCopy";
import CreateSetModal from "@/forms/admin/productcategories/sets/CreateSetModal";
import { useEffect, useState } from "react";
import {
  deleteOption,
  deleteVariation,
  enableDisableOptions,
  enableDisableVariation,
  getAllCategory,
  getAllSetDataById,
  getAllSubCategory,
  getAllVariationData,
} from "services/admin/products/productCategories/variation";
import CreateCategoriesModal from "@/forms/admin/productcategories/categories/CreateCategories/CreateCategoriesModal";
import CreateSubCategoryModal from "@/forms/admin/productcategories/productsubcategories/CreateSubCategoryModal";
import toastify from "services/utils/toastUtils";
import { getMainCategoryDetailsByCategoryId } from "services/admin/products/productCategories/category";
import { getCategoryById } from "services/admin/products/productCategories/subcategory";

const Variation = () => {
  const [showHeader, setShowHeaders] = useState({
    showset: false,
    showsubcategory: false,
    showVariation: false,
    showoption: false,
  });
  const [selectedId, setSelectedId] = useState({
    categoryid: "",
    setid: "",
    subCategoryid: "",
    variation: [],
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
  const [setDetails, setSetDetails] = useState({
    category: {},
    set: "",
    setImage: "",
    imageFile: "",
    editsetid: "",
  });
  const [selectedCategory, setSelectedCategory] = useState({});
  const [fromType, setFromType] = useState("");
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [modaltype, setmodalType] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategoryValue, setSubCategoryValue] = useState({
    category: {},
    comissionType: "Fixed Commission",
    subcategoryImg: null,
    set: {},
    subcategory: "",
  });

  // get all dropdown data
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
    setSetData([]);
    setSubCategoryData([]);
    setOptionsData([]);
    setVariationTitleData([]);
    setMasterVariation([]);
  };
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
    setOptionsData([]);
    setVariationTitleData([]);
    setMasterVariation([]);
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
    setOptionsData([]);
  };
  const getAllOptionData = (id) => {
    const temp = [];
    if (id) {
      masterVariation.forEach((item) => {
        if (item.otherVariationId === id || item.variationId === id) {
          item.optionList?.length &&
            item.optionList.forEach((val) => {
              temp.push({
                label: val.optionName,
                id: val?.optionId || val?.otherVariationOptionId,
                isSelected: false,
                disable: !val.disable,
              });
            });
        }
      });
    }
    setOptionsData(temp);
  };

  // dropdownClick
  const handleParentCategoryChange = (selectedItem) => {
    if (selectedItem?.length) {
      setSelectedCategory(selectedItem[0]);
      setSubCategoryValue((pre) => ({
        ...pre,
        category: { label: selectedItem[0].label, id: selectedItem[0].id },
      }));
      setShowHeaders({
        showset: true,
        showsubcategory: false,
        showVariation: false,
        showoption: false,
      });
    } else {
      setSelectedCategory({});
      setShowHeaders({
        showset: false,
        showsubcategory: false,
        showVariation: false,
        showoption: false,
      });
    }
    const temp = [...parentCategory];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setSelectedId({
      categoryid: selectedItem[0]?.id ? selectedItem[0]?.id : "",
      setid: "",
      subCategoryid: "",
      variation: [],
    });
    setParentCategory(temp);
    getAllSetById(selectedItem[0]?.id);
  };
  const handleSetChange = (selectedItem) => {
    if (selectedItem.length) {
      setSubCategoryValue((pre) => ({
        ...pre,
        set: { label: selectedItem[0].label, id: selectedItem[0].id },
      }));
      setShowHeaders({
        showset: true,
        showsubcategory: true,
        showVariation: false,
        showoption: false,
      });
    } else {
      setShowHeaders({
        showset: true,
        showsubcategory: false,
        showVariation: false,
        showoption: false,
      });
    }
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
      variation: [],
    }));
    setSetData(temp);
    getSubCategory(selectedItem[0]?.id);
  };
  const handleSubCategoryChange = (selectedItem) => {
    if (selectedItem.length) {
      setShowHeaders({
        showset: true,
        showsubcategory: true,
        showVariation: true,
        showoption: false,
      });
    } else {
      setShowHeaders({
        showset: true,
        showsubcategory: true,
        showVariation: false,
        showoption: false,
      });
    }
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
      variation: [],
    }));
    setSubCategoryData(temp);
    setOptionsData([]);
    getAllVariation(selectedItem[0]?.id);
  };

  const handleVariationTitleDataChange = (selectedItem) => {
    if (selectedItem.length) {
      setShowHeaders({
        showset: true,
        showsubcategory: true,
        showVariation: true,
        showoption: true,
      });
    } else {
      setShowHeaders({
        showset: true,
        showsubcategory: true,
        showVariation: true,
        showoption: false,
      });
    }

    let variationtemp = [];
    if (selectedItem?.length) {
      variationtemp = masterVariation.filter(
        (x) =>
          x.variationId === selectedItem[0].id ||
          x.otherVariationId === selectedItem[0].id
      );
    }

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
    setSelectedId((pre) => ({
      ...pre,
      variation: variationtemp,
    }));
  };
  const handleOptionChange = (selectedItem) => {
    const temp = [...optionsData];
    temp.forEach((item) => {
      if (item.id === selectedItem[0]?.id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    setOptionsData(temp);
  };

  useEffect(() => {
    getAllCategoryData();
  }, []);
  // subcategory add and edit
  const handleSubCategoryAddClick = () => {
    setOpenSubCategory(true);
    setFromType("addVariation");
  };
  const handleSubCategoryEdit = async () => {
    if (selectedId.subCategoryid !== "") {
      const { data, err } = await getCategoryById(selectedId.subCategoryid);
      if (data) {
        setSelectedSubCategory(data);
        setOpenSubCategory(true);
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    } else {
      toastify("please select subcategory", "error");
    }
  };
  // variation enable and delete
  const handleVariationSwitchClick = async (value) => {
    const temp = masterVariation.filter(
      (x) => x.variationId === value.id || x.otherVariationId === value.id
    );
    if (temp?.length) {
      const payload = {
        variationId: temp[0]?.variationId || temp[0].otherVariationId,
        variationType: temp[0].variationType,
        status: !temp[0].disable,
        subcategoryId: selectedId.subCategoryid,
      };
      const { data, err } = await enableDisableVariation(payload);
      if (data) {
        toastify(data?.message, "success");
        getAllVariation(selectedId.subCategoryid);
      } else if (err) {
        toastify(err.response.data.message, "err");
      }
    }
  };
  const handleVariationDelete = async (value) => {
    const temp = masterVariation.filter(
      (x) => x.variationId === value.id || x.otherVariationId === value.id
    );
    if (temp?.length) {
      const payload = {
        subCategoryId: selectedId.subCategoryid,
        variationType: temp[0].variationType,
        variationId: temp[0]?.variationId || temp[0].otherVariationId,
        optionId: "",
      };
      const { data, err } = await deleteVariation(payload);
      if (data) {
        toastify(data?.message, "success");
        getAllVariation(selectedId.subCategoryid);
      } else if (err) {
        toastify(err.response.data.message, "err");
      }
    }
  };
  // option disable and delete
  const handleOptionSwitchClick = async (value) => {
    const payload = {
      variationId: selectedId?.variation[0]?.variationId,
      variationType: selectedId?.variation[0]?.variationType,
      status: value.disable,
      subcategoryId: selectedId.subCategoryid,
      optionId: value.id,
    };

    const { data, err } = await enableDisableOptions(payload);
    if (data) {
      toastify(data.message, "success");
      getAllVariation(selectedId.subCategoryid);
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const handleOptionDelete = async (value) => {
    const payload = {
      subCategoryId: selectedId.subCategoryid,
      variationType: selectedId?.variation[0]?.variationType,
      variationId: selectedId?.variation[0]?.variationId,
      optionId: value.id,
    };
    const { data, err } = await deleteOption(payload);
    if (data) {
      toastify(data.message, "success");
      getAllVariation(selectedId.subCategoryid);
    }
    if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  // category
  const handleCategoryEdit = async () => {
    if (selectedId.categoryid !== "") {
      const { data } = await getMainCategoryDetailsByCategoryId(
        selectedId.categoryid
      );
      if (data) {
        setmodalType("Edit");
        setCategoryDetails(data);
        setOpenCategoryModal(true);
      }
    } else {
      toastify("please select category", "error");
    }
  };
  // set Add and edit
  const handleSetAddClick = () => {
    setFromType("addVariation");
    setmodalType("add");
    setSetDetails((pre) => ({
      ...pre,
      category: {
        id: selectedCategory.id ? selectedCategory.id : "",
        label: selectedCategory.label ? selectedCategory.label : "",
      },
    }));
    setShowSetAddModal(true);
  };
  const handleSetEdit = () => {
    if (selectedId.setid !== "") {
      setmodalType("edit");
      setSelectedData({
        categorySetId: selectedId.setid,
      });
      setShowSetAddModal(true);
    } else {
      toastify("please select sets", "error");
    }
  };
  return (
    <Box>
      <Paper className="overflow-auto hide-scrollbar p-3 mnh-85vh mxh-85vh">
        <Box className="d-flex justify-content-between align-items-center px-4">
          <Typography className="color-orange h-4 fw-bold">
            Variation
          </Typography>
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
                  setmodalType("Add");
                  setOpenCategoryModal(true);
                }}
                editBtnClick={() => handleCategoryEdit()}
              />
            </Grid>
            <Grid item xs={2.4}>
              {showHeader.showset && (
                <ListGroupComponent
                  showTitle={showHeader.showset}
                  title="Sets"
                  titleClassName="fw-bold"
                  data={setData}
                  onSelectionChange={(selectedItem) => {
                    handleSetChange(selectedItem);
                  }}
                  addBtnClick={() => {
                    handleSetAddClick();
                  }}
                  editBtnClick={() => handleSetEdit()}
                />
              )}
            </Grid>
            <Grid item xs={2.4}>
              {showHeader.showsubcategory && (
                <ListGroupComponent
                  showTitle={showHeader.showsubcategory}
                  title="Sub Category"
                  titleClassName="fw-bold"
                  data={subCategoryData}
                  onSelectionChange={(selectedItem) => {
                    handleSubCategoryChange(selectedItem);
                  }}
                  addBtnClick={() => {
                    handleSubCategoryAddClick();
                  }}
                  editBtnClick={() => {
                    handleSubCategoryEdit();
                  }}
                />
              )}
            </Grid>
            <Grid item xs={2.4}>
              {showHeader.showVariation && (
                <ListGroupComponentCopy
                  showTitle={showHeader.showVariation}
                  title="Variation Title"
                  titleClassName="fw-bold"
                  data={variationTitleData}
                  onSelectionChange={(selectedItem) => {
                    handleVariationTitleDataChange(selectedItem);
                  }}
                  showSwitchComponent
                  showDeleteButton
                  handleSwitchToggle={(item) => {
                    handleVariationSwitchClick(item);
                  }}
                  handleDelete={(item) => {
                    handleVariationDelete(item);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={2.4}>
              {showHeader.showoption && (
                <ListGroupComponentCopy
                  showTitle={showHeader.showoption}
                  showAddIcon={false}
                  showEditIcon={false}
                  title="Options"
                  titleClassName="fw-bold"
                  data={optionsData}
                  showSwitchComponent
                  showDeleteButton
                  onSelectionChange={(selectedItem) => {
                    handleOptionChange(selectedItem);
                  }}
                  handleSwitchToggle={(item) => {
                    handleOptionSwitchClick(item);
                  }}
                  handleDelete={(item) => {
                    handleOptionDelete(item);
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {showSetAddModal && (
        <CreateSetModal
          openCreateSetModal={showSetAddModal}
          setOpenCreateSetModal={setShowSetAddModal}
          type={modaltype}
          getAllSetById={getAllSetById}
          selectedId={selectedId}
          setSetDetails={setSetDetails}
          setDetails={setDetails}
          fromType={fromType}
          selectedData={selectedData}
        />
      )}
      {openCategoryModal && (
        <CreateCategoriesModal
          modalType={modaltype}
          openCreateNewCategories={openCategoryModal}
          setOpenCreateCategoriesModal={setOpenCategoryModal}
          getAllCategoryVariation={getAllCategoryData}
          categoryFormData={catagoryDetails}
          setCategoryDetails={setCategoryDetails}
        />
      )}
      {openSubCategory && (
        <CreateSubCategoryModal
          setOpenCreateNewSubCategories={setOpenSubCategory}
          subCategoryData={selectedSubCategory}
          setSubcategoryData={setSelectedSubCategory}
          getSubCategory={getSubCategory}
          subCategoryid={selectedId.setid}
          subCategoryValue={subCategoryValue}
          fromType={fromType}
        />
      )}
    </Box>
  );
};

export default Variation;
