import ModalComponent from "@/atoms/ModalComponent";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChooseBannerData } from "services/supplier/marketingtools";

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
      saveBtnText="Choose"
      ClearBtnText="Close"
      ModalWidth={900}
    >
      <Box>
        {banners.length > 0
          ? banners.map((item) => (
              <Image
                src={item.bannerImageUrlForMobile}
                aly="banner"
                height={170}
                width={240}
              />
            ))
          : null}
      </Box>
    </ModalComponent>
  );
};

export default ChooseBannerModal;
