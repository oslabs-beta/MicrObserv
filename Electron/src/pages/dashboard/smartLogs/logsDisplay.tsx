// import { fork } from 'child_process';
import React, { useEffect, useState, version} from 'react';
import DashboardContainer from '../dashboardContainer';
import { ipcRenderer } from 'electron';

//create empty array
//create fetch request
//for each row create a div and push into array
//display array
export default function LogsDisplay() {
  const [logs, updateLogs] = useState([]);
  
  window.ipcBridge.handle('logs', (event, data)=> {
    console.log(data);
    updateLogs(data)
  });

  useEffect(() => {
    // console.log(logs);
    const logsQueryIntervalId = setInterval(() => {
      //query db
      const getDbLogs = async ()=>{
        window.ipcBridge.invoke('getLogs');
        // try{
        //   // console.log(window);
        //   // await window.ipcBridge.invoke('sendProcess', undefined, 'logData', 'serviceA');
        //   const p = fork('./getLogs.js', ['serviceA'], {
        //     stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        //   });
        //   p.stdout.on('data', (data)=> console.log(data));
        // }
        // catch(err){
        //   console.log(err);
        // }
      };
      getDbLogs();
    }, 5000);

    // clear intervalId
    return function cleanup() {
      clearInterval(logsQueryIntervalId);
    };
  });
  return (
    <div className='w-full overflow-hidden'>
      <DashboardContainer title='Logs' />
      <LogsContainer logs={logs}/>
    </div>
  );
}

const LogsContainer = props => {
  let logElements: any = [];
  // mock logs
  let i=0;
  for (const log of props.logs) {
    logElements.push(<LogElement key={i++} log={log}/>);
  }
  return (
    <div className='scrollbar-thin log-container mb-2 ml-2 mr-2 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-500 overflow-hidden h-[72vh]'>
      {logElements}
    </div>
  );
};

// Expandable element for containing log info
const LogElement = props => {
  const [style, setStyle] = useState('log-element');

  const changeStyle = () => {
    console.log('you just clicked');
    if (style === 'log-element-clicked') {
      setStyle('log-element');
    } else {
      setStyle('log-element-clicked');
    }
  };

  const serviceName = props.log.src;
  const time = props.log.time;
  const logMessage = props.log.msg;

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
