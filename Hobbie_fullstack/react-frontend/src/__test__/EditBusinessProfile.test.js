import React from 'react';
import ReactDOM from 'react-dom';
import EditProfile from '../components/EditBusinessProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<EditProfile />, div);
  </Router>
});