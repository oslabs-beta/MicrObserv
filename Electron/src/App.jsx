import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import { useState } from 'react';
// const { useState } = require('react');
// const ReactDOM = require('react-dom');
import Login from './pages/login/login.jsx';
import Signup from './pages/login/signup.jsx';

const App = () => {
  const [page, updatePage] = useState('login');

  const renderPage = function () {
    switch (page) {
      case 'login':
        //go to login page
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

  return (
    <div>
      <Login />
      <Signup />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
