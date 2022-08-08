import { Paper } from "@mui/material";
import ProductsLayout from "components/forms/supplier/products/newproductforms";
import AttributesForm from "components/forms/supplier/products/newproductforms/AttributesForm";
import InventoryForm from "components/forms/supplier/products/newproductforms/InventoryForm";
import LinkedForm from "components/forms/supplier/products/newproductforms/LinkedForm";
import PricingForm from "components/forms/supplier/products/newproductforms/Pricing&Weight";
import ProductPoliciesForm from "components/forms/supplier/products/newproductforms/ProductPoliciesForm";
import VariationForm from "components/forms/supplier/products/newproductforms/VariationForm";
import { useEffect, useRef, useState } from "react";
import PricingForMrMRsCartForm from "@/forms/supplier/products/newproductforms/pricingformrmrscartForm";

const NewProducts = () => {
  const formsRef = useRef(null);
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
      selectb2binvoice: null,
      tradeMarkCheck: false,
      category: {},
    },
    inventory: {
      sku: "",
      stock_status: null,
      allow_backorders: null,
      stock_qty: "",
      back_Orders: "",
      shipping_class: "",
      product_title: "",
      business_processing_days: null,
      seo_title: "",
      meta_description: "",
      meta_keyword: [],
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
    policy: {},
    grouped: {},
    variation: {},
    attribute: {},
    mrMrsCartFormData: {
      sellwithus: false,
      free_delivery: "",
      paid_delivery: "",
      return: false,
      cashondelivery: false,
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

  const handleSubmitClick = (data) => {
    console.log(data);
  };

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
        handleSubmitClick={handleSubmitClick}
        tabsList={tabsList}
        formsRef={formsRef}
      />
    </Paper>
  );
};
export default NewProducts;
