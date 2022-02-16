import React from 'react';
import ReactDOM from 'react-dom';
import BusinessOwner from '../components/root/users/homeBusiness/BusinessOwner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<BusinessOwner />, div);
  </Router>
});