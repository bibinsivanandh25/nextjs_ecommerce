/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { Box, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import admincapabilities from "constants/admincapability";
import DatePickerComponent from "@/atoms/DatePickerComponent";
import validationRegex from "services/utils/regexUtils";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import { format, formatDistance, parse } from "date-fns";
import {
  saveAdminManager,
  saveAdminUser,
  updatedAdminManager,
  updatedAdminUser,
} from "services/admin/admin";
import { FaLaptopHouse } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const tempObj = {
  firstName: "",
  last_Name: "",
  MobileNo: "",
  email: "",
  dob: null,
};
const StaffForm = ({
  type = "add",
  adminType = "",
  setShowAdminCapabilities = () => {},
  setModalData = () => {},
  gettableData = () => {},
  adminData = null,
}) => {
  const [capabilites, setCapabilities] = useState([]);
  const [formData, setFormData] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({ ...tempObj });
  const [checkbox, setCheckbox] = useState(false);
  const { role } = useSelector((state) => state.user);
  const router = useRouter();

  const orginizeCapabilites = (data) => {
    const temp = [];
    data.forEach((item) => {
      if (adminType === "ADMIN_MANAGER" && item.capabilityName === "Manager") {
        return;
      }
      if (adminType === "ADMIN_USER" && item.capabilityName === "Admin Staff")
        return;
      temp.push({
        label: item.capabilityName,
        isChecked: type === "add" ? false : item.isEnable,
        expand: false,
        children:
          item.childCapabilityNameList && item.childCapabilityNameList.length
            ? [...orginizeCapabilites(item.childCapabilityNameList)]
            : [],
      });
    });
    return temp;
  };

  useEffect(() => {
    if (type === "add") {
      setCapabilities(orginizeCapabilites(admincapabilities));
    } else if (["View", "Edit"].includes(type)) {
      setCapabilities(
        orginizeCapabilites(
          adminData.adminCapabilities?.adminCapabilityList
            ?.adminCapabilitylist ??
            adminData.adminCapabilities?.adminCapabilityList ??
            admincapabilities
        )
      );
      if (type === "Edit") {
        setFormData({
          firstName: adminData.firstName,
          last_Name: adminData.lastName,
          MobileNo: adminData.mobileNumber,
          email: adminData.emailId,
          dob: parse(adminData.dob, "MM-dd-yyyy", new Date()),
        });
      }
    }
  }, [admincapabilities, type, adminData]);

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
    if (formData.firstName.trim() === "") {
      errObj.firstName = validateMessage.field_required;
      flag = true;
    } else if (!validationRegex.name.test(formData.firstName.trim())) {
      errObj.firstName = validateMessage.alphabets;
      flag = true;
    }
    if (formData.last_Name.trim() === "") {
      errObj.last_Name = validateMessage.field_required;
      flag = true;
    } else if (!validationRegex.name.test(formData.last_Name.trim())) {
      errObj.last_Name = validateMessage.alphabets;
      flag = true;
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
    }
    if (!formData.dob) {
      flag = true;
      errObj.dob = validateMessage.field_required;
    }
    if (
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

    setErrorObj(errObj);
    return flag;
  };

  const createPayload = () => {
    const capabiliteObj = (data) => {
      const temp = data.map((item) => {
        if (item.children.length) {
          return {
            capabilityName: item.label,
            isEnable: item.isChecked,
            childCapabilityNameList: capabiliteObj(item.children),
          };
        }
        return {
          capabilityName: item.label,
          isEnable: item.isChecked,
        };
      });

      return temp;
    };
    const temp = {
      firstName: formData.firstName,
      lastName: formData.last_Name,
      mobileNumber: formData.MobileNo,
      emailId: formData.email,
      dob: formData.dob ? format(formData.dob, "MM-dd-yyyy") : null,
      designation: adminType,
    };
    if (type === "Edit") {
      temp.adminRegistrationId = adminData.adminRegistrationId;
    }
    if (adminType === "ADMIN_MANAGER") {
      temp.adminCapabilities = {
        adminCapabilityList: capabiliteObj(capabilites),
      };
      temp.adminCapabilities.adminCapabilityList[7].childCapabilityNameList[1].childCapabilityNameList.push(
        { capabilityName: "Manager", isEnable: false }
      );
    } else {
      temp.adminCapabilityList = capabiliteObj(capabilites);
      temp.adminCapabilityList[7].childCapabilityNameList.push({
        capabilityName: "Admin Staff",
        isEnable: false,
        childCapabilityNameList: [
          {
            capabilityName: "Manager",
            isEnable: false,
          },
          {
            capabilityName: "User",
            isEnable: false,
          },
          {
            capabilityName: "Groups",
            isEnable: false,
          },
        ],
      });
      if (type === "Edit") {
        temp.status = adminData.status;
      }
    }
    return temp;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      const payload = createPayload();
      const saveAdmin =
        adminType === "ADMIN_MANAGER"
          ? type === "add"
            ? saveAdminManager
            : updatedAdminManager
          : type === "add"
          ? saveAdminUser
          : updatedAdminUser;
      const { data, message, err } = await saveAdmin(payload);
      if (data) {
        toastify(message, "success");
        setShowAdminCapabilities(false);
        gettableData();
      } else if (err) {
        toastify(err?.response?.data?.message, "error");
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

  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar d-flex flex-column justify-content-between">
      <div>
        <Typography
          onClick={() => {
            setShowAdminCapabilities(false);
            setModalData({ type: "", data: null });
          }}
          className="mb-2 h-5 ms-3 cursor-pointer color-orange py-1 d-inline"
        >
          {"<"}Back
        </Typography>
      </div>
      <div className=" d-flex mt-2">
        <Grid
          container
          item
          spacing={2}
          md={5}
          lg={3}
          className=" border-end p-3"
        >
          <div className="w-100">
            {type !== "View" ? (
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
                    disabled={type === "Edit"}
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
                    disabled={type === "Edit"}
                  />
                </Grid>
                <Grid item sm={12}>
                  <DatePickerComponent
                    label="DOB"
                    size="small"
                    value={formData.dob}
                    onDateChange={(value) => {
                      setFormData((pre) => ({
                        ...pre,
                        dob: value,
                      }));
                    }}
                    disableFuture
                    inputlabelshrink
                    helperText={errorObj.dob}
                    error={!!errorObj.dob}
                  />
                </Grid>

                {type !== "Edit" && (
                  <Grid item sm={12} className="d-flex">
                    <span className="fs-14 my-2 fw-600 me-3">Select All :</span>
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
                                    const elecopy = JSON.parse(
                                      JSON.stringify(ele)
                                    );
                                    if (ele?.children?.length) {
                                      elecopy.children = ele.children.map(
                                        (c) => {
                                          return {
                                            ...c,
                                            isChecked: value,
                                          };
                                        }
                                      );
                                    }

                                    return {
                                      ...elecopy,
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
                )}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item md={12}>
                  First Name: {adminData.firstName}
                </Grid>
                <Grid item md={12}>
                  Last Name: {adminData.lastName}
                </Grid>
                <Grid item md={12}>
                  E-mail: {adminData.emailId}
                </Grid>
                <Grid item md={12}>
                  Mobile No.: {adminData.mobileNumber}
                </Grid>
                <Grid item md={12}>
                  DOB: {adminData.dob}
                </Grid>
                <Grid item md={12}>
                  Status: {adminData.status}
                </Grid>
                <Grid item md={12}>
                  Created By: {adminData.createdBy}
                </Grid>
                <Grid item md={12}>
                  Created Date:{" "}
                  {format(new Date(adminData.createdDate), "dd-MM-yyyy")}
                </Grid>
              </Grid>
            )}
          </div>
        </Grid>
        <Grid
          container
          spacing={2}
          className=" px-4 pt-0 d-flex w-100 mxh-75vh overflow-y-scroll"
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
                      checkBoxClick={(e, val) => {
                        // if (type === "add" && !checkbox) return;
                        setCapabilities((pre) => {
                          const temp = JSON.parse(JSON.stringify(pre));
                          temp.forEach((element, ind) => {
                            if (ind === index) {
                              element.expand = true;
                              element.isChecked = val;
                              element.children = element.children.map(
                                (child) => {
                                  const childCopy = JSON.parse(
                                    JSON.stringify(child)
                                  );
                                  if (child?.children?.length) {
                                    childCopy.children = child.children.map(
                                      (c) => {
                                        return {
                                          ...c,
                                          isChecked: val,
                                        };
                                      }
                                    );
                                  }
                                  return { ...childCopy, isChecked: val };
                                }
                              );
                            }
                          });
                          return temp;
                        });
                      }}
                    />
                    <Typography
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (type === "view") return;
                        // if (type === "add" && !checkbox) return;
                        setCapabilities((pre) => {
                          const temp = JSON.parse(JSON.stringify(pre));
                          temp.forEach((element, ind) => {
                            if (ind === index) {
                              element.isChecked = !element.isChecked;
                              element.children = element.children.map(
                                (child) => {
                                  return {
                                    ...child,
                                    isChecked: !child.isChecked,
                                  };
                                }
                              );
                              element.expand = true;
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
                        <>
                          <Box
                            className="d-flex align-items-center justify-content-between"
                            onClick={() => {
                              if (type === "view") return;
                              // if (type === "add" && !checkbox) return;
                              const temp = JSON.parse(
                                JSON.stringify(capabilites)
                              );

                              if (temp[index].children[ind]?.children?.length) {
                                temp[index].children[ind].expand =
                                  !temp[index].children[ind].expand;
                              }
                              setCapabilities(temp);
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <CheckBoxComponent
                                isChecked={ele.isChecked}
                                size="small"
                                checkBoxClick={(_, val) => {
                                  // if (type === "add" && !checkbox) return;
                                  const temp = JSON.parse(
                                    JSON.stringify(capabilites)
                                  );
                                  temp[index].children[ind].isChecked = val;
                                  temp[index].isChecked = temp[
                                    index
                                  ].children.every((child) => child.isChecked);
                                  if (
                                    temp[index].children[ind]?.children?.length
                                  ) {
                                    temp[index].children[ind].expand = true;
                                    temp[index].children[ind].children.forEach(
                                      (subChild) => {
                                        subChild.isChecked = val;
                                      }
                                    );
                                  }

                                  setCapabilities(temp);
                                }}
                              />
                              <Typography
                                onClick={() => {
                                  if (type === "view") return;
                                  // if (type === "add" && !checkbox) return;
                                  const temp = JSON.parse(
                                    JSON.stringify(capabilites)
                                  );

                                  if (
                                    temp[index].children[ind]?.children?.length
                                  ) {
                                    temp[index].children[ind].expand = true;
                                  }
                                  setCapabilities(temp);
                                }}
                              >
                                {ele.label}
                              </Typography>
                            </div>
                            {ele.children.length ? (
                              ele.expand ? (
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
                          {ele.children.length ? (
                            <Collapse
                              in={ele.expand}
                              timeout="auto"
                              unmountOnExit
                              className="ms-4"
                            >
                              <List component="div" disablePadding>
                                {ele.children.map((eles, indx) => {
                                  return (
                                    <Box className="d-flex align-items-center">
                                      <CheckBoxComponent
                                        isChecked={eles.isChecked}
                                        size="small"
                                        checkBoxClick={(_, val) => {
                                          if (type === "view") return;
                                          const temp = JSON.parse(
                                            JSON.stringify(capabilites)
                                          );
                                          temp[index].children[ind].children[
                                            indx
                                          ].isChecked = val;
                                          temp[index].children[ind].isChecked =
                                            temp[index].children[
                                              ind
                                            ].children.every(
                                              (child) => child.isChecked
                                            );
                                          temp[index].isChecked = temp[
                                            index
                                          ].children.every(
                                            (child) => child.isChecked
                                          );
                                          setCapabilities(temp);
                                        }}
                                      />
                                      <Typography>{eles.label}</Typography>
                                    </Box>
                                  );
                                })}
                              </List>
                            </Collapse>
                          ) : null}
                        </>
                      );
                    })}
                  </List>
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {type !== "View" && (
        <div className="">
          <div className="w-100 d-flex flex-row-reverse">
            <ButtonComponent
              label="Approve"
              onBtnClick={handleSubmit}
              muiProps="ms-3"
            />
            <ButtonComponent
              onBtnClick={() => {
                setShowAdminCapabilities(false);
              }}
              label="Cancel"
            />
          </div>
        </div>
      )}
    </Paper>
  );
};
export default StaffForm;
