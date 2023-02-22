/* eslint-disable prefer-destructuring */
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
// import { signIn } from "next-auth/react";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { useRouter } from "next/router";
import toastify from "services/utils/toastUtils";
import { assetsJson } from "public/assets";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "features/customerSlice";
import ButtonComponent from "@/atoms/ButtonComponent";
import InputBox from "@/atoms/InputBoxComponent";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CustomDrawer from "@/atoms/CustomDrawer";
import ExploreStores from "@/forms/customer/exploreStores";
import { getSession } from "next-auth/react";
import styles from "./shopcode.module.css";

const ShopCode = () => {
  const formObj = {
    shopCode: "",
  };

  const route = useRouter();
  const [openExplore, setOpenExplore] = useState(false);
  const [formValues, setFormValues] = useState({
    shopCode: "",
  });
  const [sessions, setSessions] = useState({
    role: "",
    id: "",
  });

  const getStatus = async () => {
    const session = await getSession();
    if (session) {
      setSessions({
        role: session?.user?.role,
        id: session?.user?.id,
      });
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (sessions?.role === "CUSTOMER" && sessions?.id?.length) {
      route.push("/customer/home");
    }
  }, [sessions]);

  const [errorObj, setErrorObj] = useState({
    ...formObj,
  });

  const validateForm = () => {
    let flag = false;
    const errObj = { ...formObj };
    if (formValues.shopCode === "") {
      flag = true;
      errObj.shopCode = validateMessage.field_required;
    }
    setErrorObj({ ...errObj });
    return flag;
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      const { data, err } = await getStoreByStoreCode(formValues.shopCode);
      if (data) {
        const userInfo = {
          userId: "",
          firstName: "",
          lastName: "",
          supplierId: data?.supplierId,
          supplierStoreLogo: data?.supplierStoreLogo,
          supplierStoreName: data?.supplierStoreName,
          storeCode: data?.supplierStoreCode,
          storeThemes: data?.storeTheme,
          shopDescription: data?.shopDescription,
          shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
        };
        dispatch(storeUserInfo(userInfo));
        route.push({
          pathname: `/customer/home`,
          query: {
            supplierId: data.supplierId,
            storeCode: formValues.shopCode,
          },
        });
      }
      if (err) {
        toastify(err.response?.data?.message, "error");
      }

      //   signIn("credentials", {
      //     username: formValues.shopCode,
      //     password: formValues.password,
      //     role: "customer",
      //     roleId: 3,
      //     callbackUrl: "/customer/home",
      //   });
    }
  };

  const storePreview = async () => {
    const temp = {};
    atob(route?.query?.store)
      .split("&")
      .forEach((item) => {
        temp[item.split("=")[0]] = item.split("=")[1];
      });
    const { data, err } = await getStoreByStoreCode(temp.storeCode);
    if (data) {
      const userInfo = {
        userId: "",
        firstName: "",
        lastName: "",
        supplierId: data?.supplierId,
        supplierStoreLogo: data?.supplierStoreLogo,
        supplierStoreName: data?.supplierStoreName,
        storeCode: data?.supplierStoreCode,
        storeThemes: {
          primaryColor: temp.primaryColor,
          secondaryColor: temp.secondaryColor,
        },
        shopDescription: data?.shopDescription,
        shopDescriptionImageUrl: data?.shopDescriptionImageUrl,
      };
      dispatch(storeUserInfo(userInfo));
      route.push({
        pathname: `/customer/home`,
        query: {
          supplierId: data.supplierId,
          storeCode: formValues.shopCode,
        },
      });
    }
    if (err) {
      toastify(err.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (route.query?.store) storePreview();
  }, [route.query]);

  return (
    <Box
      className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
      style={{
        backgroundImage: `url(${assetsJson.login_background})`,
      }}
    >
      <Paper className="w-400px rounded-1 pb-5" elevation={24}>
        <Box className="w-100 p-4 rounded-1 py-3">
          <Box className="d-flex justify-content-end align-items-center">
            <Typography className=" fs-14 ">Existing Customer</Typography>
            <Box className="ps-2">
              <ButtonComponent
                label="Sign In"
                variant="outlined"
                muiProps="bg-transparent fs-12"
                onBtnClick={() => route.push("/auth/customer/signin")}
              />
            </Box>
          </Box>
          <Box
            style={{ height: "75px" }}
            className="d-flex justify-content-center align-items-center mt-4"
          >
            <Image src={assetsJson.logo} alt="" width={300} height={120} />
          </Box>
          <Typography variant="h6" className=" text-center fs-16 mt-4">
            A Multi Ecommerce Store
          </Typography>
          <Box className="mt-4 mb-2">
            <InputBox
              label="Enter The Store Code"
              placeholder="eg. HYUE!1234GB"
              inputlabelshrink
              className="mt-3"
              onInputChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  shopCode: e.target.value,
                }));
              }}
              InputProps={{
                style: {
                  fontSize: "14px",
                },
              }}
              value={formValues.shopCode}
              helperText={errorObj.shopCode}
              error={errorObj.shopCode !== ""}
            />
          </Box>

          <Box className="mt-3 d-flex justify-content-center">
            <ButtonComponent
              label="Shop Now"
              muiProps="px-4 py-2"
              onBtnClick={handleSubmit}
            />
          </Box>
          <Box className="d-flex flex-column justify-content-center">
            <Typography className="fs-16 fw-500 text-center mt-4">
              Explore Stores
            </Typography>
            <FaArrowAltCircleRight
              onClick={() => {
                setOpenExplore(true);
              }}
              className="mx-auto h2 cursor-pointer"
            />
          </Box>
        </Box>
      </Paper>
      <CustomDrawer
        open={openExplore}
        position="right"
        handleClose={() => {
          setOpenExplore(false);
        }}
        title="Explore Stores"
        titleClassName="color-orange"
      >
        <ExploreStores
          showConformation={false}
          handleStoreSelection={(storeData) => {
            setFormValues((prev) => ({
              ...prev,
              shopCode: storeData.storeCode,
            }));
            setOpenExplore(false);
          }}
        />
      </CustomDrawer>
    </Box>
  );
};

export default ShopCode;
