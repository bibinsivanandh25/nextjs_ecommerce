import { Box } from "@mui/material";
import CreateDiscount from "components/forms/reseller/marketingtools/creatediscount";
import { useRouter } from "next/router";

const ShareProductByPriceCreate = () => {
  const router = useRouter();
  return (
    <Box className="mnh-80vh mxh-80vh overflow-auto hide-scrollbar bg-white p-2 rounded">
      <CreateDiscount
        showBackBtn={false}
        inputLabel="Enter the Amount"
        showTypography={false}
        showDateAndTime={false}
        btnText="View Price Catalog"
        onCustomBtnClick={() => {
          router.push("/reseller/marketingtools/shareproductbyprice");
        }}
      />
    </Box>
  );
};

export default ShareProductByPriceCreate;
