import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
//pages
import Login from './pages/login/login';
import SignUp from './pages/login/signUp';
import BothDisplay from './pages/dashboard/bothDisplay';
import Systems from './pages/home/systems'
//styles
import './styles';

const App = () => {
  const [page, updatePage] = useState('home');

  const renderPage = function () {
    //check to see if user is logged in
    switch (page) {
      case 'login':
        return <Login />;
        break;
      case 'home':
        //go to home
        return <Systems/>
        break;
      case 'settings':
        //go to settings
        break;
      case 'dashboard':
        return <BothDisplay />;
        break;
    }
  };

  return <div>{renderPage()}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
