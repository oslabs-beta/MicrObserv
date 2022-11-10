import React from "react";

const Demo = () => {
    return(
        <div>
            <button className="btn btn-outline">Start</button>
            <button className="btn btn-outline">Stop</button>
        </div>
    )
}

ReactDOM.render(<Demo />, document.getElementById('root'));