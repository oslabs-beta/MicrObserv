import React, {useState, useEffect} from 'react'

export default function AddSystems() {

  const [systems, updateSystems] = useState([]);
  //imput text from input fields
  const [systemName, updateSystemName] = useState('');
  const [uri, updateURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  
  useEffect(() =>{
    getSystem();
  }, []);

  //GET request to get all data from DB
  const getSystem = () => {
    fetch("/MicrObserv/getSystem")
    .then(data => {
      return data.json()
    })
    .then(data => {

      return updateSystems(data);
    
    })
    .catch((err) => {
      console.log(err);
    });
  }
//on click to add a system to DB
  const handleAdd =  async() => {
    try {
      const response = await fetch('/MicrObserv/addSystem', {
        method: 'POST',
        body: JSON.stringify({
          systemName: systemName,
          uri: uri
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const result = await response.json();
      console.log(result)
      return updateSystems(result)
    } catch (err) {
      console.log(err);
  }
} 
//on click to delete a system to DB
  const handleDelete = (id)=> {
      console.log('Clicked delete btn');
      fetch('/MicrObserv/deleteSystem', {
        method: 'DELETE',
        body: JSON.stringify({
          id:id
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(data => data.json())
      .then(result => {
        console.log(result)
        return updateSystems(result)
        })
      .catch((err) => {
      console.log("Error in handleDelete",err)
      });
  }
  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="scrollbar-thin artboard artboard-demo artboard-horizontal phone-5 flex flex-col items-center border-2 border-current gap-3">
        <SystemContainer systems={systems} handleDelete={handleDelete}/>
      </div>
      <div className='flex flex-row gap-1'>
      <input value ={systemName} onChange ={(e) => updateSystemName(e.target.value)} type="text" placeholder="Enter System Name..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <input value ={uri} onChange ={(e) => updateURI(e.target.value)}type="text" placeholder="Database URI..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <button className="btn btn-outline" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

const SystemContainer = (props) => {
  const systemElements:any = [];
  for(let i = 0; i < props.systems.length; i++){
    systemElements.push(<SystemElement key={i} systems={props.systems[i]} handleDelete={props.handleDelete}/>)
  }
  return (
    <div >
      {systemElements}
    </div>
  )
}

const SystemElement = (props) => {
  return (
    <div className='flex flex-row justify-between items-center border-base-300 bg-base-100 rounded-box w-full gap-1'>
    <div className=" flex border border-base-300 bg-base-100 rounded-box w-full">
      <div className="collapse-title text-m font-medium">
      {props.systems.systemname}
      </div>
     </div>
     <button className="btn btn-outline rounded-box " onClick={()=> props.handleDelete(props.systems.id)}>❌</button>
     </div>
  )
}