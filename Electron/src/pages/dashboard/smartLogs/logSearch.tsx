import React from 'react';

export default function LogSearch(props) {
  return (
    <div className='form-control'>
      <label className='input-group-sm'>
        <input
          onChange={(e)=>props.updateFilter(e.target.value)}
          type='text'
          placeholder='Service..'
          className='input input-bordered input-sm'
        />
      </label>
    </div>
  );
}
