/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { Box, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import {
  getStaffdetails,
  saveStaff,
  updateStaffs,
} from "services/supplier/staff";
import { useRouter } from "next/router";
import suppliercapability from "constants/suppliercapability";

const tempObj = {
  firstName: "",
  last_Name: "",
  MobileNo: "",
  email: "",
};
const StaffForm = ({
  handlebackClick,
  type = "add",
  viewStaffId = null,
  setviewStaffId = () => {},
}) => {
  const [capabilites, setCapabilities] = useState([]);
  const [formData, setFormData] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({ ...tempObj });
  const [checkbox, setCheckbox] = useState(true);
  const router = useRouter();

  const orginizeCapabilites = (data) => {
    const temp = data.map((item) => {
      return {
        label: item.capabilityType,
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
    setCapabilities(orginizeCapabilites(suppliercapability));
  }, [suppliercapability]);
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

  const validate = () => {
    let flag = false;
    const errObj = { ...tempObj };
    if (formData.firstName === "") {
      flag = true;
      errObj.firstName = validateMessage.field_required;
    } else if (!validationRegex.name.test(formData.firstName)) {
      flag = true;
      errObj.firstName = validateMessage.alphabets;
    } else if (formData.firstName.length > 50) {
      flag = true;
      errObj.firstName = validateMessage.alphabets_50;
    }
    if (formData.last_Name === "") {
      flag = true;
      errObj.last_Name = validateMessage.field_required;
    } else if (!validationRegex.name.test(formData.last_Name)) {
      flag = true;
      errObj.last_Name = validateMessage.alphabets;
    } else if (formData.last_Name.length > 50) {
      flag = true;
      errObj.last_Name = validateMessage.alphabets_50;
    }
    if (!formData.MobileNo) {
      flag = true;
      errObj.MobileNo = validateMessage.field_required;
    } else if (!validationRegex.mobile.test(formData.MobileNo)) {
      flag = true;
      errObj.MobileNo = validateMessage.mobile;
    }
    if (!formData.email) {
      flag = true;
      errObj.email = validateMessage.field_required;
    } else if (!validationRegex.email.test(formData.email)) {
      flag = true;
      errObj.email = validateMessage.email;
    } else if (formData.email.length > 255) {
      flag = true;
      errObj.email = validateMessage.alpha_numeric_max_255;
    }
    if (
      !checkbox &&
      !capabilites.some((ele) => {
        if (!ele.children.length) {
          return ele.isChecked;
        }
        const temp = ele.children.map((item) => item.isChecked);
        return temp.some((items) => items);
      })
    ) {
      flag = true;
      toastify("Select atleast one capability", "error");
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const supplierId = useSelector((state) => state.user.supplierId);

  const createPayload = () => {
    return {
      firstName: formData.firstName,
      lastName: formData.last_Name,
      mobileNumber: formData.MobileNo,
      emailId: formData.email,
      supplierId,
      // enableStaffCustomCapability: true,
      staffCapabilityList: [
        ...capabilites.map((item) => {
          return item.children.length
            ? {
                capabilityType: item.label,
                isEnable: item.isChecked,
                childCapabilityNameList: item.children.map((child) => {
                  return {
                    capabilityType: child.label,
                    isEnable: child.isChecked,
                  };
                }),
              }
            : {
                capabilityType: item.label,
                isEnable: item.isChecked,
              };
        }),
      ],
    };
  };

  const addStaff = async (payload) => {
    const { data, err } = await saveStaff(payload);
    if (data) {
      toastify(data, "success");
      router.push("/supplier/staff");
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  const updateStaff = async (payload) => {
    payload.staffId = viewStaffId;
    delete payload.supplierId;
    delete payload.emailId;
    const { data, message, err } = await updateStaffs(payload);
    if (data) {
      toastify(message, "success");
      handlebackClick();
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      if (type === "add") {
        addStaff(createPayload());
      } else {
        updateStaff(createPayload());
      }
    }
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

  const getStaff = async () => {
    const { data, err } = await getStaffdetails(viewStaffId);
    if (data) {
      setFormData({
        firstName: data.firstName,
        last_Name: data.lastName,
        MobileNo: data.mobileNumber,
        email: data.emailId,
      });
      setCapabilities(orginizeCapabilites(data.staffCapabilityList));
    } else {
      toastify(err?.response?.data?.message);
      setviewStaffId(null);
    }
  };

  useEffect(() => {
    if ((type === "view" || type === "edit") && viewStaffId) {
      getStaff();
    }
    setviewStaffId((pre) => {
      return pre;
    });
  }, [viewStaffId, type]);

  return (
    <Paper className="p-3 h-100 overflow-y-scroll ">
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
                  disabled={type === "view"}
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
                  disabled={type === "view"}
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
                  disabled={type === "view"}
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
                  disabled={type === "view" || type === "edit"}
                />
              </Grid>
              <Grid item sm={12} className="d-flex">
                <span className="fs-14 my-2 fw-600 me-3">
                  Custom Capability :
                </span>
                <CheckBoxComponent
                  isDisabled={type === "view"}
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
          className=" p-4 pt-0 d-flex w-100 mxh-70vh overflow-y-scroll"
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
                      isDisabled={type === "view"}
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
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
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
                            isDisabled={type === "view"}
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
        {["add", "edit"].includes(type) && (
          <Grid item sm={12}>
            <div className="w-100 d-flex flex-row-reverse">
              <ButtonComponent
                label="Approve"
                onBtnClick={handleSubmit}
                muiProps="ms-3"
              />
              <ButtonComponent onBtnClick={handlebackClick} label="Cancel" />
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
export default StaffForm;
