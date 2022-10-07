/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-param-reassign */
import { Box, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputBox from "@/atoms/InputBoxComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ButtonComponent from "@/atoms/ButtonComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import admincapabilities from "constants/admincapability";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  getAdminByDesignation,
  saveAdminGroup,
  updateAdminGroup,
} from "services/admin/admin";
import ModalComponent from "@/atoms/ModalComponent";

const tempObj = {
  groupName: "",
  description: "",
  membersList: [],
};

const AdminCapabilities = ({
  setShowAdminCapabilities = () => {},
  type = "add",
  groupData = {},
}) => {
  const [formData, setFormData] = useState({ ...tempObj });
  const [error, setError] = useState({ ...tempObj });
  const [groupType, setGroupType] = useState("MANAGER");
  const [checkbox, setCheckbox] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [capabilites, setCapabilities] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { role } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.id]: e.target.value,
    }));
  };

  const validate = () => {
    const errObj = { groupName: "", description: "", membersList: "" };
    let flag = false;
    if (formData.groupName.trim() === "") {
      errObj.groupName = validateMessage.field_required;
      flag = true;
    }
    if (formData.description === "") {
      errObj.description = validateMessage.field_required;
      flag = true;
    } else if (formData.description.length > 255) {
      errObj.description = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
    if (!formData.membersList.length) {
      errObj.membersList = validateMessage.field_required;
      flag = true;
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

    setError(errObj);
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
    return {
      groupName: formData.groupName,
      description: formData.description,
      adminId: formData.membersList.map((item) => {
        return item.id;
      }),
      groupType: `ADMIN_${groupType}`,
      createdByType: role,
      capabilities: {
        adminCapabilitylist: capabiliteObj(capabilites),
      },
    };
  };

  const updateGroup = async (flag) => {
    const payload = createPayload();
    payload.adminGroupId = groupData.adminGroupId;
    payload.isAdminRemoved = flag;
    const { data, message, err } = await updateAdminGroup(payload);
    if (data) {
      setShowModal("");
      setShowAdminCapabilities(false);
      toastify(message, "success");
    } else if (err) {
      if (err?.response?.data?.error) {
        toastify(err?.response?.data?.message, "error");
      } else {
        setShowModal(err?.response?.data?.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      if (type === "add") {
        const { data, message, err } = await saveAdminGroup(createPayload());
        if (data) {
          setShowAdminCapabilities(false);
          toastify(message, "success");
        } else if (err) {
          toastify(err?.response?.data?.message, "error");
        }
      } else {
        await updateGroup(false);
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
  const orginizeCapabilites = (data) => {
    const temp = [];
    data.forEach((item) => {
      if (role === "ADMIN_MANAGER" && item.capabilityName === "User") return;
      temp.push({
        label: item.capabilityName,
        isChecked: type === "add" ? true : item.isEnable,
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
          groupData.adminRegistration[0].adminCapabilities.adminCapabilityList
            .adminCapabilitylist
        )
      );
      if (type === "Edit") {
        const temp = {
          groupName: groupData.groupName,
          description: groupData.description,
          membersList: groupData.adminRegistration.map((item) => ({
            id: item.adminRegistrationId,
            label: item.adminRegistrationId,
            title: item.adminRegistrationId,
          })),
        };
        setUsersList((pre) => [
          ...pre,
          ...JSON.parse(JSON.stringify(temp.membersList)),
        ]);
        setGroupType(
          groupData.adminRegistration[0].adminRoles[0].adminRoleTitle.split(
            "_"
          )[1]
        );
        setFormData(temp);
      }
    }
  }, [admincapabilities, type]);

  useEffect(() => {
    if (role === "ADMIN_MANAGER") setGroupType("USER");
  }, [role]);

  const getAdminList = async () => {
    const { data, err } = await getAdminByDesignation(`ADMIN_${groupType}`);
    if (data) {
      const temp = [];
      data.adminId.forEach((item) => {
        temp.push({ title: item, label: item, id: item });
      });
      const temp1 = data.adminId.map((item) => ({
        title: item,
        label: item,
        id: item,
      }));
      if (type !== "add") {
        temp1.push(
          ...groupData.adminRegistration.map((item) => ({
            id: item.adminRegistrationId,
            label: item.adminRegistrationId,
            title: item.adminRegistrationId,
          }))
        );
      }
      setUsersList(temp1);
    } else if (err) {
      setUsersList([]);
    }
  };

  useEffect(() => {
    if (groupType) {
      getAdminList();
    }
  }, [groupType]);

  const confirmSubmit = () => {
    updateGroup(true);
  };

  return (
    <Paper className="p-3 mnh-85vh mxh-85vh overflow-auto hide-scrollbar d-flex flex-column justify-content-between">
      <div>
        <Typography
          onClick={() => {
            setShowAdminCapabilities(false);
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
                    id="groupName"
                    label="Group Name"
                    inputlabelshrink
                    className="mt-3"
                    onInputChange={handleInputChange}
                    value={formData.groupName}
                    placeholder="Group Name"
                    error={error.groupName !== ""}
                    helperText={error.groupName}
                  />
                </Grid>
                {role === "ADMIN" && (
                  <Grid item sm={12}>
                    <Typography>Group Type</Typography>
                    <div className="d-flex">
                      <RadiobuttonComponent
                        label="Managers"
                        isChecked={groupType === "MANAGER"}
                        onRadioChange={() => {
                          setFormData((pre) => ({
                            ...pre,
                            membersList: [],
                          }));
                          setGroupType("MANAGER");
                        }}
                        size="small"
                      />
                      <RadiobuttonComponent
                        label="Users"
                        isChecked={groupType !== "MANAGER"}
                        onRadioChange={() => {
                          setFormData((pre) => ({
                            ...pre,
                            membersList: [],
                          }));
                          setGroupType("USER");
                        }}
                        size="small"
                      />
                    </div>
                  </Grid>
                )}
                <Grid item sm={12}>
                  <MultiSelectComponent
                    list={usersList}
                    inputlabelshrink
                    value={formData.membersList}
                    label={
                      groupType === "MANAGER" ? "Admin Manager" : "Admin User"
                    }
                    placeholder={
                      groupType === "MANAGER" ? "Admin Manager" : "Admin User"
                    }
                    onSelectionChange={(_, val) => {
                      setFormData((pre) => {
                        const temp = { ...pre };
                        temp.membersList = val;
                        return temp;
                      });
                    }}
                    error={error.membersList.length}
                    helperText={error.membersList}
                  />
                </Grid>
                <Grid item sm={12}>
                  <InputBox
                    placeholder="Description"
                    inputlabelshrink
                    value={formData.description}
                    label="Description"
                    onInputChange={handleInputChange}
                    id="description"
                    isMultiline
                    error={error.description !== ""}
                    helperText={error.description}
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
                            isChecked: !value,
                            children: item.children.length
                              ? item.children.map((ele) => {
                                  return {
                                    ...ele,
                                    isChecked: !value,
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
            ) : (
              <Grid container spacing={2}>
                <Grid item md={12}>
                  First Name: {groupData.firstName}
                </Grid>
                <Grid item md={12}>
                  Last Name: {groupData.lastName}
                </Grid>
                <Grid item md={12}>
                  E-mail: {groupData.emailId}
                </Grid>
                <Grid item md={12}>
                  Mobile No.: {groupData.mobileNumber}
                </Grid>
                <Grid item md={12}>
                  DOB: {groupData.dob}
                </Grid>
                <Grid item md={12}>
                  Status: {groupData.status}
                </Grid>
                <Grid item md={12}>
                  Created By: {groupData.createdBy}
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
                        if (type === "add" && !checkbox) return;
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
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (type === "view") return;
                        if (type === "add" && !checkbox) return;
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
                              if (type === "add" && !checkbox) return;
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
                                  if (type === "add" && !checkbox) return;
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
                                  if (type === "add" && !checkbox) return;
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
                                          if (type === "add" && !checkbox)
                                            return;
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
      {showModal !== "" && (
        <ModalComponent
          open
          showHeader={false}
          saveBtnText="Confirm"
          ClearBtnText="Cancel"
          onSaveBtnClick={confirmSubmit}
          onClearBtnClick={() => {
            setShowModal("");
          }}
          showCloseIcon={false}
          footerClassName=" justify-content-end"
          minHeightClassName="mnh-200"
        >
          <div className="d-flex flex-column mt-3 justify-content-center align-items-center">
            <WarningAmberIcon sx={{ fontSize: "5rem", color: "red" }} />
            <Typography className="mt-2 fw-500">{showModal}</Typography>
          </div>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default AdminCapabilities;
