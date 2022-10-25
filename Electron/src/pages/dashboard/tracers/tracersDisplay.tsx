import React from 'react';
import DashboardContainer from '../dashboardContainer';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);

export default function TracersDisplay() {
  return (
    <div className='w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart />
    </div>

  );
}

const BarChart = () => {
  const labels = ["Service A", "Service B", "Service A", "Service B", "Service C", "Service B"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 255, 255)",
        data: [5, 10, 5, 2, 20, 10],
      },
    ],
  };
  const options = {
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
