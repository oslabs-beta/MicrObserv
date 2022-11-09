import React, { useEffect } from 'react';
import LogFilterBtn from './smartLogs/logFilter';
import LogError from './smartLogs/logError';
import LogSearch from './smartLogs/logSearch';

function DashboardContainer(props) {
  return (
    <div className='card overflow-visible h-full w-full'>
      <div className='card-body'>
        <div className='dash-nav items-center'>
          <button className='h-15'>{props.title}</button>
          {/* <LogFilterBtn /> */}
          <div className='flex items-center gap-2'>
            <LogSearch updateFilter={props.updateFilter}/>
          <LogError />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
