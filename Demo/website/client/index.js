import React from 'react';
import * as ReactDOM from 'react-dom';

import "./styles"


const Demo = () => {
    const startDemo =() =>{
        fetch("http://localhost:8082/start",
        {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(data => {
            console.log(data.json())
            data.json()
        })
        .then(data => {
            console.log("demo started",data)
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
            <div className = "flex justify-center gap-3">
            <button className="btn btn-outline" onClick={()=>startDemo()}>Start</button>
            <button className="btn btn-outline"onClick={()=>stopDemo()}>Stop</button>
            </div>
        </div>
    )
}

ReactDOM.render(<Demo />, document.getElementById('root'));