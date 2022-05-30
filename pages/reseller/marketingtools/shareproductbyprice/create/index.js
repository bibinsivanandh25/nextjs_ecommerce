import CreateDiscount from "components/forms/reseller/marketingtools/creatediscount";
import { useRouter } from "next/router";

const ShareProductByPriceCreate = () => {
  const router = useRouter();
  return (
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
  );
};

export default ShareProductByPriceCreate;
