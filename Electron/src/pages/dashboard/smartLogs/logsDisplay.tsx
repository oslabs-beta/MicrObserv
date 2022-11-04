import React, { useEffect, useState, version} from 'react';
import DashboardContainer from '../dashboardContainer';

export default function LogsDisplay() {
  // const ws = new WebSocket('ws://localhost:3000/');

  const [logs, updateLogs] = useState([]);

  // ws.onopen = () => console.log("connected to websocket server in Logs Display")
  //   //when there is an incoming msg
  //   ws.onmessage = (msg) => {
  //     //create boolean checking if log
  //     //console.log('message from the server to Logs Display: ', msg.data);
  //     updateLogs(JSON.parse(msg.data));
  //     //console.log(logs);
  //   }
 
  
  useEffect(() => {
    //get request for logs
    const fetchData = async () => {
      const data = await fetch('/getLogs');
      const json = await data.json()
      const jsonParsed = await JSON.parse(json);
      updateLogs(jsonParsed);
    }
    fetchData()
    },[]);
    //console.log(logs)
    // fetch('/getLogs', {mode: "no-cors"})
    // .then(data => data.json()) 
    // .then(data => updateLogs(JSON.parse(data)));

    //WEBSOCKET
    // //when connected
    // ws.onopen = () => console.log("connected to websocket server in Logs Display")
    // //when there is an incoming msg
    // ws.onmessage = (msg) => {
    //   //create boolean checking if log
    //   //console.log('message from the server to Logs Display: ', msg.data);
    //   updateLogs(JSON.parse(msg.data));
    //   console.log(logs);
    // }
  

  
  return (
    <div className='w-full overflow-hidden'>
      <DashboardContainer title='Logs' />
      <LogsContainer msg={logs}/>
    </div>
  );
}
/* logs= [{},{},{}]*/
const LogsContainer = (props) => {
  //console.log("Inside Logs Container", props.msg);
  let logElements: any = [];
  // mock logs
  for (let i = 0; i < props.msg.length; i++) {
    logElements.push(<LogElement key={i} msg = {props.msg[i]}/>);
  }
  return (
    <div className='scrollbar-thin log-container mb-2 ml-2 mr-2 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-500 overflow-hidden h-[72vh]'>
      {logElements}
    </div>
  );
};

// Expandable element for containing log info
const LogElement = (props) => {
  const [style, setStyle] = useState('log-element');
  //console.log("inside log element", ((props.msg !== undefined) ? props.msg.src : "loading"));

  const changeStyle = () => {
    console.log('you just clicked');
    if (style === 'log-element-clicked') {
      setStyle('log-element');
    } else {
      setStyle('log-element-clicked');
    }
  };

  const serviceName = ((props.msg !== undefined) ? props.msg.src : "loading...");
  const time = ((props.msg !== undefined) ? props.msg.time : "loading...");
  const logMessage = ((props.msg !== undefined) ? props.msg.msg : "loading...")
  // const serviceName = "service A";
  // const time = "12:00";
  // const logMessage = "lala";

  return (
    <div className='flex justify-between p-1'>
      <div
        className={`${style} overflow-hidden convex-shadow text-justify p-3 bg-zinc-800 rounded-xl w-[99%]`}
        onClick={changeStyle}
      >
        {/* Service Name */}
        <div className='title flex justify-between font-bold'>
          <h2>{serviceName}</h2>
          <div>{`Time: ${time}`}</div>
        </div>
        {/* log's message */}
        <div className='messageDiv overflow-hidden text-slate-50 mt-2'>
          <code>{logMessage}</code>
        </div>
      </div>
    </div>
  );
};
