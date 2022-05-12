import { Box, Paper } from "@mui/material";
import ProductsLayout from "components/forms/supplier/products/newproductforms";
import { useEffect, useState } from "react";

const NewProducts = () => {
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
    pricing: {},
    linked: {
      upSells: "",
      crossSells: "",
    },
    policy: {},
    grouped: {},
    variation: {},
    attribute: {},
  });
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

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
        formData={formData}
        setFormData={setFormData}
        handleSubmitClick={handleSubmitClick}
      />
    </Paper>
  );
};
export default NewProducts;
