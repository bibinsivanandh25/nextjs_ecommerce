import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import ReusableBar from "../reusableorderscomponents/ReusableBar";
import ReusableProduct from "../reusableorderscomponents/ReusableProduct";
import styles from "./MyOrders.module.css";
import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";

const list = [
  { label: "Last 30 days" },
  { label: "2020" },
  { label: "2019" },
  { label: "2018" },
  { label: "Archive Orders" },
];

const SingleProductTrackDetails = () => {
  return (
    <Box>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Track Package
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Leave Seller feedback
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Write a Product review
      </Paper>
      <Paper className="w-250px text-center p-1 mb-2 fs-14" elevation={2}>
        Save for later
      </Paper>
    </Box>
  );
};

const ProductDetailsPlusTrackDetails = ({ product }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Box className="d-flex justify-content-between px-2">
      {/* <SingleProductDetails /> */}
      <ReusableProduct product={product}>
        <CheckBoxComponent
          isChecked={checked}
          checkBoxClick={() => {
            setChecked(!checked);
          }}
          className="color-blue"
        />
        <Typography className="mb-1">
          <small>Return window will close on 20 - Aug - 2021</small>
        </Typography>
        <ButtonComponent
          label="Buy it Again"
          variant="outlined"
          muiProps="fw-bold border border-secondary fs-12 bg-primary"
          borderColor="bg-light-gray"
          textColor="color-black"
        />
      </ReusableProduct>
      <SingleProductTrackDetails />
    </Box>
  );
};

const MyOrders = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        // console.log(data.data);
        setProducts([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box>
      <Box className="d-flex align-items-center mb-3">
        <Box className={`${styles.dropDownStyle}`}>
          <SimpleDropdownComponent
            list={list}
            size="small"
            label="Past 3 Months"
          />
        </Box>
        <Typography className="ms-2 fs-14">
          <span className="fw-bold fs-16">2 Orders</span> placed
        </Typography>
      </Box>
      <ReusableBar>
        <ButtonComponent label="Cancel Order" variant="outlined" />
        <ButtonComponent label="Return Orders" muiProps="ms-2" />
      </ReusableBar>
      <Box className="ms-3 pb-2">
        <Typography className="fs-16 fw-bold">
          Dilevered 2 - Aug - 2021
        </Typography>
      </Box>
      {products.map((product) => {
        return (
          <Box key={product.id} className="mt-4">
            <ProductDetailsPlusTrackDetails product={product} />
          </Box>
        );
      })}
    </Box>
  );
};

export default MyOrders;
