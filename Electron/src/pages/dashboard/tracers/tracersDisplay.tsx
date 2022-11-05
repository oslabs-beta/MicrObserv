import React, { useEffect, useState} from 'react';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';

let ws;
export default function TracersDisplay() {
  const [tracerNames, updateTracerNames] = useState<any>([]);
  const [nTracerVals, updateNTracerVals] = useState<any>([]);
  const [pTracerVals, updatePTracerVals] = useState<any>([]);
  useEffect(() => {
    if(!ws){
      ws = new WebSocket('ws://localhost:3001/');
      ws.onopen = () => console.log("connected to websocket server in Logs Display");
    }
    //when there is an incoming msg
    ws.onmessage = (msg) => {
      //create boolean checking if log
      const tracers = JSON.parse(msg.data).tracers;
      if(Array.isArray(tracers.names)) updateTracerNames(tracerNames => [...tracerNames, ...tracers.names]);
      if(Array.isArray(tracers.nTracerVals)) updateNTracerVals(nTracerVals => [...nTracerVals, ...tracers.nTracerVals]);
      if(Array.isArray(tracers.pTracerVals)) updatePTracerVals(pTracerVals => [...pTracerVals, ...tracers.pTracerVals]);
    }
  });
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={tracerNames} timeAtoA={nTracerVals} timeBtoA={pTracerVals}/>
    </div>
  );
}

const comms = ["Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 1800, 90, 250, 310, 100];
const returnTime = [40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];
