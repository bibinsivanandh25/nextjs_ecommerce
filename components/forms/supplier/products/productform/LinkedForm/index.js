import { Grid } from "@mui/material";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import {
  crossSellsProduct,
  upsellsProduct,
} from "services/supplier/AddProducts";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";
import { validateLinked } from "../validation";

const LinkedForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [errorObj, setErrorObj] = useState({});
    const { viewFlag } = useSelector((state) => state.product);
    const [productsList, setProductsList] = useState([]);
    const { supplierId } = useSelector((state) => state.user);
    const [crossSellProduct, setCrossSellProduct] = useState([]);
    const getProductsList = async () => {
      const { data } = await upsellsProduct(
        supplierId,
        formData.mainForm.category.id
      );
      if (data) {
        setProductsList(
          data.data.map((item) => {
            return {
              title: item.productTitle,
              value: item.productVariationId,
              id: item.productVariationId,
              subCategoryId: item.subCategoryId,
            };
          })
        );
      }
    };
    const getCrossSellProducts = async () => {
      let payload = [];
      formData?.linked?.upSells.forEach((item) => {
        payload.push(item.subCategoryId);
      });
      payload = [...new Set(payload)];
      const { data } = await crossSellsProduct({
        subCategoryId: payload,
        supplierId,
      });
      if (data) {
        setCrossSellProduct(
          data.data.map((item) => {
            return {
              title: item.productTitle,
              value: item.productVariationId,
              id: item.productVariationId,
              subCategoryId: item.subCategoryId,
            };
          })
        );
      }
    };

    useEffect(() => {
      if (formData?.mainForm?.category?.value) getProductsList();
    }, [formData?.mainForm?.category?.value]);

    useEffect(() => {
      if (
        formData?.linked?.upSells &&
        Object.keys(formData?.linked?.upSells).length
      ) {
        getCrossSellProducts();
      }
    }, [formData?.linked?.upSells]);

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
            <MultiSelectComponent
              label="Up-Sells*"
              placeholder="Filter By Product..."
              list={productsList}
              size="small"
              value={formData?.linked?.upSells}
              onSelectionChange={(e, val) => {
                setFormData((pre) => {
                  const temp = JSON.parse(JSON.stringify(pre));
                  temp.linked.upSells = val;
                  temp.linked.crossSells = [];
                  return temp;
                });
              }}
              disabled={viewFlag}
              error={errorObj.upSells && errorObj.upSells?.length}
              helperText={errorObj.upSells ?? ""}
            />
          </Grid>
          <Grid item xs={3} className="d-flex align-items-center">
            <InfoOutlinedIcon />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={9}>
            <MultiSelectComponent
              error={errorObj.crossSells && errorObj.crossSells?.length}
              helperText={errorObj.crossSells ?? ""}
              label="Cross-Sells*"
              placeholder="Filter By Product..."
              list={crossSellProduct}
              size="small"
              value={formData?.linked?.crossSells}
              onSelectionChange={(e, val) => {
                setFormData((pre) => {
                  const temp = JSON.parse(JSON.stringify(pre));
                  temp.linked.crossSells = val;
                  return temp;
                });
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
