import { Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProductsLayout from "@/forms/supplier/products/productform";
import InventoryForm from "@/forms/supplier/products/productform/InventoryForm";
import PricingForm from "@/forms/supplier/products/productform/Pricing&Weight";
import LinkedForm from "@/forms/supplier/products/productform/LinkedForm";
import ProductPoliciesForm from "@/forms/supplier/products/productform/ProductPoliciesForm";
import AttributesForm from "@/forms/supplier/products/productform/AttributesForm";
import VariationForm from "@/forms/supplier/products/productform/VariationForm";
import PricingForMrMRsCartForm from "@/forms/supplier/products/productform/pricingformrmrscartForm";

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
      others: null,
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
      others: null,
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
