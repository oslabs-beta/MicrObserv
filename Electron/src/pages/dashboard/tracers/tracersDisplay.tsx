import React from 'react';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';


export default function TracersDisplay() {
  // const ws = new WebSocket('ws://localhost:3000/');
  // //when connected
  // ws.onopen = () => //console.log("connected to websocket server in Tracers Display")
  // //when there is an incoming msg
  // ws.onmessage = (msg) => {
  // //create boolean checking if a tracer obj
  // //console.log('message from the server to Tracers Display: ', msg.data);
  // }
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
