import React, {useEffect, useState} from 'react';
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
  const [tracers, updateTracers] = useState<any[]>([]);
  
  useEffect(() => {
    //get request for logs
    const fetchData = async () => {
      const data = await fetch('/getTracers');
      const json = await data.json()
      const jsonParsed = await JSON.parse(json);
      updateTracers(jsonParsed);
    }
    fetchData()
    },[]);
   //console.log(tracers)
  const output: any =[[],[],[]];
      for(let i = 0; i < 12; i++ ){
        console.log('forloop hit')
        if(i % 2 === 0){
          output[0].push(`${tracers[i] ? tracers[i].src : "loading"} to ${tracers[i] ? tracers[i].dest : "loading"}`)
          output[1].push(new Date(tracers[i] ? tracers[i].endtime : "").getTime()- new Date(tracers[i] ? tracers[i].starttime: "").getTime())
        }
        else{
          output[2].push(new Date(tracers[i] ? tracers[i].starttime : '').getTime() - new Date(tracers[i] ? tracers[i-1].starttime: "").getTime());
        }
      }
  console.log("starts", output[1]);
  console.log("ends", output[2]);
     
  return (
    <div className='overflow-hidden w-full'>
      <DashboardContainer title='Latency'/>
      <BarChart communications={output[0]} timeAtoA={output[1]} timeBtoA={output[2]}/>
    </div>
  );
}

const comms = ["Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B", "Service A", "Service B", "Service A", "Service B", "Service C", "Service B"];
const fullTime = [70, 180, 90, 250, 310, 100, 70, 180, 90, 250, 310, 100, 70, 1800, 90, 250, 310, 100];
const returnTime = [40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50, 40, 70, 50, 20, 120, 50];
