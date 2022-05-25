import { Badge, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import ModalComponent from "components/atoms/ModalComponent";
import SimpleDropdownComponent from "components/atoms/SimpleDropdownComponent";
import Image from "next/image";
import { useEffect, useState } from "react";

const ResellerNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [dropDownValue, setDropDownValue] = useState({});
  const [popupDetails, setPopupDetails] = useState({ show: false });

  const getData = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setNewsData([...data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCardClick = (ele) => {
    setPopupDetails({
      show: true,
      image: ele.image,
      title: ele.title,
      description: ele.description,
    });
  };

  return (
    <Paper>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          className="border-bottom"
        >
          <Grid item sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" fontSize={16}>
              News
            </Typography>
          </Grid>
          <Grid item sx={{ p: 2 }} className="d-flex justify-content-end w-75">
            <SimpleDropdownComponent label="Filter by type" className="w-25" />
          </Grid>
        </Grid>
        <Grid item container spacing={2} xs={12} sx={{ my: 5, px: 2 }}>
          {newsData.map((ele, i) => (
            <Grid xs={6} item key={ele.id} onClick={() => handleCardClick(ele)}>
              <Grid
                container
                sx={{
                  border: "1px solid lightgray",
                }}
                className="fs-16 bg-white rounded mnh-150 mxh-150 cursor-pointer"
              >
                <Grid container spacing={2} item xs={12} alignItems="center">
                  <Grid item xs={3}>
                    <Image src={ele.image} height={100} width={100} alt="" />
                  </Grid>
                  <Grid
                    item
                    xs={ele.image ? 8 : 12}
                    zeroMinWidth
                    className="fs-14 fw-bold"
                  >
                    <Typography color="navy" className="fw-600 fs-14">
                      {ele.title}
                    </Typography>
                    <Typography color="gray" className="fs-14">
                      3 Jan 2022 | 2 mins read
                    </Typography>
                    <Typography
                      nowrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}
                      className="fs-14"
                    >
                      {ele.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {popupDetails.show && (
        <ModalComponent
          ModalWidth={400}
          open={popupDetails.show}
          showPositionedClose
          showCloseIcon={false}
          onCloseIconClick={() => setPopupDetails({ show: false })}
          showFooter={false}
          headerClassName="border-0"
          ModalTitle=""
        >
          <Grid container justifyContent="center" spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} container justifyContent="center">
              <Image src={popupDetails.image} height={100} width={100} alt="" />
            </Grid>
            <Typography color="navy" className="fw-600 fs-14 my-3" align="center">
              {popupDetails.title}
            </Typography>
            <Typography className="fs-14">
              {popupDetails.description}
            </Typography>
          </Grid>
        </ModalComponent>
      )}
    </Paper>
  );
};

export default ResellerNews;
