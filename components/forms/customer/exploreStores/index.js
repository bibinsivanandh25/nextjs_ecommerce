/* eslint-disable no-unused-vars */
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import SimpleDropdownComponent from "@/atoms/SimpleDropdownComponent";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { useRef, useEffect, useState, useCallback } from "react";
import { State } from "country-state-city";
import { getCategory } from "services/admin/products/productCategories/assignVariation";
import Image from "next/image";
import { motion } from "framer-motion";
import { getStore } from "services/admin/explorestore";
import toastify from "services/utils/toastUtils";
import ModalComponent from "@/atoms/ModalComponent";

const ExploreStores = ({ handleStoreSelection = () => {} }) => {
  const [formData, setFormData] = useState({
    location: null,
    category: {},
    storeName: "",
    state: {},
    district: {},
    city: "",
  });
  const [openConfirm, setopenConfirm] = useState(false);
  const [eachStoreList, seteachStoreList] = useState([]);
  const [storesList, setStoresList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noStore, setnoStore] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // const { loading, error, list, hasMore } = useStoreList(cb, pageNum);
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

  const handleSubmit = async () => {
    const payload = {
      mainCategoryId: formData.category?.id ?? null,
      keyword: formData.storeName || null,
      city: formData.city || null,
    };
    setLoading(true);
    const { data, err } = await getStore(payload);
    if (data.length) {
      setLoading(false);
      setStoresList(
        data.map((item) => ({
          label: item.supplierStoreName ?? "--",
          storeCode: item.supplierStoreCode,
          storeLogo: item.storeLogo || "",
          shopDescription: item.shopDescription,
          city: item.city,
        }))
      );
      setnoStore(false);
    } else if (!data.length) {
      setStoresList([]);
      setnoStore(true);
      setLoading(false);
    } else if (err) {
      setLoading(false);
      toastify(err?.response?.data?.message, "error");
    }
  };

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
        {/* <Grid item md={12} className="mb-3">
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
        </Grid> */}
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
          <ButtonComponent label="Search" onBtnClick={handleSubmit} />
        </Grid>
      </Grid>

      <Box
        className="overflow-y-scroll overflow-x-hide"
        sx={{
          maxHeight: "calc(100vh - 400px)",
        }}
      >
        {storesList.map((item, index) => {
          return (
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              ref={index === storesList.length - 1 ? lastStore : null}
            >
              <Paper
                className="w-80p mx-auto p-2 d-flex m-2"
                elevation={4}
                onClick={() => {
                  setopenConfirm(true);
                  seteachStoreList(item);
                  // handleStoreSelection(item);
                }}
              >
                <Box className="d-flex">
                  <Box elevation={4} className="d-flex">
                    <Image
                      className="rounded"
                      src={item.storeLogo || ""}
                      width={70}
                      height={50}
                    />
                  </Box>
                  <Box className="d-flex flex-column ms-1 p-2">
                    <Typography className="">{item.label}</Typography>
                    <Typography className="fs-12">{item.storeCode}</Typography>
                    <Typography className="fs-12">{item.city}</Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
        {loading && <div>Loading</div>}
        {noStore && <div>No store Found</div>}
        {openConfirm && (
          <ModalComponent
            open={openConfirm}
            showHeader={false}
            onClearBtnClick={() => {
              setopenConfirm(false);
            }}
            onSaveBtnClick={() => {
              handleStoreSelection(eachStoreList);
            }}
            saveBtnText="Confirm"
            ClearBtnText="Close"
            onCloseIconClick={() => {
              setopenConfirm(false);
            }}
          >
            <Typography className="fs-16 w-100 text-center fw-bold my-4">
              Are you sure you want to switch store?
            </Typography>
          </ModalComponent>
        )}
      </Box>
    </Box>
  );
};
export default ExploreStores;
