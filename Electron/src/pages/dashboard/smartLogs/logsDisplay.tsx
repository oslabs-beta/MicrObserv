import React, { useEffect, useState, version} from 'react';
import DashboardContainer from '../dashboardContainer';

//create empty array
//create fetch request
//for each row create a div and push into array
//display array
//window.ipcBridge.handle('res', (event, data)=> console.log(data));
export default function LogsDisplay() {
  const [logs, updateLogs] = useState([]);

  // useEffect(() => {
  //   const logsQueryIntervalId = setInterval(() => {
  //     //query db
  //     const getDbLogs = async ()=>{
  //       try{
  //         await window.ipcBridge.invoke('pgLogs', 'serviceA');
  //       }
  //       catch(err){
  //         console.log(err);
  //       }
  //     };
  //     getDbLogs();
  //   }, 5000);

  //   // clear intervalId
  //   return function cleanup() {
  //     clearInterval(logsQueryIntervalId);
  //   };
  // });
  return (
    <div className='w-full overflow-hidden'>
      <DashboardContainer title='Logs' />
      <LogsContainer />
    </div>
  );
}

const LogsContainer = () => {
  let logElements: any = [];
  // mock logs
  for (let i = 0; i < 9; i++) {
    logElements.push(<LogElement key={i} />);
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

  const changeStyle = () => {
    console.log('you just clicked');
    if (style === 'log-element-clicked') {
      setStyle('log-element');
    } else {
      setStyle('log-element-clicked');
    }
  };

  const serviceName = 'Service A';
  const time = '21:22';
  const logMessage = `Attempted to divide by zero.
    Error: ENOENT: no such file or directory, open './NoFileNamedThis.txt'
        at Object.openSync (fs.js:498:3)
        at Object.readFileSync (fs.js:394:35)
        at fileDoesNotExist (C:\Users.js:33:6)
        at Object.<anonymous> (C:\Users:54:3)
        at Module._compile (internal/modules/cjs/loader.js:1072:14)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:1101:10)
        at Module.load (internal/modules/cjs/loader.js:937:32)
        at Function.Module._load (internal/modules/cjs/loader.js:778:12)
        at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
        at internal/main/run_main_module.js:17:47 `;

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
