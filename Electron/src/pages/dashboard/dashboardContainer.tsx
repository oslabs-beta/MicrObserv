import React, { useEffect } from 'react';
import LogFilterBtn from './smartLogs/logFilter'
function DashboardContainer(props) {
  useEffect(()=>{
    
  })
  return (
    <div className="card overflow-visible h-full w-full">
      <div className="card-body">
        <div className='dash-nav'>
          <button className="h-5">{props.title}</button>
          <LogFilterBtn />
        </div>
      </div>
    </div>
  );
}





export default DashboardContainer;