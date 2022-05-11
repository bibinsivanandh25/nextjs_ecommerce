import { Box, Paper } from "@mui/material";
import ProductsLayout from "components/forms/supplier/products/newproductforms";
import { useState } from "react";

const NewProducts = () => {
  const [formData, setFormData] = useState([]);
  return (
    <Paper
      className="d-flex"
      style={{
        minHeight: "80vh",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <ProductsLayout />
    </Paper>
  );
};
export default NewProducts;
