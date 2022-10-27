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

// const splitData = tracerState =>{
//   //create 3 array request, fullTime, returnTime
//   console.log('hit')
//   const output:any ={
//     request: [],
//     fullTime: [],
//     initialTime: []
//   };
//   for(let i = 0; i < tracerState.length; i++ ){
//     if(i % 2 === 0){
//       output.request.push(`${tracerState[i].src} to ${tracerState[i].dest}`)
//       output.fullTime.push(tracerState[i].endtime-tracerState[i].starttime)
//     }
//     else{
//       output.initialTime.push(tracerState[i].starttime-tracerState[i-1].starttime)
//     }
//   }
//   //return an object of 3 arrays
//   return output;
  
// }
const comms = ["Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A","Service A to Service B", "Service B to Service A"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 500, 90, 250, 310, 100];
const initialTime = [40, 100, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];

// const test = [
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '8',
//     sender: true,
//     starttime: '2022-10-27 02:02:01',
//     endtime: '2022-10-27 02:02:30',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '10',
//     sender: true,
//     starttime: '2022-10-27 02:02:20',
//     endtime: '2022-10-27 02:02:30',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '0',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '2',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '4',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '6',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '8',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '10',
//     sender: true,
//     starttime: '2022-10-27 02:02:06',
//     endtime: '2022-10-27 02:02:06',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '0',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '2',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '4',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '6',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '8',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '10',
//     sender: true,
//     starttime: '2022-10-27 02:02:11',
//     endtime: '2022-10-27 02:02:11',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '0',
//     sender: true,
//     starttime: '2022-10-27 02:02:16',
//     endtime: '2022-10-27 02:02:16',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '2',
//     sender: true,
//     starttime: '2022-10-27 02:02:16',
//     endtime: '2022-10-27 02:02:16',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '4',
//     sender: true,
//     starttime: '2022-10-27 02:02:16',
//     endtime: '2022-10-27 02:02:16',
//     completed: true
//   },
//   {
//     src: 'serviceA',
//     dest: 'serviceB',
//     traceId: '6',
//     sender: true,
//     starttime: '2022-10-27 02:02:16',
//     endtime: '2022-10-27 02:02:16',
//     completed: true
//   }
// ]

