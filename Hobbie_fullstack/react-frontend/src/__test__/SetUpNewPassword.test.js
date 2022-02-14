import React from 'react';
import ReactDOM from 'react-dom';
import SetUpNewPassowrd from '../components/SetUpNewPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<SetUpNewPassowrd />, div);
  </Router>
});