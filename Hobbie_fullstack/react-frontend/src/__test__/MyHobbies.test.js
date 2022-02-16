import React from 'react';
import ReactDOM from 'react-dom';
import MyHobbies from '../components/root/users/homeUser/MyHobbies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  <Router>
  ReactDOM.render(<MyHobbies />, div);
  </Router>
});