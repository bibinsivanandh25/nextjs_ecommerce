/* eslint-disable no-use-before-define */
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getCategoryFilter,
  setDropDownData,
} from "services/admin/products/productCategories/sets";

const commissionType = [
  {
    name: "Fixed Commission",
    value: "FIXED_COMMISSION",
    isSelected: false,
  },
  {
    name: "Zero Commission",
    value: "ZERO_COMMISSION",
    isSelected: false,
  },
];
const SetFilterModal = ({
  showFilterModal,
  setShowFilterModal,
  getFilteredValues = () => {},
}) => {
  const [masterCategory, setMasterCategory] = useState([]);
  const [masterCommission, setMasterCommission] = useState(commissionType);
  const [masterSetList, setMsaterSetList] = useState([]);
  const [selectedValue, setSelectedValue] = useState({
    commissiontype: [],
    categoryid: [],
    setid: [],
  });
  const getAllCategoryData = async (value) => {
    const { data, err } = await getCategoryFilter(value);
    if (data?.data?.length) {
      const temp = [];
      data.data.forEach((item) => {
        temp.push({
          id: item.id,
          name: item.name,
        });
      });
      setMasterCategory(temp);
    } else {
      setMasterCategory([]);
    }
    if (err) {
      setMasterCategory([]);
    }
  };
  useEffect(() => {
    getAllCategoryData();
  }, []);

  const hnadleCommisiionClick = (index) => {
    const tempIDs = [];
    const temp = JSON.parse(JSON.stringify(masterCommission));
    temp[index].isSelected = !temp[index].isSelected;
    temp.forEach((item) => {
      if (item.isSelected) {
        tempIDs.push(item.value);
      }
    });
    setMasterCommission(temp);
    getAllCategoryData(tempIDs);
    setSelectedValue((prev) => ({ ...prev, commissiontype: tempIDs }));
    getAllSetList([]);
  };
  const renderCommisssion = () => {
    return (
      <Box className="ms-2">
        {masterCommission.map((item, index) => (
          <Box className="d-flex align-items-center">
            <CheckBoxComponent
              size="small"
              isChecked={item.isSelected}
              checkBoxClick={() => {
                hnadleCommisiionClick(index);
              }}
            />
            <Tooltip title={item.name} placement="top">
              <Typography className="h-5 text-truncate">{item.name}</Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
    );
  };
  const handleCategoryClick = (index) => {
    const tempIDs = [];
    const temp = JSON.parse(JSON.stringify(masterCategory));
    temp[index].isSelected = !temp[index].isSelected;
    temp.forEach((item) => {
      if (item.isSelected) {
        tempIDs.push(item.id);
      }
    });
    getAllSetList(tempIDs);
    setMasterCategory(temp);
    setSelectedValue((prev) => ({ ...prev, categoryid: tempIDs }));
  };
  const renderCategoryList = () => {
    return (
      <Box className="ms-2">
        {masterCategory.map((item, index) => (
          <Box className="d-flex align-items-center">
            <CheckBoxComponent
              size="small"
              isChecked={item.isSelected}
              checkBoxClick={() => {
                handleCategoryClick(index);
              }}
            />
            <Tooltip title={item.name} placement="top">
              <Typography className="h-5 text-truncate">{item.name}</Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
    );
  };
  const getAllSetList = async (payload = []) => {
    const { data, err } = await setDropDownData(payload);
    if (data?.data?.length) {
      const temp = [];
      data.data.forEach((item) => {
        temp.push({
          id: item.categorySetId,
          name: item.setName,
        });
      });
      setMsaterSetList(temp);
    } else {
      setMsaterSetList([]);
    }
    if (err) {
      setMsaterSetList([]);
    }
  };
  useEffect(() => {
    getAllSetList();
  }, []);
  const handleSetClick = (index) => {
    const tempIDs = [];
    const temp = JSON.parse(JSON.stringify(masterSetList));
    temp[index].isSelected = !temp[index].isSelected;
    temp.forEach((item) => {
      if (item.isSelected) {
        tempIDs.push(item.id);
      }
    });
    setMsaterSetList(temp);
    setSelectedValue((prev) => ({ ...prev, setid: tempIDs }));
  };
  const renderSetList = () => {
    return (
      <Box className="ms-2">
        {masterSetList.map((item, index) => (
          <Box className="d-flex align-items-center">
            <CheckBoxComponent
              size="small"
              isChecked={item.isSelected}
              checkBoxClick={() => {
                handleSetClick(index);
              }}
            />
            <Tooltip title={item.name} placement="top">
              <Typography className="h-5 text-truncate">{item.name}</Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
    );
  };
  return (
    <ModalComponent
      open={showFilterModal}
      onCloseIconClick={() => {
        setShowFilterModal(false);
      }}
      ModalWidth={800}
      ModalTitle=""
      showHeader
      titleClassName="color-orange"
      saveBtnText="Apply"
      ClearBtnText="Cancel"
      footerClassName="d-flex justify-content-start flex-row-reverse"
      clearBtnClassName="mx-3"
      showCloseIcon={false}
      showPositionedClose
      headerBorder=""
      onClearBtnClick={() => {
        setShowFilterModal(false);
      }}
      onSaveBtnClick={() => {
        setShowFilterModal(false);
        getFilteredValues(selectedValue);
      }}
    >
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Paper className="h-100">
            <Box
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto"
            >
              <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
                Commission Type
              </Typography>
              {renderCommisssion()}
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper className="h-100">
            <Box
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto"
            >
              <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
                Category
              </Typography>
              {masterCategory?.length ? (
                renderCategoryList()
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Typography className="h-5 fw-bold">
                    No Data Available
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper className="h-100">
            <Box
              style={{
                maxHeight: "55vh",
                minHeight: "350px",
              }}
              className="overflow-auto"
            >
              <Typography className="bg-light-gray fw-bold h-5 ps-2 py-1">
                Sets
              </Typography>
              {masterSetList.length ? (
                renderSetList()
              ) : (
                <Box
                  sx={{ minHeight: "350px" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Typography className="h-5 fw-bold">
                    No Data Available
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default SetFilterModal;
