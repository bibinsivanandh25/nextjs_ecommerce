import { Divider, Grid, Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";
import { useEffect, useState } from "react";
import {
  getProductsToMergeBySearch,
  mergeProducts,
} from "services/admin/products";
import InputBox from "@/atoms/InputBoxComponent";
import CustomIcon from "services/iconUtils";
import ButtonComponent from "@/atoms/ButtonComponent";
import toastify from "services/utils/toastUtils";

const MergeToModal = ({
  openMergeToModal = false,
  setOpenMergeToModal = () => {},
  productId = "",
  viewClick = () => {},
}) => {
  const [searchText, setSearchText] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  const getProductsToMerge = async () => {
    const formData = new FormData();
    formData.append("searchKey", searchText);
    const { data } = await getProductsToMergeBySearch(formData);
    if (data) {
      setProductDetails([...data]);
    }
  };

  useEffect(() => {
    getProductsToMerge();
  }, [searchText]);

  const handleMerge = async () => {
    const { data, err } = await mergeProducts(productId);
    if (data) {
      toastify(data?.message, "success");
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };

  const getProductDetails = () => {
    return productDetails?.map((ele) => {
      return (
        <>
          <Grid container item spacing={1}>
            <Grid item sm={9}>
              <Typography className="fw-bold">{ele.productTitle}</Typography>
            </Grid>
            <Grid item sm={3} display="flex" justifyContent="space-between">
              <CustomIcon
                title="view"
                type="view"
                onIconClick={() => {
                  setOpenMergeToModal(false);
                  viewClick(ele.masterProductId, ele.productVariationId);
                }}
              />
              <ButtonComponent
                variant="outlined"
                label="Cancel"
                bgColor="white"
                textColor="text-black"
                borderColor="border-0"
              />
              <ButtonComponent
                variant="outlined"
                label="Merge"
                bgColor="bg-light-gray"
                onBtnClick={handleMerge}
              />
            </Grid>
            <Grid item sm={12}>
              <Divider color="black" />
            </Grid>
          </Grid>
        </>
      );
    });
  };

  return (
    <>
      <ModalComponent
        open={openMergeToModal}
        showFooter={false}
        onCloseIconClick={() => {
          setOpenMergeToModal(false);
        }}
        ModalTitle="Merge"
        titleClassName="fw-bold fs-14 color-orange"
        minHeightClassName=""
        ModalWidth="60%"
      >
        <div className="mnh-300 mt-2 mb-3">
          <InputBox
            placeholder="Search Products"
            className="my-2 "
            label="Search Products"
            value={searchText}
            onInputChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <Grid
            container
            rowSpacing={2}
            className="mxh-60vh overflow-auto hide-scrollbar mt-1 border border-2 rounded px-2 pb-1"
          >
            {getProductDetails()}
          </Grid>
        </div>
      </ModalComponent>
    </>
  );
};

export default MergeToModal;
