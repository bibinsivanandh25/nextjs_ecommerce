import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";

let attributes = {
  brand: ["puma", "adidas"],
  color: ["red", "green"],
  Gender: ["Male", "Female"],
  Material: ["Cotton", "Nylon", "Silk"],
  Size: ["xs", "s", "m", "l", "xl", "xxl"],
};

const AttributesForm = forwardRef(({}, ref) => {
  const [attributesFormData, setAttributesFormData] = useState({});
  const [Attributes, setAttributes] = useState({ ...attributes });
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["attribute", { ...attributesFormData }];
      },
    };
  });

  const getAttributeValues = () => {
    return Object.entries(Attributes).map(([key, value], index) => {
      let options = [];
      value.forEach((ele, ind) => {
        options.push({
          id: ind + 1,
          label: ele,
          value: ele,
        });
      });
      return (
        <Grid container item key={index}>
          <Grid item lg={3} sm={12}>
            <CheckBoxComponent label={key} />
          </Grid>
          <Grid item lg={9} sm={12}>
            <SimpleDropdownComponent list={[...options]} />
          </Grid>
        </Grid>
      );
    });
  };
  console.log(getAttributeValues());
  return (
    <Grid container className="">
      {getAttributeValues()}
    </Grid>
  );
});
export default AttributesForm;
