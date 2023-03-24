import TableComponent from "@/atoms/TableComponent";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { viewModalApi } from "services/admin/customers";
import toastify from "services/utils/toastUtils";

const tableColumns = [
  {
    id: "col1",
    label: "Sl NO.",
    minWidth: 50,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col2",
    label: "Product ID",
    minWidth: 150,
    align: "center",
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col3",
    label: "Product link",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col4",
    label: "Product Image",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col5",
    label: "Rating",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col6",
    label: "Review",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col7",
    label: "Supplier ID",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col8",
    label: "Date & time",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
  {
    id: "col9",
    label: "Status",
    align: "center",
    minWidth: 50,
    data_align: "center",
    data_classname: "",
  },
];

const ProductReview = ({ selectedData = {} }) => {
  const [masterData, setMasterData] = useState([]);
  const mapStateToRow = (data) => {
    const temp = [];
    data.forEach((item, index) => {
      temp.push({
        col1: index + 1,
        col2: item.productVariationId,
        col3: item.productLink,
        col4: (
          <Image
            src={item.productImage}
            height={50}
            width={50}
            alt="No Image"
          />
        ),
        col5: (
          <Typography className="text-capitalize h-5">
            {item.ratings}
          </Typography>
        ),
        col6: (
          <Typography className="text-capitalize h-5">{item.review}</Typography>
        ),
        col7: item.supplierId,
        col8: new Date(item.reviwedAt).toLocaleString(),
        col9: (
          <Typography className="text-capitalize h-5">
            {item.status.toLowerCase()}
          </Typography>
        ),
      });
    });
    return temp;
  };
  const getAllAddressData = async () => {
    const { data, err } = await viewModalApi(
      selectedData.customerId,
      "PRODUCT_REVIEWS"
    );
    if (data) {
      setMasterData(mapStateToRow(data));
    }
    if (err) {
      toastify(err?.response?.data?.message, "error");
    }
  };
  useEffect(() => {
    if (selectedData.customerId !== "") {
      getAllAddressData();
    }
  }, [selectedData]);
  return (
    <Box>
      {masterData.length ? (
        <Box>
          <TableComponent
            tableRows={[...masterData]}
            columns={[...tableColumns]}
            showSearchFilter={false}
            showSearchbar={false}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductReview;
