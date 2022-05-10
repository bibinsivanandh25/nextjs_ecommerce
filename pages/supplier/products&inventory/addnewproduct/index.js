import { Box, Paper } from "@mui/material";
import ProductsLayout from "components/forms/supplier/products/newproductforms";

const NewProducts = () => {
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
