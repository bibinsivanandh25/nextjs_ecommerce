import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({
  data = [12, 19, 3, 5, 2, 3],
  labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
}) {
  const datas = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
      legend: {
        display: true,
        position: "right",
        borderRadius: "50%",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
    maintainAspectRatio: false,
  };
  return <Pie data={datas} options={options} />;
}
