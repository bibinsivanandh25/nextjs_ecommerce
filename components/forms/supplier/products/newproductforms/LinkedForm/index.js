import { Box, Grid, Paper } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { formatValue } from "@syncfusion/ej2-react-maps";
import validateMessage from "constants/validateMessages";

const LinkedForm = forwardRef(({ formData }, ref) => {
  const [linkedFormData, setLinkedFormData] = useState({
    upSells: {
      label: "",
      value: "",
    },
    crossSells: {
      label: "",
      value: "",
    },
  });
  const [errorObj, setErrorObj] = useState({
    upSells: "",
    crossSells: "",
  });

  useEffect(() => {
    setLinkedFormData({ ...formData.linked });
  }, [formData]);

  const handleDropdownChange = (value, key) => {
    setLinkedFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["linked", { ...linkedFormData }];
      },
      validate: validateFormvalues,
    };
  });
  const upSellsArray = [
    {
      value: "upsells",
      label: "Up Sells",
    },
  ];

  const crossSellsArray = [
    {
      value: "crosssells",
      label: "Cross Sells",
    },
  ];

  const validateFormvalues = () => {
    let flag = true;
    let errObj = {
      upSells: "",
      crossSells: "",
    };
    if (!linkedFormData.upSells?.value) {
      errObj.upSells = validateMessage.field_required;
      flag = false;
    }
    if (!linkedFormData.crossSells?.value) {
      errObj.crossSells = validateMessage.field_required;
      flag = false;
    }
    setErrorObj({ ...errObj });
    return flag;
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={9}>
          <SimpleDropdownComponent
            error={errorObj.upSells?.length}
            helperText={errorObj.upSells}
            size="small"
            label="Up-Sells"
            placeholder="Filter By Product..."
            inputlabelshrink
            list={[...upSellsArray]}
            onDropdownSelect={(value) => {
              handleDropdownChange(value, "upSells");
            }}
            value={linkedFormData.upSells}
          />
        </Grid>
        <Grid item xs={3} className="d-flex align-items-center">
          <InfoOutlinedIcon />
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={9}>
          <SimpleDropdownComponent
            error={errorObj.crossSells?.length}
            helperText={errorObj.crossSells}
            size="small"
            label="Cross-Sells"
            placeholder="Filter By Product..."
            inputlabelshrink
            list={[...crossSellsArray]}
            value={linkedFormData.crossSells}
            onDropdownSelect={(value) => {
              handleDropdownChange(value, "crossSells");
            }}
          />
        </Grid>
        <Grid item xs={3} className="d-flex align-items-center">
          <InfoOutlinedIcon />
        </Grid>
      </Grid>
    </Grid>
  );
});

LinkedForm.displayName = "LinkedForm";
export default LinkedForm;
