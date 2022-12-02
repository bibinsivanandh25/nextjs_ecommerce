/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useRef, useEffect, useState, useCallback } from "react";
import { useStoreList } from "services/hooks";
import { City, State } from "country-state-city";
import { getCategory } from "services/admin/products/productCategories/assignVariation";
import Image from "next/image";
import { motion } from "framer-motion";

const cb = () => {
  return new Promise((resolve) => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push(Math.floor(Math.random() * 10));
    }
    setTimeout(() => {
      resolve(temp);
    }, 2000);
  });
};

const ExploreStores = () => {
  const [formData, setFormData] = useState({
    location: null,
    category: {},
    storeName: "",
    state: {},
    district: {},
    city: "",
  });
  const [pageNum, setPageNum] = useState(1);
  const [stateList, setStateList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { loading, error, list, hasMore } = useStoreList(cb, pageNum);
  const observer = useRef();

  const lastStore = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleChange = (val, name) => {
    setFormData((pre) => ({
      ...pre,
      [name]: val,
    }));
  };

  const getCategories = async () => {
    const { data } = await getCategory();
    if (data) {
      setCategoryList(
        data.map((item) => ({
          label: item.mainCategoryName,
          id: item.mainCategoryId,
          commissionType: item.commissionType,
        }))
      );
    }
  };

  useEffect(() => {
    const temp = [];
    getCategories();
    State.getStatesOfCountry("IN")?.forEach((item) => {
      temp.push({
        id: item.isoCode,
        label: item.name,
      });
    });
    setStateList(temp);
  }, []);

  //   useEffect(() => {
  //     if (formData.state?.id) {
  //       const temp = [];
  //       City.getCitiesOfState("IN", formData.state?.id)?.forEach((item) => {
  //         temp.push({
  //           id: item.name,
  //           label: item.name,
  //         });
  //       });
  //       setCityList(temp);
  //     }
  //   }, [formData.state]);

  return (
    <Box className="w-100">
      <Grid className="w-100 p-3" spacing={3}>
        <Grid item md={12} lg={12} className="mb-3">
          <InputBox
            label="My Location"
            onInputChange={(e) => {
              handleChange(e.target.value, "location");
            }}
            fullWidth
            value={formData.location}
          />
        </Grid>
        <Grid item md={4} className="mb-3">
          <SimpleDropdownComponent
            onDropdownSelect={(val) => {
              handleChange(val, "category");
            }}
            size="small"
            label="All Categories"
            value={formData.category}
            list={categoryList}
          />
        </Grid>
        <Grid item md={12} className="mb-3">
          <InputBox
            onInputChange={(e) => {
              handleChange(e.target.value, "storeName");
            }}
            placeholder="Search Store Name"
            value={formData.storeName}
          />
        </Grid>
        <Grid item md={12} className="mb-3">
          <SimpleDropdownComponent
            onDropdownSelect={(val) => {
              handleChange(val, "state");
            }}
            size="small"
            label="State"
            value={formData.state}
            list={stateList}
          />
        </Grid>
        <Grid item md={12} className="mb-3">
          <SimpleDropdownComponent
            onDropdownSelect={(val) => {
              handleChange(val, "district");
            }}
            size="small"
            label="District"
            value={formData.district}
          />
        </Grid>
        <Grid item md={12} className="mb-3">
          <InputBox
            onInputChange={(e) => {
              handleChange(e.target.value, "city");
            }}
            label="City/Town/Village"
            value={formData.city}
          />
        </Grid>
        <Grid item md={12} className="mb-3 d-flex justify-content-center">
          <ButtonComponent label="submit" />
        </Grid>
      </Grid>

      <Box
        className="overflow-y-scroll"
        sx={{
          maxHeight: "calc(100vh - 450px)",
        }}
      >
        {list.map((item, index) => {
          if (list.length - 1 === index) {
            return (
              <div
                ref={lastStore}
                style={{ height: "30px" }}
                className="border my-2"
              >
                {item}
              </div>
            );
          }
          return (
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className="w-80p mx-auto p-2 d-flex m-2" elevation={4}>
                <Box elevation={4}>
                  <Image
                    className="rounded-circle"
                    src="https://dev-mrmrscart-assets.s3.ap-south-1.amazonaws.com/supplier/SP0822000068/product/image/09012022093009214"
                    width={50}
                    height={50}
                  />
                </Box>
                <Box className="d-flex flex-column ms-1">
                  <Typography className="">Store {item}</Typography>
                  <Typography className="">Description or category</Typography>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
        {loading && <div>Loading</div>}
      </Box>
    </Box>
  );
};
export default ExploreStores;
