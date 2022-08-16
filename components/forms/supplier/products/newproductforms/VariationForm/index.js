/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validateMessage from "constants/validateMessages";

const VariationForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [variationFormData, setVariationFormData] = useState({});
    const [error, setError] = useState({});
    const defaultList = [
      {
        label: "Expiry Date",
        type: "date",
        id: "expiryDate",
        value: null,
        required: true,
      },
      {
        label: "Country of Origin",
        type: "dropdown",
        id: "countryOfOrigin",
        options: [
          {
            id: "india",
            label: "India",
          },
          { id: "japan", label: "Japan" },
        ],
        value: null,
        required: true,
      },
      {
        label: "Others",
        type: "textarea",
        id: "others",
        value: null,
        required: true,
      },
    ];
    const [dropdowns, setDropdowns] = useState([]);

    const validateForm = () => {
      const errObj = { ...error };
      dropdowns.forEach((el) => {
        if (el.hasOwnProperty("required") && !el.value) {
          errObj[el.id] = validateMessage.field_required;
        } else if (
          el.hasOwnProperty("validation") &&
          el.value &&
          !el.validation.test(el.value)
        ) {
          errObj[el.id] = el.errorMessage;
        } else {
          errObj[el.id] = null;
        }
      });

      setError({ ...errObj });
      let valid = true;
      Object.values(errObj).forEach((i) => {
        if (i) {
          valid = false;
        }
      });
      return valid;
    };

    useImperativeHandle(ref, () => {
      return {
        handleSendFormData: () => {
          console.log("variation", variationFormData);
          return ["variation", { ...variationFormData }];
        },
        validate: () => {
          // write validation logic here
          // return true if validation is success else false
          return validateForm();
        },
      };
    });

    // function getUniqueListBy(arr, key) {
    //   return [...new Map(arr.map((item) => [item[key], item])).values()];
    // }

    useEffect(() => {
      let tempFormData = {};
      setFormData((pre) => {
        tempFormData = { ...JSON.parse(JSON.stringify(pre)) };
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
          setDropdowns([...dataCopy, ...defaultList]);
        }
        return pre;
      });
    }, [formData?.attribute]);

    useEffect(() => {
      setVariationFormData({ ...formData.variation });
    }, [formData.variation]);

    // useEffect(() => {
    //   setDropdowns((prev) => {
    //     const dropdownCopy = [...prev];
    //     Object.entries(variationFormData).forEach(([key, value]) => {
    //       const existingVal = dropdowns.find((i) => i.id === key);
    //       const index = dropdowns.findIndex((i) => i.id === key);
    //       dropdownCopy[index] = {
    //         ...existingVal,
    //         value,
    //       };
    //     });
    //     return dropdownCopy;
    //   });
    // }, [variationFormData]);
    console.log("variationFormData", variationFormData);
    const handleInputChange = (val, ele) => {
      const getData = () => {
        if (ele.type === "dropdown") {
          return val ? val.id : null;
        }
        return val;
      };
      setVariationFormData((prev) => {
        return {
          ...prev,
          [ele.id]: getData(),
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

    return (
      <Grid container spacing={2} className="">
        {dropdowns.map((ele) => {
          return (
            <Grid item md={12} container key={ele.id} alignItems="center">
              <Grid item lg={3} md={12} xs={12}>
                <Typography fontSize={14}>{ele.label}</Typography>
              </Grid>
              <Grid item lg={9} md={12} xs={12}>
                {ele.type === "dropdown" && (
                  <SimpleDropdownComponent
                    id={ele.id}
                    size="small"
                    list={ele.options}
                    value={ele.options.find(
                      (op) => op.id === variationFormData[ele.id]
                    )}
                    onDropdownSelect={(val) => handleInputChange(val, ele)}
                    helperText={error[ele.id]}
                  />
                )}
                {ele.type === "textarea" && (
                  <InputBox
                    id={ele.id}
                    value={variationFormData[ele.id]}
                    isMultiline
                    onInputChange={(e) =>
                      handleInputChange(e.target.value, ele)
                    }
                    error={Boolean(error[ele.id])}
                    helperText={error[ele.id]}
                  />
                )}
                {ele.type === "date" && (
                  <DatePickerComponent
                    id={ele.id}
                    value={variationFormData[ele.id]}
                    size="small"
                    onDateChange={(val) => handleInputChange(val, ele)}
                    error={Boolean(error[ele.id])}
                    helperText={error[ele.id]}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
