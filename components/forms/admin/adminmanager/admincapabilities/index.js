/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { Box, Collapse, Grid, List, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import admincapabilities from "constants/admincapability";

const tempObj = {
  userName: "",
  firstName: "",
  last_Name: "",
  MobileNo: "",
  email: "",
};
const StaffForm = ({ handlebackClick, type = "add" }) => {
  const [capabilites, setCapabilities] = useState([]);
  const [formData, setFormData] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({ ...tempObj });
  const [checkbox, setCheckbox] = useState(true);

  const orginizeCapabilites = (data) => {
    const temp = data.map((item) => {
      return {
        label: item.capabilityName,
        isChecked: type === "add" ? true : item.isEnable,
        expand: false,
        children:
          item.childCapabilityNameList && item.childCapabilityNameList.length
            ? [...orginizeCapabilites(item.childCapabilityNameList)]
            : [],
      };
    });
    return temp;
  };

  useEffect(() => {
    setCapabilities(orginizeCapabilites(admincapabilities));
  }, [admincapabilities]);
  useEffect(() => {
    if (capabilites.length) {
      const flag = capabilites.every((ele) => ele.isChecked);
      setCheckbox(flag);
    }
  }, [capabilites]);

  useEffect(() => {
    return () => {
      setCheckbox(null);
      setCapabilities(null);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // console.log({ formData, capabilites });
  };

  const expand = (index) => {
    setCapabilities((pre) => {
      const temp = JSON.parse(JSON.stringify(pre));
      temp.forEach((element, ind) => {
        if (ind === index) {
          element.expand = !element.expand;
        }
      });
      return temp;
    });
  };

  return (
    <>
      <Grid container className="mt-3">
        <Grid
          container
          item
          spacing={2}
          md={5}
          lg={3}
          className=" border-end p-3"
        >
          <div className="w-100">
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="userName"
                  name="User Name"
                  value={formData.userName}
                  label="User Name"
                  className=""
                  size="small"
                  onInputChange={handleInputChange}
                  helperText={errorObj.firstName}
                  error={errorObj.firstName !== ""}
                  placeholder="User Name"
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  id="email"
                  inputlabelshrink
                  name="E-mail"
                  value={formData.email}
                  label="E-mail"
                  className=""
                  size="small"
                  onInputChange={handleInputChange}
                  helperText={errorObj.email}
                  error={errorObj.email !== ""}
                  placeholder="E-mail"
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="firstName"
                  name="First Name"
                  value={formData.firstName}
                  label="First Name"
                  className=""
                  size="small"
                  onInputChange={handleInputChange}
                  helperText={errorObj.firstName}
                  error={errorObj.firstName !== ""}
                  placeholder="First Name"
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="last_Name"
                  name="Last Name"
                  value={formData.last_Name}
                  label="Last Name"
                  className=""
                  size="small"
                  onInputChange={handleInputChange}
                  helperText={errorObj.last_Name}
                  error={errorObj.last_Name !== ""}
                  placeholder="Last Name"
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="MobileNo"
                  name="Mobile No."
                  value={formData.MobileNo}
                  label="Mobile No."
                  className=""
                  size="small"
                  onInputChange={handleInputChange}
                  helperText={errorObj.MobileNo}
                  error={errorObj.MobileNo !== ""}
                  placeholder="Mobile No."
                />
              </Grid>

              <Grid item sm={12} className="d-flex">
                <span className="fs-14 my-2 fw-600 me-3">
                  Custom Capability :
                </span>
                <CheckBoxComponent
                  label=""
                  isChecked={checkbox}
                  checkBoxClick={(_, value) => {
                    setCheckbox(value);
                    setCapabilities((pre) => {
                      const temp = pre.map((item) => {
                        return {
                          ...item,
                          isChecked: value,
                          children: item.children.length
                            ? item.children.map((ele) => {
                                return {
                                  ...ele,
                                  isChecked: value,
                                };
                              })
                            : [],
                        };
                      });
                      return temp;
                    });
                  }}
                  size="small"
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          container
          item
          md={7}
          lg={9}
          spacing={2}
          className=" px-4 pt-0 d-flex w-100 mxh-70vh overflow-y-scroll"
        >
          {capabilites.map((item, index) => {
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
                      size="small"
                      checkBoxClick={(_, val) => {
                        setCapabilities((pre) => {
                          const temp = JSON.parse(JSON.stringify(pre));
                          temp.forEach((element, ind) => {
                            if (ind === index) {
                              element.expand = true;
                              element.isChecked = val;
                              element.children = element.children.map(
                                (child) => {
                                  return { ...child, isChecked: val };
                                }
                              );
                            }
                          });
                          return temp;
                        });
                      }}
                    />
                    <Typography
                      onClick={() => {
                        if (type === "view") return;
                        setCapabilities((pre) => {
                          const temp = JSON.parse(JSON.stringify(pre));
                          temp.forEach((element, ind) => {
                            if (ind === index) {
                              element.expand = true;
                              element.isChecked = !element.isChecked;
                              element.children = element.children.map(
                                (child) => {
                                  return {
                                    ...child,
                                    isChecked: !child.isChecked,
                                  };
                                }
                              );
                            }
                          });
                          return temp;
                        });
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>
                  {item.children.length ? (
                    item.expand ? (
                      <div className="me-3">
                        <ExpandLess />
                      </div>
                    ) : (
                      <div className="me-3">
                        <ExpandMore />
                      </div>
                    )
                  ) : null}
                </Box>
                <Collapse
                  in={item.expand}
                  timeout="auto"
                  unmountOnExit
                  className="ms-4"
                >
                  <List component="div" disablePadding>
                    {item.children.map((ele, ind) => {
                      return (
                        <Box className="d-flex align-items-center">
                          <CheckBoxComponent
                            isChecked={ele.isChecked}
                            size="small"
                            checkBoxClick={(_, val) => {
                              const temp = JSON.parse(
                                JSON.stringify(capabilites)
                              );
                              temp[index].children[ind].isChecked = val;
                              temp[index].isChecked = temp[
                                index
                              ].children.every((child) => child.isChecked);

                              setCapabilities(temp);
                            }}
                          />
                          <Typography
                            onClick={() => {
                              if (type === "view") return;
                              const temp = JSON.parse(
                                JSON.stringify(capabilites)
                              );
                              temp[index].children[ind].isChecked =
                                !temp[index].children[ind].isChecked;
                              temp[index].isChecked = temp[
                                index
                              ].children.every((child) => child.isChecked);

                              setCapabilities(temp);
                            }}
                          >
                            {ele.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </List>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
        <Grid item sm={12} className="mt-4">
          <div className="w-100 d-flex flex-row-reverse">
            <ButtonComponent
              label="Approve"
              onBtnClick={handleSubmit}
              muiProps="ms-3"
            />
            <ButtonComponent onBtnClick={handlebackClick} label="Cancel" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default StaffForm;
