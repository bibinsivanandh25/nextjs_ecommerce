import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  Legend,
  ChartDataLabels
);

const Bargraph = ({
  labels = [],
  data = [],
  height = "250px",
  backgroundColor = "",
  hoverBackgroundColor = "",
  barDirection = "x",
  showBarInfo = false,
  showXAxis = true,
  showYaxisTicks = true,
  showXaxisTicks = true,
  showGridY = true,
  borderRadius = 0,
  label = "Dataset",
}) => {
  const [datasets, setDatasets] = useState([]);
  const chartRef = useRef();
  const onClick = (event) => {
    const element = getElementAtEvent(chartRef.current, event);
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(datasets[datasetIndex].data[index]);
    console.log(labels[index]);
  };

  useEffect(() => {
    const temp = [];
    temp.push({
      label,
      barThickness: 15,
      borderRadius,
      // label: "amount",
      data,
      backgroundColor,
      hoverBackgroundColor,
      borderSkipped: false,
    });
    setDatasets([...temp]);
  }, [data]);

  const options = {
    indexAxis: barDirection,
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
    responsive: true,
    plugins: {
      datalabels: {
        display: showBarInfo,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "14" },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: showXaxisTicks,
        },
        title: {
          display: true,
          labelString: "Y text",
        },
        display: showXAxis,
        stacked: true,
      },
      y: {
        grid: {
          display: showGridY,
          lineWidth: 0.7,
          // color: "black",
        },
        ticks: {
          display: showYaxisTicks,
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
        height,
      }}
    >
      {data && (
        <Bar
          onClick={onClick}
          ref={chartRef}
          data={{
            labels,
            datasets,
          }}
          options={options}
        />
      )}
    </div>
  );
};
export default Bargraph;
