import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getArticles } from "services/customer/Home";
import Articles from "../home/Articles";

const Article = () => {
  const [articleData, setArticleData] = useState([]);
  const getArticlesData = async () => {
    const { data } = await getArticles();
    if (data) {
      setArticleData(() => {
        return data.map((ele) => ({
          image: ele.articlesMedia[0]?.mediaUrl,
          content: ele.longDescription,
          id: ele.articleId,
        }));
      });
    }
  };

  useEffect(() => {
    getArticlesData();
  }, []);

  return (
    <Box className="px-3">
      <Typography className="h-4 fw-bold ">Articles</Typography>
      <Articles articleData={articleData} />
      {!articleData.length && <Typography>Articles not found</Typography>}
    </Box>
  );
};

export default Article;
