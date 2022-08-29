/* eslint-disable no-unused-vars */
import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckBoxComponent from "components/atoms/CheckboxComponent";
import InputBox from "components/atoms/InputBoxComponent";
import InvoiceCardComponent from "components/atoms/InvoiceCardComponent";
import validateMessage from "constants/validateMessages";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CustomIcon from "services/iconUtils";
import validationRegex from "services/utils/regexUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import ModalComponent from "@/atoms/ModalComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { validatePricing } from "../validation";

const returnOrderData = [
  {
    id: 1,
    value: 7,
    label: "7 Days",
  },
  {
    id: 1,
    value: 14,
    label: "14 Days",
  },
  {
    id: 1,
    value: 21,
    label: "21 Days",
  },
  {
    id: 1,
    value: 28,
    label: "28 Days",
  },
];
const PricingForm = forwardRef(
  ({ formData = {}, setFormData = () => {} }, ref) => {
    const [showZoneModal, setShowZoneModal] = useState(false);
    const [openViewModal, setOPenViewModal] = useState(false);
    const [viewModalData, setViewModalData] = useState([]);
    const [errorObj, setErrorObj] = useState({});

    const handleInputChange = (e) => {
      setFormData((pre) => {
        return {
          ...pre,
          pricing: {
            ...pre.pricing,
            [e.target.id]: e.target.value
              .replaceAll("-", "")
              .replaceAll("e", ""),
          },
        };
      });
    };
    useImperativeHandle(ref, () => {
      return {
        validate: () => {
          const { errObj, flag } = validatePricing(formData.pricing);
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
      <Paper
        className="w-100 p-3 ps-4  overflow-y-scroll"
        sx={{ maxHeight: "68vh !important" }}
      >
        <Grid container className="w-100" spacing={2}>
          <Grid item md={6}>
            <InputBox
              id="sale_price"
              label="Sale Price*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.sale_price}
              inputlabelshrink
              type="number"
              helperText={errorObj.sale_price ?? ""}
              error={errorObj.sale_price && errorObj.sale_price !== ""}
              placeholder="eg.: 100"
            />
          </Grid>
          <Grid item md={6}>
            <InputBox
              id="mrp"
              label="MRP*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.mrp}
              inputlabelshrink
              type="number"
              helperText={errorObj.mrp ?? ""}
              error={errorObj.mrp && errorObj.mrp !== ""}
              placeholder="eg.: 100"
            />
          </Grid>
          <Grid item md={12}>
            <Box className=" d-flex align-items-center mb-2">
              <CheckBoxComponent
                label=""
                checkBoxClick={() => {
                  setFormData((pre) => {
                    if (
                      pre.pricing.freeDeliveryCheckbox &&
                      errorObj?.sale_price_logistics !== ""
                    ) {
                      setErrorObj((prev) => {
                        return {
                          ...prev,
                          sale_price_logistics: "",
                        };
                      });
                    }
                    return {
                      ...pre,
                      pricing: {
                        ...pre.pricing,
                        freeDeliveryCheckbox: !pre.pricing.freeDeliveryCheckbox,
                      },
                    };
                  });
                }}
                isChecked={formData?.pricing?.freeDeliveryCheckbox}
                size="small"
                showIcon
                varient="filled"
              />
              <Typography className="h-5" sx={{ marginLeft: "-20px" }}>
                Provide Free Delivery & Return To Your Customer
              </Typography>
            </Box>
            <InputBox
              id="sale_price_logistics"
              label="Sale Price With Logistics Charges*"
              placeholder="Sale Price With Logistics Charges"
              onInputChange={handleInputChange}
              value={formData?.pricing?.sale_price_logistics}
              inputlabelshrink
              helperText={errorObj.sale_price_logistics ?? ""}
              error={
                errorObj.sale_price_logistics &&
                errorObj.sale_price_logistics !== ""
              }
              disabled={!formData?.pricing?.freeDeliveryCheckbox}
            />
          </Grid>
          <Grid item md={6}>
            <div className="d-flex align-items-center justify-content-center">
              <CheckBoxComponent
                label=""
                isChecked={formData?.pricing?.return_order_accepted}
                checkBoxClick={() => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      pricing: {
                        ...pre.pricing,
                        return_order_accepted:
                          !pre.pricing.return_order_accepted,
                      },
                    };
                  });
                }}
                size="small"
                showIcon
                varient="filled"
              />
              <Typography className="fs-12 mt-1" sx={{ marginLeft: "-20px" }}>
                Return Order Accepted
              </Typography>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="d-flex align-items-center justify-content-center">
              <CheckBoxComponent
                label=""
                isChecked={formData?.pricing?.cash_on_accepted}
                checkBoxClick={() => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      pricing: {
                        ...pre.pricing,
                        cash_on_accepted: !pre.pricing.cash_on_accepted,
                      },
                    };
                  });
                }}
                size="small"
                showIcon
                varient="filled"
              />
              <Typography className="fs-12 mt-1" sx={{ marginLeft: "-20px" }}>
                Cash on Delivery
              </Typography>
            </div>
          </Grid>
          {formData?.pricing?.return_order_accepted && (
            <Grid item xs={12}>
              <SimpleDropdownComponent
                list={returnOrderData}
                id="returnorder"
                label="Return Period*"
                size="small"
                value={formData?.pricing?.returnorder}
                onDropdownSelect={(value) => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      pricing: {
                        ...pre.pricing,
                        returnorder: value,
                      },
                    };
                  });
                }}
                inputlabelshrink
                helperText={errorObj.returnorder ?? ""}
                error={errorObj.returnorder && errorObj.returnorder !== ""}
                placeholder="Return Period"
              />
            </Grid>
          )}
          {formData?.mainFormData?.category?.value === "electronics" && (
            <Grid item md={12} className="my-1">
              <ButtonComponent
                label="Zone Charges"
                showIcon
                iconName="add"
                iconColorClass="color-white"
                iconOrintation="end"
                onBtnClick={() => {
                  setShowZoneModal(true);
                }}
              />
              <CustomIcon
                type="view"
                className="mx-3"
                onIconClick={() => {
                  setOPenViewModal(true);
                  setViewModalData([
                    {
                      id: 1,
                      title: "Zone A",
                      value: "230",
                    },
                    {
                      id: 1,
                      title: "Zone B",
                      value: "230",
                    },
                    {
                      id: 1,
                      title: "Zone C",
                      value: "230",
                    },
                    {
                      id: 1,
                      title: "Zone D",
                      value: "230",
                    },
                    {
                      id: 1,
                      title: "Zone E",
                      value: "230",
                    },
                  ]);
                }}
              />
              <CustomIcon
                type="edit"
                className="me-3"
                onIconClick={() => {
                  setShowZoneModal(true);
                }}
              />
              <CustomIcon type="close" />
            </Grid>
          )}
          <Grid item md={12}>
            <InputBox
              id="product_weight"
              label="Product Weight(inclusive of package)*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.product_weight}
              inputlabelshrink
              type="number"
              placeholder="eg.:200"
              helperText={errorObj.product_weight ?? ""}
              error={errorObj.product_weight && errorObj.product_weight !== ""}
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="length"
              label="Length(inclusive of packages)*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.length}
              inputlabelshrink
              type="number"
              helperText={errorObj.length ?? ""}
              error={errorObj.length && errorObj.length !== ""}
              placeholder="eg.: 200"
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="height"
              label="Height(inclusive of package)*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.height}
              inputlabelshrink
              type="number"
              helperText={errorObj.height ?? ""}
              error={errorObj.height && errorObj.height !== ""}
              placeholder="eg.: 200"
            />
          </Grid>
          <Grid item md={12}>
            <InputBox
              id="width"
              label="Width(inclusive of package)*"
              onInputChange={handleInputChange}
              value={formData?.pricing?.width}
              inputlabelshrink
              type="number"
              helperText={errorObj.width ?? ""}
              error={errorObj.width && errorObj.width !== ""}
              placeholder="eg.: 200"
            />
          </Grid>
          <Grid item md={12}>
            <InvoiceCardComponent />
          </Grid>
        </Grid>
        {showZoneModal && (
          <ModalComponent
            open={showZoneModal}
            onCloseIconClick={() => {
              setShowZoneModal(false);
            }}
            saveBtnText="Submit"
            ClearBtnText="Cancel"
            onClearBtnClick={() => {
              setShowZoneModal(false);
            }}
            footerClassName="justify-content-end"
          >
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12}>
                <InputBox
                  id="Zone_A"
                  label="Zone A*"
                  onInputChange={(e) => {}}
                  value={formData?.pricing?.defaultZoneData.zoneA}
                  inputlabelshrink
                  placeholder="Enter Price"
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <InputBox
                  id="Zone_B"
                  label="Zone B*"
                  onInputChange={(e) => {}}
                  value={formData?.pricing?.defaultZoneData.zoneB}
                  inputlabelshrink
                  placeholder="Enter Price"
                />
              </Grid>
              <Grid item xs={12}>
                <InputBox
                  id="Zone_c"
                  label="Zone C*"
                  onInputChange={(e) => {}}
                  value={formData?.pricing?.defaultZoneData.zoneC}
                  inputlabelshrink
                  placeholder="Enter Price"
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <InputBox
                  id="Zone_D"
                  label="Zone D*"
                  onInputChange={(e) => {}}
                  value={formData?.pricing?.defaultZoneData.zoneD}
                  inputlabelshrink
                  placeholder="Enter Price"
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <InputBox
                  id="Zone_E"
                  label="Zone E*"
                  onInputChange={(e) => {}}
                  value={formData?.pricing?.defaultZoneData.zoneE}
                  inputlabelshrink
                  placeholder="Enter Price"
                />
              </Grid>
            </Grid>
          </ModalComponent>
        )}
        {openViewModal && (
          <ModalComponent
            open={openViewModal}
            onCloseIconClick={() => {
              setOPenViewModal(false);
            }}
            showFooter={false}
            ModalTitle="View Zone Charges"
          >
            <Grid container spacing={2} className="mt-1 mb-2">
              {viewModalData.map((item) => (
                <Grid item sm={6} display="flex" alignItems="center">
                  <Typography className="h-5 color-gary ">
                    {item.title} :
                  </Typography>
                  <Typography className="h-4 fw-bold">
                    &nbsp;{item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </ModalComponent>
        )}
      </Paper>
    );
  }
);

PricingForm.displayName = "PricingForm";
export default PricingForm;
