import { Box, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import ImageCard from "components/atoms/ImageCard";
import SearchComponent from "components/atoms/SearchComponent";
import Image from "next/image";
import logo from "public/assets/images/Coupon.png";

const CategoryItems = [
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
];
const subCategoryItems = [
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
  {
    label: "Daily wears",
    image: "",
  },
];

const Category = ({}) => {
  return (
    <Paper className="w-100 d-flex flex-column mxh-80vh mnh-80vh overflow-y-scroll hide-scrollbar p-3">
      <Box className="d-flex justify-content-between align-items-center">
        <Typography className="h-4 fw-bold">Top Categories</Typography>
        <Box className="d-flex">
          <SearchComponent
            handleBtnSearch={(val) => {
              console.log(val);
            }}
          />
        </Box>
      </Box>
      <Box className="w-100">
        <Box className="d-flex mxw-85vw overflow-x-scroll hide-scrollbar mx-auto">
          {CategoryItems.map((item, index) => {
            return (
              <Box
                className="d-flex flex-column align-items-center m-2"
                key={index}
              >
                <Card
                  elevation={4}
                  sx={{
                    maxWidth: "70px",
                    maxHeight: "70px",
                    width: "7vw",
                    height: "12vh",
                  }}
                >
                  <Image src={logo} />
                </Card>
                <Typography className="h-5">{item.label}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="w-100 d-flex mt-3">
        <Box className="d-flex mnw-150 mxw-200 w-20p">Tabs</Box>
        <Box className="d-flex mxh-60vh overflow-y-scroll hide-scrollbar">
          <Grid container className="w-100 p-3" spacing={2}>
            {subCategoryItems.map((ele, index) => {
              return (
                <Grid
                  item
                  md={4}
                  lg={2}
                  key={index}
                  className="p-2 d-flex flex-column align-items-center"
                >
                  <Card elevation={2} className="w-100 h-100">
                    <Image src={logo} />
                  </Card>
                  <Typography className="h-4">{ele.label}</Typography>
                </Grid>
                // <div>hkabscjkahs</div>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
export default Category;
