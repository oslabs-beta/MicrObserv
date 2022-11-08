import React from 'react';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);

const BarChart = ({communications, timeAtoA, timeBtoA}) => {
  const labels = communications;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "B to A",
        backgroundColor: "#f6d860",
        data: timeBtoA,
      },
      {
        label: "A to B",
        backgroundColor: "#37cdbe",
        data: timeAtoA,
      }
    ],
  };
  const options = {
    scales: {
        y: {
          stacked: true
        }
    },
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };
  return (
    <div className='flex'>
      <Bar options={options} data={data} className='object-fit shrink'/>
    </div>
  );
};

export default BarChart;
