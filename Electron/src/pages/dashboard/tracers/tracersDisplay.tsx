import React from 'react';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';


export default function TracersDisplay() {
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={comms} timeAtoA={fullTime} timeBtoA={returnTime}/>
    </div>
  );
}

const comms = ["Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 1800, 90, 250, 310, 100];
const returnTime = [40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];
