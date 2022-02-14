import React from 'react';
import ReactDOM from 'react-dom';
import PasswordChange from '../components/PasswordChange';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<PasswordChange />, div);
  </Router>
});