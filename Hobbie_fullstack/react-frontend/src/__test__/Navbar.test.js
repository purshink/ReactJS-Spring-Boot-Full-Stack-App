import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<Navbar />, div);
  </Router>
});