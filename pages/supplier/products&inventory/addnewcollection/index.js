import { Paper } from "@mui/material";
import VariationForm from "components/forms/supplier/products/newCollections/VariationForm";
import ProductsLayout from "components/forms/supplier/products/newproductforms";
import AttributesForm from "components/forms/supplier/products/newproductforms/AttributesForm";
import LinkedForm from "components/forms/supplier/products/newproductforms/LinkedForm";
import ProductPoliciesForm from "components/forms/supplier/products/newproductforms/ProductPoliciesForm";
import { useEffect, useRef, useState } from "react";
import ZoneCharges from "@/forms/supplier/products/newCollections/addzone";

const NewProducts = () => {
  const formsRef = useRef(null);
  const [showGroupVariant, setShowGroupVariant] = useState(false);
  const [formData, setFormData] = useState({
    mainform: {
      commision_mode: "",
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
      tags: "",
      limit_per_order: "",
    },
    inventory: {
      sku: "",
      stock_status: "",
      allow_backorders: "",
      stock_qty: "",
      back_Orders: "",
      shipping_class: "",
      product_title: "",
      business_processing_days: "",
      seo_title: "",
      meta_description: "",
      meta_keyword: "",
    },
    linked: {
      upSells: "",
      crossSells: "",
    },
    pricing: {
      sale_price: "",
      mrp: "",
      return_order_accepted: false,
      cash_on_accepted: "",
      product_weight: "",
      length: "",
      width: "",
      height: "",
      delivery_charge: "",
    },
    policy: {
      policyTabLabel: "",
      refundPolicy: { media: {}, text: "" },
      cancellationPolicy: { media: {}, text: "" },
      shippingPolicy: { media: {}, text: "" },
      warranty: false,
      warrantyperiod: {},
    },
    grouped: {},
    variation: {},
    attribute: {},
    zonecharge: {},
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

  const handleSubmitClick = () => {};
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
        handleSubmitClick={handleSubmitClick}
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
