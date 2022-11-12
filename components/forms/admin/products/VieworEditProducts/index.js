import { Typography } from "@mui/material";
import NewProducts from "pages/supplier/products&inventory/addnewproduct";

const ViewOrEditProducts = ({ setShowViewOrEdit = () => {} }) => {
  return (
    <>
      <Typography
        onClick={() => {
          setShowViewOrEdit(false);
        }}
        className="mb-2 p-1 h-5 ms-3 cursor-pointer color-orange py-1 d-inline"
      >
        {"<"}Back
      </Typography>
      <NewProducts />
    </>
  );
};
export default ViewOrEditProducts;
