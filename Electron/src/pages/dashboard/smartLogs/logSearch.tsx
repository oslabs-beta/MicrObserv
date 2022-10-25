import React from 'react';

export default function LogSearch() {
  return (
    <div className='form-control'>
      <label className='input-group input-group-sm'>
        <input
          type='text'
          placeholder='Search..'
          className='input input-bordered input-sm'
        />
      </label>
    </div>
  );
}
