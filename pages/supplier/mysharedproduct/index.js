import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputBox from "components/atoms/InputBoxComponent";
// import serviceUtil from "services/utils";
import ProductDetailsCard from "@/forms/supplier/mysharedproduct/productdetailscard";
import {
  getDropdown,
  getSharedProduct,
} from "services/supplier/mysharedproducts";
import { useSelector } from "react-redux";
import toastify from "services/utils/toastUtils";

const MySharedProduct = () => {
  const [mySharedProduct, setmySharedProduct] = useState([]);
  const [dropdownState, setdropdownState] = useState([]);
  const { supplierId } = useSelector((state) => state.user);
  const [filterData, setfilterData] = useState({});
  const [SearchInput, setSearchInput] = useState("");
  const [searchTextValue, setsearchTextValue] = useState("");
  const getDropdownData = async () => {
    const { data, err } = await getDropdown(supplierId);

    if (data) {
      const temp = [];
      data.data.forEach((ele) => {
        temp.push({
          id: ele.mainCategoryId,
          value: ele.mainCategoryId,
          label: ele.mainCatgoryName,
        });
      });
      setdropdownState([...temp]);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  const getAllShareProductfunction = async () => {
    const payload = {
      keyword: searchTextValue,
      supplierId,
      mainCategoryId: filterData.value,
      // mainCategoryId: "",
      pageSize: 50,
      pageNumber: 0,
    };
    const { data, err } = await getSharedProduct(payload);
    if (data) {
      setmySharedProduct(data.data);
    } else if (err) {
      toastify(err.response.data.message, "error");
    }
  };
  useEffect(() => {
    getDropdownData();
  }, []);
  useEffect(() => {
    getAllShareProductfunction();
  }, [filterData, searchTextValue]);
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
                value={filterData}
                // size="small"
                placeholder="Filter by Category"
                list={[...dropdownState]}
                onDropdownSelect={(value) => {
                  setfilterData(value);
                }}
              />
            </div>
            <Box className="d-flex m-3 align-items-center">
              <InputBox
                size="small"
                label="Search by Categories"
                onInputChange={(e) => {
                  setSearchInput(e.target.value);
                  if (e.target.value == "") {
                    getAllShareProductfunction();
                  }
                }}
                value={SearchInput}
              />
              <Box
                className="bg-orange d-flex justify-content-center align-items-center rounded cursor-pointer rounded ms-2"
                // onClick={handleSearch}
                onClick={() => {
                  setsearchTextValue(SearchInput);
                }}
              >
                <SearchOutlinedIcon
                  className="text-white p-1 fs-1"
                  style={{ backgroundColor: SearchInput.length ? "" : "gray" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ my: 5, px: 2 }}>
          <ProductDetailsCard products={mySharedProduct} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MySharedProduct;
