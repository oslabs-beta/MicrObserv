import React, { useEffect, useState, version } from 'react';
import DashboardContainer from '../dashboardContainer';

export default function LogsDisplay(props) {
  const [logs, updateLogs] = useState<any>([]);
  const [filter, updateFilter] = useState<any>('');
  const [isChecked, check] = useState<boolean>(false);
  useEffect(() => {

    let ws = new WebSocket('ws://localhost:3001/');
    ws.onopen = () =>
      console.log('connected to websocket server in Logs Display');
    //when there is an incoming msg
    ws.onmessage = (msg) => {
      //create boolean checking if log
      const newLogs = JSON.parse(msg.data).logs;
      if(newLogs.length) updateLogs(logs => [...newLogs, ...logs]);
    };
  }, []);

  return (
    <div className='w-full overflow-hidden'>
      <DashboardContainer check={check} isChecked={isChecked} updatePage={props.updatePage} title='Logs' filter={filter} updateFilter={updateFilter} />
      <LogsContainer filter={filter} msg={logs} />
    </div>
  );
}
/* logs= [{},{},{}]*/
const LogsContainer = (props) => {
  // console.log("Inside Logs Container", props);
  let logElements: any = [];
  const onlyErrors: any = document.getElementById('onlyErrors');
  for (let i = 0; i < props.msg.length; i++) {
    if(props.filter === '') {
      if(!onlyErrors.checked)
        logElements.push(<LogElement key={i} msg={props.msg[i]} />);
      else{
        if(props.msg[i].msg.toLowerCase().includes('err')) logElements.push(<LogElement key={i} msg={props.msg[i]} />);
      }
    }
    else{
      if(!onlyErrors.checked){
        if(props.msg[i].src.includes(props.filter) || props.msg[i].msg.includes(props.filter)) logElements.push(<LogElement key={i} msg={props.msg[i]} />);
      }
      else{
        if((props.msg[i].src.includes(props.filter) || props.msg[i].msg.includes(props.filter)) && props.msg[i].msg.toLowerCase().includes('err')) logElements.push(<LogElement key={i} msg={props.msg[i]} />);

      }
        
    }
  }
  console.log(logElements);
  return (
    <div className='scrollbar-thin log-container mb-2 ml-2 mr-2 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-500 overflow-hidden h-[72vh]'>
      {logElements}
    </div>
  );
};

// Expandable element for containing log info
const LogElement = (props) => {
  const [style, setStyle] = useState('log-element');
  // console.log("inside log element",props.msg);

  const changeStyle = () => {
    if (style === 'log-element-clicked') {
      setStyle('log-element');
    } else {
      setStyle('log-element-clicked');
    }
  };

  const serviceName = props.msg.src;
  const time = props.msg.time;
  const logMessage = props.msg.msg;

  return (
    <div className='flex justify-between p-1'>
      <div
        className={`${style} overflow-hidden convex-shadow text-justify p-3 bg-zinc-800 rounded-xl w-[99%]`}
        onClick={changeStyle}
      >
        {/* Service Name */}
        <div className='title flex justify-between font-bold'>
          <h2>{serviceName}</h2>
          <div>{`${time}`}</div>
        </div>
        {/* log's message */}
        <div className='messageDiv overflow-hidden text-slate-50 mt-2'>
          <code>{logMessage}</code>
        </div>
      </div>
    </div>
  );
};
