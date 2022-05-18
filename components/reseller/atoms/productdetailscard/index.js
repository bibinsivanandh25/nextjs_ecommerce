import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const ProductDetailsCard = ({ products = [] }) => {
  const getProductsCard = () => {
    {
      return products.map((ele) => {
        return (
          <Grid item sm={4}>
            <Paper
              className=""
              style={{
                maxHeight: "150px",
                minHeight: "150px",
                overflow: "auto",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={4}
                  style={{
                    height: "125px",
                    position: "relative",
                    width: "100px",
                  }}
                  className="my-1 col-5"
                >
                  <Image
                    src={ele.image}
                    // height={"100%"}
                    layout="fill"
                    // objectFit="contain"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title={ele.title} placement="top">
                    <Typography className="fw-bold mt-2 fs-12 text-truncate">
                      {ele.title}
                    </Typography>
                  </Tooltip>
                  <Typography>
                    <span className="bg-orange border-0 rounded-3 px-2 text-white">
                      {ele.rating.rate}
                    </span>
                    <span className="text-secondary fs-12 mx-2">
                      ({ele.rating.count})
                    </span>
                  </Typography>
                  <Typography className="color-orange bg-light rounded d-inline px-2">
                    Free shipping
                  </Typography>
                  <Typography className="mt-3 fw-bold fs-4">
                    ₹{ele.price}
                  </Typography>
                </Grid>
                <Grid
                  className="d-flex flex-column justify-content-between align-items-center my-1"
                  item
                  xs={2}
                >
                  <Grid className=" border rounded-circle p-2 fs-14">
                    <FavoriteBorderIcon />
                  </Grid>
                  <Grid className="border rounded-circle px-2 fs-14 p-2">
                    <ShareIcon />
                  </Grid>
                  <Grid className="mx-2">
                    <ButtonComponent label="view" />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      });
    }
  };

  return (
    <Grid container spacing={1}>
      {getProductsCard()}
    </Grid>
  );
};
export default ProductDetailsCard;
