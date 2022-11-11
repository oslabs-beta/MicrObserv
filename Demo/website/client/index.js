import React, {useState} from 'react';
import * as ReactDOM from 'react-dom';

import "./styles"


const Demo = () => {

    const [time, updateTime] = useState();
    const [timeOut, updateTimeOut] = useState();

    
    const startDemo =() =>{
        fetch(`http://localhost:8082/start?reqTime=${time}&timeOut=${timeOut}`,
        {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(data => {
            console.log(data.json())
            return data.json()
        })
        .then(data => {
            console.log("demo started",data)
            return data;
        })
        
    }

    const stopDemo = () => {
        fetch("http://localhost:8082/stop")
        .then(data => data.json())
        .then(data => {
            console.log("Stopped Demo", data);
        })
        .catch(err => {console.log("error:", err)})
    }
    return(
        <div>
            <div className="flex justify-center navbar bg-base-100">
                <a className="btn btn-ghost normal-case text-xl">MicrObserv Demo</a>
            </div>
            <div className="flex flex-col items-center gap-2">
            <input type="number"  placeholder="Request Time Interval" className="input input-bordered w-full max-w-xs" onChange={(e) => updateTime(e.target.value)} />
            <input type="number" placeholder="Time Out Interval" className="input input-bordered w-full max-w-xs" onChange={(e) => updateTimeOut(e.target.value)} />
               
            </div>
            <div className = "flex justify-center gap-2 p-4">
            <button className="btn btn-outline" onClick={()=>startDemo()}>Start</button>
            <button className="btn btn-outline"onClick={()=>stopDemo()}>Stop</button>
            </div>
        </div>
    )
}

ReactDOM.render(<Demo />, document.getElementById('root'));