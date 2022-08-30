/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import { getCurrentData } from "services/supplier";
import { validateVariation } from "../validation";

const VariationForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
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
    const [error, setError] = useState({});
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
        setDropdowns([...dataCopy, ...defaultList]);
      }
    }, [formData?.attribute]);

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
          const { errObj, flag } = validateVariation(dropdowns, currentData);
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
                    list={ele.options}
                    value={
                      ele.options.find(
                        (op) => op.id === formData?.variation[ele.id]
                      ) ?? {}
                    }
                    onDropdownSelect={(val) => handleInputChange(val, ele)}
                    helperText={error[ele.id]}
                  />
                )}
                {ele.type === "textarea" && (
                  <InputBox
                    id={ele.id}
                    value={formData?.variation?.others ?? ""}
                    isMultiline
                    onInputChange={(e) =>
                      handleInputChange(e.target.value, ele)
                    }
                    helperText={error[ele.id]}
                    error={Boolean(error[ele.id])}
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
      </Grid>
    );
  }
);

VariationForm.displayName = "VariationForm";
export default VariationForm;
