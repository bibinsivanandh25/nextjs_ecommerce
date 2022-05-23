import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import ButtonComponent from "components/atoms/ButtonComponent";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { Favorite, Star } from "@mui/icons-material";

const ProductDetailsCard = ({ products = [], showMarginButton = false }) => {
  const getProductsCard = () => {
    {
      return products.map((ele) => {
        return (
          <Grid item sm={4} key={ele.id}>
            <Paper
              className="p-2"
              // style={{
              //   maxHeight: "150px",
              //   minHeight: "150px",
              //   overflow: "auto",
              // }}
            >
              <Grid container columnSpacing={1}>
                <Grid
                  item
                  xs={3}
                  style={{
                    height: "120px",
                    position: "relative",
                    width: "100px",
                  }}
                  // className="my-1"
                >
                  <Image
                    src={ele.image}
                    // height={"100%"}
                    // height={100}
                    // width={100}
                    layout="fill"
                    // objectFit="contain"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                    alt=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title={ele.title} placement="top">
                    <Typography className="fw-bold mt-2 fs-14 text-truncate cursor-pointer">
                      {ele.title}
                    </Typography>
                  </Tooltip>
                  <Typography>
                    <span className="bg-orange border-0 px-2 text-white fs-10 py-1 rounded-5">
                      {ele.rating.rate} <Star sx={{ zoom: 0.6, pb: 0.5 }} />
                    </span>
                    <span className="text-secondary fs-12 mx-2">
                      {`(${ele.rating.count} Ratings)`}
                    </span>
                  </Typography>
                  <Typography
                    className="color-orange py-1 bg-light-orange1 rounded d-inline px-2"
                    fontSize={12}
                  >
                    Free shipping
                  </Typography>
                  <Typography className="mt-3 fw-bold fs-4">
                    ₹{ele.price}
                  </Typography>
                </Grid>
                <Grid
                  className="d-flex flex-column justify-content-between align-items-end my-1"
                  item
                  xs={3}
                >
                  <Grid className="border rounded-circle p-1 fs-14 cursor-pointer">
                    <Favorite className="text-secondary" />
                  </Grid>
                  <Grid className="border rounded-circle cursor-pointer fs-14 p-1">
                    <ShareIcon className="text-secondary" />
                  </Grid>
                  <Grid className="d-flex">
                    {showMarginButton ? (
                      <ButtonComponent
                        muiProps="fs-9 me-2"
                        label="Set margin"
                        variant="outlined"
                      />
                    ) : null}
                    <ButtonComponent muiProps="fs-9" label="view" />
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
    <Grid container spacing={2}>
      {getProductsCard()}
    </Grid>
  );
};
export default ProductDetailsCard;
