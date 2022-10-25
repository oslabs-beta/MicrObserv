import React from 'react';
import LogFilterBtn from './logs/logFilter'
function DashboardContainer(props) {
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