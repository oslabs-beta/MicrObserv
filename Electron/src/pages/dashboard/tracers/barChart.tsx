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
        label: "Process Time",
        backgroundColor: "#f6d860",
        data: timeBtoA,
      },
      {
        label: "Network Time",
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
        text: 'Microservice Tracer Messages',
      },
    },
  };
  return (
    <div className='flex'>
      <Bar options={options} data={data} className='object-scale-down shrink'/>
    </div>
  );
};

export default BarChart;
