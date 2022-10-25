import React from 'react';
import LogsDisplay from './smartLogs/logsDisplay';
import TracersDisplay from './tracers/tracersDisplay';
export default function Dashboard() {
  return (
    <div className='flex w-screen h-[87.5vh]'>
      <div className='grid ml-4 flex-grow bg-base-300 rounded-box place-items-start'>
        <LogsDisplay />
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='grid mr-4 flex-grow bg-base-300 rounded-box place-items-start'>
        <TracersDisplay />
      </div>
    </div>
  );
}
