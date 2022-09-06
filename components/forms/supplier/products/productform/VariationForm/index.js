/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { Box, Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { getCurrentData } from "services/supplier";
import CustomIcon from "services/iconUtils";
import { Country } from "country-state-city";
import { validateVariation } from "../validation";
import ButtonComponent from "@/atoms/ButtonComponent";

const VariationForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const defaultList = [
      {
        label: "Expiry Date",
        type: "date",
        id: "expiryDate",
        value: null,
      },
      {
        label: "Country of Origin",
        type: "dropdown",
        id: "countryOfOrigin",
        options: [],
        value: null,
        required: true,
      },
    ];
    const countries = Country.getAllCountries();
    const [dropdowns, setDropdowns] = useState([]);
    const [error, setError] = useState({});
    const countryList = countries.map((item) => ({
      label: item.name,
      value: item.name,
      id: item.name,
    }));

    useEffect(() => {
      let tempFormData = {};
      tempFormData = { ...JSON.parse(JSON.stringify(formData)) };
      if (tempFormData && tempFormData.attribute) {
        const data = [];
        Object.keys(tempFormData?.attribute).forEach((item) => {
          if (tempFormData.attribute[item].length) {
            data.push({
              label: tempFormData.attribute[item][0].variationName,
              type: "dropdown",
              id: item,
              options: tempFormData.attribute[item].map((o) => ({
                ...o,
                label: o.title,
              })),
              value: null,
              required: true,
            });
          }
        });
        const dataCopy =
          data.filter((ele) => {
            if (
              (ele.type === "dropdown" && ele.options.length) ||
              ele.type !== "dropdown"
            ) {
              return ele;
            }
          }) || [];
        const temp = JSON.parse(JSON.stringify([...dataCopy, ...defaultList]));
        temp.forEach((item) => {
          item.value = formData?.variation[item.id];
        });
        setDropdowns([...temp]);
      }
    }, [formData?.attribute, formData?.variation]);

    let currentData = new Date();

    const getDate = async () => {
      const { data, err } = await getCurrentData();
      if (!err) {
        currentData = new Date(data);
      }
    };

    useEffect(() => {
      getDate();
    }, []);

    const handleInputChange = (val, ele) => {
      const getData = () => {
        if (ele.type === "dropdown") {
          return val ? val.id : null;
        }
        return val;
      };
      setFormData((prev) => {
        return {
          ...prev,
          variation: {
            ...prev.variation,
            [ele.id]: getData(),
          },
        };
      });
      setDropdowns((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp.forEach((item) => {
          if (item.id === ele.id) {
            item.value = getData();
          }
        });
        return [...temp];
      });
    };

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          return ["attribute", {}];
        },
        validate: () => {
          const { errObj, flag } = validateVariation(
            dropdowns,
            currentData,
            formData.variation.others
          );
          if (Object.keys(errObj).length) {
            const element = document.getElementById(Object.keys(errObj)[0]);
            if (element) {
              element.scrollIntoView();
            }
          }
          setError(errObj);
          return flag;
        },
        clearPage: () => {
          // setDropdowns([]);
          setError({});
        },
      };
    });

    const addOtherField = () => {
      const temp = JSON.parse(JSON.stringify(formData));
      temp.variation.others.push({
        label: "",
        value: "",
      });
      setFormData(temp);
    };

    return (
      <Grid container spacing={2} className="">
        {dropdowns.map((ele) => {
          return (
            <Grid item md={12} container key={ele.id} alignItems="center">
              <Grid item lg={3} md={12} xs={12}>
                <Typography fontSize={14}>{ele.label}*</Typography>
              </Grid>
              <Grid item lg={9} md={12} xs={12}>
                {ele.type === "dropdown" && (
                  <SimpleDropdownComponent
                    id={ele.id}
                    size="small"
                    list={
                      ele.id === "countryOfOrigin" ? countryList : ele.options
                    }
                    value={
                      ele.id === "countryOfOrigin"
                        ? countryList.find(
                            (op) => op.id === formData?.variation[ele.id]
                          )
                        : ele.options.find(
                            (op) => op.id === formData?.variation[ele.id]
                          ) ?? {}
                    }
                    onDropdownSelect={(val) => handleInputChange(val, ele)}
                    helperText={error[ele.id]}
                  />
                )}
                {ele.type === "date" && (
                  <DatePickerComponent
                    id={ele.id}
                    value={formData?.variation?.expiryDate}
                    size="small"
                    onDateChange={(val) => handleInputChange(val, ele)}
                    helperText={error[ele.id]}
                    error={Boolean(error[ele.id])}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
        <Grid item lg={9} md={9} xs={12}>
          Other
        </Grid>
        <Grid item md={3} className="d-flex flex-row-reverse">
          <ButtonComponent
            label="Add"
            variant="outlined"
            size="small"
            onBtnClick={addOtherField}
            muiProps="m-0 p-0 fs-12"
            showIcon
            iconOrintation="end"
            iconName="add"
            iconColorClass="fs-16 color-orange"
          />
        </Grid>
        <Grid item md={12} xs={12} container spacing={1} className="mx-2">
          {formData?.variation?.others?.map((item, index) => (
            <>
              <Grid item md={12} lg={4}>
                <InputBox
                  id={`label${index}`}
                  value={item.label}
                  onInputChange={(e) => {
                    const temp = JSON.parse(JSON.stringify(formData));
                    temp.variation.others[index].label = e.target.value;
                    setFormData(temp);
                  }}
                  label="Label"
                />
              </Grid>
              <Grid item md={12} lg={8} className="d-flex align-items-start">
                <InputBox
                  id={`value${index}`}
                  isMultiline
                  value={item.value}
                  onInputChange={(e) => {
                    const temp = JSON.parse(JSON.stringify(formData));
                    temp.variation.others[index].value = e.target.value;
                    setFormData(temp);
                  }}
                />
                {formData?.variation?.others.length - 1 ? (
                  <Box
                    className="bg-orange rounded-circle ms-2"
                    onClick={() => {
                      const temp = JSON.parse(JSON.stringify(formData));
                      temp.variation.others.splice(index, 1);
                      setFormData(temp);
                    }}
                  >
                    <CustomIcon
                      type="removeIcon"
                      size="12"
                      className="color-white"
                    />
                  </Box>
                ) : null}
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
