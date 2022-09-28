/* eslint-disable no-prototype-builtins */
import validateMessage from "constants/validateMessages";
import validationRegex from "services/utils/regexUtils";
import toastify from "services/utils/toastUtils";

const validateMainForm = (mainFormData) => {
  const errObj = {};
  let flag = false;
  if (!Object.keys(mainFormData.category).length) {
    errObj.category = validateMessage.field_required;
    flag = true;
  }
  if (mainFormData.brand === null || mainFormData.brand === "") {
    errObj.brand = validateMessage.field_required;
    flag = true;
  }
  if (mainFormData.short_description.text === "") {
    errObj.short_description = { text: validateMessage.field_required };
    flag = true;
  } else if (mainFormData.short_description.text.length > 90) {
    errObj.short_description = { text: validateMessage.alpha_numeric_max_90 };
    flag = true;
  }
  if (mainFormData.long_description.text === "") {
    errObj.long_description = { text: validateMessage.field_required };
    flag = true;
  } else if (mainFormData.long_description.text.length > 255) {
    errObj.long_description = { text: validateMessage.alpha_numeric_max_255 };
    flag = true;
  }

  if (!mainFormData.tags.length) {
    errObj.tags = validateMessage.field_required;
    flag = true;
  }

  if (mainFormData.limit_per_order === "") {
    errObj.limit_per_order = validateMessage.field_required;
    flag = true;
  } else if (parseInt(mainFormData.limit_per_order, 10) < 1) {
    errObj.limit_per_order = "Limit per order should be greater then 0";
    flag = true;
  }
  if (!Object.keys(mainFormData.subCategoryValue).length) {
    flag = true;
    toastify("Please Select Sub-Category", "error");
  }
  if (!Object.keys(mainFormData.setsValue).length) {
    flag = true;
    toastify("Please Select Set", "error");
  }

  return { errObj, flag };
};
const validateProductImg = (productImage) => {
  if (!productImage.length) {
    toastify("Please Upload Product Image", "error");
    return true;
  }
  return false;
};
const validateInventory = (inventoryFormData) => {
  const errObj = {};
  let flag = false;
  if (inventoryFormData.stockqty === "" || !inventoryFormData.stockqty) {
    flag = true;
    errObj.stockqty = validateMessage.field_required;
  } else if (parseInt(inventoryFormData.stockqty, 10) < 1) {
    flag = true;
    errObj.stockqty = "Stock Qty must be greater then or equal to 1";
  }
  if (!Object.keys(inventoryFormData.stock_status).length) {
    flag = true;
    errObj.stock_status = validateMessage.field_required;
  }
  if (inventoryFormData.manageStock) {
    if (!Object.keys(inventoryFormData.allow_backorders).length) {
      flag = true;
      errObj.allow_backorders = validateMessage.field_required;
    } else if (
      inventoryFormData.allow_backorders.label === "Allow" &&
      inventoryFormData.back_Orders === ""
    ) {
      flag = true;
      errObj.back_Orders = validateMessage.field_required;
    }
  }

  if (!Object.keys(inventoryFormData.shipping_class).length) {
    flag = true;
    errObj.shipping_class = validateMessage.field_required;
  }
  if (inventoryFormData.product_title === "") {
    flag = true;
    errObj.product_title = validateMessage.field_required;
  } else if (inventoryFormData.product_title.length > 100) {
    flag = true;
    errObj.product_title = validateMessage.alpha_numeric_max_100;
  }

  if (!Object.keys(inventoryFormData.business_processing_days).length) {
    flag = true;
    errObj.business_processing_days = validateMessage.field_required;
  }

  if (!inventoryFormData.seo_title.length) {
    flag = true;
    errObj.seo_title = validateMessage.field_required;
  }
  if (inventoryFormData.meta_description === "") {
    flag = true;
    errObj.meta_description = validateMessage.field_required;
  } else if (inventoryFormData.meta_description.length > 100) {
    flag = true;
    errObj.meta_description = validateMessage.alpha_numeric_max_100;
  }

  if (!inventoryFormData.meta_keyword.length) {
    flag = true;
    errObj.meta_keyword = validateMessage.field_required;
  } else
    inventoryFormData.meta_keyword.forEach((ele) => {
      if (ele.length > 15) {
        flag = true;
        errObj.meta_keyword = validateMessage.field_required;
      }
    });

  if (
    inventoryFormData.modalname !== "" &&
    inventoryFormData.modalname?.length > 100
  ) {
    flag = true;
    errObj.modalname = validateMessage.alpha_numeric_max_100;
  }
  return { errObj, flag };
};
const validateOtherInfo = (data) => {
  const errObj = [];
  let flag = false;
  data.forEach((ele, ind) => {
    errObj.push({ label: "", value: "" });
    if (!ele.label) {
      errObj[ind].label = validateMessage.field_required;
      flag = true;
    } else if (ele.label > 50) {
      errObj[ind].label = validateMessage.alpha_numeric_max_50;
      flag = true;
    }
    if (!ele.value) {
      errObj[ind].value = validateMessage.field_required;
      flag = true;
    } else if (ele.value > 255) {
      errObj[ind].value = validateMessage.alpha_numeric_max_255;
      flag = true;
    }
  });
  return { errObj, flag };
};
const validatePricing = (pricingFormData) => {
  const errObj = {};
  let flag = false;
  if (pricingFormData.sale_price === "") {
    flag = true;
    errObj.sale_price = validateMessage.field_required;
  } else if (
    !validationRegex.decimal_2digit.test(parseFloat(pricingFormData.sale_price))
  ) {
    flag = true;
    errObj.sale_price = validateMessage.decimal_2digits;
  } else if (
    parseInt(pricingFormData.sale_price, 10) > parseInt(pricingFormData.mrp, 10)
  ) {
    flag = true;
    errObj.sale_price = "Sale price should not be greater than MRP";
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
  if (
    pricingFormData.return_order_accepted &&
    !Object.keys(pricingFormData.returnorder).length
  ) {
    flag = true;
    errObj.returnorder = validateMessage.field_required;
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
  if (
    pricingFormData.freeDeliveryCheckbox &&
    pricingFormData.sale_price_logistics === ""
  ) {
    flag = true;
    errObj.sale_price_logistics = validateMessage.field_required;
  }
  return { errObj, flag };
};
const validateLinked = (linkedFormData) => {
  const errObj = {};
  let flag = false;
  if (!linkedFormData.upSells?.length) {
    errObj.upSells = validateMessage.field_required;
    flag = true;
  }
  if (!linkedFormData.crossSells?.length) {
    errObj.crossSells = validateMessage.field_required;
    flag = true;
  }
  return { errObj, flag };
};
const validatePolicy = (productPolicyFormData) => {
  const errObj = {};
  let flag = false;

  if (productPolicyFormData.policyTabLabel === "") {
    errObj.policyTabLabel = validateMessage.field_required;
    flag = true;
  } else if (!/^.{1,100}$/.test(productPolicyFormData.policyTabLabel)) {
    errObj.policyTabLabel = validateMessage.alpha_numeric_max_100;
    flag = true;
  }

  if (!productPolicyFormData.shippingPolicy.text) {
    errObj.shippingPolicy = validateMessage.field_required;
    flag = true;
  } else if (!/^.{1,255}$/.test(productPolicyFormData.shippingPolicy.text)) {
    errObj.shippingPolicy = validateMessage.alpha_numeric_max_255;
    flag = true;
  }

  if (!productPolicyFormData.cancellationPolicy.text) {
    errObj.cancellationPolicy = validateMessage.field_required;
    flag = true;
  } else if (
    !/^.{1,255}$/.test(productPolicyFormData.cancellationPolicy.text)
  ) {
    errObj.cancellationPolicy = validateMessage.alpha_numeric_max_255;
    flag = true;
  }

  if (!productPolicyFormData.refundPolicy.text) {
    errObj.refundPolicy = validateMessage.field_required;
    flag = true;
  } else if (!/^.{1,255}$/.test(productPolicyFormData.refundPolicy.text)) {
    errObj.refundPolicy = validateMessage.alpha_numeric_max_255;
    flag = true;
  }
  if (
    productPolicyFormData.warranty &&
    !Object.keys(productPolicyFormData.warrantyperiod).length
  ) {
    errObj.warrantyperiod = validateMessage.field_required;
    flag = true;
  }

  return { errObj, flag };
};
const validateVariation = (dropdowns, currentData) => {
  const errObj = {};
  let flag = false;
  dropdowns.forEach((el) => {
    if (el.hasOwnProperty("required") && !el.value) {
      errObj[el.id] = validateMessage.field_required;
    } else if (
      el.hasOwnProperty("validation") &&
      el.value &&
      !el.validation.test(el.value)
    ) {
      errObj[el.id] = el.errorMessage;
    } else if (el.type === "date" && el.value && el.value < currentData) {
      errObj[el.id] = "Past date is not allowed";
    } else {
      errObj[el.id] = null;
    }
  });

  Object.values(errObj).forEach((i) => {
    if (i) {
      flag = true;
    }
  });

  return { errObj, flag };
};
const validateAttribute = (selectedAttribute, attributeList) => {
  let errObj = {};
  let flag = false;

  const temp = [];
  attributeList.forEach((ele) => {
    temp.push(ele.selected);
    if (ele.selected) {
      errObj = {
        ...errObj,
        [ele.id]: "",
      };
    }
  });
  if (!temp.some((item) => item)) {
    flag = true;
    toastify("Please select atleast one attribute", "error");
  }

  Object.keys(errObj).forEach((ele) => {
    if (!selectedAttribute[ele] || !selectedAttribute[ele]?.length) {
      errObj[ele] = validateMessage.field_required;
      flag = true;
    }
  });

  return { errObj, flag };
};
const validatePricingForMrMRsCartForm = (mrMrsCartFormData) => {
  const errObj = {};
  let flag = false;

  if (mrMrsCartFormData.sellwithus) {
    if (mrMrsCartFormData.free_delivery == "") {
      flag = true;
      errObj.free_delivery = validateMessage.field_required;
    }
    if (mrMrsCartFormData.paid_delivery == "") {
      flag = true;
      errObj.paid_delivery = validateMessage.field_required;
    }
  }
  if (mrMrsCartFormData.return) {
    if (!Object.keys(mrMrsCartFormData.returnorder).length) {
      flag = true;
      errObj.returnorder = validateMessage.field_required;
    }
  }

  return { errObj, flag };
};

export {
  validateMainForm,
  validateProductImg,
  validateInventory,
  validatePricing,
  validateLinked,
  validatePolicy,
  validateAttribute,
  validateVariation,
  validatePricingForMrMRsCartForm,
  validateOtherInfo,
};
