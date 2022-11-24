import ModalComponent from "@/atoms/ModalComponent";
import TableComponent from "@/atoms/TableComponent";
import { useState, useEffect } from "react";
import { getDiscountByProductVariationId } from "services/admin/products";

const DiscountModal = ({
  showModal = false,
  setShowModal = () => {},
  supplierId = "",
  productVariationId = "",
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRows, setTableRows] = useState([]);

  const columns = [
    {
      label: "Coupon Code",
      id: "col1",
      align: "center",
      data_align: "center",
    },
    {
      label: "Discount Type",
      id: "col2",
      align: "center",
      data_align: "center",
    },
    {
      label: "Coupon Amount",
      id: "col3",
      align: "center",
      data_align: "center",
    },
    {
      label: "Usage Limit Per Coupon",
      id: "col4",
      align: "center",
      data_align: "center",
    },
    {
      label: "Usage Limit Per User",
      id: "col5",
      align: "center",
      data_align: "center",
    },
    {
      label: "Expire Date",
      id: "col6",
      align: "center",
      data_align: "center",
    },
    {
      label: "Status",
      id: "col7",
      align: "center",
      data_align: "center",
    },
  ];

  const mapTableRows = (data) => {
    const result = [];
    data?.forEach((ele) => {
      result.push({
        id: ele.couponId,
        col1: ele.couponCode,
        col2: ele.discountType,
        col3:
          ele.discountType === "PERCENTAGE" && ele.minimumPurchaseAmount
            ? `${((ele.couponAmount * 100) / ele.minimumPurchaseAmount).toFixed(
                2
              )} %`
            : `${ele.couponAmount} Rs.`,
        col4: ele.usageLimitPerCoupon,
        col5: ele.usageLimitPerUser,
        col6: ele.couponExpiryDate,
        col7: ele.couponStatus,
      });
    });
    return result;
  };

  const getTableData = async (page = pageNumber) => {
    const { data } = await getDiscountByProductVariationId(
      page,
      supplierId,
      productVariationId
    );
    if (data) {
      if (page === 0) {
        setTableRows([...mapTableRows(data)]);
        setPageNumber(pageNumber + 1);
      } else {
        setTableRows([...tableRows, ...mapTableRows(data)]);
        setPageNumber(pageNumber + 1);
      }
    }
  };

  useEffect(() => {
    getTableData(0);
  }, []);

  return (
    <ModalComponent
      ModalTitle="Discount"
      titleClassName="color-orange"
      ModalWidth="75%"
      open={showModal}
      onCloseIconClick={() => setShowModal(false)}
      showFooter={false}
    >
      <TableComponent
        columns={columns}
        tableRows={tableRows}
        showSearchbar={false}
        showSearchFilter={false}
      />
    </ModalComponent>
  );
};
export default DiscountModal;
