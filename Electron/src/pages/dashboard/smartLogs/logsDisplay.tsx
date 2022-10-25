import React, { useEffect, useState } from 'react';
import DashboardContainer from '../dashboardContainer';

//create empty array
//create fetch request
//for each row create a div and push into array
//display array

export default function LogsDisplay() {
  const [logs, updateLogs] = useState([]);
  useEffect(()=>{
    const logsQueryIntervalId = setInterval(()=>{
      //query db
      const getDbLogs = async ()=>{
        try{
          // const logs = await window.server.pgQuery('SELECT * FROM logs;')
          // console.log(logs);
          console.log(window)
        }
        catch(err){
          console.log(err);
        }
      }
      getDbLogs();
    }, 5000);

    // clear intervalId
    return function cleanup() {
      clearInterval(logsQueryIntervalId);
    }
  });
  return (
    <div className='w-full'>
      <DashboardContainer title='Logs' />
      <LogsContainer />
    </div>
  );
}

const LogsContainer = () => {
  let logElements: any = [];
  // mock logs
  for (let i = 0; i < 15; i++) {
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
  const msg = 'Running MicrObsrv\n\na';
  const serviceName = 'Service A';

  return (
    <div className='flex justify-between p-1'>
      <div className='overflow-hidden convex-shadow text-justify p-3 bg-zinc-800 rounded-xl w-[99%]'>
        {/* Service Name */}
        <div className='flex justify-between'>
          <h2 className='font-bold'>{serviceName}</h2>
          <div>Time: 21:15</div>
        </div>
        <div
          tabIndex={0}
          className='collapse collapse-arrow border border-base-300 bg-base-200 rounded-box'
        >
          <div className='truncate overflow-hidden collapse-title text-md font-medium'>
            Log Message Log Message Log Message Log Message Log Message Log
            Message Log Message
            
          </div>
          <div className='collapse-content'>
            <p>
              {' '}
              Log MessageLog MessageLog MessageLog MessageLog MessageLog
              MessageLog MessageLog Message
            </p>
            <hr></hr>
            <p>
              Source
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   tabIndex={0}
    //   className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'
    // >
    //   <div className='collapse-title text-xl font-medium'>
    //     Focus me to see content
    //   </div>
    //   <div className='collapse-content'>
    //     <p>tabIndex={0} attribute is necessary to make the div focusable</p>
    //   </div>
    // </div>
  );
};

const LogData = (props) => {
  return (
    <div className='log-data self-end'>
      <div>Time</div>
      <div className='divider divider-horizontal'></div>
      <div>Source</div>
    </div>
  );
};
