import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

jest.mock('@ionic/react', () => 'IonIcon')
it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<App />, div);
  </Router>
});