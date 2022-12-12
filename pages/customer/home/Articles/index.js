/* eslint-disable react/no-array-index-key */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Articles = ({ articleData = [] }) => {
  return (
    <Box className="my-3 ">
      <Typography className="h-4 fw-bold text-center">Articles</Typography>
      <Grid
        container
        className="overflow-x-scroll w-100 p-2 hide-scrollbar"
        columnSpacing={4}
      >
        {articleData.map((ele, ind) => {
          return (
            <Grid item sm={4} key={ind}>
              <Card
                // sx={{
                //   width: "30vw",
                //   minWidth: "100px",
                //   maxWidth: "350px",
                //   padding: "5px",
                // }}
                className="h-100"
                key={ind}
              >
                <CardMedia
                  component="img"
                  height="200"
                  // className="w-100"
                  image={ele.image}
                  alt="Paella dish"
                />
                <CardContent
                // style={{
                //   maxHeight: "15vh",
                //   minHeight: "15vh",
                // }}
                // className="overflow-auto "
                >
                  <Typography className="h-5 h-100">{ele.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default Articles;
