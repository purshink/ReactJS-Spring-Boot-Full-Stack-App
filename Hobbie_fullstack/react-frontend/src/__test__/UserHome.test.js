import React from 'react';
import ReactDOM from 'react-dom';
import UserHome from '../components/root/users/homeUser/UserHome';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<UserHome />, div);
  </Router>
});