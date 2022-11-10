import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
//pages
import Login from './pages/login/login';
import SignUp from './pages/login/signUp';
import BothDisplay from './pages/dashboard/bothDisplay';
import Systems from './pages/home/systems';
import LogsDisplay from './pages/dashboard/smartLogs/logsDisplay';
import TracersDisplay, { TracersDisplayHistory } from './pages/dashboard/tracers/tracersDisplay';
import Navbar from './pages/dashboard/navbar';
//styles
import './styles';

const App = () => {
  const [page, updatePage] = useState('home');
  const [systemName, updateSystemName] = useState('MicrObserv');
  const [realTime, showRealTime] = useState<boolean>(true);
  const renderPage = function () {
    //check to see if user is logged in
    switch (page) {
      case 'login':
        return <Login />;
        break;
      case 'home':
        //go to home
        return (
          <Systems
            updatePage={updatePage}
            updateSystemName={updateSystemName}
          />
        );
        break;
      case 'settings':
        //go to settings
        break;
      case 'dashboard':
        return <BothDisplay updatePage={updatePage} />;
        break;
      case 'logs':
        return (
          <div>
            <Navbar updatePage={updatePage} />
            <div className='flex w-screen h-[87.5vh]'>
              <div className=' grid flex-grow w-1/2 ml-4 bg-base-300 rounded-box place-items-start'>
                <LogsDisplay updatePage={updatePage}/>
              </div>
              <div className='divider divider-horizontal'></div>
              <div className=' grid flex-grow w-1/2 mr-4 bg-base-300 rounded-box place-items-start'>
                <LogsDisplay updatePage={updatePage}/>
              </div>
            </div>
          </div>
        );
        break;
      case 'latency':
        return (
          <div>
            <Navbar updatePage={updatePage} />
            <div className='flex w-screen h-[87.5vh]'>
              <div className='w-full shrink overflow-auto m-4 bg-base-300 rounded-box place-items-start'>
              { realTime ? <TracersDisplay updatePage={updatePage} showRealTime={showRealTime}/> : <TracersDisplayHistory updatePage={updatePage} showRealTime={showRealTime}/> }
              </div>
            </div>
          </div>
        );
        break;
    }
  };

  return <div>{renderPage()}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
