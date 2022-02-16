import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/root/fragments/header/navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
jest.mock('@ionic/react', () => 'IonIcon')

it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<Navbar />, div);
  </Router>
});