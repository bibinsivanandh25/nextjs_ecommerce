/* eslint-disable no-param-reassign */
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Checkbox, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getChooseBannerData,
  saveChooseBanner,
} from "services/supplier/marketingtools";
import toastify from "services/utils/toastUtils";

const ChooseBannerModal = ({
  open = false,
  closeModal = () => {},
  modalTitle = "Choose Banner",
  type = "DISCOUNT_COUPON",
}) => {
  const userData = useSelector((state) => state.user);
  const [banners, setBanners] = useState([]);
  const getAllBannersData = async () => {
    const payload = {
      supplierId: userData.supplierId,
      marketingTool: type,
    };
    const { data, err } = await getChooseBannerData(payload);
    if (data?.length) {
      setBanners(data);
    }
    if (err) {
      setBanners([]);
    }
  };
  useEffect(() => {
    getAllBannersData();
  }, []);
  const handleCheckBoxClick = (value) => {
    const temp = [...banners];
    temp.forEach((item) => {
      if (item.bannerId === value.bannerId) {
        item.selected = !item.selected;
      }
    });
    setBanners([...temp]);
  };
  const handleSaveBtnClick = async () => {
    const temp = [...banners];
    const bannerIds = [];

    temp.forEach((item) => {
      if (item.selected) {
        bannerIds.push(item.bannerId);
      }
    });
    if (bannerIds.length) {
      const payload = {
        supplierId: userData.supplierId,
        marketingTool: type,
        bannerIds,
      };
      const { data, err } = await saveChooseBanner(payload);
      if (!data.error) {
        closeModal(false);
      }
      if (err) {
        toastify(err?.response?.data?.message, "error");
      }
    } else {
      toastify("Please choose a banner.", "error");
    }
  };
  return (
    <ModalComponent
      open={open}
      showPositionedClose
      showCloseIcon={false}
      ModalTitle={modalTitle}
      onCloseIconClick={() => {
        closeModal(false);
      }}
      footerClassName="justify-content-end"
      headerBorder=""
      saveBtnText="Submit"
      ClearBtnText="Close"
      ModalWidth={900}
      headerClassName="fw-bold color-orange"
      titleClassName="fs-16"
      onSaveBtnClick={() => handleSaveBtnClick()}
    >
      {banners.length > 0 ? (
        <Grid container rowGap={1}>
          {banners.map((item) => (
            <Grid item sm={4} position="relative">
              <Image
                src={item.bannerImageUrlForMobile}
                aly="banner"
                height={170}
                width={270}
                className={`border p-0 ${
                  item.selected ? "border-orange" : "border-gray"
                }`}
              />
              <Paper
                style={{
                  position: "absolute",
                  top: 4,
                  left: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  padding: 0,
                }}
              >
                <Checkbox
                  onClick={() => {
                    handleCheckBoxClick(item);
                  }}
                  checked={item.selected}
                  size="small"
                  sx={{
                    "&.Mui-checked": {
                      color: window
                        .getComputedStyle(document.documentElement)
                        .getPropertyValue("--themeColor"),
                    },
                    pointerEvents: "auto",
                    cursor: "pointer",
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mnh-100"
        >
          <Typography className="fw-bold h-4">No Banners Available</Typography>
        </Box>
      )}
    </ModalComponent>
  );
};

export default ChooseBannerModal;
