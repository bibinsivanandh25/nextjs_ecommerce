import { Bar } from "react-chartjs-2";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Bargraph = ({
  labels = [],
  data = [],
  height = "250px",
  backgroundColor = "",
  hoverBackgroundColor = "",
}) => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    let temp = [];
    // data.forEach((item, index) => {
    temp.push({
      barThickness: 15,
      borderRadius: 0,
      label: "amount",
      data: data,
      // backgroundColor: index === 0 ? "#ffd09b" : "#9bc4ff",
      backgroundColor: backgroundColor,

      // hoverBackgroundColor: index === 0 ? "#fd941a" : "#3d84ec",
      hoverBackgroundColor: hoverBackgroundColor,

      borderSkipped: false,
    });
    setDatasets([...temp]);
  }, []);
  // console.log(datasets[0].data);

  const options = {
    title: {
      display: true,
      text: "Amount",
    },
    elements: {
      point: {
        radius: 25,
        hoverRadius: 35,
        pointStyle: "rectRounded",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          labelString: "Y text",
        },
        stacked: true,
      },
      y: {
        grid: {
          display: true,
          lineWidth: 0.7,
          // color: "black",
        },
        title: {
          display: true,
          labelString: "Y text",
        },
        stacked: true,
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div
      style={{
        height: height,
      }}
    >
      <Bar
        data={{
          labels,
          datasets,
        }}
        options={options}
      />
    </div>
  );
};
export default Bargraph;
