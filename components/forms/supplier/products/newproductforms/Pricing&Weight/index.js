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
const PricingForm = forwardRef(({ formData = {} }, ref) => {
  const [freeDeliveryCheckbox, setFreeDeliveryCheckbox] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [defaultZoneData, setDefaultZoneData] = useState({
    zoneA: "",
    zoneB: "",
    zoneC: "",
    zoneD: "",
    zoneE: "",
  });
  const [openViewModal, setOPenViewModal] = useState(false);
  const [viewModalData, setViewModalData] = useState([]);

  const [pricingFormData, setPricingFormData] = useState({
    sale_price: "",
    mrp: "",
    return_order_accepted: false,
    cash_on_accepted: false,
    product_weight: "",
    length: "",
    width: "",
    height: "",
    delivery_charge: "",
    sale_price_logistics: "",
    returnorder: {},
  });
  const [errorObj, setErrorObj] = useState({
    sale_price: "",
    mrp: "",
    return_order_accepted: false,
    cash_on_accepted: false,
    product_weight: "",
    length: "",
    width: "",
    height: "",
    delivery_charge: "",
    sale_price_logistics: "",
  });

  const validate = () => {
    let flag = false;
    const errObj = {
      sale_price: "",
      mrp: "",
      return_order_accepted: false,
      cash_on_delivary: false,
      product_weight: "",
      length: "",
      width: "",
      height: "",
      // delivery_charge: "",
      sale_price_logistics: "",
    };
    if (pricingFormData.sale_price === "") {
      flag = true;
      errObj.sale_price = validateMessage.field_required;
    } else if (
      !validationRegex.decimal_2digit.test(
        parseFloat(pricingFormData.sale_price)
      )
    ) {
      flag = true;
      errObj.sale_price = validateMessage.decimal_2digits;
    }
    if (pricingFormData.mrp === "") {
      flag = true;
      errObj.mrp = validateMessage.field_required;
    } else if (
      !validationRegex.decimal_2digit.test(parseFloat(pricingFormData.mrp))
    ) {
      flag = true;
      errObj.mrp = validateMessage.decimal_2digits;
    }
    if (pricingFormData.product_weight === "") {
      flag = true;
      errObj.product_weight = validateMessage.field_required;
    } else if (
      parseInt(pricingFormData.product_weight, 10) > 100000 ||
      parseInt(pricingFormData.product_weight, 10) < 100
    ) {
      flag = true;
      errObj.product_weight = "weight should be between 100 to 100000 grams";
    }
    if (pricingFormData.length === "") {
      flag = true;
      errObj.length = validateMessage.field_required;
    }
    if (pricingFormData.width === "") {
      flag = true;
      errObj.width = validateMessage.field_required;
    }
    if (pricingFormData.height === "") {
      flag = true;
      errObj.height = validateMessage.field_required;
    }
    if (pricingFormData.sale_price_logistics === "") {
      flag = true;
      errObj.sale_price_logistics = validateMessage.field_required;
    }
    setErrorObj(errObj);
    return !flag;
  };

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["pricing", { ...pricingFormData, freeDeliveryCheckbox }];
      },
      validate,
      clearPage: () => {
        setPricingFormData({
          sale_price: "",
          mrp: "",
          return_order_accepted: false,
          cash_on_accepted: false,
          product_weight: "",
          length: "",
          width: "",
          height: "",
          delivery_charge: "",
          sale_price_logistics: "",
          returnorder: {},
        });
        setErrorObj({
          sale_price: "",
          mrp: "",
          return_order_accepted: false,
          cash_on_accepted: false,
          product_weight: "",
          length: "",
          width: "",
          height: "",
          delivery_charge: "",
          sale_price_logistics: "",
        });
        setDefaultZoneData({
          zoneA: "",
          zoneB: "",
          zoneC: "",
          zoneD: "",
          zoneE: "",
        });
        setFreeDeliveryCheckbox(false);
      },
    };
  });

  useEffect(() => {
    setPricingFormData({ ...formData.pricing });
  }, [formData]);

  const handleInputChange = (e) => {
    setPricingFormData((prev) => {
      return {
        ...prev,
        [e.target.id]:
          e.target.value === "" ? e.target.value : Math.abs(e.target.value),
      };
    });
  };
  return (
    <Paper
      className="w-100 p-3 ps-4  overflow-y-scroll"
      sx={{ maxHeight: "68vh !important" }}
    >
      <Grid container className="w-100" spacing={2}>
        <Grid item md={6}>
          <InputBox
            id="sale_price"
            label="Sale Price"
            onInputChange={handleInputChange}
            value={pricingFormData.sale_price}
            inputlabelshrink
            type="number"
            helperText={errorObj.sale_price}
            error={errorObj.sale_price !== ""}
            placeholder="eg.: 100"
          />
        </Grid>
        <Grid item md={6}>
          <InputBox
            id="mrp"
            label="MRP"
            onInputChange={handleInputChange}
            value={pricingFormData.mrp}
            inputlabelshrink
            type="number"
            helperText={errorObj.mrp}
            error={errorObj.mrp !== ""}
            placeholder="eg.: 100"
          />
        </Grid>
        <Grid item md={12}>
          <Box className=" d-flex align-items-center mb-2">
            <CheckBoxComponent
              label=""
              checkBoxClick={() => {
                setFreeDeliveryCheckbox(!freeDeliveryCheckbox);
              }}
              isChecked={freeDeliveryCheckbox}
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
            label="Sale Price With Logistics Charges"
            placeholder="Sale Price With Logistics Charges"
            onInputChange={handleInputChange}
            value={pricingFormData.sale_price_logistics}
            inputlabelshrink
            helperText={errorObj.sale_price_logistics}
            error={errorObj.sale_price_logistics !== ""}
            disabled={!freeDeliveryCheckbox}
          />
        </Grid>
        <Grid item md={6}>
          <div className="d-flex align-items-center justify-content-center">
            <CheckBoxComponent
              label=""
              isChecked={pricingFormData.return_order_accepted}
              checkBoxClick={() => {
                setPricingFormData((prev) => {
                  return {
                    ...prev,
                    return_order_accepted: !prev.return_order_accepted,
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
              isChecked={pricingFormData.cash_on_accepted}
              checkBoxClick={() => {
                setPricingFormData((prev) => {
                  return {
                    ...prev,
                    cash_on_accepted: !prev.cash_on_accepted,
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
        {pricingFormData.return_order_accepted && (
          <Grid item xs={12}>
            <SimpleDropdownComponent
              list={returnOrderData}
              id="returnorder"
              label="Return Period"
              size="small"
              value={pricingFormData.returnorder}
              onDropdownSelect={(value) => {
                setPricingFormData((prev) => ({ ...prev, returnorder: value }));
              }}
              inputlabelshrink
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
        {/* <Grid item md={6}>
          <InputBox
            id="delivery_charge"
            label="Delivery Charge"
            onInputChange={handleInputChange}
            value={pricingFormData.delivery_charge}
            inputlabelshrink
            type="number"
            helperText={errorObj.delivery_charge}
            error={errorObj.delivery_charge !== ""}
            placeholder="eg.:100"
          />
        </Grid> */}
        <Grid item md={12}>
          <InputBox
            id="product_weight"
            label="Product Weight(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.product_weight}
            inputlabelshrink
            type="number"
            helperText={errorObj.product_weight}
            error={errorObj.product_weight !== ""}
            placeholder="eg.:200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="length"
            label="Length(inclusive of packages)"
            onInputChange={handleInputChange}
            value={pricingFormData.length}
            inputlabelshrink
            type="number"
            helperText={errorObj.length}
            error={errorObj.length !== ""}
            placeholder="eg.: 200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="height"
            label="Height(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.height}
            inputlabelshrink
            type="number"
            helperText={errorObj.height}
            error={errorObj.height !== ""}
            placeholder="eg.: 200"
          />
        </Grid>
        <Grid item md={12}>
          <InputBox
            id="width"
            label="Width(inclusive of package)"
            onInputChange={handleInputChange}
            value={pricingFormData.width}
            inputlabelshrink
            type="number"
            helperText={errorObj.width}
            error={errorObj.width !== ""}
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
                label="Zone A"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneA: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneA}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_B"
                label="Zone B"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneB: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneB}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_c"
                label="Zone C"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneC: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneC}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_D"
                label="Zone D"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneD: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneD}
                inputlabelshrink
                placeholder="Enter Price"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <InputBox
                id="Zone_E"
                label="Zone E"
                onInputChange={(e) => {
                  setDefaultZoneData((prev) => ({
                    ...prev,
                    zoneE: e.target.value,
                  }));
                }}
                value={defaultZoneData.zoneE}
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
});

PricingForm.displayName = "PricingForm";
export default PricingForm;
