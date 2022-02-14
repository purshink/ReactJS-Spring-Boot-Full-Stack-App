import React from 'react';
import ReactDOM from 'react-dom';
import Hobbie from '../components/Hobbie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<Hobbie />, div);
  </Router>
});