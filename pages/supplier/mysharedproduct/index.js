import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputBox from "components/atoms/InputBoxComponent";
import serviceUtil from "services/utils";
import ProductDetailsCard from "@/forms/supplier/mysharedproduct/productdetailscard";

const MySharedProduct = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [dropDownValue, setDropDownValue] = useState({});

  const getData = async () => {
    await serviceUtil
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setCategoryData([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Paper p={4}>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          className="border-bottom"
        >
          <Grid item sx={{ p: 2 }} md={4}>
            <Typography variant="h6" fontWeight="bold" fontSize={16}>
              My Shared Product
            </Typography>
          </Grid>
          <Grid
            item
            md={8}
            className="mt-2 d-flex justify-content-end align-items-center"
          >
            <div className="w-25">
              <SimpleDropdownComponent
                value={dropDownValue}
                size="small"
                placeholder="Filter by Category"
                list={[
                  {
                    label: "Fixed Commission",
                    value: "Fixed Commission",
                  },
                  {
                    label: "Zero Commission",
                    value: "Zero Commission",
                  },
                ]}
                onDropdownSelect={(value) => {
                  setDropDownValue(value);
                }}
              />
            </div>
            <Box className="d-flex m-3 align-items-center">
              <InputBox size="small" label="Search by Categories" />
              <Box
                className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
                // onClick={handleSearch}
              >
                <SearchOutlinedIcon className="text-white p-1 fs-1" />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ my: 5, px: 2 }}>
          <ProductDetailsCard products={[...categoryData]} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MySharedProduct;
