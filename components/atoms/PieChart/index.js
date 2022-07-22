import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({
  data = [], // [{label:"",value:number, bgColor:""}]
  showBarInfo = false,
  minHeight = "mnh-200",
}) {
  const datas = {
    labels: data.map((ele) => ele.label),
    datasets: [
      {
        data: data.map((ele) => ele.value),
        backgroundColor: data.map((ele) => ele.bgColor),
        borderColor: data.map((ele) => ele.bgColor),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Amount",
    },

    responsive: true,
    plugins: {
      datalabels: {
        display: showBarInfo,
      },
      legend: {
        display: false,
        position: "right",
        borderRadius: "50%",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          // generateLabels:
        },
      },
    },
    maintainAspectRatio: false,
  };
  const getLegends = () => {
    return data.map((ele) => {
      return (
        <Grid
          container
          item
          md={12}
          spacing={2}
          className="fw-bold h-5"
          alignItems="center"
        >
          <Grid item sm={1}>
            <CircleIcon
              className="fw-bold"
              style={{
                color: ele.bgColor,
              }}
            />
          </Grid>
          <Grid item sm={7}>
            {ele.label}
          </Grid>
          <Grid item sm={4}>
            : {ele.value}
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Grid container>
      <Grid item sm={12} md={7} className={minHeight}>
        <Pie data={datas} options={options} />
      </Grid>
      <Grid item sm={12} md={5} container>
        {getLegends()}
      </Grid>
    </Grid>
  );
}
