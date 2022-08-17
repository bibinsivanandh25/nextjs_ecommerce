import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import validateMessage from "constants/validateMessages";
// import { signIn } from "next-auth/react";
import { getStoreByStoreCode } from "services/customer/ShopNow";
import { useRouter } from "next/router";
import toastify from "services/utils/toastUtils";
import favicon from "public/assets/favicon.png";
import ButtonComponent from "@/atoms/ButtonComponent";
import styles from "./shopcode.module.css";
import InputBox from "@/atoms/InputBoxComponent";

const ShopCode = () => {
  const formObj = {
    shopCode: "",
  };

  const route = useRouter();

  const [formValues, setFormValues] = useState({
    shopCode: "",
  });

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

  const handleSubmit = async () => {
    const flag = validateForm();
    if (!flag) {
      const { data, err } = await getStoreByStoreCode(formValues.shopCode);
      if (data) {
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

  return (
    <Box
      className={`w-100 mnh-100vh d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Paper
        className="w-400px rounded-1 pb-5"
        sx={{ background: "rgba(1,1,1,0.4)" }}
        elevation={6}
      >
        <Box className="w-100 p-4 rounded-1 py-3">
          <Box className="d-flex justify-content-end align-items-center">
            <Typography className="color-white fs-14 cursor-pointer">
              Existing Customer
            </Typography>
            <Box className="ps-2">
              <ButtonComponent
                label="Sign In"
                variant="outlined"
                muiProps="bg-transparent color-white fs-12"
                borderColor="border-white"
                onBtnClick={() => route.push("/auth/customer/signin")}
              />
            </Box>
          </Box>
          <Box
            style={{ height: "75px" }}
            className="d-flex justify-content-center align-items-center mt-4"
          >
            <Image
              //   height="1200"
              className="img-fluid"
              src={favicon}
              alt="logo"
            />
          </Box>
          <Typography variant="h6" className="color-white text-center fs-16">
            A Multi Ecommrece Store
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
              labelColorWhite={{ color: "#fff" }}
              InputProps={{
                style: {
                  fontSize: "14px",
                  color: "#fff",
                  borderColor: "#fff !important",
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
          <Typography className="fs-12 text-center color-white mt-2">
            You will get access to all products category
            <span className="color-orange cursor-pointer ms-2">Click Here</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ShopCode;
