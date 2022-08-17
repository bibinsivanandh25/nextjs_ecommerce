/* eslint-disable react/no-array-index-key */
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const Articles = ({ articleData = [] }) => {
  return (
    <Box className="overflow-x-scroll w-100 d-flex p-2 hide-scrollbar">
      {articleData.map((ele, ind) => {
        return (
          <Box
            className="mx-3"
            style={{
              width: "30vw",
            }}
          >
            <Card
              sx={{
                width: "30vw",
                minWidth: "100px",
                maxWidth: "350px",
                padding: "5px",
              }}
              key={ind}
            >
              <CardMedia
                component="img"
                height="194"
                className="w-100"
                image={ele.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography className="h-5">{ele.content}</Typography>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};
export default Articles;
