import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import styles from "./InvoiceCardComponent.module.css";

const InvoiceCardComponent = () => {
  const data = {
    cardTitle: "list items",
    totalPrice: "99",
    text: "abcdefghtkh",
    detailed_price_list: [
      { name: "mmcart commision", value: "1" },
      { name: "mmcart commision", value: "1" },
      { name: "mmcart commision", value: "1" },
      { name: "mmcart commision", value: "1" },
    ],
    payout_text:
      "kjhfbv sdvkjhbsdv sd sdkjvbnsdnv sdkjhbvsd nv ksjdvmsnd vkjsdbv snmd vkjsdbvkjhfbv sdvkjhbsdv sdkjvbnsdnv sdkjhbvsd nv ksjdvmsnd vkjsdbv snmd vkjsdbv",
    payout_price: "100",
  };
  const [expand, setExpand] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (expand) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [expand]);
  return (
    <Paper className={`w-100 mt-2 `} ref={cardRef}>
      <div className={`${expand ? styles.expand : styles.shrink}`}>
        <div
          className={`w-100 d-flex justify-content-between align-items-center p-2 px-3  ${styles.invoiceContainer}`}
        >
          <Typography className="fs-16 fw-600">{data.cardTitle}</Typography>
          <div className="d-flex">
            <Typography className="fs-16 fw-bold">
              RS.{data.totalPrice}
            </Typography>
            <KeyboardArrowUpRoundedIcon
              onClick={() => {
                setExpand(!expand);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-100 p-2 px-3 pb-4">
          <Grid container spacing={1}>
            <Grid item>
              <Typography className="fs-16 fw-600">{data.text}</Typography>
            </Grid>
            {data.detailed_price_list.map((item, index) => {
              return (
                <Grid item container key={index}>
                  <Grid item md={6}>
                    <Typography className="fs-12">{item.name}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className="fs-12">- RS.{item.value}</Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
        {/* </>
        ) : null} */}
      </div>
      <div className="d-flex w-100 bg-light-green p-2 rounded-bottom">
        <div className="d-flex flex-column">
          <Typography className="fs-14 fw-600">Your final payout</Typography>
          <Typography className="fs-10 ">{data.payout_text}</Typography>
        </div>
        <div className="d-flex align-items-center ">
          <Typography className="fs-2 fw-600">
            RS.{data.payout_price}
          </Typography>
          {!expand ? (
            <KeyboardArrowDownRoundedIcon
              onClick={() => {
                setExpand(!expand);
              }}
              className="cursor-pointer"
            />
          ) : null}
        </div>
      </div>
    </Paper>
  );
};
export default InvoiceCardComponent;

/*
{
    cardTitle:"list items",
    totalPrice:"100",
    text:"abcdefghtkh",
    detailed_price_list:[
        {name:"mmcart commision",value:"1"},
        {name:"mmcart commision",value:"1"},
        {name:"mmcart commision",value:"1"},
        {name:"mmcart commision",value:"1"},
    ],
    payout_text:"",
    payout_price:"kjhfbv sdvkjhbsdv sdkjvbnsdnv sdkjhbvsd nv ksjdvmsnd vkjsdbv snmd vkjsdbvkjhfbv sdvkjhbsdv sdkjvbnsdnv sdkjhbvsd nv ksjdvmsnd vkjsdbv snmd vkjsdbvkjhfbv sdvkjhbsdv sdkjvbnsdnv sdkjhbvsd nv ksjdvmsnd vkjsdbv snmd vkjsdbv"
}
*/
