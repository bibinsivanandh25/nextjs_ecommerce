import { Grid, Button, Box, Typography } from "@mui/material";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";
import validateMessage from "constants/validateMessages";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CreateSupplierStoreCoupons } from "services/supplier/coupons/supplierstorecoupons";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useUserInfo } from "services/hooks";
import toastify from "services/utils/toastUtils";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

const SupplierAddCoupons = ({
  setOpenAddModal = () => {},
  getTabledata = () => {},
}) => {
  const tabList = [
    {
      title: "Limits",
      id: "limits",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("limits");
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState({});
  const [purchaseCheckbox, setPurchaseCheckbox] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errObj = { ...error };

    const validateFields = (id, validation, errorMessage) => {
      if (!formValues[id]) {
        errObj[id] = validateMessage.field_required;
      } else if (validation && !validation.test(formValues[id])) {
        errObj[id] = errorMessage;
      } else if (
        id === "couponExpiryDate" &&
        formValues[id].toString() === "Invalid Date"
      ) {
        errObj[id] = "Invalid Date";
      } else {
        errObj[id] = null;
      }
    };

    validateFields(
      "description",
      /^.{1,255}$/,
      validateMessage.alpha_numeric_max_255
    );
    validateFields("code");
    validateFields("couponExpiryDate");
    validateFields("discountType");
    // validateFields("categoryInclude");
    // validateFields("productsInclude");
    validateFields("usageLimitPerCoupon");
    validateFields("usageLimitPerUser");
    validateFields("minpurchaseamount");
    // validateFields("subcategory");
    validateFields("maximumamount");
    validateFields("couponAmount");

    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };
  const { id } = useUserInfo();
  const handleSubmit = async (couponStatus) => {
    const isValid = validateForm();
    if (isValid) {
      const payload = {
        storeCouponCode: formValues.code,
        minimumOrderValue: parseInt(formValues.minpurchaseamount, 10),
        expirationDate: formValues.couponExpiryDate,
        couponUsageLimit: formValues.usageLimitPerCoupon,
        customerUsageLimit: parseInt(formValues.usageLimitPerUser, 10),
        couponAmount: parseInt(formValues.couponAmount, 10),
        couponStatus,
        discountType: formValues.discountTypeObj.value?.toUpperCase(),
        maximumDiscountValue: parseInt(formValues.maximumamount, 10),
        supplierId: id,
        description: formValues.description,
      };
      const { data, err } = await CreateSupplierStoreCoupons(payload);
      if (data) {
        toastify(data.message, "success");
        setOpenAddModal(false);
        getTabledata();
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };
  return (
    <Box className="p-2" sx={{ maxHeight: "80vh" }}>
      <Box className="fit-contant">
        <Typography
          className="h-5 color-orange cursor-pointer d-flex align-items-center"
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          <ArrowBackIosIcon className="fs-16" />
          Back
        </Typography>
      </Box>
      <Grid container onClick={() => {}}>
        <Grid
          item
          sm={4}
          container
          justifyContent="center"
          alignItems="start"
          sx={{
            borderRight: "1px solid lightgray",
            height: "100%",
            // minHeight: "80vh",
          }}
        >
          <Grid container item xs={10} spacing={2} pt={4}>
            <Grid item xs={12}>
              <InputBox
                label="Code"
                placeholder="eg: 09543u45"
                inputlabelshrink
                value={formValues.code}
                id="code"
                name="code"
                onInputChange={handleInputChange}
                error={Boolean(error.code)}
                helperText={error.code}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                label="Description"
                placeholder="eg: Simple Product"
                inputlabelshrink
                isMultiline
                rows={4}
                value={formValues.description}
                id="description"
                name="description"
                onInputChange={handleInputChange}
                error={Boolean(error.description)}
                helperText={error.description}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <SimpleDropdownComponent
                label="Discount Type"
                inputlabelshrink
                list={[
                  {
                    id: "percentage",
                    label: "Percentage",
                    value: "Percentage",
                  },
                  { id: "cash", label: "Cash", value: "Cash" },
                ]}
                value={formValues.discountTypeObj}
                id="discountType"
                name="discountType"
                onDropdownSelect={(val) =>
                  setFormValues((prev) => ({
                    ...prev,
                    discountType: val ? val.id : null,
                    discountTypeObj: val,
                  }))
                }
                error={Boolean(error.discountType)}
                helperText={error.discountType}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                label="Coupon Amount"
                inputlabelshrink
                type="number"
                value={formValues.couponAmount}
                id="couponAmount"
                name="couponAmount"
                onInputChange={handleInputChange}
                error={Boolean(error.couponAmount)}
                helperText={error.couponAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePickerComponent
                label="Coupon Expiry Date"
                size="small"
                inputlabelshrink
                value={formValues.couponExpiryDate}
                id="couponExpiryDate"
                name="couponExpiryDate"
                onDateChange={(val) =>
                  setFormValues((prev) => ({
                    ...prev,
                    couponExpiryDate: val,
                  }))
                }
                error={Boolean(error.couponExpiryDate)}
                helperText={error.couponExpiryDate}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="mb-1">
                <CheckBoxComponent
                  label="Minimum purchase Amount"
                  isChecked={purchaseCheckbox}
                  checkBoxClick={() => {
                    setPurchaseCheckbox(!purchaseCheckbox);
                    setFormValues((prev) => ({
                      ...prev,
                      minpurchaseamount: "",
                      maximumamount: "",
                    }));
                  }}
                />
              </Box>
              <InputBox
                label="Minimum purchase Amount"
                inputlabelshrink
                type="number"
                value={formValues.minpurchaseamount}
                id="minpurchaseamount"
                name="minpurchaseamount"
                onInputChange={handleInputChange}
                error={Boolean(error.minpurchaseamount)}
                helperText={error.minpurchaseamount}
                disabled={!purchaseCheckbox}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBox
                label="Maximum Discount Amount"
                inputlabelshrink
                type="number"
                value={formValues.maximumamount}
                id="maximumamount"
                name="maximumamount"
                onInputChange={handleInputChange}
                error={Boolean(error.maximumamount)}
                helperText={error.maximumamount}
                disabled={!purchaseCheckbox}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} container>
          <Grid item container alignItems="start">
            <Grid item xs={4} p={3} container spacing={1} alignItems="start">
              {tabList.map((tab) => (
                <Grid item xs={12} key={tab.id}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: "200px",
                      textTransform: "none",
                      justifyContent: "left",
                      pl: 3,
                    }}
                    className={`${
                      selectedTab === tab.id
                        ? "bg-light-orange"
                        : "bg-light-gray text-dark"
                    } shadow-none`}
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} lg={4} container spacing={2} mt={1}>
              {selectedTab === "limits" && (
                <>
                  <Grid item xs={11}>
                    <InputBox
                      placeholder="eg: Zero"
                      inputlabelshrink
                      label="Usage Limit Per Coupon"
                      value={formValues.usageLimitPerCoupon}
                      id="usageLimitPerCoupon"
                      name="usageLimitPerCoupon"
                      onInputChange={handleInputChange}
                      error={Boolean(error.usageLimitPerCoupon)}
                      helperText={error.usageLimitPerCoupon}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div className="d-flex h-100">
                      <InputBox
                        placeholder="eg: Unlimited Usage"
                        inputlabelshrink
                        label="Usage Limit Per User"
                        value={formValues.usageLimitPerUser}
                        id="usageLimitPerUser"
                        name="usageLimitPerUser"
                        onInputChange={handleInputChange}
                        error={Boolean(error.usageLimitPerUser)}
                        helperText={error.usageLimitPerUser}
                        type="number"
                      />
                      <InfoOutlinedIcon className="ms-1 mt-2" />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            justifyContent="end"
            container
            alignItems="self-end"
            spacing={3}
            m={3}
          >
            <Grid item>
              <Button
                variant="contained"
                size="small"
                className="bg-orange"
                sx={{ width: "150px", textTransform: "none" }}
                onClick={() => handleSubmit("DRAFT")}
              >
                Draft
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                sx={{ width: "150px", textTransform: "none" }}
                className="bg-orange"
                onClick={() => handleSubmit("PUBLISHED")}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierAddCoupons;
