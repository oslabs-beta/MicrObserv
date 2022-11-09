import React, { useEffect, useState} from 'react';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';

// TracersDisplay
export default props => {
  const [tracerNames, updateTracerNames] = useState<any>([]);
  const [nTracerVals, updateNTracerVals] = useState<any>([]);
  const [pTracerVals, updatePTracerVals] = useState<any>([]);
  useEffect(() => {
    let ws = new WebSocket('ws://localhost:3001/');
    ws.onopen = () => console.log("connected to websocket server in Logs Display");
    //when there is an incoming msg
    ws.onmessage = (msg) => {
      console.log('RECIEVED MSG Tracers!');
      
      //create boolean checking if log
      const tracers = JSON.parse(msg.data).tracers;
      if(tracers.names.length) updateTracerNames(tracerNames => [...tracerNames, ...tracers.names]);
      if(tracers.nTracerVals.length) updateNTracerVals(nTracerVals => [...nTracerVals, ...tracers.nTracerVals]);
      if(tracers.pTracerVals.length) updatePTracerVals(pTracerVals => [...pTracerVals, ...tracers.pTracerVals]);
      console.log(pTracerVals);
    }
  }, []);
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={tracerNames.slice(Math.max(tracerNames.length - 10, 0)).reverse()} timeAtoA={nTracerVals.slice(Math.max(nTracerVals.length - 10, 0)).reverse()} timeBtoA={pTracerVals.slice(Math.max(pTracerVals.length - 10, 0)).reverse()}/>
      <div className='flex justify-center'>
        <button className='btn' onClick={()=>props.showRealTime(false)}>Next</button>
      </div>
    </div>
  );
}



// TracersDisplayHistory
const getTracerHist = (updateTracerNames, updateNTracerVals, updatePTracerVals, next) => {
  fetch('http://localhost:3000/MicrObserv/tracerHist', {
    method: 'POST',
    body: JSON.stringify({
      next: next,
      prev: !next
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.tracers)
    updateTracerNames(data.tracers.names);
    updateNTracerVals(data.tracers.nTracerVals);
    updatePTracerVals(data.tracers.pTracerVals);
  })
  .catch(err => console.log(err));
}

let page;
const TracersDisplayHistory = props => {
  const [tracerNames, updateTracerNames] = useState<any>([]);
  const [nTracerVals, updateNTracerVals] = useState<any>([]);
  const [pTracerVals, updatePTracerVals] = useState<any>([]);
  useEffect(() => {
    page = 1;
    getTracerHist(updateTracerNames, updateNTracerVals, updatePTracerVals, false);
  }, []);
  
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={tracerNames} timeAtoA={nTracerVals} timeBtoA={pTracerVals}/>
      <div className='flex justify-center'>
      <button className='btn' onClick={
            ()=>{
              page--;
              page > 0 ? 
              getTracerHist(updateTracerNames, updateNTracerVals, updatePTracerVals, false)
              : props.showRealTime(true);
            }
          }>Prev
        </button>
        <button className='btn' onClick={
            ()=>{
              page++;
              getTracerHist(updateTracerNames, updateNTracerVals, updatePTracerVals, true)
            }
          }>Next
        </button>
      </div>
    </div>
  );
}
export { TracersDisplayHistory };