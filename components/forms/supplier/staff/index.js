/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, MenuList, Paper } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SwitchComponent from "components/atoms/SwitchComponent";
import { useEffect, useState } from "react";

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
    title: "coupons",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
  {
    title: "orders",
    items: ["Manage Products", "Add Products", "Publish Products"],
  },
];

const StaffForm = ({ handlebackClick }) => {
  const [capabilites, setCapabilities] = useState([]);
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
                  id="First Name"
                  name="First Name"
                  value=""
                  label="First Name"
                  className=""
                  size="small"
                  onInputChange={() => {}}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="Last Name"
                  name="Last Name"
                  value=""
                  label="Last Name"
                  className=""
                  size="small"
                  onInputChange={() => {}}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  inputlabelshrink
                  id="Mobile No."
                  name="Mobile No."
                  value=""
                  label="Mobile No."
                  className=""
                  size="small"
                  onInputChange={() => {}}
                />
              </Grid>
              <Grid item sm={12}>
                <InputBox
                  id="E-mail"
                  inputlabelshrink
                  name="E-mail"
                  value=""
                  label="E-mail"
                  className=""
                  size="small"
                  onInputChange={() => {}}
                />
              </Grid>
              <Grid item sm={12}>
                <CheckBoxComponent
                  label="Custom Capability"
                  isChecked={checkbox}
                  checkBoxClick={(value) => {
                    setCheckbox(value);
                    value
                      ? setCapabilities((pre) => {
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
                          console.log(temp);
                          return temp;
                        })
                      : null;
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
                      <div className="d-flex justify-content-end align-items-center">
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
              onBtnClick={() => {}}
              muiProps="ms-3"
            />
            <ButtonComponent onBtnClick={handlebackClick} label="Cancle" />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default StaffForm;
