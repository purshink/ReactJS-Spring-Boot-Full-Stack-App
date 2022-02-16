import React from 'react';
import ReactDOM from 'react-dom';
import AccountBusiness from '../components/root/users/homeBusiness/AccountBusiness/AccountBusiness'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<AccountBusiness />, div);
  </Router>
});