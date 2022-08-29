import { Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProductsLayout from "@/forms/supplier/products/productform";
import ZoneCharges from "@/forms/supplier/products/newCollections/addzone";

import ProductPoliciesForm from "@/forms/supplier/products/productform/ProductPoliciesForm";
import LinkedForm from "@/forms/supplier/products/productform/LinkedForm";
import AttributesForm from "@/forms/supplier/products/productform/AttributesForm";
import VariationForm from "@/forms/supplier/products/newCollections/VariationForm";

const NewProducts = () => {
  const formsRef = useRef(null);
  const [showGroupVariant, setShowGroupVariant] = useState(false);
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

  const zonepagetabs = [
    {
      title: "Zone Charges",
      component: (
        <ZoneCharges
          formData={formData}
          ref={formsRef}
          setFormData={setFormData}
        />
      ),
    },
  ];
  const [tabsList, setTabsList] = useState([
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
          setShowGroupVariant={setShowGroupVariant}
          setFormData={setFormData}
          formData={formData}
          ref={formsRef}
        />
      ),
    },
  ]);

  useEffect(() => {
    setTabsList([
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
            setShowGroupVariant={setShowGroupVariant}
            setFormData={setFormData}
            formData={formData}
            ref={formsRef}
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
        type="collections"
        formData={formData}
        setFormData={setFormData}
        tabsList={tabsList}
        formsRef={formsRef}
        showGroupVariant={showGroupVariant}
        setShowGroupVariant={setShowGroupVariant}
        zonepagetabs={zonepagetabs}
      />
    </Paper>
  );
};
export default NewProducts;
