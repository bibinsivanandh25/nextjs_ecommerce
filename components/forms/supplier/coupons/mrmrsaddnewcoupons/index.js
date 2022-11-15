/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Paper, Button, Box, Typography } from "@mui/material";
import DatePickerComponent from "components/atoms/DatePickerComponent";
import InputBox from "components/atoms/InputBoxComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import { useEffect, useState } from "react";
import validateMessage from "constants/validateMessages";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toastify from "services/utils/toastUtils";
import {
  CreateStoreCoupons,
  getCategories,
  getProductsBasedOnSubCategory,
  getSubCategoryBasedOnMainCategory,
} from "services/supplier/coupons/mrmrsCartcoupons";
import { useUserInfo } from "services/hooks";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import MultiSelectComponent from "@/atoms/MultiSelectComponent";

const MrMrsAddNewCoupons = ({
  setOpenAddModal = () => {},
  getTableData = () => {},
}) => {
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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getAllCategories = async () => {
    const { data } = await getCategories();
    const finalData = [];
    if (data) {
      data.forEach((item) => {
        finalData.push({
          id: item.mainCategoryId,
          value: item.mainCategoryName,
          label: item.mainCategoryName,
        });
      });
      setCategories([...finalData]);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const validateForm = () => {
    const errObj = {};

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
      } else if (
        id === "couponExpiryDate" &&
        new Date().getTime() > new Date(formValues[id]).getTime()
      ) {
        errObj[id] = "Invalid Date";
      } else {
        errObj[id] = null;
      }
    };

    validateFields("description");
    // validateFields("code");
    validateFields("couponExpiryDate");
    validateFields("discountType");
    validateFields("categoryInclude");
    validateFields("productsIncludeObj");
    validateFields("usageLimitPerCoupon");
    validateFields("usageLimittoXTimes");
    validateFields("usageLimitPerUser");
    if (purchaseCheckbox) {
      validateFields("minpurchaseamount");
    }
    validateFields("subcategory");
    // validateFields("new");
    if (formValues.description.length > 255) {
      errObj.description = validateMessage.alpha_numeric_max_255;
    }
    const limitErrors = {
      limitError: null,
    };
    if (
      parseInt(formValues.usageLimitPerCoupon, 10) <=
      parseInt(formValues.usageLimitPerUser, 10)
    ) {
      limitErrors.limitError =
        "Usage Limit PerCoupon Should Always Less than Usage Limit PerUser";
    }
    const finalErrorObj = { ...errObj, ...limitErrors };
    setError({ ...finalErrorObj });
    let valid = true;
    Object.values(finalErrorObj).forEach((i) => {
      if (i) {
        valid = false;
      }
    });
    return valid;
  };
  const { id } = useUserInfo();
  const getSubCategories = async (categoryId) => {
    const { data } = await getSubCategoryBasedOnMainCategory(categoryId);
    const finalData = [];
    if (data) {
      data.forEach((item) => {
        finalData.push({
          id: item.subCategoryId,
          value: item.subCategoryName,
          label: item.subCategoryName,
        });
      });
    }
    setSubCategories([...finalData]);
  };

  const getProducts = async (subCategoryId) => {
    const { data } = await getProductsBasedOnSubCategory(id, subCategoryId);
    const finalData = [];
    if (data) {
      data.forEach((item) => {
        finalData.push({
          id: item.productVariationId,
          value: item.productTitle,
          title: item.productTitle,
        });
      });
    }
    setProducts([...finalData]);
  };

  const handleSubmitClick = async (couponStatus) => {
    // eslint-disable-next-line no-unused-vars
    const isValid = validateForm();
    // console.log(isValid, "isValid");
    if (isValid) {
      const payload = {
        description: formValues.description,
        discountType: formValues.discountTypeObj?.value,
        couponAmount: parseInt(formValues.couponAmount, 10),
        subCategoryIncluded: formValues.subcategoryObj?.value,
        couponExpiryDate: new Date(formValues.couponExpiryDate)
          .toLocaleDateString()
          .toString()
          .replaceAll("/", "-"),
        categoryIncluded: formValues.categoryIncludeObj?.value,
        productsIncluded: formValues.productsIncludeObj?.map((ele) => ele?.id),
        usageLimitPerCoupon: parseInt(formValues.usageLimitPerCoupon, 10),
        usageLimitPerUser: parseInt(formValues.usageLimitPerUser, 10),
        usageLimitToXItems: parseInt(formValues.usageLimittoXTimes, 10),
        couponStatus,
        minimumPurchaseAmount: parseInt(formValues.minpurchaseamount, 10),
      };
      const { data, err } = await CreateStoreCoupons(payload);
      if (data) {
        toastify(data.message, "success");
        setOpenAddModal(false);
        getTableData();
      } else if (err) {
        toastify(err.response.data.message, "error");
      }
    }
  };

  return (
    <Paper sx={{ minHeight: "80vh", py: 1 }}>
      <Box className="">
        <Typography
          className="h-5 fit-content color-orange cursor-pointer d-flex align-items-center ms-2"
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          <ArrowBackIosIcon className="fs-16" />
          Back
        </Typography>
      </Box>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          container
          justifyContent="center"
          alignItems="start"
          sx={{
            borderRight: "1px solid lightgray",
            height: "100%",
            minHeight: "73vh",
          }}
        >
          <Grid container item xs={10} rowGap={2} pt={4}>
            <Grid item xs={12} display="flex">
              <InputBox
                disabled
                label="Store Coupon Code"
                placeholder="eg: 09543u45"
                inputlabelshrink
                value={formValues.code}
                id="code"
                name="code"
                // onInputChange={handleInputChange}
                // error={Boolean(error.code)}
                // helperText={error.code}
                // required
              />
              <InfoOutlinedIcon className="ms-1 mt-2" />
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
                    value: "PERCENTAGE",
                  },
                  { id: "cash", label: "Cash", value: "CASH" },
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
                disablePast
                label="Coupon Expiry Date"
                size="small"
                inputlabelshrink
                value={formValues.couponExpiryDate}
                id="couponExpiryDate"
                name="couponExpiryDate"
                onDateChange={(val) => {
                  setFormValues((prev) => ({
                    ...prev,
                    couponExpiryDate: val,
                  }));
                }}
                error={Boolean(error.couponExpiryDate)}
                helperText={error.couponExpiryDate}
                required
              />
            </Grid>
            {/* {selectedTab === "restriction" && ( */}
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
            {/* )} */}
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
                    onClick={() => {
                      setSelectedTab(tab.id);
                      setFormValues((pre) => ({
                        ...pre,
                        usageLimittoXTimes: formValues.productsIncludeObj
                          ?.length
                          ? formValues.productsIncludeObj?.length
                          : "",
                      }));
                    }}
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
                        onDropdownSelect={(val) => {
                          if (val) {
                            getSubCategories(val.id);
                          }
                          setFormValues((prev) => ({
                            ...prev,
                            categoryInclude: val ? val.id : null,
                            categoryIncludeObj: val,
                          }));
                        }}
                        list={[...categories]}
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
                        onDropdownSelect={(val) => {
                          if (val) {
                            getProducts(val.id);
                          }
                          setFormValues((prev) => ({
                            ...prev,
                            subcategory: val ? val.id : null,
                            subcategoryObj: val,
                          }));
                        }}
                        list={[...subCategories]}
                        error={Boolean(error.subcategory)}
                        helperText={error.subcategory}
                      />
                      <InfoOutlinedIcon className="ms-2 mt-2" />
                    </div>
                  </Grid>
                  <Grid item xs={12} className="">
                    <div className="d-flex">
                      <div className="w-100">
                        <MultiSelectComponent
                          label="Products Include"
                          size="small"
                          inputlabelshrink
                          fullWidth
                          value={formValues.productsIncludeObj}
                          id="productsInclude"
                          name="productsInclude"
                          onSelectionChange={(e, val) => {
                            // console.log(val, "ASds");

                            setFormValues((prev) => ({
                              ...prev,
                              productsIncludeObj: val,
                            }));
                          }}
                          // onDropdownSelect={(val) =>
                          // }
                          list={[...products]}
                          error={Boolean(error.productsIncludeObj)}
                          helperText={error.productsIncludeObj}
                        />
                      </div>
                      <InfoOutlinedIcon className="ms-2 mt-2" />
                    </div>
                  </Grid>
                </>
              )}
              {selectedTab === "limits" && (
                <>
                  <Grid item xs={11}>
                    <InputBox
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
                      disabled
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
                        label="Usage Limit Per User"
                        value={formValues.usageLimitPerUser}
                        id="usageLimitPerUser"
                        name="usageLimitPerUser"
                        onInputChange={handleInputChange}
                        error={Boolean(
                          error.usageLimitPerUser || error.limitError
                        )}
                        helperText={error.usageLimitPerUser || error.limitError}
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
                onClick={() => handleSubmitClick("DRAFT")}
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
                onClick={() => handleSubmitClick("PUBLISHED")}
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
