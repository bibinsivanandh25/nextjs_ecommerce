import { Grid, IconButton, Tooltip } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import InputFieldWithChip from "components/atoms/InputWithChip";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { stock_status } from "constants/constants";
import { validateInventory } from "../validation";

const InventoryForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [errorObj, setErrorObj] = useState({});
    const { editProduct, viewFlag } = useSelector((state) => state.product);
    useImperativeHandle(ref, () => {
      return {
        validate: () => {
          const { errObj, flag } = validateInventory(formData.inventory);
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

    const handleInputChange = (e) => {
      setFormData((pre) => {
        return {
          ...pre,
          inventory: {
            ...pre.inventory,
            [e.target.id]: e.target.value,
          },
        };
      });
    };
    const handleDropdownChange = (value, key) => {
      setFormData((pre) => {
        return {
          ...pre,
          inventory: {
            ...pre.inventory,
            [key]: value,
          },
        };
      });
    };

    return (
      <div className="w-100">
        <Grid container className="w-100" spacing={2}>
          <Grid item md={12} className="d-flex align-items-center">
            <div className="w-70p">
              <InputBox
                id="sku"
                label="SKU"
                value={formData?.inventory?.sku}
                placeholder="SKU"
                inputlabelshrink
                fullWidth
                // className="w-90p"
                disabled
              />
            </div>
            {!editProduct && (
              <div className="mx-2">
                <Tooltip title="SKU Will Be Generated Once The Product Is Approved">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </Grid>
          <Grid item md={12} className="d-flex align-items-center">
            <div className="w-70p">
              <InputBox
                id="stockqty"
                label="Stock Qty *"
                onInputChange={(e) => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      inventory: {
                        ...pre.inventory,
                        [e.target.id]: e.target.value
                          .replaceAll("-", "")
                          .replaceAll("e", ""),
                      },
                    };
                  });
                }}
                helperText={errorObj.stockqty ?? ""}
                error={errorObj.stockqty && errorObj.stockqty !== ""}
                value={formData?.inventory?.stockqty}
                placeholder="Stock Qty"
                inputlabelshrink
                fullWidth
                type="number"
                disabled={viewFlag}
              />
            </div>
          </Grid>
          {/* <Grid item md={12} className="pt-4">
            <div className="d-flex align-items-center">
              <Typography className="fw-600 me-3">Manage Stocks?</Typography>
              <CheckBoxComponent
                label=""
                isChecked={formData?.inventory?.manageStock}
                checkBoxClick={() => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      inventory: {
                        ...pre.inventory,
                        manageStock: !pre.inventory.manageStock,
                      },
                    };
                  });
                }}
                size="small"
                showIcon
                varient="filled"
                isDisabled={viewFlag}
              />
            </div>
          </Grid> */}
          <Grid item md={12} className="d-flex align-items-center">
            <div className="w-70p">
              <SimpleDropdownComponent
                inputlabelshrink
                list={stock_status}
                id="stockstatus"
                label="Stock Status*"
                size="small"
                // fullWidth={false}
                // className="w-70p"
                value={formData?.inventory?.stock_status}
                helperText={errorObj.stock_status ?? ""}
                error={errorObj.stock_status && errorObj.stock_status !== ""}
                onDropdownSelect={(value) => {
                  handleDropdownChange(value, "stock_status");
                }}
                placeholder="Select stock status"
                type="number"
                disabled={viewFlag}
              />
            </div>
          </Grid>
          {/* {formData?.inventory?.manageStock ? (
            <>
              <Grid item md={12} className="d-flex align-items-center">
                <div className="w-70p">
                  <SimpleDropdownComponent
                    inputlabelshrink
                    list={allowback_orders}
                    id="Allow Backorders ?"
                    label="Allow Backorders ?*"
                    size="small"
                    fullWidth={false}
                    value={formData?.inventory?.allow_backorders}
                    onDropdownSelect={(value) => {
                      handleDropdownChange(value, "allow_backorders");
                    }}
                    helperText={errorObj.allow_backorders ?? ""}
                    error={
                      errorObj.allow_backorders &&
                      errorObj.allow_backorders !== ""
                    }
                    disabled={viewFlag}
                  />
                </div>
                <div className="mx-2">
                  <InfoOutlinedIcon />
                </div>
              </Grid>
              {formData?.inventory?.allow_backorders?.value?.toLowerCase() ===
              "allow" ? (
                <Grid item md={12}>
                  <InputBox
                    id="back_Orders"
                    label="Back Orders*"
                    onInputChange={handleInputChange}
                    value={formData?.inventory?.back_Orders}
                    placeholder="Back Orders"
                    inputlabelshrink
                    fullWidth
                    // className="w-90p"
                    disabled={viewFlag}
                    type="number"
                    helperText={errorObj.back_Orders ?? ""}
                    error={errorObj.back_Orders && errorObj.back_Orders !== ""}
                  />
                </Grid>
              ) : null}
            </>
          ) : null}
          <Grid item md={12}>
            <SimpleDropdownComponent
              inputlabelshrink
              list={shipping_class}
              id="ShippingClass"
              label="Shipping Class*"
              size="small"
              fullWidth={false}
              value={formData?.inventory?.shipping_class}
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "shipping_class");
              }}
              helperText={errorObj.shipping_class ?? ""}
              error={errorObj.shipping_class ?? errorObj.shipping_class !== ""}
              placeholder="Select shipping class"
              disabled={viewFlag}
            />
          </Grid> */}
          <Grid item md={12}>
            <InputBox
              id="product_title"
              label="Product Title*"
              onInputChange={handleInputChange}
              value={formData?.inventory?.product_title}
              inputlabelshrink
              helperText={errorObj.product_title ?? ""}
              error={errorObj.product_title && errorObj.product_title !== ""}
              placeholder="Enter product title"
              disabled={editProduct || viewFlag}
            />
          </Grid>
          {/* <Grid item md={12}>
            <SimpleDropdownComponent
              inputlabelshrink
              list={[...business_processing_days]}
              id="business_processing_days"
              label="Business Processing Days*"
              size="small"
              fullWidth={false}
              value={formData?.inventory?.business_processing_days}
              helperText={errorObj.business_processing_days ?? ""}
              error={
                errorObj.business_processing_days &&
                errorObj.business_processing_days !== null
              }
              onDropdownSelect={(value) => {
                handleDropdownChange(value, "business_processing_days");
              }}
              placeholder="Select processing days"
              disabled={viewFlag}
            />
          </Grid> */}
          <Grid item md={12}>
            <InputFieldWithChip
              id="seo_title"
              label="SEO By Product Title*"
              value={formData?.inventory?.seo_title}
              inputlabelshrink
              handleChange={(_, val) => {
                setFormData((pre) => {
                  return {
                    ...pre,
                    inventory: {
                      ...pre.inventory,
                      seo_title: val,
                    },
                  };
                });
              }}
              helperText={errorObj.seo_title ?? ""}
              error={errorObj.seo_title && errorObj.seo_title !== ""}
              placeholder="Enter SEO title"
              disabled={viewFlag}
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="meta_description"
              label="Meta Description*"
              onInputChange={handleInputChange}
              value={formData?.inventory?.meta_description}
              inputlabelshrink
              helperText={errorObj.meta_description ?? ""}
              error={
                errorObj.meta_description && errorObj.meta_description !== ""
              }
              placeholder="Enter meta description"
              disabled={viewFlag}
            />
          </Grid>
          <Grid item md={12}>
            <InputFieldWithChip
              id="meta_keyword"
              label="Meta Keywords*"
              value={formData?.inventory?.meta_keyword}
              inputlabelshrink
              handleChange={(_, val) => {
                setFormData((pre) => {
                  return {
                    ...pre,
                    inventory: {
                      ...pre.inventory,
                      meta_keyword: val,
                    },
                  };
                });
              }}
              onPaste={(e) => {
                setFormData((pre) => {
                  return {
                    ...pre,
                    inventory: {
                      ...pre.inventory,
                      meta_keyword: [
                        ...pre.inventory.meta_keyword,
                        e.clipboardData.getData("text"),
                      ],
                    },
                  };
                });
              }}
              helperText={errorObj.meta_keyword ?? ""}
              error={errorObj.meta_keyword && errorObj.meta_keyword !== ""}
              placeholder="Enter keywords"
              disabled={viewFlag}
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="modalname"
              label="Model Name"
              onInputChange={handleInputChange}
              value={formData?.inventory?.modalname}
              inputlabelshrink
              helperText={errorObj.modalname ?? ""}
              error={errorObj.modalname && errorObj.modalname !== ""}
              placeholder="Enter Model Name"
              disabled={editProduct || viewFlag}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
);
InventoryForm.displayName = "InventoryForm";
export default InventoryForm;
