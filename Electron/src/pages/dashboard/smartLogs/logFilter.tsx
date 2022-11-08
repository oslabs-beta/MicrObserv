import React from 'react';
import filterIcon from '../../../assets/filter-icon.png';
import searchIcon from '../../../assets/search-icon.png';
// Filter dropdown
const LogFilterBtn = props => {
  return (
    <div>
      <button className='z-30 btn btn-ghost btn-circle flex justify-center dropdown dropdown-end m-auto'>
        <img className='h-[2em]' src={filterIcon}/>
        <LogFilterDropDown />
      </button>
    </div>
  );
}
const LogFilterDropDown = props => {
  return (
    <div>
      <ul
        tabIndex={0}
        className='menu mt-6 bg-black rounded-box overflow-auto dropdown-content'
      >
        <li>
          {/* microservice */}
          <input className='bg-black' placeholder='Service'/>
        </li>
        <li>
          {/* error */}
          <div className='flex justify-between'>
            <span>Only Errors</span>
            <input type='checkbox' className='checkbox' />
          </div>
        </li>
      </ul>
    </div>
  );
}

const AddService = props => {
  return (
    <div>
      <input className='bg-black' placeholder='Service'/>
      <button className='btn btn-ghost btn-circle'>
        <img src={searchIcon}/>
      </button>
    </div>
  );
}

export default LogFilterBtn;