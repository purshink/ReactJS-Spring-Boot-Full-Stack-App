import React from 'react';
import ReactDOM from 'react-dom';
import AccountUser from '../components/AccountUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<AccountUser />, div);
  </Router>
});