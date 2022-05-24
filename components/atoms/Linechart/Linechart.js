import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const LineChart = ({
  data = [],
  labels = [],
  height = "200px",
  showYAxis = true,
  lineColor = "#C100C1",
}) => {
  const options = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: {
        grid: {
          display: false,
        },
      },
      yAxes: {
        ticks: {
          padding: 5,
        },
        beginAtZero: false,
        display: showYAxis,
        title: {
          display: true,
          text: "Amount",
        },
        grid: {
          display: true,
          lineWidth: 1,
          color: "#f5f4f5",
        },
      },
    },
    maintainAspectRatio: false,
  };
  const datas = {
    labels,
    datasets: [
      {
        label: "First dataset",
        data: [...data],
        pointBorderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "white",
        backgroundColor: "#c510c5",
        borderColor: lineColor,
        borderWidth: 2,
      },
    ],
  };
  return (
    <div
      style={{
        height: height,
      }}
    >
      <Line data={datas} options={options} />
    </div>
  );
};
