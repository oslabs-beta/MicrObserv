import React, { useEffect, useState, version} from 'react';
import LogsDisplay from './smartLogs/logsDisplay';
import TracersDisplay, { TracersDisplayHistory } from './tracers/tracersDisplay';
export default function Dashboard(props) {
  const [realTime, showRealTime] = useState<boolean>(true);
  return (
    <div className='flex w-screen h-[87.5vh]'>
      <div className='grid flex-grow w-1/2 ml-4 bg-base-300 rounded-box place-items-start'>
        <LogsDisplay updatePage={props.updatePage}/>
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='grid flex-grow w-1/2 mr-4 bg-base-300 rounded-box place-items-start'>
        { realTime ? <TracersDisplay updatePage={props.updatePage} showRealTime={showRealTime}/> : <TracersDisplayHistory updatePage={props.updatePage} showRealTime={showRealTime}/> }
        
      </div>
    </div>
  );
}
