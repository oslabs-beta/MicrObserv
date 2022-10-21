// import React from "react";
// import ReactDOM from "react-dom";
const { useState } = require('react');
const ReactDOM = require('react-dom');

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
      <h1>Hello!!</h1>
      <h2>Welcome to your First React App..!</h2>
      <h2>hot reload</h2>
      <h2>hot reload</h2>
      <h2>hot reload</h2>
      <h2>hot reload</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
