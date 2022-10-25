import InputBox from "@/atoms/InputBoxComponent";
import ModalComponent from "@/atoms/ModalComponent";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getMarketingToolDetailsByToolId } from "services/admin/marketingtools/approvals";

const ViewMarketingtools = ({
  modalOpen,
  modalClose = () => {},
  title = "View",
  viewModlwidth = "75%",
  footer = false,
  marketingToolId = "",
  marketingToolType = "",
}) => {
  const [formData, setFormData] = useState({});
  const [productList, setProductList] = useState([]);
  const getMarketingToolData = async () => {
    const { data } = await getMarketingToolDetailsByToolId(
      marketingToolId,
      marketingToolType
    );
    if (data) {
      setFormData((pre) => ({
        ...pre,
        discount: data?.totalDiscountValue,
        category: data.category,
        subCategory: data.subCategory,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        description: data.description,
      }));
      const result = [];
      data?.marketingToolProductList?.forEach((item) => {
        result.push({
          title: item?.variationData?.productTitle,
          id: item?.variationData?.productVariationId,
          url: item?.variationData?.variationMedia[0],
        });
      });
      setProductList([...result]);
    }
  };

  useEffect(() => {
    getMarketingToolData();
  }, [marketingToolId, marketingToolType]);
  return (
    <ModalComponent
      open={modalOpen}
      onCloseIconClick={() => modalClose(false)}
      ModalTitle={title}
      ModalWidth={viewModlwidth}
      showFooter={footer}
      titleClassName="fw-bold color-orange"
    >
      <Box className="my-2">
        <Grid container spacing={2}>
          <Grid item md={4}>
            <InputBox
              disabled
              label="Discount"
              inputlabelshrink
              value={formData?.discount}
            />
          </Grid>
          <Grid item md={4}>
            <InputBox
              disabled
              label="Category"
              inputlabelshrink
              value={formData?.category}
            />
          </Grid>
          <Grid item md={4}>
            <InputBox
              disabled
              label="Sub Category"
              inputlabelshrink
              value={formData?.subCategory}
            />
          </Grid>
        </Grid>
        <Grid container className="mt-2">
          <Grid item md={3} display="flex">
            <Typography className="h-5">Start Date:&nbsp;</Typography>
            <Typography className="h-5">{formData?.startDateTime}</Typography>
          </Grid>
          <Grid item md={3} display="flex">
            <Typography className="h-5">End Date:&nbsp; </Typography>
            <Typography className="h-5">{formData?.endDateTime}</Typography>
          </Grid>
        </Grid>
        <Grid container className="mt-2">
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formData.description,
            }}
            className="border rounded pt-1 pb-5 px-2 w-75"
            style={{
              backgroundColor: "#fafafa",
            }}
          />
        </Grid>
        <Grid container className="mt-2">
          {productList.map((item) => (
            <Grid item md={2} key={item.id}>
              <Image
                src={item.url}
                layout="intrinsic"
                height={100}
                width={100}
              />
              <Typography className="text-truncate">{item.title}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ModalComponent>
  );
};

export default ViewMarketingtools;
