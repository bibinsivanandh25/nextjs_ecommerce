import { Grid } from "@mui/material";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { upsellsProduct } from "services/supplier/AddProducts";
import { validateLinked } from "../validation";

const LinkedForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [errorObj, setErrorObj] = useState({});
    const { viewFlag } = useSelector((state) => state.product);
    const [productsList, setProductsList] = useState([]);
    const { supplierId } = useSelector((state) => state.user);

    const getProductsList = async () => {
      const { data } = await upsellsProduct(
        supplierId,
        formData.mainForm.category.id
      );
      if (data) {
        setProductsList(
          data.data.map((item) => {
            return {
              label: item.productTitle,
              value: item.productVariationId,
            };
          })
        );
      }
    };

    useEffect(() => {
      if (formData?.mainForm?.category?.value) getProductsList();
    }, [formData?.mainForm?.category?.value]);

    const handleDropdownChange = (value, key) => {
      setFormData((pre) => ({
        ...pre,
        linked: {
          ...pre.linked,
          [key]: value,
        },
      }));
    };

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
              list={productsList}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "upSells");
              }}
              value={formData?.linked?.upSells}
              disabled={viewFlag}
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
              list={productsList}
              value={formData?.linked?.crossSells}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "crossSells");
              }}
              disabled={viewFlag}
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
