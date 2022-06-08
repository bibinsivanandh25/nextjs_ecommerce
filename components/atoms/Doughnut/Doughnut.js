import React, {  useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Grid } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Doughnutchart = ({ labels = [], data = [] }) => {

  const color = [
    "#8F1FF9",
    "#FD931B",
    "#26DA62",
    "blue",
    "orange",
    "#5B507A",
    "green",
    "#D6D84F",
    "#5B618A",
    "#820B8A",
    "#6A0F49",
    "#97EFE9",
  ];
  let datas = {
    labels: labels,
    datasets: [
      {
        // label: '# of Votes',
        data: [...data],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  return (
    // <Cards>
    //   <Grid item xs={12}>
    <Grid container>
      <Grid item md={9}>
        <Doughnut
          data={datas}
          options={{
            plugins: {
              datalabels: {
                display: false,
              },
              legend: {
                display: true,
                labels: {
                  usePointStyle: true,
                },
                position: "right",
                align: "center",
              },
            },
            maintainAspectRatio: false,
            rotation: 1.0 * Math.PI,
            cutout: 60,
          }}
          // options={{
          //   responsive: true,
          //   plugins: {
          //     legend: {
          //       display: true,
          //       labels: {
          //         usePointStyle: true,
          //       },
          //       position: "right",
          //       align: "center",
          //     },
          //     title: {
          //       display: true,
          //       text: "tooltip",
          //     },
          //     labels: {
          //       fontSize: 10,
          //       usePointStyle: true,
          //     },
          //   },
          // }}
        />
      </Grid>
      {/* <Grid item md={5} container>
        {labels.map((ele, index) => {
          return (
            <Grid className="d-flex align-items-center" item md={6} key={index}>
              <Grid
                // item
                // sm={1}
                // className="mx-4"
                style={{
                  minHeight: "15px",
                  minWidth: "15px",
                  borderRadius: "50%",
                  backgroundColor: color[index],
                }}
              ></Grid>
              <Grid className="mx-3">{ele}</Grid>
            </Grid>
          );
          // });
        })}
      </Grid> */}
    </Grid>
    //   </Grid>
    // </Cards>
  );
};
export default Doughnutchart;
