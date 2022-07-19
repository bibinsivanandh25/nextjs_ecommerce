import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({
  data = [4, 9, 3, 5, 2, 3],
  labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  backgroundColor = [],
  borderColor = [],
  showBarInfo = false,
}) {
  const datas = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderColor,
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
        display: true,
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
  return <Pie data={datas} options={options} />;
}
