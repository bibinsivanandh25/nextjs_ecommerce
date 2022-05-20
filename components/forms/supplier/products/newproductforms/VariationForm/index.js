/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import validateMessage from "constants/validateMessages";

const VariationForm = forwardRef(({ formData = {} }, ref) => {
  const [variationFormData, setVariationFormData] = useState({});
  const [error, setError] = useState({});
  const [dropdowns, setDropdowns] = useState([
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
  ]);

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
        return ["variation", { ...variationFormData }];
      },
      validate: () => {
        //write validation logic here
        //return true if validation is success else false
        return validateForm();
      },
    };
  });

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    if (formData && formData.attribute) {
      const data = Object.entries(formData?.attribute).map(([key, value]) => {
        const ob = {
          label: key.charAt(0).toUpperCase() + key.slice(1, key.length),
          type: "dropdown",
          id: key,
          options: value.map((o) => ({ ...o, label: o.title })),
          value: null,
          required: true,
        };
        return ob;
      });
      setDropdowns((prev) => getUniqueListBy([...data, ...prev], "id"));
    }
  }, [formData?.attribute]);

  useEffect(() => {
    setVariationFormData({ ...formData.variation });
  }, [formData.variation]);

  useEffect(() => {
    setDropdowns((prev) => {
      const dropdownCopy = [...prev];
      Object.entries(variationFormData).forEach(([key, value]) => {
        const existingVal = dropdowns.find((i) => i.id === key);
        const index = dropdowns.findIndex((i) => i.id === key);
        dropdownCopy[index] = {
          ...existingVal,
          value,
        };
      });
      return dropdownCopy;
    });
  }, [variationFormData]);

  const handleInputChange = (val, ele) => {
    const getData = () => {
      if (ele.type === "dropdown") {
        return val ? val.id : null;
      } else {
        return val;
      }
    };
    setVariationFormData((prev) => {
      return {
        ...prev,
        [ele.id]: getData(),
      };
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
                  value={ele.options.find((op) => op.id === ele.value)}
                  onDropdownSelect={(val) => handleInputChange(val, ele)}
                  helperText={error[ele.id]}
                />
              )}
              {ele.type === "textarea" && (
                <InputBox
                  id={ele.id}
                  value={ele.value}
                  isMultiline
                  onInputChange={(e) => handleInputChange(e.target.value, ele)}
                  error={Boolean(error[ele.id])}
                  helperText={error[ele.id]}
                />
              )}
              {ele.type === "date" && (
                <DatePickerComponent
                  id={ele.id}
                  value={ele.value}
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
});

VariationForm.displayName = "VariationForm";
export default VariationForm;
