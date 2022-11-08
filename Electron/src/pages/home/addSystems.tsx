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
  },[]);

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

  const handleClick =  async() => {
    setIsLoading(true);
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

      return updateSystems(result)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="artboard artboard-demo artboard-horizontal phone-5 flex flex-col items-center border-2 border-current gap-2">
        <SystemContainer systems={systems}/>
      </div>
      <div className='flex flex-row gap-3'>
      <input value ={systemName} onChange ={(e) => updateSystemName(e.target.value)} type="text" placeholder="Enter System Name..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <input value ={uri} onChange ={(e) => updateURI(e.target.value)}type="text" placeholder="Database URI..." className="input input-bordered justify-items-center w-full max-w-xs" />
      <button className="btn btn-outline" onClick={handleClick}>Add</button>
      </div>
    </div>
  )
}

const SystemContainer = (props) => {
  const systemElements:any = [];
  for(let i = 0; i < props.systems.length; i++){
    systemElements.push(<SystemElement key={i} systems={props.systems[i]}/>)
  }
  return (
    <div >
      {systemElements}
    </div>
  )
}

const SystemElement = (props) => {
  return (
    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
  <div className="collapse-title text-m font-medium">
    {props.systems.systemname}
  </div>
  <div className="collapse-content"> 
    <p tabIndex={0}>{props.systems.uri}</p>
  </div>
</div>
  )
}