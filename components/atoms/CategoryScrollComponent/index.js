import { Box, Typography } from "@mui/material";
import ImageCard from "../ImageCard";

const CategoryScrollComponent = ({ categories = [] }) => {
  return (
    <Box className="d-flex overflow-auto w-100 hide-scrollbar">
      {categories.map((ele) => {
        return (
          <Box
            className=" mx-2 "
            style={{
              minWidth: "120px",
            }}
          >
            <ImageCard imgSrc={ele.image} showClose={false} />
            <Typography>{ele.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
export default CategoryScrollComponent;
