/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper, Button, Box, Typography } from "@mui/material";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useState } from "react";
import validateMessage from "constants/validateMessages";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

const MrMrsAddNewCoupons = ({ setOpenAddModal = () => {} }) => {
  const tabList = [
    {
      title: "Restriction",
      id: "restriction",
    },
    {
      title: "Limits",
      id: "limits",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("restriction");
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
    validateFields("categoryInclude");
    validateFields("productsInclude");
    validateFields("usageLimitPerCoupon");
    validateFields("usageLimittoXTimes");
    validateFields("usageLimitPerUser");
    validateFields("minpurchaseamount");
    validateFields("subcategory");

    setError({ ...errObj });
    let valid = true;
    Object.values(errObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };

  const handleDraftClick = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(formValues);
    }
  };

  const handleSubmitClick = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log(formValues);
    }
  };

  return (
    <Paper sx={{ height: "100%", minHeight: "80vh" }}>
      <Box className="fit-content">
        <Typography
          className="h-5 color-orange cursor-pointer d-flex align-items-center ms-2"
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          <ArrowBackIosIcon className="fs-16" />
          Back
        </Typography>
      </Box>
      <Grid container sx={{ height: "100%", minHeight: "80vh" }}>
        <Grid
          item
          xs={4}
          container
          justifyContent="center"
          alignItems="start"
          sx={{
            borderRight: "1px solid lightgray",
            height: "100%",
            minHeight: "80vh",
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
                disabled
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
                  { id: "percentage", label: "Percentage" },
                  { id: "cash", label: "Cash" },
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
            {selectedTab === "restriction" && (
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
            )}
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
              {selectedTab === "restriction" && (
                <>
                  <Grid item xs={12}>
                    <div className="d-flex h-100">
                      <SimpleDropdownComponent
                        label="Category Include"
                        size="small"
                        inputlabelshrink
                        value={formValues.categoryIncludeObj}
                        id="categoryInclude"
                        name="categoryInclude"
                        onDropdownSelect={(val) =>
                          setFormValues((prev) => ({
                            ...prev,
                            categoryInclude: val ? val.id : null,
                            categoryIncludeObj: val,
                          }))
                        }
                        error={Boolean(error.categoryInclude)}
                        helperText={error.categoryInclude}
                      />
                      <InfoOutlinedIcon className="ms-2 mt-2" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex h-100">
                      <SimpleDropdownComponent
                        label="Sub-Category"
                        size="small"
                        inputlabelshrink
                        value={formValues.subcategoryObj}
                        id="subcategory"
                        name="subcategory"
                        onDropdownSelect={(val) =>
                          setFormValues((prev) => ({
                            ...prev,
                            subcategory: val ? val.id : null,
                            subcategoryObj: val,
                          }))
                        }
                        error={Boolean(error.subcategory)}
                        helperText={error.subcategory}
                      />
                      <InfoOutlinedIcon className="ms-2 mt-2" />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex h-100">
                      <SimpleDropdownComponent
                        label="Products Include"
                        size="small"
                        inputlabelshrink
                        value={formValues.productsIncludeObj}
                        id="productsInclude"
                        name="productsInclude"
                        onDropdownSelect={(val) =>
                          setFormValues((prev) => ({
                            ...prev,
                            productsInclude: val ? val.id : null,
                            productsIncludeObj: val,
                          }))
                        }
                        error={Boolean(error.productsInclude)}
                        helperText={error.productsInclude}
                      />
                      <InfoOutlinedIcon className="ms-2 mt-2" />
                    </div>
                  </Grid>
                </>
              )}
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
                  <Grid item xs={11}>
                    <InputBox
                      placeholder="eg: Apply to all Qualified items in Cart"
                      inputlabelshrink
                      label="Limit usage to X items"
                      value={formValues.usageLimittoXTimes}
                      id="usageLimittoXTimes"
                      name="usageLimittoXTimes"
                      onInputChange={handleInputChange}
                      error={Boolean(error.usageLimittoXTimes)}
                      helperText={error.usageLimittoXTimes}
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
                onClick={handleDraftClick}
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
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MrMrsAddNewCoupons;
