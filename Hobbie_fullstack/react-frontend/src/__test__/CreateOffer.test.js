import React from 'react';
import ReactDOM from 'react-dom';
import CreateOffer from '../components/root/users/homeBusiness/Offer/CreateOffer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<CreateOffer />, div);
  </Router>
});