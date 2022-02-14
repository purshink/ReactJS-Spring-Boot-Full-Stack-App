import React from 'react';
import ReactDOM from 'react-dom';
import UpdateOffer from '../components/UpdateOffer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<UpdateOffer />, div);
  </Router>
});