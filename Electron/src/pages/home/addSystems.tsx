import React, {useState, useEffect} from 'react'

export default function AddSystems() {

  const [services, updateSerices] = useState([]);
  //imput text from input fields
  const [systemName, updateSystemName] = useState('');
  const [uri, updateURI] = useState('');

  // const addSystem = (data) =>{
  //   console.log(data);
  //   fetch('http://localhost:3000/addSystem',{
  //     method: 'POST',
  //     headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000/", 
  //       'Accept':'application/json'},
  //     mode: "no-cors",
  //     body: JSON.stringify(data)
  //   })
  // }
  //
  useEffect(() =>{
    getSystem();
  })

  const getSystem = () => {
    fetch("/MicrObserv/getSystem")
    .then(data => {
      data.json()
    })
    .then(data => {
      console.log("Inside data", data)
      return data
    
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleClick = async () =>{
    // const systemObj = {
    //   systemName: systemName,
    //   uri: uri
    // }
   getSystem()
  }
  
  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="artboard artboard-demo artboard-horizontal phone-5 flex flex-col items-center border-2 border-current gap-2">
        <AddSystemContent />
        <AddSystemContent />
        <AddSystemContent />
        <AddSystemContent />
      </div>
      <div className='flex flex-row gap-3'>
      <input value ={systemName} onChange ={(e) => updateSystemName(e.target.value)} type="text" placeholder="Enter System Name..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <input value ={uri} onChange ={(e) => updateURI(e.target.value)}type="text" placeholder="Database URI..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <button className="btn btn-outline" onClick={getSystem}>Add</button>
      </div>
    </div>
  )
}

const AddSystemContent = () => {
  return (
    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
  <div className="collapse-title text-m font-medium">
    System A
  </div>
  <div className="collapse-content"> 
    <p tabIndex={0}>URI: SKFLSFLSFHKLSHFSLHFLHSLFHLKFHSLKHF</p>
  </div>
</div>
  )
}