/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableComponent";
import { Box, Collapse, Grid, List, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CustomIcon from "services/iconUtils";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

const Column = [
  {
    id: "col1",
    label: "SI NO.",
    minWidth: 30,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Staff ID",
    minWidth: 100,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Name",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "E-mail",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Mobile No.",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Tab Access",
    minWidth: 200,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
];
const StaffInfo = ({
  selectedData,
  showStaffModal,
  setShowStaffModal = () => {},
}) => {
  const [rows, setRows] = useState([]);
  const [viewStaff, setViewStaff] = useState(false);
  const [selectedViewData, setSelectedViewData] = useState([]);

  const handleViewClick = (item) => {
    setSelectedViewData(orginizeCapabilites(item.staffCapabilityList));
    setViewStaff(true);
  };

  const orginizeCapabilites = (data) => {
    const temp = data?.map((item) => {
      return {
        label: item.capabilityType || item.childCapabilityName,
        isChecked: item.isEnable,
        expand: false,
        children:
          item.childCapabilityNameList && item.childCapabilityNameList.length
            ? [...orginizeCapabilites(item.childCapabilityNameList)]
            : [],
      };
    });
    return temp;
  };

  const getRows = (data) => {
    const temp = [];
    if (data) {
      data.forEach((item, index) => {
        temp.push({
          col1: index + 1,
          col2: item.staffId,
          col3: `${item.firstName} ${item.lastName}`,
          col4: item.emailId,
          col5: item.mobileNumber,
          col6: (
            <CustomIcon
              type="view"
              className="fs-18"
              onIconClick={() => {
                handleViewClick(item);
              }}
            />
          ),
        });
      });
    }
    return temp;
  };

  useEffect(() => {
    setRows(getRows(selectedData));
  }, [selectedData]);

  const expand = (index) => {
    setSelectedViewData((pre) => {
      const temp = JSON.parse(JSON.stringify(pre));
      temp.forEach((element, ind) => {
        if (ind === index) {
          element.expand = !element.expand;
        }
      });
      return temp;
    });
  };
  const viewStaffComponent = () => {
    return (
      <>
        <Grid container className="border-bottom">
          <Grid sm={1}>
            <Typography
              onClick={() => {
                setViewStaff(false);
              }}
              className="cursor-pointer fit-content h-4 color-orange"
            >
              {`<`} Back
            </Typography>
          </Grid>
          <Grid sm={11}>
            <Typography className="color-orange h-4">Tab Access</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          lg={12}
          className=" p-4 pt-0 d-flex w-100 mxh-70vh overflow-y-scroll mb-2"
        >
          {selectedViewData?.map((item, index) => {
            return (
              <Grid item md={6}>
                <Box
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => {
                    expand(index);
                  }}
                >
                  <div className="d-flex align-items-center">
                    <CheckBoxComponent
                      isChecked={item.isChecked}
                      isDisabled
                      size="small"
                    />
                    <Typography>{item.label}</Typography>
                  </div>
                  {item?.children?.length ? (
                    item.expand ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </Box>
                <Collapse
                  in={item?.expand}
                  timeout="auto"
                  unmountOnExit
                  className="ms-4"
                >
                  <List component="div" disablePadding>
                    {item.children.map((ele) => {
                      return (
                        <Box className="d-flex align-items-center">
                          <CheckBoxComponent
                            isChecked={ele.isChecked}
                            size="small"
                            isDisabled
                          />
                          <Typography>{ele.label}</Typography>
                        </Box>
                      );
                    })}
                  </List>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  };
  return (
    <ModalComponent
      open={showStaffModal}
      onCloseIconClick={() => setShowStaffModal(false)}
      showPositionedClose={!viewStaff}
      headerClassName=""
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      showFooter={false}
      minWidth={950}
      minHeightClassName="mnh-400"
    >
      {!viewStaff ? (
        <TableComponent
          showSearchFilter={false}
          showSearchbar={false}
          table_heading="Staff Details"
          columns={Column}
          tableRows={[...rows]}
          headerClassName="color-orange"
        />
      ) : (
        viewStaffComponent()
      )}
    </ModalComponent>
  );
};

export default StaffInfo;
