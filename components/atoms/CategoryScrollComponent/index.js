import { Box, Tooltip, Typography } from "@mui/material";
import ImageCard from "../ImageCard";

const CategoryScrollComponent = ({
  categories = [],
  onCategoryClick = () => {},
}) => {
  return (
    <>
      {categories.length ? (
        <Box className="d-flex justify-content-between mx-1 align-items-center px-2">
          <Typography className="fw-bold">Top Categories</Typography>
          {categories.length >= 9 ? (
            <Typography className="fs-14 color-orange">See All</Typography>
          ) : null}
        </Box>
      ) : null}
      <Box className="d-flex overflow-auto w-100 hide-scrollbar px-2">
        {categories.map((ele) => {
          return (
            <Box
              className="mx-2 "
              style={{
                minWidth: 125,
                maxWidth: 125,
              }}
              onClick={() => {
                onCategoryClick(ele);
              }}
              key={ele.id}
            >
              <ImageCard
                showCursorPointer
                height={125}
                width={125}
                imgSrc={ele.image}
                showClose={false}
              />
              <Tooltip title={ele.name} placement="top">
                <Typography className="text-truncate text-center h-5 fw-bold">
                  {ele.name}
                </Typography>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
export default CategoryScrollComponent;
