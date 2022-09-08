/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import serviceUtil from "services/utils";
import {
  getAttributes,
  getCategorySubCategory,
} from "services/supplier/AddProducts";
import {
  business_processing_days,
  returnOrderData,
  shipping_class,
} from "constants/constants";
import ProductsLayout from "@/forms/supplier/products/productform";
import InventoryForm from "@/forms/supplier/products/productform/InventoryForm";
import PricingForm from "@/forms/supplier/products/productform/Pricing&Weight";
import LinkedForm from "@/forms/supplier/products/productform/LinkedForm";
import ProductPoliciesForm from "@/forms/supplier/products/productform/ProductPoliciesForm";
import AttributesForm from "@/forms/supplier/products/productform/AttributesForm";
import VariationForm from "@/forms/supplier/products/productform/VariationForm";
import PricingForMrMRsCartForm from "@/forms/supplier/products/productform/pricingformrmrscartForm";
// import { getAttributes } from "services/supplier/AddProducts";

const NewProducts = () => {
  const formsRef = useRef(null);
  const schema = {
    productImage: [],
    mainForm: {
      commision_mode: null,
      product_type: "",
      brand: "",
      short_description: {
        media: [],
        text: "",
      },
      long_description: {
        media: [],
        text: "",
      },
      sub_category_id: "",
      tags: [],
      limit_per_order: "",
      selectb2binvoice: [],
      tradeMarkCheck: false,
      category: {},
      brandradio: true,
      genericradio: false,
      b2bdocument: [],
      b2bdocumentfile: [],
      setsValue: {},
      subCategoryValue: {},
    },
    inventory: {
      sku: "",
      stockqty: "",
      stock_status: {},
      allow_backorders: {},
      back_Orders: "",
      shipping_class: {},
      product_title: "",
      business_processing_days: {},
      seo_title: [],
      meta_description: "",
      meta_keyword: [],
      modalname: "",
      manageStock: false,
    },
    linked: {
      upSells: {},
      crossSells: {},
    },
    pricing: {
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
      defaultZoneData: {
        zoneA: "",
        zoneB: "",
        zoneC: "",
        zoneD: "",
        zoneE: "",
      },
      freeDeliveryCheckbox: false,
    },
    policy: {
      policyTabLabel: "",
      refundPolicy: { media: [], text: "" },
      cancellationPolicy: { media: [], text: "" },
      shippingPolicy: { media: [], text: "" },
      warranty: false,
      warrantyperiod: {},
    },
    variation: {
      expiryDate: null,
      countryOfOrigin: null,
      others: [
        {
          label: "",
          value: "",
        },
      ],
    },
    attribute: {},
    mrMrsCartFormData: {
      sellwithus: false,
      free_delivery: "",
      paid_delivery: "",
      return: false,
      cashondelivery: false,
      returnorder: {},
    },
  };
  const [formData, setFormData] = useState({
    productImage: [],
    mainForm: {
      commision_mode: null,
      product_type: "",
      brand: "",
      short_description: {
        media: [],
        text: "",
      },
      long_description: {
        media: [],
        text: "",
      },
      sub_category_id: "",
      tags: [],
      limit_per_order: "",
      selectb2binvoice: [],
      tradeMarkCheck: false,
      category: {},
      brandradio: true,
      genericradio: false,
      b2bdocument: [],
      b2bdocumentfile: [],
      setsValue: {},
      subCategoryValue: {},
    },
    inventory: {
      sku: "",
      stockqty: "",
      stock_status: {},
      allow_backorders: {},
      back_Orders: "",
      shipping_class: {},
      product_title: "",
      business_processing_days: {},
      seo_title: [],
      meta_description: "",
      meta_keyword: [],
      modalname: "",
      manageStock: false,
    },
    linked: {
      upSells: {},
      crossSells: {},
    },
    pricing: {
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
      defaultZoneData: {
        zoneA: "",
        zoneB: "",
        zoneC: "",
        zoneD: "",
        zoneE: "",
      },
      freeDeliveryCheckbox: false,
    },
    policy: {
      policyTabLabel: "",
      refundPolicy: { media: [], text: "" },
      cancellationPolicy: { media: [], text: "" },
      shippingPolicy: { media: [], text: "" },
      warranty: false,
      warrantyperiod: {},
    },
    variation: {
      expiryDate: null,
      countryOfOrigin: null,
      others: [
        {
          label: "",
          value: "",
        },
      ],
    },
    attribute: {},
    mrMrsCartFormData: {
      sellwithus: false,
      free_delivery: "",
      paid_delivery: "",
      return: false,
      cashondelivery: false,
      returnorder: {},
    },
  });
  const [tabsList, setTabsList] = useState([
    {
      title: "Inventory",
      component: (
        <InventoryForm
          formData={formData}
          setFormData={setFormData}
          ref={formsRef}
        />
      ),
    },
    {
      title: "Pricing & Weight",
      component: (
        <PricingForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Linked",
      component: (
        <LinkedForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Product Policies",
      component: (
        <ProductPoliciesForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },

    {
      title: "Attributes",
      component: (
        <AttributesForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Variation",
      component: (
        <VariationForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Pricing For MrMrsCart",
      component: (
        <PricingForMrMRsCartForm
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
  ]);
  const { editProduct, productDetails, duplicateFlag } = useSelector(
    (state) => state.product
  );
  // const [tagValues, setTagValues] = useState([]);
  // const [attributeList, setAttributeList] = useState([]);
  let attributeList = [];
  const getAttributesList = async (subCatId, pre) => {
    const { data } = await getAttributes(subCatId);
    attributeList = [
      ...data.othersVariationList.map((item) => {
        return {
          id: item.otherVariationId,
          attribute: item.variationName,
          selected: Object.keys(pre?.attribute).length
            ? pre?.attribute[`${item.otherVariationId}`]?.length
            : false,
          visibleOnProduct: false,
          variationType: "OTHER_VARIATION",
          options: item.optionList.map((ele) => {
            return {
              id: ele.otherVariationOptionId,
              label: ele.optionName,
              variationName: item.variationName,
              variationId: item.otherVariationId,
            };
          }),
        };
      }),
      ...data.standardVariationList.map((item) => {
        return {
          id: item.standardVariationId,
          attribute: item.variationName,
          selected: Object.keys(pre?.attribute).length
            ? pre?.attribute[`${item.standardVariationId}`]?.length
            : false,
          visibleOnProduct: false,
          variationType: "STANDARD_VARIATION",
          options: item.optionList.map((ele) => {
            return {
              id: ele.standardOptionId,
              label: ele.optionName,
              variationName: item.variationName,
              variationId: item.standardVariationId,
            };
          }),
        };
      }),
    ];
    // console.log({ temp1 });
    // attributeList = [...temp1];
  };
  const tagValues = [];
  const getTags = async () => {
    await serviceUtil
      .get("products/product-tag")
      .then((res) => {
        const { data } = res.data;
        data.forEach((item) => {
          tagValues.push({
            id: item.tagId,
            title: item.tagName,
            value: item.tagName,
          });
        });
      })
      .catch(() => {});
  };
  const categoryDetails = {};
  const getCategorySubCategoryList = async () => {
    const { data, err } = await getCategorySubCategory(
      productDetails.subCategoryId
    );
    if (data) {
      categoryDetails.categorySetId = data.categorySetId;
      categoryDetails.categorySetName = data.categorySetName;
      categoryDetails.mainCategoryId = data.mainCategoryId;
      categoryDetails.mainCategoryName = data.mainCategoryName;
    }
  };
  const resetFormData = async () => {
    await getTags();
    await getCategorySubCategoryList();
    await getAttributesList(productDetails.subCategoryId, formData);
    const temp = JSON.parse(JSON.stringify(schema));
    temp.productImage = [...productDetails.variationData.variationMedia];
    temp.mainForm.commision_mode = productDetails.commissionMode;
    temp.mainForm.brand = productDetails.brand;
    temp.mainForm.short_description.text = productDetails.shortDescription;
    temp.mainForm.short_description.media =
      productDetails.shortDescriptionFileUrls ?? [];
    temp.mainForm.long_description.text = productDetails.longDescription;
    temp.mainForm.long_description.media =
      productDetails.longDescriptionFileUrls ?? [];
    temp.mainForm.tags = productDetails.tags
      ? tagValues.filter((ele) => {
          if (productDetails.tags.includes(ele.id)) return ele;
        })
      : [];
    temp.mainForm.limit_per_order = productDetails.limitsPerOrder;
    temp.mainForm.selectb2binvoice = productDetails.bTobInvoiceIdList
      ? productDetails.bTobInvoiceIdList.map((ele) => ({
          id: ele,
          value: ele,
          title: "",
        }))
      : [];
    temp.mainForm.tradeMarkCheck =
      !!productDetails.trademarkLetterIdList?.length;
    temp.mainForm.b2bdocument = productDetails.trademarkLetterIdList
      ? productDetails.trademarkLetterIdList.map((ele) => ({
          id: ele,
          value: ele,
          title: "",
        }))
      : [];
    temp.mainForm.brandradio = !productDetails.genericProduct;
    temp.mainForm.genericradio = productDetails.genericProduct;
    temp.mainForm.category = productDetails.subCategoryId
      ? {
          id: categoryDetails.mainCategoryId,
          value: categoryDetails.mainCategoryName,
          label: categoryDetails.mainCategoryName,
        }
      : {};
    temp.mainForm.setsValue = productDetails.subCategoryId
      ? {
          id: categoryDetails.categorySetId,
          value: categoryDetails.categorySetName,
          label: categoryDetails.categorySetName,
        }
      : {};
    temp.mainForm.subCategoryValue = {
      id: productDetails.subCategoryId,
      value: productDetails.subCategoryId,
      label: productDetails.subCategoryName,
    };

    temp.inventory.sku = productDetails.variationData.skuId;
    temp.inventory.stockqty = productDetails.variationData.stockQty;
    temp.inventory.stock_status = {
      value: productDetails.variationData.stockStatus,
      label: productDetails.variationData.stockStatus,
    };
    temp.inventory.allow_backorders = {
      value: productDetails.variationData.allowBackOrders,
      label: productDetails.variationData.allowBackOrders,
    };
    temp.inventory.back_Orders = productDetails.variationData.backOrders;
    temp.inventory.shipping_class = {};
    shipping_class.forEach((item) => {
      if (item.value === productDetails.variationData.shippingClass)
        temp.inventory.shipping_class = item;
    });
    temp.inventory.business_processing_days = {};
    business_processing_days.forEach((item) => {
      if (item.value === productDetails.variationData.businessProcessingDays)
        temp.inventory.business_processing_days = item;
    });
    temp.inventory.product_title = productDetails.variationData.productTitle;

    temp.inventory.seo_title = productDetails.variationData.seoTitle;
    temp.inventory.meta_description =
      productDetails.variationData.metaDescription;
    temp.inventory.meta_keyword =
      productDetails.variationData.metaKeywords.split(",");
    temp.inventory.modalname = productDetails.variationData.modelName;
    temp.inventory.manageStock = !!productDetails.variationData.allowBackOrders;

    temp.linked.upSells = {
      value: productDetails.linkedProducts.upSells[0],
      label: productDetails.linkedProducts.upSells[0],
    };
    temp.linked.crossSells = {
      value: productDetails.linkedProducts.crossSells[0],
      label: productDetails.linkedProducts.crossSells[0],
    };

    temp.pricing.sale_price = productDetails.variationData.salePrice;
    temp.pricing.mrp = productDetails.variationData.mrp;
    temp.pricing.return_order_accepted =
      productDetails.variationData.rtoAccepted;
    temp.pricing.cash_on_accepted = productDetails.variationData.codAvailable;
    temp.pricing.product_weight =
      productDetails.variationData.weightInclusivePackage;
    temp.pricing.length = productDetails.variationData.packageLength;
    temp.pricing.width = productDetails.variationData.packageWidth;
    temp.pricing.height = productDetails.variationData.packageHeight;
    temp.pricing.delivery_charge = productDetails.variationData.deliveryCharge;
    temp.pricing.sale_price_logistics =
      productDetails.variationData.salePriceWithLogistics;
    temp.pricing.returnorder = {
      value: productDetails.variationData.rtoDays,
      label: `${productDetails.variationData.rtoDays} Days`,
    };
    // temp.pricing.defaultZoneData = productDetails.variationData.
    temp.pricing.freeDeliveryCheckbox = productDetails.variationData.storeFDR;

    temp.policy.policyTabLabel = productDetails.productPolicies.policyTabLabel;
    temp.policy.refundPolicy.media.binaryStr =
      productDetails.productPolicies.refundPolicyMediaUrls;
    temp.policy.refundPolicy.text = productDetails.productPolicies.refundPolicy;
    temp.policy.cancellationPolicy.media.binaryStr =
      productDetails.productPolicies.cancellationPolicyMediaUrls;
    temp.policy.cancellationPolicy.text =
      productDetails.productPolicies.cancellationPolicy;
    temp.policy.shippingPolicy.media.binaryStr =
      productDetails.productPolicies.shippingPolicyMediaUrls;
    temp.policy.shippingPolicy.text =
      productDetails.productPolicies.shippingPolicy;
    temp.policy.warranty = productDetails.productPolicies.warrantyAvailable;
    temp.policy.warrantyperiod = productDetails.productPolicies.warrantyPeriod
      ? {
          value: `${productDetails.productPolicies.warrantyPeriod / 30} Months`,
          label: `${productDetails.productPolicies.warrantyPeriod / 30} Months`,
        }
      : {};

    temp.variation.expiryDate = productDetails.expiryDate
      ? new Date(productDetails.expiryDate)
      : null;
    temp.variation.countryOfOrigin = productDetails.countryOfOrigin ?? {};
    temp.variation.others = productDetails.otherInformationObject
      ? Object.keys(productDetails.otherInformationObject).map((ele) => ({
          label: ele,
          value: productDetails.otherInformationObject[ele],
        }))
      : [
          {
            label: "",
            value: "",
          },
        ];
    productDetails.variationData.variationProperty.forEach((item) => {
      temp.variation[`${item.variationId}`] = item.optionId;
    });

    temp.mrMrsCartFormData.sellwithus =
      productDetails.variationData.sellWithMrMrsCart;
    temp.mrMrsCartFormData.free_delivery =
      productDetails.variationData.mrmrscartSalePriceWithFDR;
    temp.mrMrsCartFormData.paid_delivery =
      productDetails.variationData.mrmrscartSalePriceWithOutFDR;
    temp.mrMrsCartFormData.return =
      productDetails.variationData.mrmrscartRtoAccepted;
    temp.mrMrsCartFormData.cashondelivery =
      productDetails.variationData.mrmrscartCodAvailable;
    temp.mrMrsCartFormData.returnorder = {};
    debugger;
    if (productDetails.variationData.mrmrscartRtoAccepted) {
      returnOrderData.forEach((item) => {
        if (productDetails.variationData.mrmrscartRtoDays === item.value) {
          temp.mrMrsCartFormData.returnorder = item;
        }
      });
    }

    // temp.attribute;
    productDetails.variationData.variationProperty.forEach((item) => {
      attributeList.forEach((ele) => {
        if (ele.id === item.variationId) {
          ele.options.forEach((option) => {
            if (option.id === item.optionId) {
              if (temp.attribute.hasOwnProperty(item.variationId)) {
                temp.attribute[`${item.variationId}`].push({
                  ...option,
                  value: option.label,
                  title: option.label,
                  variationType: ele.variationType,
                });
              } else {
                temp.attribute[`${item.variationId}`] = [];
                temp.attribute[`${item.variationId}`].push({
                  ...option,
                  value: option.label,
                  title: option.label,
                  variationType: ele.variationType,
                });
              }
            }
          });
        }
      });
    });

    console.log({ temp });
    setFormData(temp);
  };

  useEffect(() => {
    if (editProduct || duplicateFlag) {
      resetFormData();
    }
  }, [editProduct]);

  useEffect(() => {
    setTabsList([
      {
        title: "Inventory",
        component: (
          <InventoryForm
            formData={formData}
            setFormData={setFormData}
            ref={formsRef}
          />
        ),
      },
      {
        title: "Pricing & Weight",
        component: (
          <PricingForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Linked",
        component: (
          <LinkedForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Product Policies",
        component: (
          <ProductPoliciesForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },

      {
        title: "Attributes",
        component: (
          <AttributesForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Variation",
        component: (
          <VariationForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
      {
        title: "Pricing For MrMrsCart",
        component: (
          <PricingForMrMRsCartForm
            formData={formData}
            ref={formsRef}
            setFormData={setFormData}
          />
        ),
      },
    ]);
  }, [formData]);

  return (
    <Paper
      className="d-flex"
      style={{
        minHeight: "80vh",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <ProductsLayout
        type="simple"
        formData={formData}
        setFormData={setFormData}
        tabsList={tabsList}
        formsRef={formsRef}
        schema={schema}
      />
    </Paper>
  );
};
export default NewProducts;
