/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, MenuList, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SwitchComponent from "components/atoms/SwitchComponent";
import { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";

const dummyData = [
  {
    title: "Products",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "Types",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "Panels",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "Marketplace Withdrawal",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "Coupons",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "Orders",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
];
const tempObj = {
  firstName: "",
  last_Name: "",
  MobileNo: "",
  email: "",
};
const StaffForm = ({ handlebackClick }) => {
  const [capabilites, setCapabilities] = useState([]);
  const [formData, setFormData] = useState({ ...tempObj });
  const [errorObj, setErrorObj] = useState({ ...tempObj });
  const [checkbox, setCheckbox] = useState(true);

  useEffect(() => {
    setCapabilities(() => {
      return dummyData.map((item) => {
        return {
          ...item,
          items: [
            ...item.items.map((ele) => {
              return { name: ele, selected: true };
            }),
          ],
        };
      });
    });
  }, [dummyData]);
  useEffect(() => {
    if (capabilites.length) {
      const flag = capabilites.every((ele) => {
        const temp = ele.items.map((item) => item.selected);
        return temp.every((items) => items);
      });
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
        const temp = ele.items.map((item) => item.selected);
        return temp.some((items) => items);
      })
    ) {
      flag = true;
      toastify("Select atleast one capability", "error");
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const handleSubmit = () => {
    const flag = validate();
  };

  return (
    <Paper className="p-3 h-100 overflow-y-scroll">
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
                />
              </Grid>
              <Grid item sm={12} className="d-flex">
                <span className="fs-14 my-2 fw-600 me-3">
                  Custom Capability :
                </span>
                <CheckBoxComponent
                  label=""
                  isChecked={checkbox}
                  checkBoxClick={(id, value) => {
                    setCheckbox(value);
                    if (value)
                      setCapabilities((pre) => {
                        const temp = pre.map((item) => {
                          return {
                            ...item,
                            items: [
                              ...item.items.map((ele) => {
                                return {
                                  ...ele,
                                  selected: false,
                                };
                              }),
                            ],
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
        <Grid container item md={7} lg={9} spacing={2} className="p-4">
          {capabilites.map((item, index) => {
            return (
              <Grid item container spacing={1} sm={12} md={6} key={index}>
                <Grid item sm={12} className="color-orange fw-600 fs-14">
                  {item.title}
                </Grid>
                {item.items.map((ele, ind) => (
                  <Grid item container spacing={2} sm={12} key={ind}>
                    <Grid item sm={6} className="">
                      <div className="d-flex justify-content-end align-items-center me-2">
                        {ele.name}
                      </div>
                    </Grid>
                    <Grid item sm={6} className="d-flex align-items-center">
                      <SwitchComponent
                        label=""
                        defaultChecked={ele.selected}
                        ontoggle={(value) => {
                          setCapabilities((pre) => {
                            const temp = [...pre];
                            temp[index].items[ind].selected = value;
                            return temp;
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </Grid>
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
      </Grid>
    </Paper>
  );
};
export default StaffForm;
