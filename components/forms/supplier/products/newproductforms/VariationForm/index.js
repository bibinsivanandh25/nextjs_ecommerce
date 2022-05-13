/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";

const VariationForm = forwardRef(({ formData = {} }, ref) => {
  const [variationFormData, setVariationFormData] = useState({
    expiryDate: null,
    others: "",
    color: null,
    fabric: null,
    type: null,
    availabeSizes: null,
    style: null,
    designType: null,
    styleCode: null,
    countryOfOrigin: null,
  });
  const [dropdowns, setDropdowns] = useState([
    // {
    //   label: "Select Color",
    //   type: "dropdown",
    //   id: "color",
    //   options: [
    //     {
    //       id: "blue",
    //       label: "Blue",
    //     },
    //     { id: "black", label: "Black" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Select Fabric*",
    //   type: "dropdown",
    //   id: "fabric",
    //   options: [
    //     {
    //       id: "cotton",
    //       label: "Cotton",
    //     },
    //     { id: "silk", label: "Silk" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Select Type",
    //   type: "dropdown",
    //   id: "type",
    //   options: [
    //     {
    //       id: "shirt",
    //       label: "Shirt",
    //     },
    //     { id: "pant", label: "Pant" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Select Available Sizes*",
    //   type: "dropdown",
    //   id: "availabeSizes",
    //   options: [
    //     {
    //       id: "m",
    //       label: "Medium",
    //     },
    //     { id: "l", label: "Large" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Select Style",
    //   type: "dropdown",
    //   id: "style",
    //   options: [
    //     {
    //       id: "spotted",
    //       label: "Spotted",
    //     },
    //     { id: "striped", label: "Striped" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Select Design Type",
    //   type: "dropdown",
    //   id: "designType",
    //   options: [
    //     {
    //       id: "blue",
    //       label: "Blue",
    //     },
    //     { id: "black", label: "Black" },
    //   ],
    //   value: null,
    // },
    // {
    //   label: "Style Code(optional)",
    //   type: "dropdown",
    //   id: "styleCode",
    //   options: [
    //     {
    //       id: "blue",
    //       label: "Blue",
    //     },
    //     { id: "black", label: "Black" },
    //   ],
    //   value: null,
    // },
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
      options: [
        {
          id: "india",
          label: "India",
        },
        { id: "japan", label: "Japan" },
      ],
      value: null,
    },
    {
      label: "Others",
      type: "textarea",
      id: "others",
      value: null,
    },
  ]);
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["variation", { ...variationFormData }];
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
        };
        return ob;
      });
      setDropdowns((prev) => getUniqueListBy([...data, ...prev], "id"));
    }
    setVariationFormData({ ...formData.variation });
  }, [formData]);

  useEffect(() => {
    const dropdownCopy = [...dropdowns];
    Object.entries(variationFormData).forEach(([key, value]) => {
      const existingVal = dropdowns.find((i) => i.id === key);
      const index = dropdowns.findIndex((i) => i.id === key);
      dropdownCopy[index] = {
        ...existingVal,
        value,
      };
    });
    setDropdowns(dropdownCopy);
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
                />
              )}
              {ele.type === "textarea" && (
                <InputBox
                  id={ele.id}
                  value={ele.value}
                  isMultiline
                  onInputChange={(e) => handleInputChange(e.target.value, ele)}
                />
              )}
              {ele.type === "date" && (
                <DatePickerComponent
                  id={ele.id}
                  value={ele.value}
                  size="small"
                  onDateChange={(val) => handleInputChange(val, ele)}
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
