import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
// import { useState } from 'react';
// const { useState } = require('react');
// const ReactDOM = require('react-dom');
import Login from './pages/login/login.jsx';
import Signup from './pages/login/signup.jsx';
import BothDisplay from './pages/dashboard/bothDisplay.jsx';
const App = () => {
  const [page, updatePage] = useState('login');

  const renderPage = function () {
    //check to see if user is logged in
    switch (page) {
      case 'login':
        return <Login updatePage={updatePage} />;
        break;
      case 'home':
        //go to home
        break;
      case 'settings':
        //go to settings
        break;
      case 'dashboard':
        //go to dashboard
        break;
    }
  };

  return <div>{renderPage()}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
