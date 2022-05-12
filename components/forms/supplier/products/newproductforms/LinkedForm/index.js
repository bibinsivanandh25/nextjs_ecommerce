import { Box, Grid, Paper } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { forwardRef, useImperativeHandle, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const LinkedForm = forwardRef(({}, ref) => {
  const [linkedFormData, setLinkedFormData] = useState({
    upSells: "",
    crossSells: "",
  });

  useEffect(() => {
    setInventoryFormData({ ...formData.inventory });
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={9}>
          <SimpleDropdownComponent
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
export default LinkedForm;
