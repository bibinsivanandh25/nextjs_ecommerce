import { Grid } from "@mui/material";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { forwardRef, useImperativeHandle, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { validateLinked } from "../validation";

const LinkedForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [errorObj, setErrorObj] = useState({});
    const handleDropdownChange = (value, key) => {
      setFormData((pre) => ({
        ...pre,
        linked: {
          ...pre.linked,
          [key]: value,
        },
      }));
    };

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

    useImperativeHandle(ref, () => {
      return {
        validate: () => {
          const { errObj, flag } = validateLinked(formData.linked);
          if (Object.keys(errObj).length) {
            const element = document.getElementById(Object.keys(errObj)[0]);
            if (element) {
              element.scrollIntoView();
            }
          }
          setErrorObj(errObj);
          return flag;
        },
        clearPage: () => {
          setErrorObj({});
        },
      };
    });

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={9}>
            <SimpleDropdownComponent
              size="small"
              error={errorObj.upSells && errorObj.upSells?.length}
              helperText={errorObj.upSells ?? ""}
              label="Up-Sells*"
              placeholder="Filter By Product..."
              inputlabelshrink
              list={[...upSellsArray]}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "upSells");
              }}
              value={formData?.linked?.upSells}
            />
          </Grid>
          <Grid item xs={3} className="d-flex align-items-center">
            <InfoOutlinedIcon />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={9}>
            <SimpleDropdownComponent
              size="small"
              error={errorObj.crossSells && errorObj.crossSells?.length}
              helperText={errorObj.crossSells ?? ""}
              label="Cross-Sells*"
              placeholder="Filter By Product..."
              inputlabelshrink
              list={[...crossSellsArray]}
              value={formData?.linked?.crossSells}
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
  }
);

LinkedForm.displayName = "LinkedForm";
export default LinkedForm;
