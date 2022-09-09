import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import ProductDetails from "pages/customer/productdetails";

const ViewModal = () => {
  const router = useRouter();
  const { productVariationId } = router.query;
  return (
    <Paper
      sx={{ height: "100%" }}
      className="mnh-80vh overflow-auto hide-scrollbar mxh-80"
    >
      <ProductDetails productId={productVariationId} />
    </Paper>
  );
};

export default ViewModal;
