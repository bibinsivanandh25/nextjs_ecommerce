import { Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMergeproduct } from "services/supplier/AddProducts";
import toastify from "services/utils/toastUtils";

const MergedProducts = () => {
  const { productDetails } = useSelector((state) => state.product);
  const [mergeData, setMergeDate] = useState([]);

  const getMergeDetails = async () => {
    const { data, err } = await getMergeproduct(
      productDetails.variationData.mergeProductId,
      productDetails.variationData.productVariationId
    );
    if (data) {
      setMergeDate(data);
    } else if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (productDetails) {
      getMergeDetails();
    }
  }, [productDetails]);
  return (
    // <div className="d-flex align-items-center h-100 justify-content-center">
    //   <Typography className="color-orange text-decoration-underline cursor-pointer ">
    //     click here for order summary
    //   </Typography>
    // </div>
    <Grid container spacing={2}>
      {mergeData.map((item) => {
        return (
          <Grid item md={12} lg={6} container>
            <Paper className="w-100 p-2" elevation={4}>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  Product ID
                </Grid>
                <Grid item md={1}>
                  :
                </Grid>
                <Grid item md={6}>
                  {item.productVariationId}
                </Grid>
                <Grid item md={4}>
                  Product Title
                </Grid>
                <Grid item md={1}>
                  :
                </Grid>
                <Grid item md={6}>
                  {item.productTitle}
                </Grid>
                <Grid item md={4}>
                  Supplier ID
                </Grid>
                <Grid item md={1}>
                  :
                </Grid>
                <Grid item md={6}>
                  {item.supplierId}
                </Grid>
                <Grid item md={4}>
                  Business Name
                </Grid>
                <Grid item md={1}>
                  :
                </Grid>
                <Grid item md={6}>
                  {item.businessName}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MergedProducts;
