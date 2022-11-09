import React, { useEffect, useState} from 'react';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';

let ws;
export default function TracersDisplay() {
  const [tracerNames, updateTracerNames] = useState<any>([]);
  const [nTracerVals, updateNTracerVals] = useState<any>([]);
  const [pTracerVals, updatePTracerVals] = useState<any>([]);
  const [page, updatePage] = useState<number> (0);

  useEffect(() => {
    if(!ws){
      ws = new WebSocket('ws://localhost:3001/');
      ws.onopen = () => console.log("connected to websocket server in Logs Display");
    }
    //when there is an incoming msg
    ws.onmessage = (msg) => {
      console.log('RECIEVED MSG Tracers!');

      //create boolean checking if log
      const tracers = JSON.parse(msg.data).tracers;
      console.log(pTracerVals);
      if(Array.isArray(tracers.names)) updateTracerNames(tracerNames => [...tracerNames, ...tracers.names]);
      if(Array.isArray(tracers.nTracerVals)) updateNTracerVals(nTracerVals => [...nTracerVals, ...tracers.nTracerVals]);
      if(Array.isArray(tracers.pTracerVals)) updatePTracerVals(pTracerVals => [...pTracerVals, ...tracers.pTracerVals]);
    }
  });
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <button onClick={() => pause()}>Pause</button>;
      <button>Next Page</button>
      <BarChart communications={tracerNames.slice(Math.max(tracerNames.length - (10 * (page + 1)),0), tracerNames.length).reverse()} timeAtoA={nTracerVals.slice(Math.max(nTracerVals.length - (10 * (page + 1)), 0), nTracerVals.length).reverse()} timeBtoA={pTracerVals.slice(Math.max(pTracerVals.length - (10 * (page + 1)), 0), pTracerVals.length).reverse()}/>
    </div>
  );
}

const comms = ["Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 1800, 90, 250, 310, 100];
const returnTime = [40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];
