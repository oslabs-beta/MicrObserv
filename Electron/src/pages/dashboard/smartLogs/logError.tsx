import React, { useState } from 'react';

// this is a slider that turns checks for error logs

export default function LogError(props) {
  const [isChecked, check] = useState<boolean>(false);
  return (
    <div className='form-control flex-row items-center'>
      <div className='badge badge-error gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='inline-block w-4 h-4 stroke-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          ></path>
        </svg>
      </div>
      <label className='label cursor-pointer'>
        <input type='checkbox' onClick={()=> props.check(!props.isChecked)} id='onlyErrors' className='toggle toggle-' checked={props.isChecked}/>
      </label>
    </div>
  );
}
