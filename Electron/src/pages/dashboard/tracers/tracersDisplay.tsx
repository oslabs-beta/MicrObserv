import React, { useEffect, useState, version} from 'react';
import { convertToObject } from 'typescript';
import DashboardContainer from '../dashboardContainer';
import BarChart from './barChart';

export default function TracersDisplay() {
  const [tracers, updateTracers] = useState([]);
  window.ipcBridge.handle('resTracers', (event, data)=> {
    updateTracers(data);
    console.log(tracers[0]);
  });
  useEffect(() => {
    const tracersQueryIntervalId = setInterval(() => {
      //query db
      const getDbTracers = async ()=>{
        try{
          await window.ipcBridge.invoke('pgTracers', 'serviceA');
        }
        catch(err){
          console.log(err);
        }
      };
      getDbTracers();
    }, 5000);

    // clear intervalId
    return function cleanup() {
      clearInterval(tracersQueryIntervalId);
    };
  });
  // interface tracerState {
  //   request: any[],
  //   fullTime: any[],
  //   initialTime: any[]
  // }
  // const {request, fullTime, initialTime} = tracers[0]

  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={comms} timeAtoA={fullTime} timeBtoA={initialTime}/>
    </div>
  );
}


const comms = ["Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 500, 90, 250, 310, 100];
const initialTime = [40, 100, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];



