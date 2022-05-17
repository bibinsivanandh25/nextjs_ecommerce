import { Box, Paper, Typography } from "@mui/material";
import SearchComponent from "components/atoms/SearchComponent";

const CategoryItems = [
  {
    label: "sarees",
    image: "",
  },
  {
    label: "Kurtas",
    image: "",
  },
  {
    label: "Makeups",
    image: "",
  },
];

const Category = ({}) => {
  return (
    <Paper className="w-100 d-flex flex-column mxh-80vh mnh-80vh overflow-y-scroll hide-scrollbar p-3">
      <Box className="d-flex justify-content-between align-items-center">
        <Typography className="h-4 fw-bold">Top Categories</Typography>
        <Box className="d-flex">
          <SearchComponent
            handleBtnSearch={(val) => {
              console.log(val);
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};
export default Category;
