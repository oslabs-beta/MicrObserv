import React from 'react';
import Navbar from './navbar';
import Dashboard from './dashboard';

export default function BothDisplay(props) {
  return (
    <div>
      <Navbar />
      <div></div>
      <Dashboard />
    </div>
  );
}
