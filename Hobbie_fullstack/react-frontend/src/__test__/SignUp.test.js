import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<SignUp />, div);
  </Router>
});