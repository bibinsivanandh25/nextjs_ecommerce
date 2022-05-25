import { TabList } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import ButtonTabsList from "components/atoms/ButtonTabsList";
import ProductDetailsCard from "components/reseller/atoms/productdetailscard";
import { useEffect, useState } from "react";

const WishList = () => {
  const tabsList = [
    {
      title: "Electronics",
    },
    {
      title: "Clothings",
    },
    {
      title: "Shoes",
    },
    {
      title: "Home Appliances",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    getProducts();
  }, [activeTab]);

  const getProducts = async () => {
    if (activeTab === 0) {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((data) => {
          setProductDetails([...data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setProductDetails([]);
  };

  return (
    <div>
      <div>
        <Typography className="fs-6 fw-bold pb-2 border-bottom">
          My WishList
        </Typography>
      </div>
      <Grid className="mt-2" container columnSpacing={3}>
        <Grid className="w-100" item sm={2}>
          <ButtonTabsList
            className="w-100"
            tabsList={[...tabsList]}
            activeTab={activeTab}
            showEditDelete
            getActiveTab={(tab) => {
              setActiveTab(tab);
            }}
          />
        </Grid>
        <Grid item sm={10} className="mxh-80vh overflow-auto hide-scrollbar">
          <ProductDetailsCard products={[...productDetails]} />
        </Grid>
      </Grid>
    </div>
  );
};
export default WishList;