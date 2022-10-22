import React from 'react';
import LogsDisplay from './logsDisplay';
import TracersDisplay from './tracersDisplay';
export default function Dashboard() {
  return (
    <div className='flex w-screen h-90'>
      <div className='grid h-screen mb-4 ml-4 flex-grow card bg-base-300 rounded-box place-items-center'>
        <LogsDisplay />
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='grid h-screen mb-4 mr-4 flex-grow card bg-base-300 rounded-box place-items-center'>
        <TracersDisplay />
      </div>
    </div>
  );
}
