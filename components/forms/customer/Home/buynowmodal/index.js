import ButtonComponent from "@/atoms/ButtonComponent";
import CheckBoxComponent from "@/atoms/CheckboxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import RadiobuttonComponent from "@/atoms/RadiobuttonComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getDeliveryOptions } from "services/customer/cart";

const DeliveryOptionsModal = ({
  modalOpen = false,
  setModalOpen = () => {},
  productId = "",
}) => {
  const [tabList, setTabList] = useState([]);
  const [selectedTab, setSelectedTab] = useState();
  const [noFreeRetunModal, setNoFreeReturnModal] = useState(false);
  const getAllTabList = async () => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await getDeliveryOptions(productId);

    const list = [
      {
        id: 1,
        label: "Free Delivery Returns",
      },
      {
        id: 2,
        label: "No Free Delivery Returns",
      },
      {
        id: 3,
        label: "Store Owner Delivery",
      },
      {
        id: 4,
        label: "Hand Pick",
      },
    ];
    setTabList(list);
    setSelectedTab(list[0].id);
    if (list[0].label === "No Free Delivery Returns") {
      setNoFreeReturnModal(true);
    } else {
      setNoFreeReturnModal(false);
    }
  };
  useEffect(() => {
    getAllTabList();
  }, []);
  const handleChangeTab = (item) => {
    setSelectedTab(item.id);
    if (item.label == "No Free Delivery Returns") {
      setNoFreeReturnModal(true);
    } else {
      setNoFreeReturnModal(false);
    }
  };
  const renderTabList = () => {
    return (
      <Box display="flex" justifyContent="space-evenly" marginBottom={2}>
        {tabList.map((item) => (
          <Box
            className={`${
              item.id === selectedTab ? "bg-orange color-white" : ``
            } border rounded-pill cursor-pointer`}
            paddingY={1}
            paddingX={1.5}
            onClick={() => {
              handleChangeTab(item);
            }}
          >
            <Typography className="h-5 cursor-pointer">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    );
  };
  const renderGeneralModal = () => {
    return (
      <Grid container marginY={2} marginLeft={2}>
        <Grid item xs={3}>
          <Image
            src=""
            alt="image"
            height={100}
            width={100}
            className="border"
          />
        </Grid>
        <Grid item xs={8}>
          <Typography className="h-4 fw-bold">Product Name</Typography>
          <Typography className="h-5">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit
          </Typography>
          <CheckBoxComponent label="183 - Fastest delivery by sunday , sep 18" />
        </Grid>
      </Grid>
    );
  };
  const renderNoFreeRetunModal = () => {
    return (
      <Grid container marginY={2} marginLeft={2}>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="center">
            <Box>
              <Image
                src=""
                alt="image"
                height={100}
                width={100}
                className="border"
              />
              <Typography className="h-4 fw-bold">Product Name</Typography>
            </Box>
          </Box>
          <Typography className="h-5">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box className="ps-4">
            <CheckBoxComponent label="Choose Delivery options" size="medium" />
            <Box>
              <RadiobuttonComponent label="83 - Delivery by wed, sep 22" />
            </Box>
            <RadiobuttonComponent label="90 - Fastest Delivery by wed, sep 22" />
          </Box>
          <Box className="border-top border-dark-gray ps-4">
            <CheckBoxComponent label="Choose Return options" size="medium" />
            <Box>
              <RadiobuttonComponent label="83 - Return by wed, sep 22" />
            </Box>
            <RadiobuttonComponent label="90 - Fastest Return by mon, sep 22" />
          </Box>
        </Grid>
      </Grid>
    );
  };
  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => {
        setModalOpen(false);
      }}
      showPositionedClose
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      ModalWidth={750}
      showFooter={false}
    >
      <Box>{tabList.length ? renderTabList() : null}</Box>
      <Box className="border-top border-bottom border-dark-gray mb-1">
        <Box>
          {noFreeRetunModal ? renderNoFreeRetunModal() : renderGeneralModal()}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box marginLeft={2}>
          <Typography>
            <span className="h-4">Final Price -</span>{" "}
            <span className="h-3 color-orange">1200</span>
          </Typography>
        </Box>
        <Box className="mb-2">
          <ButtonComponent
            label="Add to Cart"
            muiProps="color-black me-3 border-black"
            variant="outlined"
          />
          <ButtonComponent label="Proceed to Checkout" />
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default DeliveryOptionsModal;
